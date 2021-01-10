const {
    History,
    Song,
    User
} = require('../models')
const _ = require('lodash')

module.exports = {
    async index(req, res) {
        try { // to tracking the error you must dissable try catch first to know the exact error
            const userId = req.user.id
            // console.log(userId);
            const histories = await History.findAll({
                where: {
                    UserId: userId
                },
                include: [
                    {
                        model: Song
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            })
                .map(history => history.toJSON())
                .map(history => _.extend(
                    {},
                    history.Song,
                    history
                ))
            // console.log('histories', histories);
            res.send(_.uniqBy(histories, history => history.SongId) /* || {} */)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the bookmarks'
            })
        }
    },

    async post(req, res) {
        try { // to tracking the error you must dissable try catch first to know the exact error
            const userId = req.user.id
            const {songId} = req.body
            const history = await History.create({
                SongId: songId,
                UserId: userId
            })
            
            res.send(history /* || {} */)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to create the history object'
            })
        }
    }
}