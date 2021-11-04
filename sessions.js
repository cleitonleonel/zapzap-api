'use strict';

const os = require('os');
const fs = require('fs');
const path = require('path');
const venom = require('venom-bot');
//const { json } = require('express');
//const { Session } = require('inspector');
const mime = require('mime-types');
const sleep = require('system-sleep');
const app = require("./index");

module.exports = class Sessions {

    static async start(sessionName) {
        Sessions.sessions = Sessions.sessions || [];

        let session = Sessions.getSession(sessionName);

        if (session === false) {
            console.log("session == false");
            session = await Sessions.addSesssion(sessionName);
        } else if (["CLOSED"].includes(session.state)) {
            console.log("session.state == CLOSED");
            session.state = "STARTING";
            session.status = 'notLogged';
            session.client = Sessions.initSession(sessionName);
            await Sessions.setup(sessionName);
        } else if (["CONFLICT", "UNPAIRED", "UNLAUNCHED"].includes(session.state)) {
            console.log("client.useHere()");
            session.client.then(client => {
                // force whatsapp take over
                if ('CONFLICT'.includes(state)) client.useHere();
                // detect disconnect on whatsapp
                if ('UNPAIRED'.includes(state)) console.log('logout');
            });
        } else {
            console.log("session.state: " + session.state);
        }
        return session;
    }

    static async addSesssion(sessionName) {
        const newSession = {
            name: sessionName,
            qrcode: false,
            ascii_qr: false,
            client: false,
            mobile_status: 'AWAITING',
            status: 'notLogged',
            state: 'STARTING'
        };
        Sessions.sessions.push(newSession);
        console.log("newSession.state: " + newSession.state);

        newSession.client = Sessions.initSession(sessionName);
        await Sessions.setup(sessionName);

        return newSession;
    }

    static async initSession(sessionName) {
        const session = Sessions.getSession(sessionName);
        const client = await venom.create(
            sessionName,
            (base64Qr, asciiQR, attempts) => {
                session.state = "QRCODE";
                session.qrcode = base64Qr;
                session.ascii_qr = asciiQR;
                console.log("new qrcode updated - session.state: " + session.state);
            },
            (statusFind) => {
                session.status = statusFind;
                console.log("session.status: " + session.status);
                if (session.status === 'qrReadSuccess'){
                    session['mobile_status'] = 'CONNECTED_MOBILE';
                }
            },
            {
                createPathFileToken: true,
                folderNameToken: 'tokens',
                mkdirFolderToken: '',
                headless: true,
                devtools: false,
                useChrome: false,
                debug: false,
                logQR: false,
                browserArgs: [
                    '--log-level=3',
                    '--no-default-browser-check',
                    '--disable-site-isolation-trials',
                    '--no-experiments',
                    '--ignore-gpu-blacklist',
                    '--ignore-certificate-errors',
                    '--ignore-certificate-errors-spki-list',
                    '--disable-gpu',
                    '--disable-extensions',
                    '--disable-default-apps',
                    '--enable-features=NetworkService',
                    '--disable-setuid-sandbox',
                    '--no-sandbox',
                    '--disable-webgl',
                    '--disable-threaded-animation',
                    '--disable-threaded-scrolling',
                    '--disable-in-process-stack-traces',
                    '--disable-histogram-customizer',
                    '--disable-gl-extensions',
                    '--disable-composited-antialiasing',
                    '--disable-canvas-aa',
                    '--disable-3d-apis',
                    '--disable-accelerated-2d-canvas',
                    '--disable-accelerated-jpeg-decoding',
                    '--disable-accelerated-mjpeg-decode',
                    '--disable-app-list-dismiss-on-blur',
                    '--disable-accelerated-video-decode',
                ],
                refreshQR: 15000,
                autoClose: 60 * 60 * 24 * 365,
                disableSpins: true
            },
            {
                WABrowserId: '',
                WASecretBundle: '',
                WAToken1: '',
                WAToken2: '',
            }
        );
        return client;
    }

    static async deleteToken(sessionName) {
        const session = Sessions.getSession(sessionName);
        if (session){
            await session.client.then(async client => {
                return await client.getSessionTokenBrowser();
            });
        } else {
            return {result: false, object: [], message: 'Nenhuma sessão encontrada, sem tokens ativos.'};
        }
    }

    static async unreadMessages(sessionName) {
        const session = Sessions.getSession(sessionName);
        if (session){
            await session.client.then(async client => {
                return await client.getAllUnreadMessages();
            });
        } else {
            return {result: false, object: [], message: 'Sem mensagens não lidas.'};
        }
    }

    static async setup(sessionName) {
        const session = Sessions.getSession(sessionName);

        console.log('OLHA AÍ A SESSÃO: ' + JSON.stringify(session));

        await session.client.then(client => {
            client.onStateChange(state => {
                session.state = state;
                if (session.status === 'isLogged') {
                    session.state = 'CONNECTED';
                    session['mobile_status'] = 'CONNECTED_MOBILE';
                }
                console.log("session.state: " + state);
                // force whatsapp take over
                if ('CONFLICT'.includes(state)) client.useHere();
                // detect disconnect on whatsapp
                if ('UNPAIRED'.includes(state)) console.log('logout');
                if ('desconnectedMobile'.includes(session.status)) {
                    mobile_desconnected(session);
                }
            });//.then((client) => Sessions.startProcess(client));
            client.onMessage( async (message) => {
                console.log('Mensagem de: ' + message.from + ' Conteúdo: ' + message.body);

                if (message.isMedia === true || message.isMMS === true) {
                    const buffer = await client.decryptFile(message);
                    const fileName = `some-file-name.${mime.extension(message.mimetype)}`;
                    await fs.writeFile(fileName, buffer, (err) => {
                        //
                    });
                }else if (check_existence(message.body.toLowerCase())) {
                    const response_list = ["Só pra constar sou um BOT em fase de testes, ok!!! 🕷", "hummm", "aiai", "é mesmo???", "OK!", "Show!!!", "Que massa muleque...", "kkkk", "Hoje não...", "Desculpa aê...", "putss", "pode isso Arnaldo???"];
                    const randint = Math.floor(Math.random() * response_list.length);
                    sleep(3000);
                    await client.sendText(message.from, response_list[randint]);
                    //client.sendText(message.from, 'Bem Vindo ao Venom 🕷');
                }
            });
        });
    }

    static async closeSession(sessionName) {
        const session = Sessions.getSession(sessionName);
        if (session) {
            if (session.state !== "CLOSED") {
                if (session.client)
                    await session.client.then(async client => {
                        try {
                            await client.close();
                        } catch (error) {
                            console.log("client.close(): " + error.message);
                        }
                        session.state = "CLOSED";
                        session.client = false;
                        console.log("client.close - session.state: " + session.state);
                    });
                return { result: "success", message: "CLOSED" };
            } else {
                return { result: "success", message: session.state };
            }
        } else {
            console.log("NÃO TEM SESSÃO...")
            return { result: "error", message: "NOTFOUND" };
        }
    }

    static getSession(sessionName) {
        let foundSession = false;
        if (Sessions.sessions)
            Sessions.sessions.forEach(session => {
                //console.log('OLHA AI A SESSÃO: ' + JSON.stringify(session));
                console.log(sessionName + ' ' + session.name);
                if (sessionName === session.name) {
                    foundSession = session;
                    return foundSession;
                }
            });
        return foundSession;
    }

    static getSessions() {
        if (Sessions.sessions) {
            return Sessions.sessions;
        } else {
            return [];
        }
    }

    static async getQrcode(sessionName) {
        const session = Sessions.getSession(sessionName);
        if (session) {
            if (["UNPAIRED", "UNPAIRED_IDLE"].includes(session.state)) {
                await Sessions.closeSession(sessionName);
                await Sessions.start(sessionName);
                return { result: "error", message: session.state };
            } else if (["CLOSED"].includes(session.state)) {
                await Sessions.start(sessionName);
                return { result: "error", message: session.state };
            } else {
                if (session.status !== 'isLogged') {
                    return { result: "success", message: session.state, qrcode: session.qrcode };
                } else {
                    session.state = 'CONNECTED';
                    return { result: "success", message: session.state };
                }
            }
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }

    static async sendText(sessionName, number, text) {
        console.log(sessionName + ' ' + number + ' ' + text);
        const session = Sessions.getSession(sessionName);

        if (session) {

            is_connected(session);

            if (session.state === "CONNECTED") {'~                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  nnnnnnnnnnnnnnnnn'
                let resultSendText = await session.client.then(async client => {
                    await client.sendSeen(number + '@c.us');
                    return await client.sendText(number + '@c.us', text);
                });
                return { result: "success" }
            } else {
                return { result: "error", message: session.state };
            }
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }

    static async sendFile(sessionName, number, base64Data, fileName, caption) {
        const session = Sessions.getSession(sessionName);
        if (session) {

            is_connected(session);

            if (session.state === "CONNECTED") {
                const resultSendFile = await session.client.then(async (client) => {
                    const folderName = fs.mkdtempSync(path.join(os.tmpdir(), session.name + '-'));
                    const filePath = path.join(folderName, fileName);
                    fs.writeFileSync(filePath, base64Data, 'base64');
                    console.log(filePath);
                    return client.sendFile(number + '@c.us', filePath, fileName, caption);
                });
                return { result: "success" };
            } else {
                return { result: "error", message: session.state };
            }
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }
}

function is_connected(session) {
    if (session.state === 'CONNECTED' || session.status === 'inChat' || session.status === 'isLogged' || session.status === 'chatsAvailable') {
        session.state = 'CONNECTED';
    }
}

function mobile_desconnected(session) {
    session.mobile_status = 'DESCONNECTED_MOBILE';
    console.log(session.mobile_status);
}

function check_existence(phrase) {
    let data_list = ["o", "e", "a", "boa tarde", "bom dia", "boa noite"];
    let rx = new RegExp(data_list.join('|'));
    return rx.test(phrase);
}