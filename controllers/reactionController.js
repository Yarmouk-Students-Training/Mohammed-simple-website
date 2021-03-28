const { reaction } = require('../models');

const Add_reaction = async(req,res)=>{
    try {
        const { user_id , post_id , reaction_type } = req.body;
        const Reaction = await reaction.create( { user_id, post_id, reaction_type } );
        return res.json(Reaction);
    } catch (err) {
        const ret = "Couldn't Create reaction";
        console.log(err);
        return res.status(500).send(ret);
    }
}

const Post_reactions = async(req,res)=>{
    try {
        const { post_id } = req.body;
        const Reactions = await reaction.findAll({
            where : {
                post_id
            }
        });
        if( Reactions.length != 0)
            return res.json(Reactions);
        else
            return res.status(200).send("Couldn't find any reactions");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Couldn't find post");
    }
}

const Remove_reaction = async(req,res)=>{
    try {
        const { reaction_id } = req.body;
        const result = await reaction.destroy({
            where : {
                reaction_id
            }
        });
        if (result)
            return res.send("Reaction deleted Successfuly.");
        else
            return res.status(200).send("Couldn't Delete Reaction");
    } catch(err) {
        console.log(err);
        return res.status(500).send("Could'nt delete reaction");
    }
}

const Update_reaction = async(req,res)=>{
    try {
        const { reaction_id, reaction_type } = req.body;
        const Result = await reaction.update(
            { reaction_type },{
            where : {
                reaction_id
            }
        });
        if ( Result )
            return res.send("Reaction Updated Successfuly.");
        else
            return res.status(200).send("Couldn't update reaction");

    } catch(err) {
        console.log(err);
        return res.status(500).send("Couldn't update reaction");
    }
}

module.exports = {
    Add_reaction,
    Post_reactions,
    Remove_reaction,
    Update_reaction
}