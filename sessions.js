// person.js
'use strict';

const os = require('os');
const fs = require('fs');
const path = require('path');
const venom = require('venom-bot');
const { json } = require('express');
const { Session } = require('inspector');
const sleep = require('system-sleep');

module.exports = class Sessions {

    static async start(sessionName) {
        Sessions.sessions = Sessions.sessions || []; //start array

        let session = Sessions.getSession(sessionName);

        if (session === false) { //create new session
            console.log("session == false");
            session = await Sessions.addSesssion(sessionName);
        } else if (["CLOSED"].includes(session.state)) { //restart session
            console.log("session.state == CLOSED");
            session.state = "STARTING";
            session.status = 'notLogged';
            session.client = Sessions.initSession(sessionName);
            Sessions.setup(sessionName);
        } else if (["CONFLICT", "UNPAIRED", "UNLAUNCHED"].includes(session.state)) {
            console.log("client.useHere()");
            session.client.then(client => {
                client.useHere();
            });
        } else {
            console.log("session.state: " + session.state);
        }
        return session;
    }//start

    static async addSesssion(sessionName) {
        const newSession = {
            name: sessionName,
            qrcode: false,
            ascii_qr: false,
            client: false,
            status: 'notLogged',
            state: 'STARTING'
        };
        Sessions.sessions.push(newSession);
        console.log("newSession.state: " + newSession.state);

        //setup session
        newSession.client = Sessions.initSession(sessionName);
        Sessions.setup(sessionName);

        return newSession;
    }//addSession

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
            },
            {
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
                    // Extras
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
                autoClose: 60 * 60 * 24 * 365, //never
                disableSpins: true
            }
        );
        return client;
    }//initSession

    static async setup(sessionName) {
        const session = Sessions.getSession(sessionName);
        await session.client.then(client => {
            client.onStateChange(state => {
                session.state = state;
                if (session.status === 'isLogged'){
                    session.state = 'CONNECTED';
                }
                console.log("session.state: " + state);
            });//.then((client) => Sessions.startProcess(client));
            client.onMessage((message) => {
                if (message.body.toLowerCase() === 'oi' || message.body.toLowerCase() in ['boa tarde', 'bom dia', 'boa noite']) {
                    sleep(30000);
                    client.sendText(message.from, 'Bem Vindo ao Venom 🕷');
                }
            });
        });
    }//setup

    static async closeSession(sessionName) {
        const session = Sessions.getSession(sessionName);
        if (session) { //só adiciona se não existir
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
            } else {//close
                return { result: "success", message: session.state };
            }
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }//close

    static getSession(sessionName) {
        let foundSession = false;
        if (Sessions.sessions)
            Sessions.sessions.forEach(session => {
                //console.log('OLHA AI A SESSÃO: ' + JSON.stringify(session));
                if (sessionName === session.name) {
                    foundSession = session;
                }
            });
        return foundSession;
    }//getSession

    static getSessions() {
        if (Sessions.sessions) {
            return Sessions.sessions;
        } else {
            return [];
        }
    }//getSessions

    static async getQrcode(sessionName) {
        const session = Sessions.getSession(sessionName);
        if (session) {
            //if (["UNPAIRED", "UNPAIRED_IDLE"].includes(session.state)) {
            if (["UNPAIRED", "UNPAIRED_IDLE"].includes(session.state)) {
                //restart session
                await Sessions.closeSession(sessionName);
                Sessions.start(sessionName);
                return { result: "error", message: session.state };
            } else if (["CLOSED"].includes(session.state)) {
                Sessions.start(sessionName);
                return { result: "error", message: session.state };
            } else { //CONNECTED
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
    } //getQrcode

    static async sendText(sessionName, number, text) {
        console.log(sessionName + ' ' + number + ' ' + text);
        const session = Sessions.getSession(sessionName);

        if (session) {

            is_connected(session);

            if (session.state === "CONNECTED") {
                var resultSendText = await session.client.then(async client => {
                    return await client.sendText(number + '@c.us', text);
                });
                return { result: "success" }
            } else {
                return { result: "error", message: session.state };
            }
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }//message

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
                });//client.then(
                return { result: "success" };
            } else {
                return { result: "error", message: session.state };
            }
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }//message
}

function is_connected(session) {
    if (session.status === 'isLogged'){
        session.state = 'CONNECTED';
    }
}