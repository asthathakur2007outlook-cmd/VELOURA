document.addEventListener("DOMContentLoaded", function () {
    let productQuantity = 1;

window.changeQuantity = function (change) {
    productQuantity = Math.max(1, productQuantity + change);

    document.getElementById("productQuantity").textContent = productQuantity;
};

    // LOGIN SYSTEM
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value;

            const users = JSON.parse(localStorage.getItem("velouraUsers")) || [];

            const user = users.find(function (item) {
                return item.email === email && item.password === password;
            });

            if (user) {
                localStorage.setItem("velouraLoggedIn", JSON.stringify({
                    name: user.name,
                    email: user.email
                }));

                alert("Welcome back, " + user.name + "!");
                window.location.href = "index.html";
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // ACCOUNT PAGE
    const customerName = document.getElementById("customerName");
    const customerEmail = document.getElementById("customerEmail");
    const logoutButton = document.getElementById("logoutButton");

    if (customerName && customerEmail) {
        const savedUser = localStorage.getItem("velouraLoggedIn");

        if (!savedUser) {
            alert("Please login first.");
            window.location.href = "login.html";
            return;
        }

        const user = JSON.parse(savedUser);

        customerName.textContent = user.name;
        customerEmail.textContent = user.email;
    }

    // LOGOUT
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("velouraLoggedIn");
            alert("You have logged out.");
            window.location.href = "index.html";
        });
    }

});
// SIGN UP SYSTEM
    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("fullname").value.trim();
            const email = document.getElementById("signupEmail").value.trim().toLowerCase();
            const password = document.getElementById("signupPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            const users = JSON.parse(localStorage.getItem("velouraUsers")) || [];

            if (users.some(user => user.email === email)) {
                alert("This email is already registered. Please login.");
                return;
            }

            users.push({
                name: name,
                email: email,
                password: password
            });

            localStorage.setItem("velouraUsers", JSON.stringify(users));

            alert("Your VELOURA account has been created successfully!");

            window.location.href = "login.html";
        });
    }
        // ============================
    // VELOURA PRODUCT COLLECTION
    // ============================

    const products = [
    // SKINCARE
    {id: 1, name: "Radiance Face Serum", category: "skincare", price: 599, image: "images/radiance-face-serum.jpg"},
    {id: 2, name: "Hydra Glow Moisturizer", category: "skincare", price: 699, image: "images/hydra-glow-moisturizer.jpg"},
    {id: 3, name: "Gentle Face Cleanser", category: "skincare", price: 399, image: "images/gentle-face-cleanser.jpg"},
    {id: 4, name: "Vitamin C Face Cream", category: "skincare", price: 549, image: "images/vitamin-c-face-cream.jpg"},
    {id: 5, name: "Daily Sunscreen SPF 50", category: "skincare", price: 499, image: "images/daily-sunscreen-spf-50.jpg"},
    {id: 6, name: "Overnight Repair Serum", category: "skincare", price: 799, image: "images/overnight-repair-serum.jpg"},

    // MAKEUP
    {id: 7, name: "Velvet Matte Lipstick", category: "makeup", price: 499, image: "images/velvet-matte-lipstick.jpg"},
    {id: 8, name: "Silk Touch Foundation", category: "makeup", price: 799, image: "images/silk-touch-foundation.jpg"},
    {id: 9, name: "Rose Glow Blush", category: "makeup", price: 449, image: "images/rose-glow-blush.jpg"},
    {id: 10, name: "Luxury Mascara", category: "makeup", price: 399, image: "images/luxury-mascara.jpg"},
    {id: 11, name: "Nude Eyeshadow Palette", category: "makeup", price: 899, image: "images/nude-eyeshadow-palette.jpg"},
    {id: 12, name: "Dewy Finish Highlighter", category: "makeup", price: 599, image: "images/dewy-finish-highlighter.jpg"},

    // BODY CARE
    {id: 13, name: "Silk Body Lotion", category: "bodycare", price: 499, image: "images/silk-body-lotion.jpg"},
    {id: 14, name: "Vanilla Body Butter", category: "bodycare", price: 649, image: "images/vanilla-body-butter.jpg"},
    {id: 15, name: "Rose Body Wash", category: "bodycare", price: 399, image: "images/rose-body-wash.jpg"},
    {id: 16, name: "Nourishing Hand Cream", category: "bodycare", price: 299, image: "images/nourishing-hand-cream.jpg"},
    {id: 17, name: "Luxury Body Scrub", category: "bodycare", price: 549, image: "images/luxury-body-scrub.jpg"},
    {id: 18, name: "Refreshing Body Mist", category: "bodycare", price: 599, image: "images/refreshing-body-mist.jpg"}
];

     // ADD PRODUCTS TO WISHLIST
    window.addToWishlist = function(productId) {
    let wishlist = JSON.parse(localStorage.getItem("velouraWishlist")) || [];

    if (wishlist.includes(productId)) {
        alert("This product is already in your wishlist!");
        return;
    }

    wishlist.push(productId);
    localStorage.setItem("velouraWishlist", JSON.stringify(wishlist));

    alert("Product added to your wishlist!");
};
// ADD PRODUCTS TO CART
window.addToCart = function(productId) {
    let cart = JSON.parse(localStorage.getItem("velouraCart")) || [];

    const quantityDisplay = document.getElementById("productQuantity");

    const quantity = quantityDisplay
        ? Number(quantityDisplay.textContent)
        : 1;

    for (let i = 0; i < quantity; i++) {
        cart.push(productId);
    }

    localStorage.setItem("velouraCart", JSON.stringify(cart));

    alert(quantity + " product(s) added to your shopping bag!");

    if (quantityDisplay) {
        quantityDisplay.textContent = 1;
    }
};

