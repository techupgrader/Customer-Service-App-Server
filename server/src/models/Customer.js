const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    "user",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
        },
        fName: {
            type: Sequelize.STRING,
        },
        lName: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        }
    },
    {
        timestamps: false
    }
)