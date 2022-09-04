//calling api for news categories
let loadCategories = () => {
    document.getElementById('error-message').style.display = 'none';
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => displayCategories(data.data.news_category))
    .catch(error => displayError(error));
    
}

//displaying error
let displayError = error => {
    document.getElementById('error-message').style.display = 'block';
    alert(error);
}

loadCategories();

// displaying the categories
function displayCategories (news_categories) {
    let categories = document.getElementById('categories');     
    news_categories.forEach(category => {
        let div = document.createElement('div');
        div.innerHTML = `
        <p onclick="categoryDetails('${category.category_id}', '${category.category_name}')">${category.category_name}</p>
        `
        categories.appendChild(div);
    });
}

//calling api to load a single category's news
function categoryDetails(category_id, category_name) {
    toggleSpinner('block');
    document.getElementById('error-message').style.display = 'none';
    //preveting category_id from being number automatically and keeping the original format
    let category_id_in_string = category_id.toString();
    if (category_id_in_string.length < 2) {
        category_id_in_string = "0" + category_id_in_string
    }
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id_in_string}`)
    .then(response => response.json())
    .then(data => displayCategoryDetails(data.data, category_name))
    .catch(error => displayError(error));
}

//display spinner
let toggleSpinner = displayStatus => {
    document.getElementById('spinner').style.display = displayStatus;
}

//displaying single category news details
function displayCategoryDetails(data, category_name) {
    let categoryItemCount = document.getElementById('category-item-count');
    categoryItemCount.innerHTML = '';
    toggleSpinner('none');
    // showing news result found count for this category
    categoryItemCount.innerHTML = showResultCount(data, category_name); 
    displayNewsDetails(data);
}

let showResultCount = (data, category_name) => {
    if (data.length < 1) {
        return `No news found for the category of ${category_name}`;
    }
    else {
        return `
        <p class="p-3 text-black-75"> <span class="fw-semibold text-black"> ${data.length} </span> news found for the category of <span class="fw-semibold fst-italic text-black"> ${category_name}</span></p>
        `  
    }
}

let displayNewsDetails = (allNews) => {
    let newsContainer = document.getElementById('news-details-container');
    //sorting all news with total view count
    allNews.sort(function(a, b){
        return b.total_view - a.total_view;
    });

    // clearing previous result 
    newsContainer.innerHTML = '';
    allNews.forEach(singleNews => {
        let div = document.createElement('div');
        div.classList.add('col');
        let date = singleNews.author.published_date?.split(" ")[0];
        let description = displayDescription(singleNews.details);

        div.innerHTML = `
        <div class="border rounded d-flex justify-content-between flex-column flex-lg-row bg-white shadow border-0">
            <div class="col-lg-3 text-center text-lg-start">
                    <img src="${singleNews.thumbnail_url}" class="h-100 w-75 w-md-50 w-lg-100 p-0 p-md-5p-lg-0" alt="related picture of a news">
            </div>

            <div class="col-lg-9 ps-2 pe-4 d-flex align-items-center mt-3 p-3">
                <div>
                    <h5>${singleNews.title}</h5>
                    <small>${description}</small>
                    <div class="d-flex flex-row justify-content-between align-items-center mt-3">
                        <!-- author part-->
                        <div class= "d-flex flex-row justify-content-between align-items-center">
                            <!-- image part-->
                            <img style="width:30px; height:30px; border-radius:25px" src="${singleNews.author.img}" class="me-1" alt="picture of the author">

                            <!-- text part-->
                            <div>
                                <p class="p-0 m-0 fs-6"> ${getInfo(singleNews.author.name, 'Author name')}</p>
                                <p class="p-0 m-0 fs-6 text-muted">${getInfo(date, 'Date')}</p>
                            </div>
                        </div>

                        <!-- view part-->
                        <div class="pe-3">
                            <i class="fa-solid fa-eye"></i> <small>${getInfo(singleNews.total_view, 'View info')}</small>
                        </div>

                        <!-- Read more part-->
                        <div class="me-5 ">
                            <button type="button" class="btn btn-transparent text-info fw-semibold" onclick="loadModal()">Read more <i class="fa-solid fa-angles-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    newsContainer.appendChild(div);    
    });
}

let displayDescription = text => (text.length > 400 ? text.slice(0, 400) + ' ...' : text)
        
// returning author info
let getInfo = (value, valueTypeName) => value ? value : valueTypeName + ' not found';

// load modal
function loadModal (response){
    // console.log(Object.keys(response));

};