function dummy(blogs){
    return 1
}

function totallikes(blogs){
    total = blogs.reduce((acumulador, valorActual)=>{
        return acumulador + valorActual.likes
    },0)

    return total
}

function favoriteBlog(blogs){
    const favorite = blogs.find(b => b.likes === Math.max(...blogs.map(l => l.likes)))
    console.log(favorite)
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

module.exports = {dummy, totallikes, favoriteBlog}