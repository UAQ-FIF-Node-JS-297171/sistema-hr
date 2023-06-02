//dependencias
const morgan = require('morgan')
const express = require('express')
//routers
const app = express()
const sistema = require('./routes/sistema')
const user = require('./routes/user')
//middleware
const auth = require('./middleware/auth')
const notfound = require('./middleware/notfound')
const index = require('./middleware/index')
const cors = require('./middleware/cors')


app.use(cors)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.get('/', index)

app.use('/user', user)

app.use(auth)
app.use('/sistema', sistema)

app.use(notfound)


app.listen(process.env.PORT || 4000, () => {
    console.log('Server is currently running...')
})