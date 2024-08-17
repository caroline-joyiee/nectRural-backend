import { comment_Model } from "../models/comment.js";
import { like_Model } from "../models/likes.js";
import { repost_Model } from "../models/repost.js";
import { share_Model } from "../models/share.js";
import { commentSchema } from "../schema/comment.js";
import { likeSchema } from "../schema/like.js";
import { repostSchema } from "../schema/repost.js";
import { shareSchema } from "../schema/share.js";



export const likeContent = async (req, res) => {
    try {
        const { error, value } = likeSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);

        }


          const {userId} = req.params;

        
        // const { userId } = value;

        const like = new like_Model({ userId });
        await like.save();

        res.status(201).json({ message: "Content liked sucessfully." })

        // const unlike = new like_Model({ userId });
        // await unlike.save();

        // if(userUnlike){
        //     return res.status(200).json({ message: "Content unliked successfully" })
        // }


    } catch (error) {
        res.status(500).json({ error: 'Failed to like content' })
    }
}

//comment
export const commentContent = async (req, res) => {
    try {
        const { error, value } = commentSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);

        }


        const { comment } = req.body;
        // const { contentId } = req.params;

        // Log incoming request data for debugging
        console.log('Request Body:', req.body);
        // console.log('Content ID:', contentId);

        const newComment = comment_Model.create({ comment });
        // await comment_Model.save();

        res.status(201).json({ message: 'Comment added successfully.', commentId: newComment._id });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment.' });
    }

}

//share content

export const shareContent = async (req, res) => {
    try {
        const { error, value } = shareSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message);

        }
        const { platform, message } = req.body;
        const { contentId } = req.params;

        const share = new share_Model({ content: contentId, platform, message })
        await share.save();

        res.status(201).json({ message: "Contend Shared Successfully", contentId: req.params })
    } catch (error) {

        res.status(500).json({ error: 'Failed to share content' })
    }
}

export const repostContent = async (req, res) => {
    try {
        const { error, value } = repostSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);

        }

        const { message } = req.body;
        //  const { contentId } = req.params;

        const repost = new repost_Model({ content: message, content: req.params });

        await repost.save();

        res.status(201).json({ message: 'Content reposted successfully' });
    } catch (error) {

        res.status(500).json({ error: 'Failed to repost content.' });
    }
}

export const getContentInteraction = async (req, res) => {
    try {
        const { contentId } = req.params;
        const { comment } = req.body;
        const { message } = req.body;

        const { platform } = req.body;



        const comments = await comment_Model.find({ content: comment });
        const likes = await like_Model.countDocuments({ content: contentId });
        const shares = await share_Model.countDocuments({ content: contentId, platform, message});
        const reposts = await repost_Model.countDocuments({ content: message });

        res.status(200).json({
            comments,
            likes,
            shares,
            reposts
        });

    } catch (error) {
        res.status(500).json({ error: 'Failed to get content interactions.' });

    }
}