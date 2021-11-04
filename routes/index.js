const { Router } = require('express');
const Sessions = require("../sessions");
const fs = require('fs');
const real_path = require('path');
const exec = require("child_process");
const os = require ('os');

//const bcrypt = require("bcrypt-nodejs");
//const jwt = require('jsonwebtoken');
//const passport = require('passport');
//require('../configurations/password')(passport);
//const controllers = require('../controllers');

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

function execute(command){
  let version = exec.execSync(command);
  return version.toString();
}

function update_last_version(){
  let local_version = parseInt(execute("npm list -l --depth=0 | awk -F@ '/venom-bot/ { print $2}'").split('\n')[0].split('.').join(''));
  let remote_version = parseInt(execute("npm show venom-bot version").split('\n')[0].split('.').join(''));
  if (local_version < remote_version) {
    console.log('VERSÃO DESATUALIZADA.');
    console.log('ATUALIZANDO VERSÃO PARA ' + execute("npm show venom-bot version").split('\n')[0] + '.');
    return execute("npm update venom-bot");
    //execute("npm install venom-bot@" + remote_version);
    //execute("npm fund");
  }else{
    console.log('JÁ ESTÁ COM A ÚLTIMA VERSÃO.');
  }
}

let platform = os.platform();

if (platform === 'linux') {
    console.log("you are on a Linux os");
    update_last_version();
}else if(platform === 'win32'){
    console.log("you are on a Windows os")
}else{
    console.log("unknown os")
}


const router = Router();

const User = require('../models/user');

function delete_token(path){
  if(fs.existsSync(path)) {
    fs.rmdirSync(path, {recursive: true})
  }else{
    try {
      fs.unlinkSync(path);
    } catch(err) {
      console.error(err)
    }
  }
}

router.post('/user/save', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      status: false,
      message: ''
    });
  } else {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      session_key: req.body.username + '-' + getRandomString(10),

      //first_name: req.body.first_name,
      //last_name: req.body.last_name,
      //active: req.body.active,
      //admin: req.body.admin

    }).then((user) => res.status(201).send(user)).catch((error) => {
      res.status(400).send(error);
    });
  }

  function getRandomString(length) {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( let i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
});

router.post('/user/login', function (req, res) {
  async function check_user() {
    const user = await User.findOne({where: {username: req.body.username}});
    let is_logged = false;
    if (user) {
      let path = real_path.join('./tokens/' + user.session_key + '.data.json');
      if (fs.existsSync(path)) {
        is_logged = 'logged';
      }else{
        is_logged = 'awaiting';
      }
      User.comparePassword(req.body.password, user, (err, isMatch) =>{
        if (!isMatch){
          return res.json({success: false, message: "Senha inválida!!!"});
        }
        return res.json({sucess: true, message: "Login efetuado com sucesso.", key: user.session_key, user_id: user.id, is_logged: is_logged});
      });
    }else if(!user) {
      return res.json({success: false, message: "Usuário não existe!"});
    }
  }
  check_user().then(r => {});
})

router.post('/user/delete', async function (req, res) {
  await Sessions.closeSession(req.body.sessionName);
  try{
      delete_token(real_path.join('./tokens/' + req.body.sessionName + '.data.json'));
  }catch (e) {
    //console.log(e);
  }
  User.destroy({
    where: {
      id: req.body.user_id
    }
  }).then(function (deletedRecord) {
    console.log(deletedRecord);
    if(deletedRecord === 1){
      res.status(200).json({success: true, message:"Usuário removido com sucesso!!!"});
    } else {
      res.status(404).json({success: false, message:"Erro ao remover usuário."})
    }
  }).catch(function (error) {
    res.status(500).json(error);
  })
})

router.get('/database/reset', function (req, res) {
  try{
    delete_token(real_path.join('./tokens'));
  }catch (e) {
    //console.log(e);
  }
  User.destroy({
    where: {
    }
  }).then(function (deletedRecord) {
    if(deletedRecord){
      res.status(200).json({success: true, message:"Banco de dados resetado com sucesso!!!"});
    } else {
      res.status(404).json({success: false, message:"Erro ao resetar banco de dados."})
    }
  }).catch(function (error) {
    res.status(500).json(error);
  })
})

router.get('/database/load', function (req, res) {
  User.findAll().then(function (load_data) {
    if(load_data){
      res.status(200).json({success: true, object: load_data, message:"Banco de dados carregado com sucesso!!!"});
    } else {
      res.status(404).json({success: false, message:"Erro ao carregar banco de dados."})
    }
  }).catch(function (error) {
    res.status(500).json(error);
  })
})

router.get("/start", async (req, res, next) => {
  //console.log("STARTING..." + req.query.sessionName);
  const session = await Sessions.start(req.query.sessionName);
  if (["UNPAIRED", "UNPAIRED_IDLE"].includes(session.state)){
    delete_token(real_path.join('./tokens/' + req.body.sessionName + '.data.json'));
  }
  //else if (["CONNECTED", "QRCODE", "STARTING"].includes(session.state)) {
    //res.redirect("../api/qrcode?sessionName=" + req.query.sessionName + '&image=true')
  //} else {
    //res.status(200).json({ result: 'error', message: session.state });
  //}
  return res.json({success: 'true', object: session.qrcode, message: 'Novo qrcode gerado com sucesso!!!', is_active: false});;
});

