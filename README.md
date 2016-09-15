# Comunidade Devitz

![Devitz](https://raw.githubusercontent.com/devitz/devitz-portal/master/app/images/logo_300x79.png)

Esse é o repositório do website da comunidade Devitz.

### Instalação de ambiente de desenvolvimento

```sh
$ git clone git@github.com:devitz/devitz-portal.git
$ cd devitz-portal
$ npm install
$ bower install
$ gulp serve
```

### Deploy
Após mudanças:
```sh
$ gulp build
$ git add path/para/novos/arquivos
$ git commit -am "Git message"
$ sh deploy.sh
```

Para fazer deploy é necessário permissão, solicitar com administrador da conta do Heroku.

### Colaboradores

- [hersonls](https://github.com/hersonls)
