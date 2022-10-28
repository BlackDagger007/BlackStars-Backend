const {
    createPlayer,
    getPlayers,
    updatePlayer,
    deletePlayer
} = require('../controller/players')

const router = require('express').Router()

router.post('/', createPlayer)
router.get('/', getPlayers)
router.patch('/', updatePlayer)
router.delete('/', deletePlayer)


module.exports = router