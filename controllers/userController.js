const { user } = require('../models');


const All_Users = async(req,res)=>{ // All Users
    try {
        const Users = await user.findAll();
        return res.json(Users);
    } catch (err) {
        const ret = "Couldn't find any users";
        console.log(err);
        return res.status(500).send(ret);
    }
}

const Specific_User = async(req,res)=>{
    try{
        const ID = req.params.id;
        const User = await user.findOne({user_id:ID});
        return res.json(User);
    } catch(err){
        const ret = "Couldn't find user";
        console.log(err);
        return res.status(500).send(ret);
    }
}

const Delete_User = async(req,res)=>{
    try {
        const user_id = req.params.id;
        const result = await user.destroy({
            where: { user_id }
        });
        return res.json(result);
    } catch ( err ) {
        const ret = "Couldn't find user";
        console.log(err);
        return res.status(500).send(ret);
    }
}

module.exports =  {
    All_Users,
    Specific_User,
    Delete_User
}