// VELOURA PRODUCT DETAILS PAGE

const productDetails = document.getElementById("productDetails");

if (productDetails) {

    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));

    const product = products.find(p => p.id === productId);

    if (product) {

        productDetails.innerHTML = `
            <div class="product-details-card">

                <div class="product-details-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="product-details-info">

                    <p>${product.category.toUpperCase()}</p>

                    <h2>${product.name}</h2>

                    <h3>₹${product.price}</h3>

                    <p>
                        Discover the beauty of luxury with VELOURA.
                        A carefully selected essential for your beauty
                        and self-care routine.
                    </p>
                    <h3>Why You'll Love It</h3>

<ul class="product-benefits">
    <li>Designed for your daily self-care routine</li>
    <li>Premium VELOURA-inspired experience</li>
    <li>A beautiful addition to your beauty collection</li>
</ul>
<h3>Key Ingredients</h3>

<div class="product-ingredients">
    <p>Carefully selected ingredients for your beauty routine.</p>
    <span>Quality</span>
    <span>Care</span>
    <span>Elegance</span>
</div>
<h3>How to Use</h3>

<div class="product-how-to-use">
    <div class="use-step">
        <span>01</span>
        <p>Prepare your skin or body for your beauty routine.</p>
    </div>

    <div class="use-step">
        <span>02</span>
        <p>Apply the product as needed.</p>
    </div>

    <div class="use-step">
        <span>03</span>
        <p>Enjoy your VELOURA self-care experience.</p>
    </div>
</div>
<div class="quantity-selector">
    <button onclick="changeQuantity(-1)">−</button>
    <span id="productQuantity">1</span>
    <button onclick="changeQuantity(1)">+</button>
</div>

<button onclick="addToCart(${product.id})">Add to Bag</button>

                    <button onclick="addToWishlist(${product.id})">
                        ♡ Add to Wishlist
                    </button>

                    <p>Elegance in Every Glow.</p>

                </div>

            </div>
        `;

    } else {
        productDetails.innerHTML = `
            <h2>Product Not Found</h2>
            <a href="shop.html">Return to Shop</a>
        `;
    }
}

    // DISPLAY PRODUCTS
    const productGrid = document.getElementById("productGrid");

    function displayProducts(category) {
    if (!productGrid) return;

    const filteredProducts = category === "all"
        ? products
        : products.filter(product => product.category === category);

    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">

            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>
            <button type="button"
    onclick="window.location.href='product-details.html?id=${product.id}'">
    View Details
</button>

            <button type="button" onclick="addToWishlist(${product.id})">
                ♡ Add to Wishlist
            </button>

            <button type="button" onclick="addToCart(${product.id})">
                Add to Bag
            </button>

        </div>
    `).join("");
}

    // CATEGORY FILTER
    window.filterProducts = function(category) {
        displayProducts(category);
    };

    // INITIAL DISPLAY
    if (productGrid) {
        displayProducts("all");
    }
    // DISPLAY WISHLIST
const wishlistContainer = document.getElementById("wishlistContainer");

function displayWishlist() {
    if (!wishlistContainer) return;

    const wishlist = JSON.parse(localStorage.getItem("velouraWishlist")) || [];

    const savedProducts = products.filter(product =>
        wishlist.includes(product.id)
    );

    if (savedProducts.length === 0) {
        wishlistContainer.innerHTML = `
            <p>Your wishlist is currently empty.</p>
            <a href="shop.html">Explore Collection</a>
        `;
        return;
    }

    wishlistContainer.innerHTML = savedProducts.map(product => `
        <div class="product-card">

            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <h3>${product.name}</h3>
            <p>₹${product.price}</p>

            <button onclick="removeFromWishlist(${product.id})">
                Remove
            </button>

            <button onclick="addToCart(${product.id})">
                Add to Bag
            </button>

        </div>
    `).join("");
}

// REMOVE FROM WISHLIST
window.removeFromWishlist = function(productId) {
    let wishlist = JSON.parse(localStorage.getItem("velouraWishlist")) || [];

    wishlist = wishlist.filter(id => id !== productId);

    localStorage.setItem("velouraWishlist", JSON.stringify(wishlist));

    displayWishlist();
};

if (wishlistContainer) {
    displayWishlist();
}
// DISPLAY SHOPPING BAG
const cartContainer = document.getElementById("cartContainer");

function displayCart() {
    if (!cartContainer) return;

    const cart = JSON.parse(localStorage.getItem("velouraCart")) || [];

    const quantities = {};

    cart.forEach(id => {
        quantities[id] = (quantities[id] || 0) + 1;
    });

    const cartItems = Object.keys(quantities).map(id => ({
        product: products.find(p => p.id === Number(id)),
        quantity: quantities[id]
    })).filter(item => item.product);

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <p>Your shopping bag is currently empty.</p>
            <a href="shop.html">Explore Collection</a>
        `;
        return;
    }

    let total = 0;

    cartContainer.innerHTML = cartItems.map(item => {
        const product = item.product;
        const quantity = item.quantity;
        const subtotal = product.price * quantity;

        total += subtotal;

        return `
            <div class="product-card">

                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}</p>

                <div class="cart-quantity-controls">
                    <button onclick="updateCartQuantity(${product.id}, -1)">−</button>
                    <span>${quantity}</span>
                    <button onclick="updateCartQuantity(${product.id}, 1)">+</button>
                </div>

                <p>Subtotal: ₹${subtotal}</p>

                <button onclick="removeFromCart(${product.id})">
                    Remove
                </button>

            </div>
        `;
    }).join("") + `
        <h2>Total: ₹${total}</h2>

        <button onclick="window.location.href='checkout.html'">
            Proceed to Checkout
        </button>
    `;
}
// UPDATE CART QUANTITY
window.updateCartQuantity = function(productId, change) {
    let cart = JSON.parse(localStorage.getItem("velouraCart")) || [];

    if (change === 1) {
        cart.push(productId);
    } else {
        const index = cart.indexOf(productId);

        if (index !== -1) {
            cart.splice(index, 1);
        }
    }

    localStorage.setItem("velouraCart", JSON.stringify(cart));

    displayCart();
};

