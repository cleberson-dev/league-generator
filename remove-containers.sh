docker-compose down

docker rm -f league-generator_application_1
docker rm -f league-generator_database_1
docker rm -f league-generator_server_1

docker-compose build --force-rm