import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
        },
        content: {
            type: String,
            required: [true, "content is required"],
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        image: {
            url: String,
            public_id: String,
        },
        likes: [{ 
            type: Schema.Types.ObjectId, 
            ref: "User" 
        }],
        comments: [
            {
                text: String,
                created: { type: Date, default: Date.now },
                postedBy: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model('Post', postSchema);
