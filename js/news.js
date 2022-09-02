console.log('hello')

loadCategories();

function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => displayCategories(data.data.news_category))
    .catch(error => displayError(error));
    
}

function displayCategories(news_categories) {
    let categories = document.getElementById('categories'); 
    
    news_categories.forEach(category => {
        let div = document.createElement('div');
        div.innerHTML = `
        <h6>${category.category_name}</h6>
        `
        categories.appendChild(div);
    });
    console.log(data.data.news_category);
}