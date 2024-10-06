import mongoose, {Schema} from "mongoose";

const portfolioSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    projects: [
        {
            title: String,
            description: String,
            link: String
        }
    ],
    socialLinks: {
        github: String,
        twitter: String,
        linkedin: String,
        website: String
    },
    isPublic: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

export const Portfolio = mongoose.model('Portfolio', portfolioSchema)