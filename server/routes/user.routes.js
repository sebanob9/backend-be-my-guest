const express = require('express');
const routerUser= express.Router();


//------- Modelo -------
const User = require('../models/user');

//----- JasonWebToken ----
const jwt = require('jsonwebtoken');

routerUser.get('/', (req, res) => res.send('Hello World'))

// ---- SIGN UP ----
// primero guardamos el usuario en la BD
routerUser.post('/register', async (req, res) => {
    const {email, password} = req.body; // se guarda en una cosntante los datos que queremos, en caso de no querer todo el objeto que llega del req.body
    const newUser = new User({email: email, password: password});
    await newUser.save();
    // una vez guardado el usuario, creo un token
    const token = jwt.sign({_id: newUser._id}, 'secretKey' ) // en una nueva propiedad _id, guardo de new user su propiedad _id -- palabra secreta para el _id
    //devuelvo el token al cliente
    res.status(200).json({token})
})

// ----- SIGN IN -----
routerUser.post('/login', async (req, res) => {
    const {email, password} = req.body; // envia estos datos que se van a valirad desde el backend
    const user = await User.findOne({email}) // busca si el correo se encuentra en la BD
    if (!user) return res.status(401).send('El correo no está en la Base de Datos'); 
    if (user.password !== password) return res.status(401).send('Contraseña incorrecta'); 
    const token = jwt.sign({_id: user._id}, 'secretKey' )// se le puede devolver un token cuando ha pasado los filtros anteriores
    res.status(200).json({token}); // se devuelve este token al usuario cuando lo obtiene
});

//-- EJEMPLO ruta publica --

module.exports = routerUser;