from node

env mongo_db_username=admin
env mongo_db_pass=qwerty

run mkdir -p /docker-testapp-main   

copy . /docker-testapp-main

cmd ["node", "/docker-testapp-main/server.js"]