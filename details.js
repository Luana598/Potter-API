'use strict';

async function getItemDetails(type, id) {
    
    const url = `https://api.potterdb.com/v1/${type}s/${id}`;
    const response = await fetch(url);
    const json = await response.json();

    return json;
}

function displayBookDetails(item) {

    const attributes = item.data.attributes;

    document.getElementById('item-title').textContent = attributes.title;
    document.getElementById('item-image').src = attributes.cover;
    document.getElementById('item-image').alt = `Capa do livro ${attributes.title}`;
    document.getElementById('item-summary').textContent = attributes.summary;

    // Atualiza as informações de produção
    document.getElementById('info-1').textContent = `number of pages: ${attributes.pages}`;
    document.getElementById('info-2').textContent = `release date: ${attributes.release_date}`;
    document.getElementById('info-3').textContent = `author: ${attributes.author}`;

    // Adiciona o link da wiki se disponível
    const info4 = document.getElementById('info-4');
    if (attributes.wiki) {
     
        info4.innerHTML = '';
        info4.innerHTML = `<a href="${attributes.wiki}" target="_blank" rel="noopener noreferrer">View on Wiki</a>`;
    } else {
        info4.style.display = 'none';
    }

    // Esconde o botão do trailer
    const trailerButton = document.querySelector('.trailer-button');
    if (trailerButton) {
        trailerButton.style.display = 'none';
    }
}

function displayMovieDetails(item) {
    
    const attributes = item.data.attributes;

    document.getElementById('item-title').textContent = attributes.title;
    document.getElementById('item-image').src = attributes.poster;
    document.getElementById('item-image').alt = `Poster do filme ${attributes.title}`;
    document.getElementById('item-summary').textContent = attributes.summary;

    // Atualiza as informações de produção
    document.getElementById('info-1').textContent = `running time: ${attributes.running_time}`;
    document.getElementById('info-2').textContent = `release date: ${attributes.release_date}`;
    document.getElementById('info-3').textContent = `directors: ${attributes.directors.join(', ')}`;
    document.getElementById('info-4').textContent = `producers: ${attributes.producers.join(', ')}`;

    // Atualiza o link do trailer
    const trailerButton = document.querySelector('.trailer-button');
    if (trailerButton && attributes.trailer) {
        trailerButton.href = attributes.trailer;
    } else if (trailerButton) {
        trailerButton.style.display = 'none'; // Esconde se não houver trailer
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const itemId = localStorage.getItem('itemId');
    const itemType = localStorage.getItem('itemType');

    if (itemId && itemType) {
        const item = await getItemDetails(itemType, itemId);
        itemType === 'book' ? displayBookDetails(item) : displayMovieDetails(item);
    }
});