router.get("/new_qrcode", async function (req, res, next) {
  const session = await Sessions.getSession(req.query.sessionName);
  if (session) {
    console.log('OLHA AI O STATUS: ' + session.status + ' E OLHA O STATE: ' + session.state);
    if (session.status === 'qrReadSuccess'){
      return res.json({success: 'true', object: false, message: 'Já está logado!!!', is_active: true});
    }
    if (session.status === 'isLogged' || session.status === 'inChat'){
      //res.redirect('/testing');
      return res.json({success: 'true', object: false, message: 'Já está logado!!!', is_active: true});
    }else if (session.status === 'notLogged' && session.state !== 'STARTING') {
      res.json({success: 'true', object: session.qrcode, message: 'Novo qrcode gerado com sucesso!!!', is_active: false});
    }
  } else {
    //console.log('NÃO TEM SESSÃO...')
    res.json({success: "false", message: "NOTFOUND" });
  }
});

router.get("/status", async function (req, res, next) {
  const session = await Sessions.getSession(req.query.sessionName);
  if (session.status){
    return res.json({success: 'true', object: session.status, message: session.status});
  }
  return res.json({success: 'false', object: [], message: 'NOT FOUND'});
});

router.get("/qrcode", async (req, res, next) => {
  console.log("qrcode..." + req.query.sessionName);
  const session = Sessions.getSession(req.query.sessionName);
  if (session !== false) {
    if (session.status === 'notLogged') {
      if (!req.query.image) {
        res.status(200).json({result: "success", message: session.state, qrcode: session.qrcode});
      }
    } else if (session.status === 'inChat' || session.status === 'isLogged') {
      res.redirect('/testing');
    }
  } else {
    res.status(200).json({ result: "error", message: session.state });
  }
});

router.post("/sendText", async function sendText(req, res, next) {
  const session = Sessions.getSession(req.body.sessionName);
  let result = {};
  let mobile_status = null;
  let path = real_path.join('./tokens/' + req.body.sessionName + '.data.json');
  //console.log(session.mobile_status);

  if (session.mobile_status !== 'DESCONNECTED_MOBILE'){
    result = await Sessions.sendText(
      req.body.sessionName,
      req.body.number,
      req.body.text
    );
    res.json(result);
  } else {
    if (fs.existsSync(path)) {
      mobile_status = session.mobile_status;
    }else{
      mobile_status = 'NOT_SESSION';
    }
    result['mobile_status'] = mobile_status;
    res.json(result);
  }
});

router.post("/send_list", async function sendText(req, res, next) {
  const session = Sessions.getSession(req.query.sessionName);
  let list_req = req.body.numbers
  let number = null;
  let result = null;
  let mobile_status = null;
  let path = real_path.join('./tokens/' + req.query.sessionName + '.data.json');

  if (session.mobile_status !== 'DESCONNECTED_MOBILE'){
    for ( let i = 0; i < list_req.length; i++ ) {
      number = '55' + list_req[i];
      console.log('ENVIANDO...' + number);
      result = await Sessions.sendText(
        req.body.sessionName,
        number,
        req.body.text
      );
      await sleep(10000);
    }
    res.json(result);
  } else {
    if (fs.existsSync(path)) {
      mobile_status = session.mobile_status;
    }else{
      mobile_status = 'NOT_SESSION';
    }
    result['mobile_status'] = mobile_status;
    res.json(result);
  }
});

router.get("/sendText", async (req, res, next) => {
  const session = Sessions.getSession(req.query.sessionName);
  let result = {};
  let mobile_status = null;
  let path = real_path.join('./tokens/' + req.query.sessionName + '.data.json');
  //console.log(session.mobile_status);

  if (session.mobile_status !== 'DESCONNECTED_MOBILE'){
    result = await Sessions.sendText(
      req.query.sessionName,
      req.query.number,
      req.query.text
    );
    res.json(result);
  } else {
    if (fs.existsSync(path)) {
      mobile_status = session.mobile_status;
    }else{
      mobile_status = 'NOT_SESSION';
    }
    result['mobile_status'] = mobile_status;
    res.json(result);
  }
});

router.post("/sendFile", async (req, res, next) => {
  const result = await Sessions.sendFile(
    req.body.sessionName,
    req.body.number,
    req.body.base64Data,
    req.body.fileName,
    req.body.caption
  );
  res.json(result);
});

router.get("/messages/unread", async function (req, res, next) {
  const result = await Sessions.unreadMessages(req.query.sessionName);
  res.json(result);
});

router.get("/close", async (req, res, next) => {
  const result = await Sessions.closeSession(req.query.sessionName);
  res.json(result);
});

module.exports = router;