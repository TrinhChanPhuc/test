var express = require('express');
var router = express.Router();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'trinhchanphuc123@gmail.com',
      pass: 'hjwg bzyc nkip cdgw'
    }
  });

  router.post("/send-mail", async function(req, res, next){
    try{
      const {to, subject, content} = req.body;
  
      const mailOptions = {
        from: "tridinhne <admin@dinhnt.com>",
        to: to,
        subject: subject,
        html: content
      };
      await transporter.sendMail(mailOptions);
      res.json({ status: 1, message: "Gửi mail thành công"});
    }catch(err){
      res.json({ status: 0, message: "Gửi mail thất bại"});
    }
  });
  
  

module.exports = router;