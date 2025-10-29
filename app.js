'use strict'

const galeriaDeLivros = document.getElementById('bookGallery')
const galeriaDeFilmes = document.getElementById('movieGallery')

async function buscarLivros() {
    const url = `https://api.potterdb.com/v1/books`
    const response = await fetch(url)
    const livros = await response.json()

    return livros
}

async function exibirLivros() {

    const bookList = await buscarLivros()

    const books = bookList.data;

    books.forEach(book => {

        const card = document.createElement('div')
        card.className = 'card'


        const capa = document.createElement('img')
        capa.src = book.attributes.cover

        const nome = document.createElement('p')
        nome.textContent = book.attributes.title

        const releaseDate = document.createElement('a')
        releaseDate.textContent = book.attributes.release_date

        const pageNumber = document.createElement('a')
        pageNumber.textContent = `${book.attributes.pages} pages`

        const buttonDetails = document.createElement('button')
        buttonDetails.textContent = 'Show More'

        buttonDetails.addEventListener('click', () => {
            localStorage.setItem('itemId', book.id);
            localStorage.setItem('itemType', 'book');
            window.location.href = './2page.html';
        })

        card.appendChild(capa)
        card.appendChild(nome)
        card.appendChild(releaseDate)
        card.appendChild(pageNumber)
        card.appendChild(buttonDetails)
        galeriaDeLivros.appendChild(card)

    });
}

async function buscarFilmes() {
    const url = `https://api.potterdb.com/v1/movies`
    const response = await fetch(url)
    const filmes = await response.json()

    return filmes
}

async function exibirFilmes() {

    const movieList = await buscarFilmes()

    const movies = movieList.data;
        movies.forEach(movie => {

            const card = document.createElement('div')
            card.className = 'movieCard'

            const poster = document.createElement('img')
            poster.src = movie.attributes.poster

            const nome = document.createElement('p')
            nome.textContent = movie.attributes.title

            const releaseDate = document.createElement('a')
            releaseDate.textContent = movie.attributes.release_date

            const runningTime = document.createElement('a')
            runningTime.textContent = movie.attributes.running_time

            const buttonDetails = document.createElement('button')
            buttonDetails.textContent = 'Show More'

            buttonDetails.addEventListener('click', () => {
                localStorage.setItem('itemId', movie.id);
                localStorage.setItem('itemType', 'movie');
                window.location.href = './2page.html';
            })

            card.appendChild(poster)
            card.appendChild(nome)
            card.appendChild(releaseDate)
            card.appendChild(runningTime)
            card.appendChild(buttonDetails)

            galeriaDeFilmes.appendChild(card)
        });
}
exibirFilmes()
exibirLivros()