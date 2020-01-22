const express = require('express');
const routerGift = express.Router();

// este controlador tiene todas las funciones que hemos creados en el GIFT.controller
const giftController = require('../controllers/gift.controller');

// todas las rutas que solo tienen / apuntan a api/gifts --!!
routerGift.get('/', giftController.getGifts);
routerGift.get('/:id', giftController.getGift);
routerGift.put('/:id', giftController.editGift);
routerGift.delete('/:id', giftController.deleteGift);
routerGift.post('/', giftController.createGift);

module.exports = routerGift;