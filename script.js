document.addEventListener('DOMContentLoaded', () => {
    // 1. Display Hostname
    const hostnameEl = document.getElementById('display-hostname');
    if (window.location.hostname) {
        hostnameEl.textContent = window.location.hostname;
    } else {
        hostnameEl.textContent = 'Unknown (Local File)';
    }

    // 2. Sample Product Data (would come from a backend API in a real app)
    const products = [
        { id: 1, name: 'Stylish T-Shirt', price: 19.99, image: 'https://via.placeholder.com' },
        { id: 2, name: 'Fancy Headphones', price: 89.50, image: 'https://via.placeholder.com' },
        { id: 3, name: 'Cool Sneakers', price: 55.00, image: 'https://via.placeholder.com' },
        { id: 4, name: 'Minimalist Watch', price: 120.00, image: 'https://via.placeholder.com' },
    ];

    const productGrid = document.getElementById('product-grid');
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartSidebar = document.getElementById('cart-sidebar');
    const viewCartBtn = document.getElementById('view-cart');
    const closeCartBtn = document.getElementById('close-cart');
    let cart = [];

    // 3. Render Products
    function renderProducts() {
        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productGrid.appendChild(card);
        });
    }

    // 4. Add to Cart Function
    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCart();
            alert(`${product.name} added to cart!`);
        }
    };

    // 5. Update Cart Display
    function updateCart() {
        cartItemsEl.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsEl.appendChild(li);
            total += item.price;
        });
        cartTotalEl.textContent = total.toFixed(2);
    }

    // 6. Cart Visibility Toggles
    viewCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('hidden');
        cartSidebar.classList.add('visible');
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('visible');
        // Add a slight delay before adding 'hidden' to allow transition to finish
        setTimeout(() => {
            cartSidebar.classList.add('hidden');
        }, 300);
    });

    // Initialize the page
    renderProducts();
});
