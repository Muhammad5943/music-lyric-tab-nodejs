const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })

      // console.log(user.toJSON())
    } catch (err) {
      // Email already exist
      res.status(400).send({
        error: 'This email account is already in exist.'
      })
    }
  },

  async login (req, res) {
    try { // to tracking the error you must dissable try catch first to know the exact error
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      // console.log('user', user.toJSON()) /* how to tracking error */
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      // const inPasswordvValid = password === user.password (set password before using bcrypt password)

      const isValidPassword = user.comparePassword(password, user.password)
      if (!isValidPassword) {
        return res.status(403).send({
          error: 'The login information was incorrect password'
        })
      }

      // const isPasswordValid = await user.comparePassword(password) /* === user.password */
      // console.log(user.password)
      // console.log(isValidPassword) /* "how to tracking error" */

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured trying to login.'
      })
    }
  },

  async user (req, res) {
    try {
      const user = await User.findAll({
        limit: 5
      })
      // console.log(user);
      // const userJSON = user.toJSON() /* this method only used when you have an params in your function */
      res.send(user)
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured trying get user.'
      })
    }
  }
}
