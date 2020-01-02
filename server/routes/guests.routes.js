const express = require('express');
const router = express.Router();

// este controlador tiene todas las funciones que hemos creados en el guest.controller
const guestControler = require('../controllers/guest.controller');

// al llamar al controlador, me ofrece los distintos metodos disponibles en este controlador
router.get('/', guestControler.getGuests);
router.post('/', guestControler.createGuest);
// datos de un solo usuario
router.get('/:id', guestControler.getGuest);
router.put('/:id', guestControler.editGuest);
router.delete('/:id', guestControler.deleteGuest);

module.exports = router;