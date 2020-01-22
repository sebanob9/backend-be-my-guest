const Gift = require('../models/gift');

// se coloca como un objeto
const giftController = {};

giftController.getGifts = async (req, res) => {
    const gifts = await Gift.find();
    res.json(gifts);
};

giftController.getGift = async (req, res) => {
    // console.log(req.params.id); // params apunta a la ruta --> id es como lo hemos llamado nosotro al declarar la ruta getGift
    const gift = await Gift.findById(req.params.id); // puedo darselo con { id } como en guests
    res.json(gift);
}

giftController.createGift = async (req, res) => {
    console.log(req.body);
    res.json('Recibido');
    const gift = new Gift(req.body);
    await gift.save();
    console.log(gift);
    res.json({
        status: 'Regalo creado!'
    });
};

giftController.editGift = async (req, res) => {
    const gift = {
        name: req.body.name,
        //guestId: req.body.guestId,
        guestName: req.body.guestName,
        price: req.body.price
    };
    console.log(req.body)
    await Gift.findByIdAndUpdate(req.params.id, { $set: gift }, { new: true });
    res.json({
        status: 'Regalo actualizado!'
    });
}

giftController.deleteGift = async (req, res) => {
    const gift = await Gift.findByIdAndRemove(req.params.id);
    res.json({ status: 'Regalo eliminado'});
}
module.exports = giftController;