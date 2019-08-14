

## Instalação

Você vai precisar ter o NVM e o RVM instalados. Adicione a versão do NodeJS  e do Ruby de sua preferência. Eles são usados apenas para tarefas de build do App.
# install nvm
pegue a URL mais atualizada em https://github.com/creationix/nvm
mkdir ~/.nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
# restart terminal
nvm install 4.6.2
npm install -g grunt grunt-cli bower

# install rvm
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
curl -sSL https://get.rvm.io | bash -s stable
# restart terminal
rvm install 2.3.3
#ajustar o terminal para permitir login shel
rvm use 2.3.3
gem install bundler

O NodeJS  vai rodar o Grunt para fazer as tarefas de organização do código e o Ruby para rodar o Compass (que é executado pelo Grunt) para gerar o CSS do SASS.

Após fazer o git clone e uma vez com o NodeJS  e o Ruby instalados e ativos, instale os pacotes do npm.

Os comandos abaixo devem sempre ser digitados na pasta do app:

    $ npm install
    $ npm install -g bower
    $ npm install -g grunt
    $ npm install -g grunt-cli
    $ bower install

Duas pastas são adicionadas ao projeto e as duas ignoradas pelo git:

    src/lib: pacotes do bower
    node_modules: pacotes do npm

## Desenvolvimento

Ao iniciar o desenvolvimento no App, rode o comando abaixo:

    $ grunt api

O grunt irá fazer o build e ativar um watcher. Assim, qdo você alterar qualquer arquivo debaixo do watcher, o build irá atualizar a parte do tipo do arquivo.

Todo o conteúdo do site a ser servido por um webserver estará na pasta `www`

## Abrindo em um browser

O NodeJS te oferece a possibilidade de rodar o App em um WebServer e assim te permitir abrir o App em um browser. Não faça isso! Vai por mim, quanto menos NodeJS vc usar, melhor! hehehe!

Para abrir seu App de uma maneira profissional, que é a maneira como vc deve fazer em um ambiente de produção, configure o NGINX. É simples, é de graça e extremamente poderoso. A configuração para o seu NGINX servir o App é: 

    server {
            listen 80;
            server_name local-base.inceres.com.br;
    
            root /<caminho>/base-app/www;
            index index.html;
    
            location / {
            }    
    
    }
    
