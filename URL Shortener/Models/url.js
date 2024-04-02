const mongoose = require('mongoose');
const shortID = require('shortid')
const URLschema = new mongoose.Schema({
    shortURL: {
        type: String,
        required: true,
        unique: true,
        default : shortID.generate
    },
    originalURL: {
        type: String,
        required: true,
    },
    totalClicks: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true }
);

const URLModel = mongoose.model('url', URLschema);
module.exports = URLModel;