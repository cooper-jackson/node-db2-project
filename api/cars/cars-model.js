const db = require('../../data/db-config')

const getAll = async () => {
  // DO YOUR MAGIC
  return db('cars')
}

const getById = async (id) => {
  // DO YOUR MAGIC
  return db('cars').where('id', id).first()
}

const create = async (car) => {
  // DO YOUR MAGIC
  // return db('cars').insert({
  //   vin: car.vin.trim(),
  //   make: car.make.trim(),
  //   model: car.model.trim(),
  //   mileage: car.mileage,
  //   title: car.title.trim(),
  //   transmission: car.transmission.trim() 
  // })
  const id = await db('cars').insert(car)
  return getById(id)
}

module.exports = { getAll, getById, create }