var exports = module.exports = {}

const nodemailer = require('nodemailer');
const amqp = require('amqplib');

exports.getEmail = function(userinfo){
    amqp.connect('amqp://localhost').then(function(conn){
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
  
      var ok = ch.assertQueue('registration', {durable: false});
  
      ok = ok.then(function(_qok) {
        return ch.consume('registration', function(msg) {
          console.log(" [x] Received '%s'", msg.content.toString());
      mailOptions.text = msg.content.toString();
      mailOptions.to = userinfo.email;
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
        }, {noAck: true});
      });
  
      return ok.then(function(_consumeOk) {
        console.log(' [*] Waiting for messages. To exit press CTRL+C');
      });
    });
  }).catch(console.warn);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'someuser@mail',
      pass: 'password'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  var mailOptions = {
    from: 'someuser@mail',
    //to: 'somereceiver@mail',
    subject: 'Registration email'
  };
}