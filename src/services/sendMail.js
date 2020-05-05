import nodemailer from 'nodemailer'

export default async function sendMail( message, subject, to, transporter ){

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', 
    to, 
    subject, 
    text: message, 
    html: "<b>Outdated packages</b>" 
  });

}

async function main(port, host, secure ) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host,
    port,
    secure, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });
  return transporter
}

async function createMailAccount(){
  try{
    return await main(587, "smtp.ethereal.email", false)
  }catch (error){
    console.log(error)
  }
  
}