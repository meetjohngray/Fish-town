const express= require('express')
//const router = express.Router()
const fs = require('fs')
// const { request } = require('http')
const hbs = require('express-handlebars')
const server = express()

// Middleware
server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))

server.set('view engine', 'hbs')
server.use(express.static('public'))
server.use(express.urlencoded({extended: false}))

//const fish = require('./data.json')

server.get('/', (req, res) => {
    fs.readFile('./data.json', 'utf8' ,(err, data) => {
        if(err) throw err 
        const obj = JSON.parse(data)
    res.render("fish/index", obj)
  })
})

server.get('/fish', (req, res) => {
    fs.readFile('./data.json', 'utf8' ,(err, data) => {
        if(err) throw err 
        const obj = JSON.parse(data)
  res.render('fish/index', obj)
})
})

server.get('/fish/:id', (req, res) => {
  let id = req.params.id
  fs.readFile('./data.json', 'utf8' ,(err, data) => {
      if(err) throw err 
      const obj = JSON.parse(data)
      const findFish = obj.fish.find(e => e.id == id)
      res.render('fish/view', findFish)
  })
})

server.get('/fish/edit/:id', (req, res) =>{
  let id = req.params.id
  fs.readFile('./data.json', 'utf8' ,(err, data) => {
      if(err) throw err 
      const obj = JSON.parse(data)
//      console.log(obj)
      const eFish = obj.fish.find(e => e.id == id)
      res.render('fish/edit', eFish)
  })
})


server.post('/fish/edit/:id', (req, res) => {
  console.log('p:', req.body)
  const id = req.params.id
  const filePath = "./data.json"
  fs.readFile(filePath, 'utf8' ,(err, data) => {
      const obj = JSON.parse(data)
      if (err){
      throw err;
      } else {
        console.log(obj)
          obj.fish.map(e => {
              if(e.id ==id) {
                e.name= req.body.name
                e.breed= req.body.breed 
                e.owner= req.body.owner
               
              }
          })
          fs.writeFile(filePath, JSON.stringify(obj, null, 2), (err)=>{
              res.redirect("/fish/"+id)
          })     
      }
    });
})


//server.use('/', server)

module.exports = server