const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer')

const UserService = require('../../services/UserService');

function verifyToken(request, response, next) {
    const { TOKEN } = request.headers;
    if (!TOKEN === process.env.TOKEN) {
      return response.status(401).send();
    }

    return next();
}

routes.post('/send', verifyToken, async (req, res) => {
    return await UserService.sendEmail(req, res);
})

routes.post('/sendCurriculo', verifyToken, multer(multerConfig).single('file'), async (req, res) => {
    return await UserService.sendCurriculo(req, res);  
})

module.exports = routes;