import mongoose, {Schema} from "mongoose";

const projectSchema = new Schema({
    projectTitle: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: true,
    },
    technologiesUsed: [String],
    url: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true})

export const Project = mongoose.model('Project', projectSchema)