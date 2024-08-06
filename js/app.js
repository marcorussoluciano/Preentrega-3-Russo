const shopContent = document.getElementById("shopContent");
const inspectBasket = document.getElementById("inspectBasket");
const modalContainer = document.getElementById("modalContainer");

let basket = JSON.parse(localStorage.getItem("basket")) || [];

products.forEach((product)=>{
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = ` 
    <img src="${product.img}">
    <h3>${product.name}</h3>
    <p class="price">$${product.price}</p>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "sumar al carrito";
    comprar.className = "buy";

    content.append(comprar);

    comprar.addEventListener("click", () => {
    const repeat = basket.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat){
        basket.map((prod) => {
            if(prod.id === product.id) {
                prod.amount++;
            }
        });
    } else {
        basket.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            amount: product.amount,
        });
    }
        console.log(basket);
        saveLocal();
    })
});

const saveLocal = () => {
    localStorage.setItem("basket",  JSON.stringify(basket));
};
