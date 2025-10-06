'use strict'

const galeria = document.getElementById('bookGallery')

async function buscarLivros() {
    const url = `https://api.potterdb.com/v1/books`
    const response = await fetch(url)
    const livros = await response.json()

    console.log(livros)
    return livros
}

async function exibirLivros() {

    const bookList = await buscarLivros()

    //console.log(bookList.data['0'])

    let array = bookList.data
    console.log(array)


    while (array.lenght <= 7) {
        const img = document.createElement("img")
        img.src = url
        galeria.appendChild(img)
    }
    
    // bookList.forEach(data => {
    //     const img = document.createElement("img")
    //     img.src = url
    //     galeria.appendChild(img)
    //   })

    

}


exibirLivros()