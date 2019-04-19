import nodemailer from 'nodemailer';

class Mail {
  constructor(to, subject, message) {
    this.to = to;
    this.subject = subject;
    this.message = message;
  }

  async send() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 465,
      secure: true,
      requireTLS: true, 
      tls: {  
          rejectUnauthorized: false
      },
      auth: {
        user: 'janis.koepp@ethereal.email',
        pass: 'c1EZEAWspFUwD7Ysma'
      },
    });

    const msg = await transporter.sendMail({
      from: '"Banka" <banka@mail.com>',
      to: `${this.to}`,
      subject: `${this.subject}`,
      text: `${this.message}`,
    });
  }
}
export default Mail;
