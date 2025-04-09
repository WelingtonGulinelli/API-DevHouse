const House = require('../models/House')
const User = require('../models/User')
const Yup = require('yup');

class HouseController {

    async index(req, res) {
        const { status } = req.query;

        const houses = await House.find({ status });
        return res.json(houses)
    }

    async store(req, res) {

        //Usando o Yup para validar o envio dos campos
        const schema= Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required()
        });


        const { filename } = req.file;
        const { description, price, location } = req.body;
        const { user_id } = req.headers;
        const status = req.body.status.trim().toLowerCase() === "true"; // Converte string para Booleano


        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Falha na validacao.' })
        }

        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        });


        return res.json({ house })
    }

    async update(req, res) {
         //Usando o Yup para validar o envio dos campos
         const schema= Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required()
        });



        const { filename } = req.file;
        const { house_id } = req.params;
        const status = req.body.status.trim().toLowerCase() === "true"; // Converte string para Booleano
        const { description, price, location } = req.body;

        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const houses = await House.findById(house_id)

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Falha na validacao.' })
        }

        if (String(user_id) !== String(houses.user)) {
            return res.status(401).json({ error: 'Usuario Nao autorizado' })
        }

        await House.updateOne({ _id: house_id },
            {
                user: user_id,
                thumbnail: filename,
                description,
                price,
                location,
                status
            }
        )
        // return res.json(houses); 
        return res.send();
    }

    async destroy(req, res) {
        const { house_id } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const houses = await House.findById(house_id)

        if (String(user_id) !== String(houses.user)) {
            return res.status(401).json({ error: 'Usuario Nao autorizado' })
        }

        await House.findByIdAndDelete({ _id: house_id })

        return res.json({ message: "Deletada com sucesso" })
    }
}

module.exports = new HouseController();