// REMOVE FROM CART
window.removeFromCart = function(productId) {
    let cart = JSON.parse(localStorage.getItem("velouraCart")) || [];

    const index = cart.indexOf(productId);

    if (index !== -1) {
        cart.splice(index, 1);
    }

    localStorage.setItem("velouraCart", JSON.stringify(cart));
    displayCart();
};

if (cartContainer) {
    displayCart();
}

// REMOVE FROM CART
window.removeFromCart = function(productId) {
    let cart = JSON.parse(localStorage.getItem("velouraCart")) || [];

    const index = cart.indexOf(productId);

    if (index !== -1) {
        cart.splice(index, 1);
    }

    localStorage.setItem("velouraCart", JSON.stringify(cart));
    displayCart();
};

if (cartContainer) {
    displayCart();
}
// VELOURA COUPON SYSTEM
window.applyCoupon = function() {
    const code = document.getElementById("couponCode").value.trim().toUpperCase();
    const message = document.getElementById("couponMessage");

    if (code === "VELOURA10") {
        localStorage.setItem("velouraDiscount", "10");
        message.textContent = "Congratulations! 10% discount applied!";
        message.style.color = "green";
    } else {
        localStorage.removeItem("velouraDiscount");
        message.textContent = "Invalid coupon code. Please try again.";
        message.style.color = "red";
    }

    updateCheckoutSummary();
};

// UPDATE CHECKOUT PRICE SUMMARY
window.updateCheckoutSummary = function() {

    const cart = JSON.parse(localStorage.getItem("velouraCart")) || [];

    const subtotal = cart.reduce((sum, id) => {
        const product = products.find(p => p.id === id);
        return sum + (product ? product.price : 0);
    }, 0);

    const discountPercent = Number(localStorage.getItem("velouraDiscount")) || 0;

    const discountAmount = subtotal * discountPercent / 100;

    const finalTotal = subtotal - discountAmount;

    document.getElementById("checkoutSubtotal").textContent = subtotal;
    document.getElementById("checkoutDiscount").textContent = discountAmount;
    document.getElementById("checkoutTotal").textContent = finalTotal;
};
window.addEventListener("load", function() {
    if (document.getElementById("checkoutSubtotal")) {
        updateCheckoutSummary();
    }
});

