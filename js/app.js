const shopContent = document.getElementById("shopContent");
const inspectBasket = document.getElementById("inspectBasket");
const modalContainer = document.getElementById("modalContainer");

let basket = JSON.parse(localStorage.getItem("basket")) || [];

const getProducts = async() => {
    const response = await fetch("data.json");
    const data = await response.json();
   
    data.forEach((product)=>{
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

        Toastify({
            text: "Se ha agregado al carrito",
            duration: 2000,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
              textTransform: "uppercase",
              
            },
            offset: {
                x: "2rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: "2rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
            onClick: function(){} // Callback after click
          }).showToast();
          
    
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
};

getProducts();



const saveLocal = () => {
    localStorage.setItem("basket",  JSON.stringify(basket));
};
