const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide player name'],
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    number: {
        type: Number,
    },
    position: {
        type: String,
        enum: {
            values: ['striker', 'midfielder', 'defender', 'goalkeeper'],
            message: '{VALUE} is not supported'
        },
        required: [true, 'Please provide player position']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide createdBy']
    }
})

module.exports = mongoose.model('Player', PlayerSchema)