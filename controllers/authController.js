const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

exports.signUp = async (req, res, next) => {
  const { username, password } = req.body
  const hashPassword = await bcrypt.hash(password, 12)
  try {
    const user = await User.create({
      username,
      password: hashPassword,
    })

    req.session.user = user
    res.status(201).json({
      message: 'User created successfully',
      data: {
        user: user,
      },
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Creating user failed',
      data: {
        error: e,
      },
    })
  }
}

exports.login = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
        data: {
          error: 'Invalid credentials',
        },
      })
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      req.session.user = user
      const userResponse = { username: user.username, _id: user._id }
      res.status(200).json({
        message: 'User logged in successfully',
        data: {
          user: userResponse,
        },
      })
    } else {
      res.status(401).json({
        message: 'Invalid credentials',
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Logging in user failed',
      data: {
        error: e,
      },
    })
  }
}
