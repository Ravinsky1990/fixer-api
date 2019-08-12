const sgMail = require('@sendgrid/mail');
const nunjucks = require('nunjucks');

nunjucks.configure('src/email-templates', { autoescape: true });


module.exports = (to, from, context) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const html = nunjucks.render('welcome.html', context)

const msg = {
  to,
  from,
  subject: 'my-Fixer',
  html
};

sgMail.send(msg);
};


