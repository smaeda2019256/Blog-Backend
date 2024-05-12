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