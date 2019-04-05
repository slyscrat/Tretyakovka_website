# Tretyakovka (R) Version 1.0     / 07.04.2018

This is a web site for Tretyakovskaya Galery

## Built With

* [Node.js](http://nodejs.org) - Run-time environment - *version 6.x*
* [PostgreSQL](https://www.postgresql.org/) - Database - *version 9.5*
* [RabbitMQ](https://www.rabbitmq.com/download.html) - Server to provide mail querying - *version 3.7.4*

## Deploying

### Installing

Download this project and install **built with** soft.

Change path to project directory and run next commands:

```
npm install express
npm install sequelize 
npm install pg@6.4.1 
npm install passport
npm install passport-local
npm install body-parser	
npm install express-session 
npm install bcrypt-nodejs
npm install express-handlebars 
npm install dotenv
npm install react
npm install react-dom
npm install nodemailer
npm install amqplib
npm install passport-vkontakte
npm install passport-twitter
```
Change database connection config (*app/config/config.json* ):

```
...
"username": "[your_username]",
"password": "[your_password]",
"database": "[your_database_name]",
"host": "localhost", 		// if you work locally
"port": "5432", 		// by default in PostgreSQL
...
```
Change email sender config (*app/config/passport/sender.js* ):

```
...
service: [your_service_name], // i was used 'gmail'
auth: {
user: "[your_username]",
pass: "[your_password]"
}
...
```  
### Running

To run your application enter next command in project path:

```
npm start
```
If everything fine you will see node message:

```
Site is alive!
```
and  database message:

```
Nice!
```
in command line.

## Authors

* **Butyshkis Ilya** - *Back-end and documentation work* - [GitHub account](https://github.com/slyscrat)
* **Ershov Roman** - *Front-end work*
    
## License

@ 2018 Butyshkis Ilya and Ershov Roman. All rights reserved