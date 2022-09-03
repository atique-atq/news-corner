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
    // showing news result found count for this category
    categoryItemCount.innerHTML = `
    <p class="p-3 text-black-75"> <span class="fw-semibold text-black"> ${data.length} </span> news found for the category of <span class="fw-semibold fst-italic text-black"> ${category_name}</span></p>
    `
    displayNewsDetails(data);
}

let displayNewsDetails = (allNews) => {
    let newsContainer = document.getElementById('news-details-container');
    // clearing previous result 
    newsContainer.innerHTML = '';
    allNews.forEach(singleNews => {
        let div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
        <div class="border rounded d-flex justify-content-between flex-column flex-lg-row bg-white shadow border-0">
            <div class="col-md-3">
                    <img src="${singleNews.thumbnail_url}" alt="related picture of a news">
  
            </div>
            <div class="col-md-9 p-2 d-flex align-items-center">
                <div>
                    <h5>${singleNews.title}</h5>
                    <small>${singleNews.details}</small>
                    <div class="d-flex flex-row mt-3">
                        <div class= "d-flex flex-row">
                            <img style="width:30px; height:30px; border-radius:25px" src="${singleNews.author.img}" class="" alt="picture of the author">
                            <div>
                                <p>${getAuthorName(singleNews.author.name)}</p>
                            </div>
                        </div>
                        <div>


                    </div>
                    <h5 class="text-info mt-3">Price: 20$</h5>
                </div>
            </div>
        </div>
        `
    newsContainer.appendChild(div);    
    });
}


let getAuthorName = name => { 
    console.log(name);
}