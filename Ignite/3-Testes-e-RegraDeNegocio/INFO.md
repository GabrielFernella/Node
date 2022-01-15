# Pacotes
1. yarn tsc
2. yarn add multer && yarn add @types/multer -D
3. yarn add csv-parse
4. yarn add swagger-ui-express && yarn add @types/swagger-ui-express -D
5. yarn add typeorm reflect-metadata (biblioteca necessário para ler as querys do banco)
6. yarn add pg (driver do banco de dados)
7. yarn add tsyringe
8. yarn add bcrypt && yarn add @types/bcrypt -D
9. yarn add jsonwebtoken && yarn add @types/jsonwebtoken -D
10. yarn add express-async-errors (tratativa de erros para o express)
11. yarn add jest @types/jest -D
12. yarn add ts-jest -D
  

# Commands
1. docker build -t rentx .            (montar a imagem)
2. docker run -p 3333:3333 rentx      (iniciar a imagem)
3. docker exec -it ID_CONTAINER_ou_NOME /bin/bash   (Acessar remotamente o container na pasta do app)
4. docker-compose up (subir o docker compose junto com a iamgem do dockerfile)
5. docker logs rentx -f (para abrir o log do container)
6. docker ps -a (lista dodos os containers)
7. docker rm ID_CONTAINER (remove o container escolhido)
8. docker-compose down (remove tudo que foi criado no serviço)
9. docker-compose up (Monta tudo com base no arquivo)
10. docker-compose start/stop (para iniciar e parar)
11. docker-compose up --force-recreate (para recriar o container)
12. docker exec rentx cat /etc/hosts (Mostrar o endereço ip do container)

# Commands 2
1. yarn typeorm migration:create -n CreateCategories (Cria uma template para vc criar um usuário no banco)
2. yarn typeorm migration:run (processar as migrations)
3. yarn typeorm migration:revert (desfaz a ultima migration)

# Jest
√ Would you like to use Jest when running "test" script in "package.json"? ... yes
√ Would you like to use Typescript for the configuration file? ... yes
√ Choose the test environment that will be used for testing » node
√ Do you want Jest to add coverage reports? ... no
√ Which provider should be used to instrument code for coverage? » v8
√ Automatically clear mock calls, instances and results before every test? ... yes
    
# Commands 3
