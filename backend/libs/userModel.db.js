import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    budget: {       // can be updated
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true,
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    spending: {
        type: Number,
        default: 0
    },
    expenses: [{
        amount: {
            type: Number
        },
        category: {
            type: String
        }
    }]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;