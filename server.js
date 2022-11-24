const express = require ('express')
const app = express()
const port = 3000
const {userRouter,showsRouter} = require('./routes')
const seed = require ('./seed')

seed()

app.use(express.json())
app.use('/user', userRouter)
app.use('/shows', showsRouter)



app.listen(port, () => {
    console.log('Listening')
})