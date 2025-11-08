let productS = document.getElementById("products");
let searchInput = document.getElementById("searchInput");
let pagination = document.getElementById("pagination");
let search = "";
let limit = 15;
let activePage = 0;
let total;

async function getProducts() {
  try {
    let data = await fetch(`https://dummyjson.com/products?skip=${activePage}&limit=${limit}&search?q=${search}`);
    let prod = await data.json();
    console.log(prod.products);
    total = prod.total;

    productS.innerHTML = " ";
    prod?.products.map((el) => {
        productS.innerHTML += `
            <a href="../pages/single.html?id=${el.id}" class="max-w-[400px] w-full flex flex-col gap-2">
                        <img class="w-full h-[180px] object-cover" src=${el.images[0]} alt="">
                        <div class="p-[8px] flex flex-col gap-1">
                            <h1 class="text-[18px] font-bold">${el.title}</h1>
                            <p class="text-[16px]">$${el.price}</p>
                        </div>
            </a>
        `
    })

    let pages = Math.ceil(total/limit);
    pagination.innerHTML="";
    pagination.innerHTML += `
             <button 
             Onclick="prev()"
             class="border-1 border-[gray]/30 text-[gray] w-[50px] h-[50px] flex items-center justify-center rounded-[50%] cursor-pointer py-2 "><<<</button>
                        <ul id="page" class="flex gap-3">

                        </ul>
            <button
            onClick="next()"
            class="border-1 border-[gray]/30 text-[gray] w-[50px] h-[50px] flex items-center justify-center rounded-[50%] cursor-pointer py-2 ">>>></button>
    `;
    let page = document.getElementById("page");
    for(let i = 1; i<= pages; i++){
        page.innerHTML += `
            <li 
            onClick="changePage(${i})"
            class="flex items-center justify-center hover:bg-black border w-[35px] h-[35px] rounded-[50%] cursor-pointer hover:text-white duration-500">
                ${i}
            </li>
        `
    }
  } catch (err) {
    console.log(err);
  }
}

getProducts();

searchInput.addEventListener("input" , (e) => {
    search = e.target.value;
    getProducts();
})

function next(){
    activePage += limit;
    getProducts();
}

function prev(){
    activePage -= limit;
    if(activePage < 0){
        activePage = 0;
    }
    getProducts();
}

function changePage(page){
    activePage = page * limit;
    getProducts();
}