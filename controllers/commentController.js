const { comment } = require("../models");


const Add_Comment = async (req,res) => {
    try {
        const { user_id , post_id , content } = req.body;
        const Comment = await comment.create( { user_id, post_id, content } );
        return res.json(Comment);
    } catch (err) {
        const ret = "Couldn't Create comment";
        console.log(err);
        return res.status(500).send(ret);
    }
}

const Remove_Comment = async (req,res) => {
    try {
        const { comment_id } = req.body;
        const Result = await comment.destroy( {
            where : {
                comment_id
            }
        });
        if ( Result )
            return res.send("Comment Deleted Successfuly.");
        else
            return res.status(200).send("Couldn't remove comment");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Couldn't remove comment");
    }
}

const Post_Comments = async (req,res) => {
    try {
        const { post_id } = req.body;
        const Comments = await comment.findAll( {
            where : {
                post_id
            }
        });
        return res.json(Comments);
    } catch (err) {
        console.log(err);
        const ret = "Couldnt Find Post Comments";
        return res.status(500).send(ret);
    }
}

const Update_Comment = async (req,res)=>{
    try {
        const { comment_id, content } = req.body;
        const Result = await comment.update(
            { content },{
                where : { comment_id }
            });
        if ( Result ) 
            return res.send("Comment Updated Successfuly.");
        else
            return res.status(200).send("Couldn't Update Comment.");
            
    } catch (err) {
        console.log(err);
        return res.status(500).send("Couldn't Update Comment.");
    }
}

module.exports = {
    Add_Comment,
    Remove_Comment,
    Post_Comments,
    Update_Comment
}