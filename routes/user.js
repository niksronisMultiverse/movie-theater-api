const {Router} = require('express')
const userRouter = Router()
const {Show,User} = require ('../models')

async function findUser (req,res,next) {
    const id = req.params.userId
    const user = await User.findByPk(id)
    req.body = user

    next()
}

userRouter.get('/', async (req,res) => {
    const query = await User.findAll()
    res.send(query)
})

userRouter.get('/:userId',findUser, (req,res) => {
    res.send(req.body)
})

userRouter.get('/:userId/showWatched', async (req,res) => {
    const query = await Show.findAll({where: {userId:req.params.userId}})
    res.send(query)
})

userRouter.put('/:userId/showWatched/:showId', async (req,res) => {
    await Show.update({userId:req.params.userId}, {where: {id:req.params.showId}})
    res.sendStatus(200)
})



module.exports = userRouter;