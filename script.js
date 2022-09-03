/* Show Category Menu Dynamic */
const loadedCategoryMenu = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const catagorys = await res.json();
        return catagorys.data.news_category;
    }
    catch (error) {
        console.log(error)
    }
}

const setCategory = async () => {
    const data = await loadedCategoryMenu();
    const cetagoryContainer = document.getElementById('cetagory-container');

    // const countCatagory = document.getElementById('count-catagory');
    // const catagorysArr = [];



    data.forEach(element => {
        console.log(element)
        const li = document.createElement('li');
        // catagorysArr.push(element.);
        // console.log(catagorysArr)
        // countCatagory.innerHTML = `
        // <h3 class="p-4 font-semibold text-2xl">${catagorysArr.length} items found for category Entertainment </h3>
        // `

        li.innerHTML = `
        <a class="p-3 font-medium" onclick="showProductUi('${element.category_id}')" href="#">${element.category_name}</a>
        `
        cetagoryContainer.append(li);
    });
}

setCategory();


// show Product By category 
const showProduct = async (elementId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${elementId}`
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const showProductUi = async (elementId) => {

    //spiner part
    const spiner = document.getElementById('spiner');
    spiner.classList.remove('hidden');


    const data = await showProduct(elementId);
    const innerData = data.data;
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    const countCatagory = document.getElementById('count-catagory');
    const catagorysArr = [];
    // console.log(innerData);

    innerData.forEach(id => {
        const { title, details, author, total_view, _id } = id;
        const published = author.published_date;
        // console.log(author)

        catagorysArr.push(innerData.length);
        countCatagory.innerHTML = `
        <h3 class="p-4 font-semibold text-2xl">${catagorysArr.length} items found for category ${innerData.category_name} </h3>
        `


        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card lg:card-side bg-base-100 shadow-xl my-5">
            <figure>
                <img class='img-sizing' src=${id.image_url} alt="Album">
            </figure>
            <div class="card-body">
                <h2 class="card-title">${title.length > 100 ? title.slice(0, 100) : title}...</h2>
                <p class="py-4">${details.length > 120 ? details.slice(0, 120) : details}...</p>
                <div class="card-actions justify-between items-center">
                    <div class="flex items-center">
                        <div><img src=${author.img} class="h-8 w-8 rounded-full" alt=""></div>
                        <div class="pl-2">
                            <h3 class="font-medium"> ${author.name}</h3>
                            <p class="text-sm">${published === null ? "No Date" : published.slice(0, 10)}</p></div>
                        </div>
                        <div>
                            <i class="fa-regular fa-eye"></i>
                            <span>${total_view}</span>
                        </div>
                    <label for="my-modal-3" class="btn modal-btn" onclick="details('${_id}')">Details</label>
                </div>
            </div>
        </div>
        `
        productContainer.appendChild(div);
    })
    spiner.classList.add('hidden');
}


// details Api 

const details = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    const dataId = data.data[0].details;
    const { name, img, published_date } = data.data[0].author;
    const { details, rating, total_view } = data.data[0];
    const modalTitle = document.getElementById('modal-title');
    const modaltext = document.getElementById('modal-text');
    // modalTitle.innerText = `${data.data[0].title}`;
    // modaltext.innerText = `${dataId}`;
    // const div = document.createElement('div');
    modalTitle.innerHTML = `
    <img src="${data.data[0].image_url}">
    <p class=py-5>${data.data[0].title}</p>
    `
    modaltext.innerHTML = `<p>${dataId}</p>
    <div class="text-center pt-3">
        <div>
            <img src=${img} class="h-28 w-28 rounded-full mx-auto" alt="">
        </div>
        <div class="pl-2">
             <h3 class="font-medium">${name}</h3>
             <p>${published_date}</p></div>
        </div>
        <div class="text-center">
            <i class="fa-regular fa-eye"></i>
            <span class=font-semibold>${total_view}</span>
        </div>
        <div class="rating text-center block">
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400"  checked />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
        </div>
    </div>`


}
showProductUi()


