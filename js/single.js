let path = new URLSearchParams(window.location.search);

let Id = path.get("id");

let singleProduct = document.getElementById("singleProducts");

async function getSingleProducts() {
    try{
        let res = await fetch(`https://dummyjson.com/products/${Id}`);
        let single = await res.json();
        console.log(single);
        
        [single].map((el) =>{
            singleProduct.innerHTML += `
                <img class="max-w-[600px] h-[700px] w-full object-cover" src="${el.images[0]}" alt="${el.title}">
                        <p class="font-bold text-[22px]">${el.title}</p>
                        <p class="max-w-[700px]">${el.description}</p>
                        <div class=" flex gap-4 items-center">
                          <p class="font-[500]">Price: ${el.price}</p>
                          <p class="font-[500]">Rating: ${el.rating}</p>
                </div>
            `
        })
     
    }catch(err){
        console.log(err);
    }
}

getSingleProducts();