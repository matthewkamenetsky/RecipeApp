const recipeList = document.getElementById('recipeList');
const user = JSON.parse(sessionStorage.getItem('user'));
const API_URL = process.env.APP_API_URL;
let favourites = Array.isArray(user?.favourites)
  ? user.favourites
  : typeof user?.favourites === 'string'
  ? JSON.parse(user.favourites)
  : [];

document.addEventListener('DOMContentLoaded', () => {
  displayFavourites();
});

async function displayFavourites() {
  try {
    for (const id of favourites) {
      const response = await fetch(`${API_URL}/api/recipe/${id}`);
      const recipe = await response.json();
      const starSymbol = '★';
      const starClass = 'favourite favourited';

      const listItem = document.createElement('li');
      listItem.innerHTML = `
                            <a href='recipe-view.html?id=${recipe.id}'>
                              <img class='recipeImg' src='${recipe.image}' alt='${recipe.title}' style='width: 120px; height: 120px'>
                            </a>          
                            <h4>${recipe.title}</h4>
                            <button class='${starClass}' onclick='toggleFavourite(this, ${recipe.id})'>${starSymbol}</button>
                          `;
      recipeList.appendChild(listItem);
    }
  } catch (error) {
    console.error('Error fetching favourites:', error);
  }
}

function toggleFavourite(button, recipeId) {
  if (!user) {
    alert('You must be logged in to favourite recipes.');
    return;
  }

  isFavourited = button.classList.toggle('favourited');
  button.textContent = isFavourited ? '★' : '☆';
  favourites = isFavourited ? [...favourites, recipeId] : favourites.filter((id) => id !== recipeId);
  user.favourites = favourites;
  sessionStorage.setItem('user', JSON.stringify(user));
}

window.addEventListener('beforeunload', () => {
  if (user) {
    fetch(`${API_URL}/api/users/${user.id}/favourites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favourites: user.favourites }),
    });
  }
});
