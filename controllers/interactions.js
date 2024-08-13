import { comment_Model } from "../models/comment.js";
import { like_Model } from "../models/likes.js";
import { repost_Model } from "../models/repost.js";
import { share_Model } from "../models/share.js";
import { commentSchema } from "../schema/comment.js";
import { likeSchema } from "../schema/like.js";
import { shareSchema } from "../schema/share.js";



export const likeContent = async (req, res) => {
  try {
    const { error, value} = likeSchema.validate(req.body);
    if (error) { 
        return res.status(400).send(error.details[0].message);

    }


    //   const {userId} = req.body;

      const {userId, contentId} = req.params;

      const like = new like_Model({ userId, contentId});
      await like.save();

      res.status(201).json({ message: "Content liked sucessfully."})

      
  } catch (error) {
    res.status(500).json({ error: 'Failed to like content'})
  }
}

//comment
export const commentContent = async(req, res) => {
    try {
        const { error, value} = commentSchema.validate(req.body);
    if (error) { 
        return res.status(400).send(error.details[0].message);

    }


        const { comment } = req.body;
        const { contentId } = req.params;
    
        // Log incoming request data for debugging
        console.log('Request Body:', req.body);
        console.log('Content ID:', contentId);
    
        const newComment = new comment ({ content: contentId, comment });
        await newComment.save();
    
        res.status(201).json({ message: 'Comment added successfully.', commentId: newComment._id });
      } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment.' });
      }

    } 

//share content

export const shareContent = async (req, res) => {
    try {
        const {error, value} = shareSchema.validate(req.body)
        if (error) { 
            return res.status(400).send(error.details[0].message);
    
        }
        const { platform, message } = req.body;
        const { contentId} = req.params;

        const share = new share_Model({ content:contentId, platform, message })
        await share.save();

        res.status(201).json({ message: "Contend Shared Successfully"})
    } catch (error) {
        
        res.status(500).json({ error: 'Failed to share content'})
    }
}

export const repostContent = async (req, res) => {
   try {
     const { error, value} = likeSchema.validate(req.body);
     if (error) { 
         return res.status(400).send(error.details[0].message);
 
     }

     const { message } = req.body;
     const { contentId } = req. params;

     const repost = new repost_Model({ content: contentId, message });

     await repost.save();

     res.status(201).json({ message: 'Content reposted successfully', repostId: repost._id });
       } catch (error) {
      
        res.status(500).json({ error: 'Failed to repost content.' });
  }
   }

export const getContentInteraction =async (req, res) => {
    try {
        const { contentId } = req.params;

        const comments = await comment_Model.find({ contend: contentId});
        const likes = await like_Model.countDocuments({ content: contentId });
        const shares = await share_Model.countDocuments({ content: contentId});
        const reposts = await repost_Model.countDocuments({ content: contentId });

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