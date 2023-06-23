const db = require('../db/db')

const User = {
    // Setting up the findByEmail function
    findByEmail: email => {
        const sql = `
        SELECT * FROM users
        WHERE email = $1
        `

        return db
            .query(sql, [email])
            .then(dbRes => dbRes.rows[0])
    },
    // Setting up the findById function
    findById: id => {
        const sql = `
        SELECT * FROM users
        WHERE id = $1
        `

        return db
            .query(sql, [id])
            .then(dbRes => dbRes.rows[0].email)
    },

    // this should take all of the signup inputs and create an entry in the users table in our DB
    create: (first_name, email, passwordDigest) => {
        const sql = `
        INSERT INTO users( first_name, email, password_digest)
        VALUES ($1, $2, $3)
        RETURNING *
        `
        // Have it set to return all, could modify to return less later if we don't use the information anywhere
        return db
            .query(sql, [ first_name, email, passwordDigest])
            .then(dbRes => dbRes.rows[0].email)
    }
}

module.exports = User;