const { Song } = require('../models')

module.exports = {
  async index (req, res) {
    // try { // to tracking the error you must dissable try catch first to know the exact error
      let songs = null
      const search = req.query.search
      if (search) {
        songs = await Song.findAll({
          where: {
            $or: [
              'title', 'artist', 'genre', 'album'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        songs = await Song.findAll({
          limit: 10
        })
      }
      res.send(songs)
    /* } catch (error) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the songs'
      })
    } */
  },

  async show (req, res) {
    try { // to tracking the error you must dissable try catch first to know the exact error
      const song = await Song.findByPk(req.params.songId)
      res.send(song)
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the songs'
      })
    }
  },

  async post (req, res) {
    try { // to tracking the error you must dissable try catch first to know the exact error
      const song = await Song.create(req.body)
      res.send(song)
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured trying to create the songs'
      })
    }
  },

  async put (req, res) {
    try { // to tracking the error you must dissable try catch first to know the exact error
      const song = await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      res.send(song)
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured trying to updated the songs'
      })
    }
  }
}
