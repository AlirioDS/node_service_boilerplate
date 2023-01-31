import Sequelize from "sequelize";
import mongoose from "mongoose";
require('dotenv').config();

//Config sequelize db Internal
export const sequelizeConf = new Sequelize(
  process.env.POSTGRES_DB_NAME,
  process.env.POSTGRES_DB_USER,
  process.env.POSTGRES_DB_PASSWORD,
  {
    host: process.env.POSTGRES_DB_HOST,
    dialect: "postgres",
    port: process.env.POSTGRES_DB_PORT,
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    }
  }
)

//Connection SQL
export const sequelizeORM = async sequelizeConf => { 
  try{
    const sequelize = await sequelizeConf.authenticate()
    console.log('Connection SQL DB successfully.')
  }
  catch(error) {
    console.error(`Unable to connect SQL DB:`, error )
  }
}

//Connection NOSQL
export const mongoDB = async () => {
  try {
    const db = await mongoose.connect(
      `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=admin`
    )
    console.log(`Connection NOSQL DB successfully.`)
  } catch (error) {
    console.error(`Unable to connect NOSQL DB:`, error)
  }
}
