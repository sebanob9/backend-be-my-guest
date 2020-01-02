// solicitamos el modelo de datos
const Guest = require('../models/guest');

// se coloca como un objeto
const guestControler = {};

guestControler.getGuests = async (req, res) => {
    const guests = await Guest.find();
// consulta la BD, y cuando termine (va a tardar un rato) guarda los invotados en la const guests
    res.json(guests);
// se envian los resultados al navegador
};

guestControler.createGuest= async(req,res) => {
    const guest = new Guest(req.body);
    await guest.save();
    // con el save se guarda en la BD
    res.json({
        status: 'Asistencia confirmada'});
};

guestControler.getGuest= async (req,res) => {
    const guest = await Guest.findById(req.params.id); 
    res.json(guest);
}

guestControler.editGuest= async (req,res) => {
    const { id } = req.params; // otra forma de obtener el id distinta a la de getGuest
    const guest = {
        name: req.body.name,
        friendFrom: req.body.friendFrom,
        withCompanion: req.body.withCompanion,
        category: req.body.category,
        phone: req.body.phone,
        allergies: req.body.allergies
    }   // definimos el objeto que queremos actualizar
    await Guest.findByIdAndUpdate(id, {$set: guest},{new:true}); // new le dice que si llega un nuevo dato que no existe, tiene que crearlo 
    res.json({
        status:'Invitado actualizado'
    });
}

guestControler.deleteGuest= async (req,res) => {
    const guest = await Guest.findByIdAndRemove(req.params.id);
    res.json({status: 'Invitado eliminado'});
}


module.exports = guestControler;

// al crearlo como objeto y exportarlo, podemos agregarle distintos metodos..(ejemplo objeter invitado )