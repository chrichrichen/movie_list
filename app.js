const express = require('express')
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
})

app.get('/search' ,(req,res)=>{
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie =>{
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index',{movies:movies, keyword:keyword})
})


app.get('/movies/:movie_id', (req, res) => {
  console.log('req.params.movie_id', req.params.movie_id)
  const movie = movieList.results.find(movie => movie.id == req.params.movie_id

  )

  res.render('show', { movie: movie })
})


app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})