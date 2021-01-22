# About the technologies and tools
Nodejs, Express, MongoDB, TypeScript
# Installed
```bash
$ npm install express body-parser nodemon
$ npm install --save @types/express @types/body-parser @types/mongoose @types/nodemon
$ npm install -D typescript ts-node
$ npm install mongoose@5.10.19
```

# Set the scripts
Inside ‘package.json’ file update main file as follow.
```bash
$ "main": "./dist/server.js",
```
Inside ‘package.json’ file under the scripts add the following scripts.
```bash
"scripts": {
    "test": "ts-node ./src/server.ts",
    "dev": "tsc && nodemon ./src/server.ts",
    "prod": "tsc && nodemon ./src/server.ts"
 },
```
## Run
For the test and dev
```bashd 
$ npm run test / npm run dev
```
For the production
```bash
$ npm run prod
```
# Database
https://docs.mongodb.com/compass/master/install
or 
https://robomongo.org/
#  Test
https://www.postman.com/downloads/
# License
[MIT](https://choosealicense.com/licenses/mit/)
