const db = require('../db');
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')

exports.register = async (req, res) => {
    const { firstName, lastName, phoneNumber, username, password, roleID } = req.body;
    try {
        const hashedPassword = await hash(password, 10)
        await db.query(
            `INSERT INTO Users (FirstName, LastName, PhoneNumber, Username, Password, RoleID)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [firstName, lastName, phoneNumber, username, hashedPassword, roleID]
        );
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const users = await db.query('SELECT * FROM users')

        return res.status(200).json({
            success: true,
            data: users.rows
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    let user = req.user

    let payload = {
        id: user.userid,
        username: user.username
    }

    try {
        const token = await sign(payload, SECRET)

        return res.status(200).cookie('token', token, {httpOnly: true}).json({
            success: true,
            message: 'Logged in successfully',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.protected = async (req, res) => {
    try {
        return res.status(200).json({
        info: 'protected info',
      })
    } catch (error) {
      console.log(error.message)
    }
}

exports.logout = async (req, res) => {
    try {
        return res.status(200).clearCookie('token', { httpOnly: true}).json({
            success: true,
            message: 'Logged out successfully'
        })

    } catch {
        console.log(error)
        return res.status(500).json({
            error: error.message
        })
    }
}