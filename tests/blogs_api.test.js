const mongoose = require('mongoose')
const Blog = require('../models/blogsM')
const supertest = require('supertest')
const app = require('../app')
const { promises } = require('supertest/lib/test')

const blogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
      },
      {        
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0       
      },
      {    
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2        
      }
    ]


const api = supertest(app)

beforeEach(async () =>{
    await Blog.deleteMany({})
    const modelsBlogs = blogs.map(b => new Blog(b))
    const promisesBlogs = modelsBlogs.map(mb => mb.save())
    await Promise.all(promisesBlogs)
})
 
test('codigo de respuesta, formato, y longitud correcta', async ()=>{
     await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const allBlogs = await api.get('/api/blogs')
    const titleblogs = allBlogs.body.map(ab => ab.title)
    
    expect(titleblogs).toHaveLength(6)
})

test('verificar que el parametro id esta en el objeto', async ()=>{
  

  await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const objetoPrueba = response.body[0]

  expect(objetoPrueba.id).toBeDefined()
})


test('que se agregue el blog a la bbdd y que se encuentre en ella', async ()=>{
    newBlog = {
        title: 'La Nebulosa del Anillo',
        author: 'Jose Vicente Díaz Martínez',
        url: 'https://josevicentediaz.com/2023/08/25/la-nebulosa-del-anillo-observada-por-el-telescopio-espacial-james-webb/',
        likes: 1
    }
        
    
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titleblogs = response.body.map(r => r.title)

    expect(titleblogs).toHaveLength(blogs.length + 1)
    expect(titleblogs).toContain('La Nebulosa del Anillo')
})

test.only('verificar si no paso propiedad likes sera por defecto 0', async() =>{
  newBlog = {
    title: 'La Nebulosa del Anillo',
    author: 'Jose Vicente Díaz Martínez',
    url: 'https://josevicentediaz.com/2023/08/25/la-nebulosa-del-anillo-observada-por-el-telescopio-espacial-james-webb/'
  }

  const response = await api.post('/api/blogs')
                  .send(newBlog)
                  .expect(200)
                  .expect('Content-Type', /application\/json/)
  
  
  

  expect(newBlog.likes).toBeUndefined()
  expect(response.body.likes).toBe(0)

})
test.only('si falta title o url repondo con codigo 400 ', async()=>{
  newBlog = {
    title: 'La Nebulosa del Anillo',
    author: 'Jose Vicente Díaz Martínez',
    likes: 1
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
  
})

afterAll(()=>{
    mongoose.connection.close()
})