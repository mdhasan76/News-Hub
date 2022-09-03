/* Show Category Menu Dynamic */
const loadedCategoryMenu = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const catagorys = await res.json();
    return catagorys.data.news_category;
}

const setCategory = async () => {
    const data = await loadedCategoryMenu();
    // console.log(data)
    const cetagoryContainer = document.getElementById('cetagory-container');

    data.forEach(element => {
        const li = document.createElement('li');
        // a.innerText = element.category_name;
        // li.classList.add('inline-block');
        // a.classList.add('font-medium');
        li.innerHTML = `
        <a class="p-3 font-medium" onclick="showProductUi('${element.category_id}')" href="#">${element.category_name}</a>
        `
        cetagoryContainer.append(li);
    });
}

setCategory();
// loadedCategoryMenu();


// show Product By category 
const showProduct = async (elementId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${elementId}`
    const res = await fetch(url);
    const data = await res.json();
    return data;
}


// showProduct();
const showProductUi = async (elementId) => {
    const data = await showProduct(elementId);
    const innerData = data.data;
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';
    // console.log(innerData);
    innerData.forEach(id => {
        const { title, details, author } = id;
        const published = author.published_date.slice(0, 10);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card lg:card-side bg-base-100 shadow-xl my-5">
                        <figure><img class='img-sizing' src=${id.image_url} alt="Album"></figure>
                        <div class="card-body">
                            <h2 class="card-title">${title.length > 70 ? title.slice(0, 70) : title}</h2>
                            <p>${details.length > 120 ? details.slice(0, 120) : details}...</p>
                            <div class="card-actions justify-between items-center">
                                <div>
                                    <img src="" alt="">
                                    <h3>
                                    ${author.name}</h3>
                                    <p>${published}</p>
                                </div>
                                <div>
                                    <i class="fa-regular fa-eye"></i>
                                    <span>View</span>
                                </div>
                                <button class="btn btn-primary">Listen</button>
                            </div>
                        </div>
                    </div>
        `
        productContainer.appendChild(div);
    })

    console.log(data)
}
showProductUi()


