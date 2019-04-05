var exports = module.exports = {}
var amqp = require('amqplib');

//exports.sendEmail = function(userinfo){console.log(userinfo.email);}

exports.sendEmail = function(userinfo){
  console.log(userinfo);
    amqp.connect('amqp://localhost').then(function(conn) {
  return conn.createChannel().then(function(ch) {
    console.log(userinfo);
    var q = 'registration';
    var msg = 'Welcome to tretyakovskaya gallery site, ' + userinfo.name + '! You have succesfully created new account, enjoy it!';

    var ok = ch.assertQueue(q, {durable: false});

    return ok.then(function(_qok) {
      ch.sendToQueue(q, Buffer.from(msg));
      console.log(" [x] Sent '%s'", msg);
      return ch.close();
    });
  }).finally(function() { conn.close(); });
}).catch(console.warn);
}