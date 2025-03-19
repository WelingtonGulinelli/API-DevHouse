const Reserve = require('../models/Reserve')
const User = require('../models/User')
const House = require('../models/House')

class ReserveController {
    
    //Listagem de reservas
    async index(req, res) {
        const { user_id } = req.headers;
        
        const reserves = await Reserve.find({ user: user_id }).populate(['house']);
        
        return res.json(reserves)
        
    }

    //Cria reserva
    async store(req, res) {
        const { user_id } = req.headers;
        const { house_id } = req.params;
        const { date } = req.body;


        //Verifica se a casa existe
        const house = await House.findById(house_id)
        if(!house){
            return res.status(400).json({error: 'Essa casa nao existe'})
        }


        //Verifica se a casa esta disponivel
        if (house.status !== true) {
            return res.status(400).json({ error: "Solicitacao indisponivel, casa já alugada" })
        }

        //Condicao para nao deixar o dono da casa alugar ela propria
        const user = await User.findById(user_id);
        if (String(user._id) === String(house.user)) {
            return res.status(401).json({ error: "Reserva nao permitida para este usuário." })
        }

        //cria a reserva
        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date
        });

        //para retornar dados do usuário e da casa também
        await reserve.populate(['house', 'user']);


        return res.json(reserve)
    }

    async destroy(req, res) {
            const { reserve_id } = req.body;
    
            await Reserve.findByIdAndDelete({ _id: reserve_id })
    
            return res.json({ message: `Deletada com sucesso, casa de id ${reserve_id}`  })
        }
}

module.exports = new ReserveController();