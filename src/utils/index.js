'use strict'

const path = require('path')
const houses = require('./houses')
const users = {}

module.exports = {
  /**
   * Method used to retrieve the house of the specified user.
   * @param  {String} username Name of the user.
   * @return {Promise} Resolved if house is retrieved. Rejected otherwise.
   */
  getHouse (username) {
    return this.getUser(username).then(user => houses[user.house])
  },

  /**
   * Method used to retrieve a user. If user does not exist, a new user is
   * created and assigned a random house.
   * @param  {String} username Name of the user.
   * @return {Promise} Resolved if username is retrieved & saved. Rejected
   *                   otherwise.
   */
  getUser (username) {
    // Set username to lowercase.
    username = username.toLowerCase()

    // If the user has already been registered, return the user.
    if (users[username] !== undefined) return Promise.resolve(users[username])

    // Else we need to:
    //   1. Register the user.
    //   2. Assign the newly registered user a random house.
    users[username] = {
      house: Math.floor(Math.random() * (houses.length))
    }

    console.info(`'${username}' was assigned ` +
      `'${houses[users[username].house]}'`)

    // Persist changes.
    return Promise.resolve(users[username])
  }
}
