const express = require('express')
const cors = require('cors') //Obligatoire - Permet d'accepter les requettes qui viennent de l'extérieur. 
const morgan = require('morgan') //Facultatif - Permet de voir quel type de requette a été passée sur son serveur (get, post, etc) et le type de réponse (200, 304, 500...)
const connection = require('./config/db')
const routes = require('./routes/index')

const app = express()

connection.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack)
    } else {
        console.log(" database connected")
    }
}) //Juste pour vérifier que la base de données est bien connectée.

//Middleware
app.use(cors()) //Tous les appels API qui viennent de l'extérieur sont acceptés parce qu'on a rien mis dans les parenthèses. 
app.use(morgan('tiny')) //Affiche nous le minimun d'information (get, post, etc...)
app.use(express.json()) 
app.use(express.urlencoded({ extended: true}))
//Ces 2 lignes récupèrent et mettent en forme dans le req.body les informations envoyées du front. 


app.use("/argonaute", routes.argonaute)

app.get('/', (req, res) => {
    res.status(200).send('Je suis dans le /')
})
app.listen(4242
    , console.log('http://localhost:4242'))