const express = require("express");
const bcrypt = require("bcryptjs")
const cors = require("cors");
const jwt = require("jsonwebtoken")

const router = express.Router();
router.use(cors())

const Customer = require("../models/Customer")
const Company = require("../models/Company")

router.post("/login", async (req, res) => {
    Customer.findOne({
        where: { username: req.body.username }
    })
        .then((customer) => {
            if (customer) {
                if (bcrypt.compareSync(req.body.password, customer.password)) {
                    let token = jwt.sign(customer.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else res.send({ error: 'Password is incorrect' })
            } else res.status(400).json({ error: 'user not exist' })
        })
        .catch((err) => {
            res.status(400).json({ error: err })
        })
})

router.post("/add-company", async (req, res) => {
    const companyData = {
        name: req.body.name,
        contactFName: req.body.contactFName,
        contactLName: req.body.contactLName,
        contactPhone: req.body.contactPhone,
        code: req.body.code,
        contactEmail: req.body.contactEmail,
    }
    Company.findOne({
        where: {
            name: req.body.name
        }
    })
        .then((each) => {
            if (!each) {
                Company.create(companyData)
                    .then(company => {
                        res.json({ message: company.name + "Registered" });
                    })
                    .catch(err => {
                        res.send({ error: err })
                    })
            } else {
                res.json({ error: "The Name has already been taken." })
            }
        })
        .catch(err => {
            res.send({ error: err })
        })
})

router.post("/get-company", async (req, res) => {
    Company.findAll()
        .then(allCompany => {
            res.send(allCompany);
        })
        .catch(err => {
            res.send({ error: err })
        })
})

router.post("/get-company-id", async (req, res) => {
    console.log(req.body)
    Company.findOne({
        where: {
            id: Number(req.body.id)
        }
    })
        .then(company => {
            res.send(company);
        })
        .catch(err => {
            res.send({ error: err })
        })
})

router.post("/edit-company", async (req, res) => {
    console.log(req.body)
    Company.findOne({
        where: {
            name: req.body.name
        }
    })
        .then(one => {
            if (one) {
                Company.update(req.body, {
                    where: {
                        name: req.body.name
                    }
                })
                    .then(resp => {
                        if (resp[0]) res.send({ message: "Successfully Updated!" });
                        else res.send({ error: "Nothing Updated!" })
                    })
                    .catch(err => {
                        res.send({ error: err })
                    })
            }
        })
})

router.post("/change-password", async (req, res) => {
    const userdata = {
        username: req.body.username,
        origin: req.body.origin,
        newPassword: req.body.newPassword
    }
    Customer.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(userdata.origin, user.password)) {
                    bcrypt.hash(userdata.newPassword, 10, (err, hash) => {
                        userdata.newPassword = hash;
                        Customer.update(
                            {
                                password: userdata.newPassword
                            },
                            {
                                where: {
                                    username: userdata.username
                                }
                            }
                        )
                            .then(resp => {
                                if (resp[0]) res.send({ message: "Successfully Updated!" });
                                else res.send({ error: "Nothing Updated!" })
                            })
                            .catch(err => {
                                res.send({ error: err })
                            })
                    })
                } else {
                    res.send({ error: "Original Password is incorrect!" })
                }
            }
        })
})

module.exports = router
