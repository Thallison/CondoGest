docker build -f DockerfileHeroku .

heroku login

heroku apps:create condogest-accounts

heroku container:login

heroku container:push web -a condogest-accounts

heroku container:release web -a condogest-accounts

heroku logs --tail -a condogest-accounts