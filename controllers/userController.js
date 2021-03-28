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

const Specific_User = async(req,res)=>{ // Specific User
    try{
        const { user_id } = req.body;
        const User = await user.findOne({user_id});
        return res.json(User);
    } catch(err){
        const ret = "Couldn't find user";
        console.log(err);
        return res.status(500).send(ret);
    }
}

const Delete_User = async(req,res)=>{ // Delete Specific User
    try {
        const { user_id } = req.body;
        const result = await user.destroy({
            where: { user_id }
        });
        if(result)
            return res.send("Account Deleted Successfuly.");
        else 
            return res.status(500).send("Couldn't Find Account.");
    } catch ( err ) {
        console.log(err);
        return res.status(500).send("Couldn't Find User.");
    }
}

const Update_User = async(req,res)=>{ // Update Specific User
    try {
        const { user_id, password, profile_pic, first_name, last_name } = req.body;

        const result = await user.update(
            { password, profile_pic, first_name, last_name },
            { where: { user_id } }
        );
        if(result)
            return res.send("Account Updated Successfuly.")
        else
            return res.status(500).send("Couldn't Edit User.");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Couldn't Edit User.");
    }
}

module.exports =  {
    All_Users,
    Specific_User,
    Update_User,
    Delete_User
}
