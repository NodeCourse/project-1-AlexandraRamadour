const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const db = new Sequelize('sql2238278', 'sql2238278', 'yT1!cS7*', {
    host: 'sql2.freemysqlhosting.net',
    dialect: 'mysql'
});
const app = express();

const Article = db.define('article', {
    title: { type: Sequelize.STRING },
    content: { type: Sequelize.TEXT },
    eval: { type: Sequelize.STRING }
});
const User = db.define('user', {
    username: { type: Sequelize.STRING },
    mdp: { type: Sequelize.TEXT }
});
app.use(express.static("public"));

db.sync();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    Article
        .findAll()
        .then((articles) => articles.map(article => article.dataValues))
        .then((articles) => {
            res.render('index', { articles });
        });
});
app.get('/inscription', (req, res) => {
    User
    .findAll()
    .then((users) => {
        //res.send(users)
        res.render('inscription', { users:users });
    });
        });

app.get('/review/:id', (req, res) => {
    Article.findById(req.params.id)
        .then((article) => {
            res.render('review', {article:article});
        }) 
        });

app.post('/inscription', (req, res) => {
        const { username, mdp } = req.body;
            User
                .sync()
                .then(() => User.create({ username, mdp }))
                .then(() => res.redirect('/'));
        });
                
        
app.post('/', (req, res) => {
    const { title, content, eval} = req.body;
    Article
        .sync()
        .then(() => Article.create({ title, content, eval}))
        .then(() => res.redirect('/'));
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});