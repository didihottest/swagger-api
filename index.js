require('dotenv').config()
const express = require('express')
const app = express()

const routes = require('./router')

const { sequelize } = require('./models')

//import swagger ui untuk tampilan dokumentasi
const swaggerUI = require('swagger-ui-express')
// import konfigurasi swagger 
const swaggerJSON = require('./docs/swagger.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(routes.userRouter)
app.use(routes.postRouter)

// middleware untuk panggil swagger ui supaya ada tampilannya
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))

const PORT = process.env.PORT

sequelize.sync().then(() => {
  console.log("Database Connected");
  app.listen(PORT, () => {
    console.log('====================================');
    console.log("server is running at " + PORT);
    console.log('====================================');
  })
}).catch((error) => {
  console.log(error);
})
