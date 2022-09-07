# Projeto Integrado - Relatório Técnico - Sistema de Gestão de Condomínios

Projeto desenvolvido como trabalho de conclusão do curso de Arquitetura de Software Distribuído, PUC Minas.

## Usuário Padrão para teste do sistema

Foi criado um usuário padrão para acesso ao sistema com privilegios de administrador, segue abaixo as credenciais de acesso:
  "email" : "teste@gmail.com",
  "password" : "Pa$$w0rd"
## Como iniciar esse projeto localmente.

Para iniciar o projeto em mode de desenvolvimento, primeiramente é necessario ter o Docker instalado em seu computador. 
Segue o link da documentação para instalação em sua máquina https://www.docker.com/ 

Após ter instalado o Docker, é necessário realizar o clone deste projeto.
Realizado o clone do projeto basta entrar na pasta e digitar o comando abaixo:

```bash
docker compose up --build -d
```

Esse comando irá levantar um container com o banco de dados e as Apis e ferramentas desenvolvida neste projeto para acesso localmente.

Com o container iniciado as seguintes url's serão disponibilizadas:
* http://localhost:49166 - API BFF
* http://localhost:49160 - API Users
* http://localhost:49162 - API Condominium
* http://localhost:49164 - API Account
* http://localhost:49168 - Frontend
* http://localhost:8080 - Acesso ao banco de dados via phpMyAdmin

## Como acessar as APIs disponibilizadas na Web

O sistema foi disponibilizado para acesso direto via web sem a necessidade de rodar o projeto localmente.

Para acessar basta entrar na seguinte url https://condogest.herokuapp.com/#/

Obs: O primeiro acesso pode demorar um pouco pois as Apis possuem um sistema de sleep, que faz as APIs adormecerem quando não estão sendo utilizadas para economia de recursos. 