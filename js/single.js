let path = new URLSearchParams(window.location.search);

let Id = path.get("id");

let singleProduct = document.querySelector("singleProducts");

async function getSingleProducts() {
    try{
        let res = await fetch(`https://dummyjson.com/products`);
        let single = await res.json();
        console.log(single);
        
     
    }catch(err){
        console.log(err);
    }
}