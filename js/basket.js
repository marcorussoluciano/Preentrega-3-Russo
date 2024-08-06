const paintBasket = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);
    
    const modalButton = document.createElement("h1");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";
    
    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })
    
    modalHeader.append(modalButton);
    
    basket.forEach((product) => {
    let basketContent = document.createElement("div")
    basketContent.classname = "modal-content";
    basketContent.innerHTML = `
        <h3>${product.name}</h3>
        <p>$ ${product.price}<p>
        <p>Cantidad: ${product.amount}<p>
        `;
    
    modalContainer.append(basketContent);

    let eliminar = document.createElement("span");

    eliminar.innerText = "❌";
    eliminar.className = "delete-product"
    basketContent.append(eliminar);

    eliminar.addEventListener("click", deleteProduct);
    });
    
    const total = basket.reduce((acc, el) => acc + el.price * el.amount, 0);
    
    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar $${total}`;
    modalContainer.append(totalBuying);
};

inspectBasket.addEventListener("click", paintBasket);

const deleteProduct = () => {
    const foundId = basket.find((element) => element.id);

    basket = basket.filter((basketId) => {
        return basketId !== foundId;
    });

    paintBasket();
    saveLocal();
}


