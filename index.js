const fs = require('fs');
const https = require('https');
const express = require("express");
const cors = require('cors');
const Sessions = require("./sessions");
require('dotenv').config();

const app = express();
const HOST = process.env.HOSTNAME;

app.use(cors());
app.use(express.json());

if (process.env.HTTPS === 1) { //with ssl
    https.createServer(
        {
            key: fs.readFileSync(process.env.SSL_KEY_PATH),
            cert: fs.readFileSync(process.env.SSL_CERT_PATH)
        },
        app).listen(process.env.HOST_PORT || 3000);
    console.log("Https server running on port " + process.env.HOST_PORT);
} else { //http
    app.listen(process.env.HOST_PORT || 3000,() => {
        console.log("Http server running on port " + process.env.HOST_PORT);
    });
}//http

app.get("/start", async (req, res, next) => {
    console.log("starting..." + req.query.sessionName);
    const session = await Sessions.start(req.query.sessionName);

    if (["CONNECTED", "QRCODE", "STARTING"].includes(session.state)) {
        res.status(200).json({ result: 'success', message: session.state });
    } else {
        res.status(200).json({ result: 'error', message: session.state });
    }
});//start

app.get("/qrcode", async (req, res, next) => {
    console.log("qrcode..." + req.query.sessionName);
    const session = Sessions.getSession(req.query.sessionName);

    if (session !== false) {
        if (session.status !== 'isLogged') {
            if (req.query.image) {
                session.qrcode = session.qrcode.replace('data:image/png;base64,', '');
                const imageBuffer = Buffer.from(session.qrcode, 'base64');

                const html = '<html><head><meta name="viewport" content="width=device-width,' +
                  ' minimum-scale=0.1"><title>qrcode (264×264)</title></head>' +
                  '<body style="margin: 0px;background: #ffffff;text-align-last: center; overflow: hidden;">' +
                  '<img style="-webkit-user-select: none;margin: auto;cursor: zoom-in;padding: 200px;' +
                  'width: 300px;height: 300px;" src="data:image/png;base64,'+ session.qrcode +'" width="150"' +
                  ' height="150"></body></html>';

                res.writeHead(200, {
                    //'Content-Type': 'image/png',
                    //'Content-Length': imageBuffer.length
                });
                //res.end(imageBuffer);
                res.end(html);
                console.log('Terminal qrcode: \n', session.ascii_qr);
            } else {
                res.status(200).json({ result: "success", message: session.state, qrcode: session.qrcode });
            }
        } else {
            res.status(200).json({ result: "error", message: session.state });
        }
    } else {
        res.status(200).json({ result: "error", message: "NOTFOUND" });
    }
});//qrcode

app.post("/sendText", async function sendText(req, res, next) {
    const result = await Sessions.sendText(
      req.body.sessionName,
      req.body.number,
      req.body.text
    );
    //console.log(req.body);
    res.json(result);
});//sendText

app.get("/sendText", async (req, res, next) => {
    const result = await Sessions.sendText(
      req.query.sessionName,
      req.query.number,
      req.query.text
    );
    //console.log(req.query);
    res.json(result);
});//sendText

app.post("/sendFile", async (req, res, next) => {
    const result = await Sessions.sendFile(
      req.body.sessionName,
      req.body.number,
      req.body.base64Data,
      req.body.fileName,
      req.body.caption
    );
    res.json(result);
});//sendFile

app.get("/close", async (req, res, next) => {
    const result = await Sessions.closeSession(req.query.sessionName);
    res.json(result);
});//close

process.stdin.resume();//so the program will not close instantly

async function exitHandler(options, exitCode) {
    if (options.cleanup) {
        console.log('cleanup');
        await Sessions.getSessions().forEach(async session => {
            await Sessions.closeSession(session.sessionName);
        });
    }
    if (exitCode || exitCode === 0) {
        console.log(exitCode);
    }

    if (options.exit) {
        process.exit();
    }
} //exitHandler 
//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
