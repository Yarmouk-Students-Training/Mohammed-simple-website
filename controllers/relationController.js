const { relation } = require('../models');
const { Op } = require('sequelize');

const All_relations = async(req,res)=>{
    try {
        const Relations  = await relation.findAll();
        return res.json(Relations);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const Add_relation = async(req,res)=>{
    try {
        const { userOneUserId , user_two , relation_type } = req.body;
        const Relation = await relation.create( { userOneUserId, user_two, relation_type } );
        const ret = Relation;
        return res.json(ret);
    } catch( err ) {
        console.log(err);
        return res.status(500).send("Couldn't create relationship");
    }
}

const User_relations = async(req,res)=>{
    try {
        const  { userOneUserId } = req.body;
        const Relations = await relation.findAll({
            where : {
                [Op.or] : [
                    { userOneUserId },
                    { user_two: userOneUserId },
                ]
            }
        });
        res.json(Relations);
    } catch (err) {
        console.log(err);
        return res.send("Couldn't get relations");
    }
}

const Update_relation = async(req,res)=>{
    try {
        const { userOneUserId, user_two, relation_type } = req.body;
        const Result = await relation.update({ relation_type }, {
                where: {
                    userOneUserId, user_two
                }
        });
        if ( Result )
            return res.status(200).send("Relation updated successfuly.");
        else
            return res.status(200).send("Couldn't Update");
    } catch( err ) {
        console.log(err);
        return res.status(500).send("Couldn't update");
    }
}

module.exports = {
    All_relations,
    Add_relation,
    User_relations,
    Update_relation
}