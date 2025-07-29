document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const results = document.getElementById('meal-results');

  async function searchMeals(query) {
    if (!query) {
      results.innerHTML = "";
      return;
    }

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();

      results.innerHTML = ''; 

      if (data.meals) {
        data.meals.forEach(meal => {
          const mealDiv = document.createElement('div');
          mealDiv.classList.add('meal-card');
          mealDiv.setAttribute('data-meal-id', meal.idMeal);

          mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200">
            <h3>${meal.strMeal}</h3>
          `;

          results.appendChild(mealDiv);
        });
      } else {
        results.innerHTML = `<p>No meals found for "${query}".</p>`;
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
      results.innerHTML = `<p>Something went wrong. Please try again.</p>`;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = input.value.trim();
    searchMeals(searchTerm);
  });

  input.addEventListener('input', () => {
    const query = input.value.trim();
    searchMeals(query);
  });

});


const categorySelect = document.getElementById('category-select');

  categorySelect.addEventListener('change', async () => {
    const selectedCategory = categorySelect.value;
    const results = document.getElementById('meal-results');

    if (!selectedCategory) {
      results.innerHTML = "";
      return;
    }

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
      const data = await response.json();

      results.innerHTML = '';

      if (data.meals) {
        data.meals.forEach(meal => {
          const mealDiv = document.createElement('div');
          mealDiv.classList.add('meal-card');
          mealDiv.setAttribute('data-meal-id', meal.idMeal);

          mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200">
            <h3>${meal.strMeal}</h3>
          `;

          results.appendChild(mealDiv);
        });
      } else {
        results.innerHTML = `<p>No meals found in "${selectedCategory}" category.</p>`;
      }
    } catch (error) {
      console.error('Error fetching category meals:', error);
      results.innerHTML = `<p>Failed to load meals from category.</p>`;
    }
  });

