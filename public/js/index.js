const favoritesList = document.querySelector('#favorites-ul');
const addFavoritesForm = document.querySelector('#add-favorite-form');

// add update/delete button and id value for these functions
const appendFavorite = favorite => {
    const li = document.createElement('li');
    li.textContent = `${favorite.type}: ${favorite.options}`;
    favoritesList.appendChild(li);
};

// endpoints
fetch('/api/v1/favorites')
    .then(res => res.json())
    .then(favorites => {
        favorites.forEach(appendFavorite);
    });

// event listeners
addFavoritesForm.addEventListener('submit', event => {
    event.preventDefault();

    const fave = new FormData(addFavoritesForm);

    fetch('/api/v1/favorites', {
        Method: 'POST',
        headers: {
            'Content-Type': 'applications/json',
        },
        body: JSON.stringify({
            type: fave.get('type'),
            options: fave.get('options'),
        }),
    })
        .then(res => res.json())
        .then(appendFavorite);
});
