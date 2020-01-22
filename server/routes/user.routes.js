const express = require('express');

const routerUser = express.Router();


//------- Modelo -------
const User = require('../models/user');

//----- JasonWebToken ----
const jwt = require('jsonwebtoken');

routerUser.get('/', (req, res) => res.send('Hello World'))

// ---- SIGN UP ----
// primero guardamos el usuario en la BD
routerUser.post('/', async (req, res) => { // he QUITADO EL REGISTER Y LO DEJE VACIO PARA PROBAR
    const { email, password, phone, date, eventPlace, bride, groom, otherEvent } = req.body; // se guarda en una cosntante los datos que queremos, en caso de no querer todo el objeto que llega del req.body
    const newUser = new User({ email: email, password: password, phone: phone, date:date, eventPlace:eventPlace, bride: bride, groom: groom, otherEvent: otherEvent});
    await newUser.save();
    // una vez guardado el usuario, creo un token
    const token = jwt.sign({ _id: newUser._id }, 'secretKey') // en una nueva propiedad _id, guardo de new user su propiedad _id -- palabra secreta para el _id
    //devuelvo el token al cliente
    res.status(200).json({ token })
})

// ----- SIGN IN -----
routerUser.post('/login', async (req, res) => {
    const { email, password } = req.body; // envia estos datos que se van a valirad desde el backend
    const user = await User.findOne({ email }) // busca si el correo se encuentra en la BD
    if (!user) return res.status(401).send('El correo no está en la Base de Datos');
    if (user.password !== password) return res.status(401).send('Contraseña incorrecta');
    const token = jwt.sign({ _id: user._id }, 'secretKey')// se le puede devolver un token cuando ha pasado los filtros anteriores
    res.status(200).json({ token, user }); // se devuelve este token al usuario cuando lo obtiene
});


//
routerUser.get('/:id', async(req, res) => {
    let user = await User.findById(req.params.id).exec();
    res.send(user);
})

/* routerUser.put('/:id', async(req, res) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body).exec();
    console.log(req.body);
    res.send(user);
}) */

routerUser.put('/:id', async(req, res) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body).exec();
    //.log(req.body);
    res.send(user);
})




// funcion para verificar en cara ruta si hay token o no. se pasa en cada ruta, es una ruta en si
function verifyToken(req, res, next) {
    if(!req.headers.authorization) { // si no tienes cabecera no puedes obtener los datos de la ruta que quieres visitar
        return res.status(401).send('Peticion sin autorización');
    }
    const token = req.headers.authorization.split(' ')[1] // separamos el headers en el espacio para coger el token y no la palabra Bearer(bearer = 0, token =1)
    if (token === 'null') { // comprobamos si el token está vacío
        return res.status(401).send('Peticion sin autorización');
        }
// si hemos comprobado que hay cabecera y no está vacia, extraemos payload
    const payload = jwt.verify(token, 'secretKey') // llave para obtener los datos de dentro del token. es la decodificacion del token
        console.log(payload);
    req.userId = payload._id // guardamos el dato para que el resto de funciones puedan utilizarlo
    next();
}



module.exports = routerUser;
/* Pasos:
Revisamos si existe cabecera autorizacion
Revisamos que el token no está vacio
si no esta vacio, extraemos los datos y lo guardamos en userId. */

//-- EJEMPLO ruta publica --
routerUser.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'Primera tarea del total'
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'Segunda tarea del total'
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'Tercera tarea del total'
        }
    ])
}); 

//-- EJEMPLO ruta PRIVADA --

routerUser.get('/private-tasks', verifyToken, (req,res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one private',
            description: 'Primera tarea del total'
        },
        {
            _id: 2,
            name: 'Task two private',
            description: 'Segunda tarea del total'
        },
        {
            _id: 3,
            name: 'Task three private',
            description: 'Tercera tarea del total'
        }
    ])
});
    