const apiUrl = 'https://fakestoreapi.com/products'; 
let products = [];
let cart = [];


const loadProducts = async () => {
    try {
        const response = await fetch(apiUrl);
        products = await response.json();
        console.log(products); 
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};


const displayProducts = (productsList) => {
    const container = document.getElementById('products-section'); 
    container.innerHTML = '';
    productsList.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        container.appendChild(productElement);
    });
};


const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
};


const increaseQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    }
    updateCart();
};


const decreaseQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    updateCart();
};


const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
};


const updateCart = () => {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <p>${item.title} - $${item.price} x ${item.quantity}</p>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <button onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        `;
        cartContainer.appendChild(cartItemElement);
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total-price').textContent = `Total: $${totalPrice.toFixed(2)}`;
};


const toggleCart = () => {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
};


const filterByPrice = (order) => {
    const sortedProducts = [...products].sort((a, b) => {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    displayProducts(sortedProducts);
};


const filterByCategory = (category) => {
    if (category === "") {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
};


const checkout = () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    
    alert(`Compra realizada con éxito. Total: $${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`);

   
    cart = [];
    updateCart();
};


document.getElementById('checkout-button').addEventListener('click', checkout);


window.onload = loadProducts;






