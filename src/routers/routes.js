const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer')
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass }
})

routes.get('/' , (req, res) => {
    res.json({msg: "teste"})
})

routes.post('/sendCurriculo', multer(multerConfig).single('file'), async (req, res) => {
    try {
        await transport.sendMail({
            from: user,
            to: user,
            subject: 'G&T Controller - Trabalhe Conosco',
            text: 'Curriculo referente a vaga front-end!',
            attachments: [
                { filename: "curriculo.pdf", path: path.resolve(__dirname, '..', '..', 'tmp', 'uploads', `${req.file.filename}`)}
            ]
        })

        fs.unlinkSync(req.file.path);
        res.json({msg: "Deu bom"});
    } catch(error) {
        res.json({ msg: error.code });
    }   
})

module.exports = routes;