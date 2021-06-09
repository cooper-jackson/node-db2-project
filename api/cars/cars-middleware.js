const cars = require('./cars-model')
const vinValidator = require('vin-validator')
const db = require('../../data/db-config')

exports.checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newCar = await cars.getById(req.params.id)
    if(!newCar) {
      return next({status: 404, message: `car with id ${req.params.id} is not found`})
    } else {
      req.car = newCar
      next()
    }
  } catch (err) {
    console.log('hit error')
    next(err)
  }
  console.log('hit the checkcarid middleware')
  next()
}

exports.checkCarPayload = (req, res, next) => {
// DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body
    // console.log(vin, make, model, mileage)
  if(!vin) {
    return next({status: 400, message: 'vin is missing'})
  }
    // res.status(400).json({message: "vin is missing"})
    // next({status:400})
  // } else if (!make || make === 'undefined') {
  //   res.status(400).json({message: "make is missing"})
  //   next({status:400})
  // } else if (!model || model === 'undefined') {
  //   res.status(400).json({message: "model is missing"})
  //   next({status:400})
  // } else if (!mileage || mileage === 'undefined') {
  //   res.status(400).json({message: "mileage is missing"})
  //   next({status:400})
  next()
}

exports.checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body
  const isValidVin = vinValidator.validate(vin)
  if(isValidVin) {
    next()
  } else {
    next({status: 400, message: `vin ${req.body.vin} is invalid`})
  }
}

exports.checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
    const { vin } = req.body
    const existingVin = await db('cars').where('vin', vin)

    if(!existingVin) {
      next()
    } else {
      next({status: 400, message: `vin ${vin} already exists`})
    }

  next()
}