// CHECKOUT SYSTEM
const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const cart = JSON.parse(localStorage.getItem("velouraCart")) || [];

        if (cart.length === 0) {
            alert("Your shopping bag is empty!");
            window.location.href = "shop.html";
            return;
        }
        const subtotal = cart.reduce((sum, id) => {
    const product = products.find(p => p.id === id);
    return sum + (product ? product.price : 0);
}, 0);

const discountPercent = Number(localStorage.getItem("velouraDiscount")) || 0;

const discountAmount = subtotal * discountPercent / 100;

const finalTotal = subtotal - discountAmount;

        const order = {
            name: document.getElementById("fullName").value,
            email: document.getElementById("checkoutEmail").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            pincode: document.getElementById("pincode").value,
            products: cart,
subtotal: subtotal,
discount: discountAmount,
total: finalTotal,
coupon: discountPercent > 0 ? "VELOURA10" : "None",
date: new Date().toLocaleString()
        };

        let orders = JSON.parse(localStorage.getItem("velouraOrders")) || [];

orders.push(order);

localStorage.setItem("velouraOrders", JSON.stringify(orders));
localStorage.setItem("velouraLastOrder", JSON.stringify(order));
        localStorage.removeItem("velouraCart");
        localStorage.removeItem("velouraDiscount");

        window.location.href = "order-confirmation.html";
    });
}
// DISPLAY MY ORDERS
const ordersContainer = document.getElementById("ordersContainer");

if (ordersContainer) {
    const orders = JSON.parse(localStorage.getItem("velouraOrders")) || [];

    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <p>You haven't placed any orders yet.</p>
            <a href="shop.html">Explore Collection</a>
        `;
    } else {
        ordersContainer.innerHTML = orders.map((order, index) => {

            const orderProducts = (order.products || [])
                .map(id => products.find(p => p.id === id))
                .filter(Boolean);

            const calculatedSubtotal = orderProducts.reduce((sum, product) => {
    return sum + product.price;
}, 0);

const subtotal = order.subtotal ?? calculatedSubtotal;
const discount = order.discount ?? 0;
const total = order.total ?? calculatedSubtotal;
const coupon = order.coupon || "None";

            return `
                <div class="product-card">

                    <h3>Order #${index + 1}</h3>
                    <p>Customer: ${order.name}</p>
                    <p>Date: ${order.date}</p>
                    <p>Items: ${orderProducts.length}</p>
                    <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
<p>Discount: ₹${discount.toFixed(2)}</p>
<p>Total Paid: ₹${total.toFixed(2)}</p>
<p>Coupon: ${coupon}</p>
                    <p class="order-status">Order Placed</p>

                    <p class="delivery-status">Delivery Status: Processing</p>
                    <div class="delivery-tracker">

    <div class="delivery-step completed">
        <div class="step-icon">✓</div>
        <p>Placed</p>
    </div>

    <div class="delivery-line"></div>

    <div class="delivery-step">
        <div class="step-icon">2</div>
        <p>Packed</p>
    </div>

    <div class="delivery-line"></div>

    <div class="delivery-step">
        <div class="step-icon">3</div>
        <p>Shipped</p>
    </div>

    <div class="delivery-line"></div>

    <div class="delivery-step">
        <div class="step-icon">4</div>
        <p>Delivered</p>
    </div>

</div>

                    <h3>Products Ordered</h3>

                    <div>
                        ${orderProducts.map(product => `
                            <div style="display:flex; align-items:center; gap:15px; margin:15px 0; text-align:left;">

                                <img
                                    src="${product.image}"
                                    alt="${product.name}"
                                    style="width:90px; height:90px; object-fit:contain; border-radius:8px; background:#F5EFE7;"
                                >

                                <div>
                                    <h3>${product.name}</h3>
                                    <p>₹${product.price}</p>
                                </div>

                            </div>
                        `).join("")}
                    </div>

                </div>
            `;
        }).join("");
    }
}

// ORDER CONFIRMATION SUMMARY
const lastOrder = JSON.parse(localStorage.getItem("velouraLastOrder"));

if (lastOrder && document.getElementById("confirmedSubtotal")) {
    document.getElementById("confirmedSubtotal").textContent = lastOrder.subtotal.toFixed(2);

    document.getElementById("confirmedDiscount").textContent = lastOrder.discount.toFixed(2);

    document.getElementById("confirmedTotal").textContent = lastOrder.total.toFixed(2);

    document.getElementById("confirmedCoupon").textContent = lastOrder.coupon;
}