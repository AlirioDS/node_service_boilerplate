require('dotenv').config()

module.exports = {
  development: {
    username: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    host: process.env.POSTGRES_DB_HOST,
    dialect: "postgres",
    port: process.env.POSTGRES_DB_PORT,
    define: {
      timestamps: true,
      freezeTableName: true
    }
  },
  staging: {
    username: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    host: process.env.POSTGRES_DB_HOST,
    dialect: "postgres",
    port: process.env.POSTGRES_DB_PORT,
    define: {
      timestamps: true
    }
  },
  production: {
    username: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    host: process.env.POSTGRES_DB_HOST,
    dialect: "postgres",
    port: process.env.POSTGRES_DB_PORT,
    define: {
      timestamps: true
    }
  }
}
