loadCategories();

//calling api for news categories
function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => displayCategories(data.data.news_category))
    // .catch(error => displayError(error));
    
}

// displaying the categories
function displayCategories(news_categories) {
    let categories = document.getElementById('categories');     
    news_categories.forEach(category => {
        let div = document.createElement('div');
        div.innerHTML = `
        <h6 onclick="categoryDetails('${category.category_id}', '${category.category_name}')">${category.category_name}</h6>
        `
        categories.appendChild(div);
    });
    console.log(news_categories);
}

//calling api to load a single category's news
function categoryDetails(category_id, category_name) {
    //preveting category_id from being number automatically and keeping the original format
    let category_id_in_string = category_id.toString();
    if (category_id_in_string.length < 2) {
        category_id_in_string = "0" + category_id_in_string
    }
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id_in_string}`)
    .then(response => response.json())
    .then(data => displayCategoryDetails(data.data, category_name))
}

//displaying single category news details
function displayCategoryDetails(data, category_name) {
    console.log(data);
    let categoryItemCount = document.getElementById('category-item-count');
    categoryItemCount.innerHTML = `
    <p class="p-3 fw-semibold"> ${data.length} news found for the category of ${category_name} </p>
    `
}