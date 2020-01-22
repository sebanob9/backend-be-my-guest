// LOS CONTROLADORES DEFINEN LOS METODOS QUE SE USAN EN LAS RUTAS 

// solicitamos el modelo de datos
const Guest = require('../models/guest');

// se coloca como un objeto, para luego meterle MÉTODOS
const guestControler = {};

// usamos await ya que va a tardar, asi que cuando acabe guarda en la const guests 
guestControler.getGuests = async (req, res) => {
    const guests = await Guest.find(); // Guest es la coleccion de invitados en BD. lo creamos nosotros al guardar
// consulta la BD, y cuando termine (va a tardar un rato) guarda los invotados en la const guests. !!!!!!!!!!!
    res.json(guests);
// se envian los resultados al navegador
};

// los datos se envían desde el req --> a través de req.body
guestControler.createGuest = async(req,res) => {
    const guest = new Guest(req.body);
    await guest.save(); // con el save se guarda en la BD
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
    }   // definimos el objeto que queremos actualizar. Creamos guest con todos los datos que llegan del body, y lo enviamos mediante SET
    await Guest.findByIdAndUpdate(id, {$set: guest},{new:true}); // new le dice que si llega un nuevo dato que no existe, tiene que crearlo 
    res.json({
        status:'Invitado actualizado'
    });
} // SET!! para establecer los nuevos datos, una vez que le hemos dado el ID. 
//  los datos que se actualizan se mandan desde req.body

guestControler.deleteGuest= async (req,res) => {
    const guest = await Guest.findByIdAndRemove(req.params.id);
    res.json({status: 'Invitado eliminado'});
}


module.exports = guestControler;

// al crearlo como objeto y exportarlo, podemos agregarle distintos metodos..(ejemplo objeter invitado )