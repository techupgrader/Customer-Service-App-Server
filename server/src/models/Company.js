const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    "company",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        code: {
            type: Sequelize.STRING,
        },
        activationDate: {
            type: Sequelize.DATE,
            defaultValue: null,
        },
        activationToDate: {
            type: Sequelize.DATE,
            defaultValue: null,
        },
        cancellationDate: {
            type: Sequelize.DATE,
            defaultValue: null,
        },
        contactFName: {
            type: Sequelize.STRING,
        },
        contactLName: {
            type: Sequelize.STRING,
        },
        contactEmail: {
            type: Sequelize.STRING,
        },
        contactPhone: {
            type: Sequelize.STRING,
        },
        isCancelled: {
            type: Sequelize.INTEGER,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updated_at: {
            type: Sequelize.DATE
        }
    },
    {
        // hooks: {
        //     beforeCount(options) {
        //         options.raw = true;
        //     }
        // },
        tableName: 'company',
        name: {
            singular: 'company',
            plural: 'companies'
        },
        timestamps: false
    }
)
