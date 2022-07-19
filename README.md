<h1 align="center">
  <img alt="Logo" src="./.github/sorocaps.png">
</h1>

<h3 align="center">
    API for products, customers and sale orders management
</h3>


<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Guribeiro/sorocaps-api?color=003A1F">
  <a href="https://www.linkedin.com/in/gustavohribeiro/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Gustavo%20Henrique-003A1F">
  </a>
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Guribeiro/sorocaps-api?color=003A1F">
  <a href="https://github.com/Guribeiro/softwrap-api/commits">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Guribeiro/sorocaps-api?color=003A1F">
  </a>
  <a href="https://github.com/Guribeiro/softwrap-api/stargazers">
    <img alt="GitHub last commit" src="https://img.shields.io/github/stars/Guribeiro/sorocaps-api?color=003A1F">
  </a>
  <a href="https://github.com/Guribeiro/softwrap-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/Guribeiro/sorocaps-api?color=003A1F">
  </a>
  <img alt="GitHub" src="https://img.shields.io/github/license/Guribeiro/sorocaps-api?color=003A1F">
</p>

<p align="center">
  <a href="#%EF%B8%8F-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## ⚡ About the project

this api provides everything you need to manage your customers and the administrator's authentication flow

the administrator can manage his clients in any way he prefers

Administrator can see all their customers, manage them, also see more information sale orders and products

## 🚀 Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Tsyringe](https://github.com/microsoft/tsyringe)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [BCrypt](https://github.com/kelektiv/node.bcrypt.js)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [Date-fns](https://date-fns.org/)
- [EditorConfig](https://editorconfig.org/)

## 💻 Getting started

Import the `sorocaps.insomnia.json` on Insomnia App.

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- One instance of [PostgreSQL](https://www.postgresql.org/)

> Obs.: I recommend you to use docker

**Clone the project and access the folder**

```bash
$ git clone git@github.com:Guribeiro/softwrap-api.git && cd softwrap-api
```

**Follow the steps below**

### Install the dependencies
```bash
yarn
```

### Make a copy of '.env.example' to '.env'
### and set with YOUR environment variables.
```bash
cp .env.example .env
```

### Make a copy of 'ormconfig.example.json' to 'ormconfig.json'
### and set with YOUR environment variables.
```bash
cp ormconfig.example.json ormconfig.json
```


### On the project root run:
```bash
docker-compose up
```

### Once **sorocaps** and **database_sorocaps** containers have been created, let's remove any unwanted columns

```bash
yarn typeorm schema:drop
```

### Once the services are running, run the migrations

```bash
yarn typeorm migrations:run
```

### Well done, project is started!

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💜 &nbsp;by Gustavo Henrique 👋 &nbsp;[See my linkedin](https://www.linkedin.com/in/gustavohribeiro/)
