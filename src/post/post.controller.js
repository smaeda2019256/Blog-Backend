import cloudinary from "../helpers/cloudinary.js";
import Post from "./post.model.js";
import ErrorResponse from "../helpers/errorResponse.js";

//Crear Post
export const createPost = async (req, res, next) => {
    const { title, content, postedBy, image, likes, comments } = req.body;

    try {
        // Subir imagen a Cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: "posts",
            width: 1200,
            crop: "scale"
        });
        const post = await Post.create({
            title,
            content,
            postedBy: req.user._id,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },
        });
        res.status(201).json({
            success: true,
            post
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//Mostrar Posts
export const showPost = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('postedBy', 'name');
        res.status(200).json({
            success: true,
            posts
        });
    } catch (error) {
        next(error);
    }
};

//Mostrar Post Individual
export const showSinglePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments.postedBy', 'name');
        res.status(200).json({
            success: true,
            post
        });
    } catch (error) {
        next(error);
    }
};

//Eliminar Post
export const deletePost = async (req, res, next) => {
    const currentPost = await Post.findById(req.params.id);

    // Eliminar imagen del post en Cloudinary
    const ImgId = currentPost.image.public_id;
    if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
    }

    try {
        const post = await Post.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "Post Deleted"
        });
    } catch (error) {
        next(error);
    }
};