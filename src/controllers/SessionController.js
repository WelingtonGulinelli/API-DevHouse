//metodos dentro de um controller: index, show, update, store, destroy
//index: listagem de sessoes
//store: criar uma sessao
// show: quando queremos alterar alguma sessao
//destroy : quando queremos deletar uma sessao

const User =  require('../models/User')
const Yup = require('yup');


class SessionController{
    async index(req, res) {
        const users = await User.find(); // Busca todos os usuários no banco de dados
        return res.json(users); // Retorna os usuários como resposta JSON
            
        }

    async store(req, res){
        const schema = Yup.object().shape({
            email: Yup.string().email().required()
        }); 

        const {email} = req.body;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Falha na validacao.' })
        }
        
        //Verifica se o usuário ja existe
        let user = await User.findOne({email});
        if(!user){
            User.create({email});
        }

        return res.json(user)
    }
}

module.exports = new SessionController();