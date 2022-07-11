const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer')

const UserService = require('../../services/UserService');

routes.post('/send', async (req, res) => {
    return await UserService.sendEmail(req, res);
})

routes.post('/sendCurriculo', multer(multerConfig).single('file'), async (req, res) => {
    return await UserService.sendCurriculo(req, res);  
})

module.exports = routes;