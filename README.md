# ZapZap-api
![Zapzap-api](https://github.com/cleitonleonel/zapzap-api/blob/master/static/media/zapzap-api.png?raw=true)

Este projeto usa como base o [Venom-bot](https://github.com/orkestral/venom), um navegador virtual sem interface gráfica que abre o whatsapp web e executa todos os comandos via código possibilitando assim a automação de todas as funções.

## Setup:

`sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget build-essential apt-transport-https libgbm-dev`
- para instalar todas as dependencias necessárias no sistema

`curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`

`sudo apt install git nodejs yarn`
- para instalar git, nodejs e yarn

`git clone https://github.com/cleitonleonel/zapzap-api.git`

`cd myzap`

`npm install`

`cp .env-example .env`

### Iniciando o servidor:

`node index.js`

### Mantendo processos ativos a cada reinicialização do servidor:

`npm install pm2 -g`

`pm2 start index.js`

`pm2 startup`

## Uso
- Faça cadastro e login no sistema, após isso será redirecionado para a tela a seguir:

  <img src="https://github.com/cleitonleonel/zapzap-api/blob/master/static/media/qrcode_read.png?raw=true" width="400">

- Siga as instruções na tela e se abrirá uma tela de testes como essa:

  <img src="https://github.com/cleitonleonel/zapzap-api/blob/master/static/media/send_message.png?raw=true" width="400">


- Teste o quanto quiser se gostar de nosso serviço e quiser nos contratar envie um e-mail para [cleiton.leonel@gmail.com](cleiton.leonel@gmail.com)

## Para instalar o certbot e criar o certificado SSL para domínios https:
  
```shell script
sudo apt-get update && sudo apt-get install -y software-properties-common

sudo add-apt-repository universe && sudo add-apt-repository ppa:certbot/certbot

sudo apt-get update && sudo apt-get install -y certbot

sudo certbot certonly --manual --force-renewal -d *.yourdomain.net -d yourdomain.net --agree-tos --no-bootstrap --manual-public-ip-logging-ok --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory
```

# Este projeto ajudou você?

Se esse projeto deixar você ficar à vontade para fazer uma doação =), pode ser R $ 0,50 hahahaha. Para isso, basta ler o qrcode abaixo, ele foi gerado com meu outro projeto chamado [Pypix](https://github.com/cleitonleonel/pypix.git) arquivo de amostra.

![QRCode Doação](https://github.com/cleitonleonel/pypix/blob/master/qrcode.png?raw=true)


# Desenvolvido por:

Cleiton Leonel Creton ==> cleiton.leonel@gmail.com