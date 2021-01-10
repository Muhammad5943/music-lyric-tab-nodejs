const {
    Bookmark,
    Song
} = require('../models')
const _ = require('lodash')

module.exports = {
    async index(req, res) {
        // try { // to tracking the error you must dissable try catch first to know the exact error
            const userId = req.user.id
            const {songId} = req.query
            const where = {
                UserId: userId
            }
            if (songId) {
                where.SongId = songId
            }
            const bookmarks = await Bookmark.findAll({
                where: where,
                include: [
                    {
                        model: Song
                    }
                ]
            })
                .map(bookmark => bookmark.toJSON())
                .map(bookmark => _.extend(
                    {},
                    bookmark.Song,
                    bookmark
                ))
            // console.log('bookmark', bookmark);
            res.send(bookmarks /* || {} */)
        /* } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the bookmarks'
            })
        } */
    },

    async post(req, res) {
        // try { // to tracking the error you must dissable try catch first to know the exact error
            const userId = req.user.id
            // console.log(userId);
            const {songId} = req.body
            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })
            // console.log(bookmark);
            if (bookmark) {
                return res.status(400).send({
                    error: 'You already have this set as a bookmark'
                })
            }

            const newBookmark = await Bookmark.create({
                SongId: songId,
                UserId: userId
            })
            // console.log(newBookmark);
            
            res.send(newBookmark /* || {} */)
       /*  } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to create the bookmarks'
            })
        } */
    },

    async delete(req, res) {
        try { // to tracking the error you must dissable try catch first to know the exact error
            const userId = req.user.id
            const {bookmarkId} = req.params
            const bookmark = await Bookmark.findOne({
                where: {
                    id: bookmarkId,
                    UserId: userId
                }
            })
            if (!bookmark) {
                return res,status(403).send({
                    error: 'you dont access on this bookmark'
                })
            }
            await bookmark.destroy()
            
            res.send(bookmark /* || {} */)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to delete the bookmark'
            })
        }
    }
}