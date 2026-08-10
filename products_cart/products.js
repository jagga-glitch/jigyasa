const productContainer =
    document.getElementById("showProducts");

const cartButton =
    document.getElementById("cartButton");

const itemCount =
    document.getElementById("itemCount");

const cartModal =
    document.getElementById("cartModal");

const modalContent =
    document.getElementById("modalContent");

const closeButton =
    document.getElementById("closeButton");

const cartTotal =
    document.getElementById("cartTotal");

const clearCart =
    document.getElementById("clearCart");


let cart = [];



fetch("https://dummyjson.com/products")

    .then(response => response.json())

    .then(data => {

        displayProducts(data.products);

    })

    .catch(error => {

        console.log(error);

    });




function displayProducts(products) {

    productContainer.innerHTML = "";

    products.forEach(product => {

        const card =
            document.createElement("div");

        card.classList.add("product_card");

        card.innerHTML = `
            
            <img 
                src="${product.thumbnail}"
                alt="${product.title}"
                ><br>
            
            <h3>
                ${product.title}
            </h3>

            <p>
                $${product.price}
            </p>
            <span style="font-size:15px;color:grey">Rating:${ratingStars(product.rating)}</span>
            <button class="addToCart">
                Add to Cart
            </button>

        `;


        const addButton =
            card.querySelector(".addToCart");


        addButton.addEventListener("click", () => {

    const existingProduct = cart.find(
        item => item.id === product.id
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCartCount();
    displayCart();
});


        productContainer.appendChild(card);

    });

}

function ratingStars(product_rating){
      const stars= Math.floor(product_rating);
      return "⭐".repeat(stars);
}
function updateCartCount() {

    itemCount.innerText = cart.length;

}
cartButton.addEventListener("click", () => {

    displayCart();

    cartModal.style.display = "flex";

});
function displayCart() {

    modalContent.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        modalContent.innerHTML = `
            <h3>Your cart is empty</h3>
        `;

        cartTotal.innerText = "0.00";

        return;

    }


    cart.forEach((product, index) => {

    total += product.price * product.quantity;

    const cartCard = document.createElement("div");

    cartCard.classList.add("cartCard");

    cartCard.innerHTML = `
        <img 
            src="${product.thumbnail}"
            alt="${product.title}"
        >

        <div>
            <h3>${product.title}</h3>

            <p>
                $${product.price}
            </p>

            <div class="quantity">

                <button class="decrease">−</button>

                <span>${product.quantity}</span>

                <button class="increase">+</button>

            </div>

            <button class="removeItem">
                Remove
            </button>

        </div>
    `;

    const increaseButton =
        cartCard.querySelector(".increase");

    const decreaseButton =
        cartCard.querySelector(".decrease");

    const removeButton =
        cartCard.querySelector(".removeItem");


    // PLUS
    increaseButton.addEventListener("click", () => {

        product.quantity++;

        updateCartCount();

        displayCart();

    });


    // MINUS
    decreaseButton.addEventListener("click", () => {

        if (product.quantity > 1) {

            product.quantity--;

        } else {

            cart.splice(index, 1);

        }

        updateCartCount();

        displayCart();

    });


    // REMOVE
    removeButton.addEventListener("click", () => {

        cart.splice(index, 1);

        updateCartCount();

        displayCart();

    });


    modalContent.appendChild(cartCard);

});

    cartTotal.innerText =
        total.toFixed(2);

}

closeButton.addEventListener("click", () => {

    cartModal.style.display = "none";

});


clearCart.addEventListener("click", () => {

    cart = [];

    updateCartCount();

    displayCart();

});

cartModal.addEventListener("click", (event) => {

    if (event.target === cartModal) {

        cartModal.style.display = "none";

    }

});