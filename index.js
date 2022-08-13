const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const redis = require('redis')

let RedisStore = require('connect-redis')(session)

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_SECRET,
  REDIS_PORT,
} = require('./config/config')

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
})

const PostRouter = require('./routes/postRoutes')
const UserRouter = require('./routes/userRoutes')

mongoose
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`,
  )
  .then(() => console.log(`Connected to MongoDB`))
  .catch((err) => {
    console.log(err)
  })

const app = express()

app.enable('trust proxy')
app.use(cors({}))
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: REDIS_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 60000,
    },
  }),
)

app.use(express.json())

app.get('/api/v1', (req, res) => {
  console.log('left right')
  res.send('<h2>Hello World!</h2>')
})

app.use('/api/v1/posts', PostRouter)
app.use('/api/v1/users', UserRouter)

const port = process.env.PORT || 3435

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
