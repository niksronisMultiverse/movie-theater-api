const {Router, request} = require('express')
const showsRouter = Router()
const {Show,User} = require ('../models')

async function findShow (req,res,next) {
    const id = req.params.showId
    const show = await Show.findByPk(id)
    req.body = show

    next()
}

showsRouter.get('/', async (req,res) => {
    const query = await Show.findAll()
    res.send(query)

})

showsRouter.get('/:showId',findShow, async (req,res) => {
    res.send(req.body)

})

showsRouter.get('/genre/:genre', async (req,res) => {
    console.log(req.params.genre)
    const query = await Show.findAll({where :{genre: req.params.genre}})
    res.send(query)

})

showsRouter.put('/:showId/watched/:rating',findShow, async (req,res) => {
    const show = req.body
    await show.update({rating: Number(req.params.rating)})
    res.send(`Rating of show ID ${req.params.showId} changed to ${show.rating}`)

})

showsRouter.put('/:showId/updates',findShow, async (req,res) => {
    const show = req.body
    temp = show.status
    if (show.status == 'on-going') {
        show.update({status: 'cancelled'})
    }
    else {
        show.update({status: 'on-going'})
    }
    res.send(`Show with ID ${req.params.showId} changes status from ${temp} to ${show.status}`)
})

showsRouter.delete('/:showId', async (req,res) => {
    await Show.destroy({where : {id: req.params.showId}})
    res.send(`Show with ID ${req.params.showId} has been deleted from the database`)
})


module.exports = showsRouter;