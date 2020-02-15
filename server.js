const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const cards = require('./data')

server.use(express.static('public'))

server.set('view engine','njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res){
    return res.render('home')
})

server.get('/courses', function(req, res){
    return res.render('courses',{ items: cards })
})

server.get('/about', function(req, res){
    return res.render('about')
})

server.get("/courses/:id", function(req, res) {
    const id = req.params.id;

    const card = cards.find(function(card) {
        if (card.id == id) {
            return true
        }
    })

    if (!card) {
        return res.send('page not found')
    }
  
    return res.render('card', { item: card })
});

server.listen(5000, function(){
    console.log('server is running')
})

server.use(function(req, res) {
    res.status(404).render("not-found");
  });