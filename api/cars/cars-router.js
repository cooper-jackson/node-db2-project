// DO YOUR MAGIC
const router = require('express').Router();
const Cars = require('./cars-model')
const md = require('./cars-middleware')

router.get('/', (req, res, next) => {
    Cars.getAll()
    .then(cars => {
        res.json(cars)
    })
    .catch(err => {
        next(err)
    })
})
router.get('/:id', md.checkCarId, (req, res, next) => {
    res.json(req.car)
})

router.post('/', md.checkCarPayload, md.checkVinNumberValid, md.checkVinNumberUnique, async (req, res, next) => {
    try {
        const newCar = await Cars.create(req.body)
        res.json(newCar)
        console.log('did it!')
    } catch(err) {
        next(err)
        console.log('hit this error?')
    }
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
    })
})

module.exports = router;