const transport = require('../src/config/nodemailerConfig');
const path = require('path');
const fs = require('fs');

const user = process.env.EMAIL_USER;

class UserService {
    static async sendEmail(req, res) {
        const { nome, email, mensagem } = req.body;
        try {
            await transport.sendMail({
                from: user,
                to: "contato@gtcontroller.com.br",
                replyTo: `${email}`,
                subject: `${nome} - Formulário de Contato`,
                text: `${mensagem}`,
            })         
            res.status(200).json({ sucess: true });
        } 
        catch(error) {
            res.json({ msg: error.code });
        }
    }

    static async sendCurriculo(req, res) {

        try {
            await transport.sendMail({
                from: user,
                to: user,
                subject: 'G&T Controller - Trabalhe Conosco',
                text: 'Curriculo referente a vaga front-end!',
                attachments: [
                    { filename: "curriculo.pdf", path: path.resolve(__dirname, '..', 'tmp', 'uploads', `${req.file.filename}`)}
                ]
            })
            
            fs.unlinkSync(req.file.path);
            res.status(200).json({ sucess: true });
        } catch(error) {
            res.json({ msg: error.code });
        }  
    }
}

module.exports = UserService;