const express = require("express");
const bcrypt = require("bcryptjs")
const cors = require("cors");
const jwt = require("jsonwebtoken")

const router = express.Router();
router.use(cors())

const Admin = require("../models/Admin")
const Customer = require("../models/Customer")

router.post("/login", async (req, res) => {

    Admin.findOne({
        where: { username: req.body.username }
    })
        .then((admin) => {
            if (admin) {
                if (bcrypt.compareSync(req.body.password, admin.password)) {
                    let token = jwt.sign(admin.dataValues, process.env.SECRET_KEY, {
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

router.post("/add-cs", async (req, res) => {
    const today = new Date()
    const userData = {
        fName: req.body.fName,
        lName: req.body.lName,
        username: req.body.username,
        password: req.body.password
    }

    Customer.findOne({
        where: { username: req.body.username }
    })
        .then((user) => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    Customer.create(userData)
                        .then(cs => {
                            res.json({ status: cs.username + "Registered!" })
                        })
                        .catch(err => {
                            res.send("error:" + err)
                        })
                })
            } else {
                res.json({ error: "User already exists" })
            }
        })
        .catch(err => {
            res.send({ error: err })
        })
})

router.post("/get-cs", async (req, res) => {
    Customer.findAll()
        .then(allcs => {
            res.send(allcs);
        })
        .catch(err => {
            res.send({ error: err })
        })
})

router.post("/remove-cs", async (req, res) => {
    Customer.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user) {
                Customer.destroy({
                    where: { username: req.body.username }
                })
                    .then(num => {
                        if (num === 1) {
                            Customer.findAll()
                                .then(allcs => {
                                    res.send({ allcs, message: "success" });
                                })
                                .catch(err => {
                                    res.send({ error: err })
                                })
                        } else {
                            res.send({ error: `Can't delete ${req.body.username} Customer Service` })
                        }
                    })
                    .catch((err) => {
                        res.status(500).send({
                            error: `Could not delete ${req.body.username} Customer Service`
                        })
                    })
            }
        })
})

router.post("/add-admin", async (req, res) => {
    const today = new Date()
    const userData = {
        fName: req.body.fName,
        lName: req.body.lName,
        username: req.body.username,
        password: req.body.password
    }

    Admin.findOne({
        where: { username: req.body.username }
    })
        .then((user) => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    Admin.create(userData)
                        .then(admin => {
                            res.json({ status: admin.username + "Registered!" })
                        })
                        .catch(err => {
                            res.send("error:" + err)
                        })
                })
            } else {
                res.json({ error: "User already exists" })
            }
        })
        .catch(err => {
            res.send({ error: err })
        })
})


router.post("/get-admin", async (req, res) => {
    Admin.findAll()
        .then(allAdmin => {
            res.send(allAdmin);
        })
        .catch(err => {
            res.send({ error: err })
        })
})

router.post("/remove-admin", async (req, res) => {
    Admin.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user) {
                Admin.destroy({
                    where: { username: req.body.username }
                })
                    .then(num => {
                        if (num === 1) {
                            Admin.findAll()
                                .then(alladmin => {
                                    res.send({ alladmin, message: "success" });
                                })
                                .catch(err => {
                                    res.send({ error: err })
                                })
                        } else {
                            res.send({ error: `Can't delete ${req.body.username} Administrator` })
                        }
                    })
                    .catch((err) => {
                        res.status(500).send({
                            error: `Could not delete ${req.body.username} Administrator`
                        })
                    })
            }
        })
})

module.exports = router;
