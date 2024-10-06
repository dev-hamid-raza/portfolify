import mongoose, {Schema} from "mongoose";

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    description: {
        type: String
    },
    skills: [
        {type:String}
    ]
})

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
        projectSchema
    ],
    isPublic: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

export const Portfolio = mongoose.model('Portfolio', portfolioSchema)