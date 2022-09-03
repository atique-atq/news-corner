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
        let date = singleNews.author.published_date.split(" ")[0]
        let formattedDate = new Date(date);


        div.innerHTML = `
        <div class="border rounded d-flex justify-content-between flex-column flex-lg-row bg-white shadow border-0">
            <div class="col-md-3">
                    <img src="${singleNews.thumbnail_url}" alt="related picture of a news">
  
            </div>
            <div class="col-md-9 ps-2 pe-4 d-flex align-items-center">
                <div>
                    <h5>${singleNews.title}</h5>
                    <small>${singleNews.details}</small>
                    <div class="d-flex flex-row justify-content-between align-items-center mt-3">
                        <!-- author part-->
                        <div class= "d-flex flex-row justify-content-between align-items-center">
                            <img style="width:30px; height:30px; border-radius:25px" src="${singleNews.author.img}" class="me-2" alt="picture of the author">
                        
                            <div>
                                <p class="p-0 m-0 fs-6"> ${getInfo(singleNews.author.name, 'Author name')}</p>
                                <p class="p-0 m-0 fs-6 text-muted">${getInfo(date, 'Date')}</p>
                            </div>
                        </div>

                        <!-- view part-->
                        <div class="pe-3">
                            <i class="fa-solid fa-eye"></i> <small>${getInfo(singleNews.total_view, 'View info')}</small>
                        </div>

                        <!-- load more part-->
                        <div class="me-5 text-primary fw-semibold">
                            Load more <i class="fa-solid fa-angles-right "></i>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    newsContainer.appendChild(div);    
    });
}

// returning author info
let getInfo = (value, valueTypeName) => value ? value : valueTypeName + ' not found';