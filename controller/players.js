const Player = require('../models/Player')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')

//create player
const createPlayer = async (req, res) => {
    //Fetch userID
    req.body.createdBy = req.user.userID

    //Check if jersey number already exists
    const { number } = req.body
    let player = await Player.findOne({ number })
    if (!player) {
        player = await Player.create({ ...req.body })
    } else {
        throw new BadRequestError('Player number already taken')
    }

    res.status(StatusCodes.CREATED).json({ msg: 'Player created successfully' })


}

//get players
const getPlayers = async (req, res) => {
    const { userID } = req.user
    const players = await Player.find({ createdBy: userID })

    res.status(StatusCodes.OK).json({ players })
}

//patch player
const updatePlayer = async (req, res) => {
    const { userID } = req.user
    const id = mongoose.Types.ObjectId(req.body.playerID)
    const player = await Player.findByIdAndUpdate({ _id: id, createdBy: userID }, { ...req.body })

    res.status(StatusCodes.OK).json({ msg: 'Player updated' })
}

//delete player
const deletePlayer = async (req, res) => {
    const { userID } = req.user
    const id = mongoose.Types.ObjectId(req.body.playerID)
    const player = await Player.findByIdAndDelete({ _id: id, createdBy: userID })

    res.status(StatusCodes.OK).json({ msg: 'Player successfully deleted' })
}


module.exports = {
    createPlayer,
    getPlayers,
    updatePlayer,
    deletePlayer
}