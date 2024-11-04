import mongoose, {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    bio: {
        type: String,
        default: ''
    },
    avatar: {
        type: String, // Cloudinary url
        default: ''
    },
    googleId: {
        type: String,
    },
    githubId:{
        type: String
    },
    password: {
        type: String,
        // required: true
    },
    refreshToken: {
        type: String
    },
    portfolio: {
    type: Schema.Types.ObjectId,
    ref: 'Portfolio'
    },
    socialLinks: {
        github: String,
        twitter: String,
        linkedin: String,
        website: String
    },
    skills: [
            String
    ],
    stack: [String],
    hobbies: [String],
    language: {
        type: String
    },
    template: {
        type: String,
        default: 'Delta'
    },
    links: {
        type: String
    },
    resumeTemplate: {
        type: String,
        default: 'Basic'
    }
}, {timestamps: true})

// encrypting the password
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
// checking the password
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model('User', userSchema)