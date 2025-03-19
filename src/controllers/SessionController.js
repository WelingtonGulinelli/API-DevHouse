//metodos dentro de um controller: index, show, update, store, destroy
//index: listagem de sessoes
//store: criar uma sessao
// show: quando queremos alterar alguma sessao
//destroy : quando queremos deletar uma sessao

const User =  require('../models/User')

class SessionController{
    async store(req, res){
        const {email} = req.body;
        
        //Verifica se o usuário ja existe
        let user = await User.findOne({email});
        if(!user){
            User.create({email});
        }

        return res.json(user)
    }
}

module.exports = new SessionController();