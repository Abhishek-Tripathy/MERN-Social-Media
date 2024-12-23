import getDataUrl from "../config/dataUriGenerator.mjs";
import clodinary from "cloudinary";
import { Post } from "../models/PostModel.mjs";

export const newPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const ownerId = req.user._id;

    const file = req.file;
    const fileurl = getDataUrl(file);

    let options;

    const type = req.query.type;
    if (type === "reel") {
      options = {
        resource_type: "video",
      };
    } else {
      options = {};
    }

    const myCloud = await clodinary.v2.uploader.upload(
      fileurl.content,
      options
    );

    const post = await Post.create({
      caption,
      post: {
        id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: ownerId,
      type,
    });

    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json({ message: "No post fond" });

    if (post.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unathorised access" });

    await clodinary.v2.uploader.destroy(post.post.id);

    await post.deleteOne();

    res.json({ message: "Post deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ type: "post" })
      .sort({ createdAt: -1 })
      .populate("owner", "-password")
      .populate({
        path: "comments.user",
        select: "-password",
      });

    const reels = await Post.find({ type: "reel" })
      .sort({ createdAt: -1 })
      .populate("owner", "-password")
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.json({ posts, reels });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "No post " });

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      res.json({ message: "post Unliked" });
    } else {
      post.likes.push(req.user._id);

      await post.save();

      res.json({ message: "post liked" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "No post found" });

    post.comments.push({
      user: req.user._id,
      name: req.user.name,
      comment: req.body.comment,
    });

    await post.save();

    res.status(201).json({ message: "Comment added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "No post found" });

    if (!req.query.commentId)
      return res.status(404).json({message: "Please give comment id"});

    const commentIndex = post.comments.findIndex(
      (item) => item._id.toString() === req.query.commentId.toString()
    );
    
    if (commentIndex === -1) {
      return res.status(400).json({
        message: "Comment not found",
      });
    }

    const comment = post.comments[commentIndex]

    if(post.owner.toString() === req.user._id.toString() || comment.user.toString() === req.user._id.toString()) {
      post.comments.splice(commentIndex, 1)

      await post.save()

      return res.status(201).json({message: "Comment deleted"})
    }else{
      return res.status(400).json({message: "You are not authorised to delete"}) 
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const editPost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);

      if (!post) return res.status(404).json({ message: "No post found" });

      if(post.owner.toString() !== req.user._id.toString()){
         return res.status(403).json({message: "you are not owner of this post"})
      }

      post.caption = req.body.caption

      await post.save()

      res.json({message: "Post updated"})

   } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
   }
}
