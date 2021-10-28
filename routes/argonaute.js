const express = require("express")
const mysql = require("../config/db")

const router = express.Router() //Tout ce qui touche au router dans express est transféré dans la variable. 

router.get('/', (req, res) => {
    const sql = "SELECT * FROM argonaute"
    mysql.query(sql, (err, result) => {
        if (err){
            res.status(500).send("Error retrieving data from database")
} else {
    console.table(result)
    res.status(200).json(result)
        }
    })
}) 

router.post("/", (req, res) => {
    const sql = `INSERT INTO argonaute (name) VALUES (?)`
    console.log("Poulet test",req.body)
    const value = [req.body.newMember] //On construit le tableau de valeur que l'on va passer à la requette mysql, les valeurq qu'on retrouve dans req.body sont les valeurs quej'ai envoyé du front via mon axios.post
    console.log(value)
    mysql.query(sql, value, (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving data from database")
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

module.exports = router