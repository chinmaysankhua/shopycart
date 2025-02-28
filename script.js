// Sample product data
const products = [
  {
    id: 1,
    name: "Gaming Laptop",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300",
    quantity: 1,
  },
  {
    id: 2,
    name: "iPhone 14 Pro",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=300",
    quantity: 1,
  },
  {
    id: 3,
    name: "Sony WH-1000XM4",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300",
    quantity: 1,
  },
  {
    id: 4,
    name: "iPad Air",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300",
    quantity: 1,
  },
  {
    id: 5,
    name: "Apple Watch Series 8",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300",
    quantity: 1,
  },
  {
    id: 6,
    name: "PS5 Console",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300",
    quantity: 1,
  },
  {
    id: 7,
    name: "AirPods Pro",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=300",
    quantity: 1,
  },
  {
    id: 8,
    name: "LG 4K Monitor",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300",
    quantity: 1,
  },
  {
    id: 9,
    name: "Corsair K70 Keyboard",
    price: 129.99,
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRH5zYlJcNeyFCd1yC3_-iGnEqo6CofYaWPvd8E_YvlG-LQmiIyLGb04wmhbcH-D71YG1rVf9yQOmKRFUguVyHc-2iDJNOW9KMDcm28u9dS5P_sAThkHkJo&usqp=CAE",
    quantity: 1,
  },
  {
    id: 10,
    name: "Logitech G Pro Mouse",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300",
    quantity: 1,
  },
  {
    id: 11,
    name: "Logitech Webcam",
    price: 89.99,
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSnWUuV8wO4RhaAunQtKF8S8g5LzRaM5xcmzQ8v5rnEfFu177DZfontj6eVIZDPKUCpWz-pkGgPLCGt7nxuDIb00k6WWx-zROOsFV_dWUCWGMEC5FC07R0f&usqp=CAE",
    quantity: 1,
  },
  {
    id: 12,
    name: "Samsung T7 SSD",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300",
    quantity: 1,
  },
  {
    id: 13,
    name: "RTX 4070 GPU",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300",
    quantity: 1,
  },
  {
    id: 14,
    name: "NETGEAR WiFi 6 Router",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300",
    quantity: 1,
  },
  {
    id: 15,
    name: "JBL Bluetooth Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300",
    quantity: 1,
  },
];

// Shopping cart state
let cart = [];

// DOM Elements
const productsGrid = document.getElementById("products-grid");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");
const averagePrice = document.getElementById("average-price");
const totalItems = document.getElementById("total-items");
const clearCartBtn = document.getElementById("clear-cart");
const priceFilter = document.getElementById("price-filter");
const sortSelect = document.getElementById("sort-select");
const cartSection = document.getElementById("cart-section");
const cartToggle = document.getElementById("cart-toggle");
const closeCart = document.getElementById("close-cart");
const overlay = document.querySelector(".overlay");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Initialize the store
function initializeStore() {
  displayProducts(products);
  updateCartUI();
  setupCartToggle();
  setupSearch();
}

// Setup cart toggle functionality
function setupCartToggle() {
  cartToggle.addEventListener("click", () => {
    cartSection.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeCart.addEventListener("click", closeCartPanel);
  overlay.addEventListener("click", closeCartPanel);
}

// Close cart panel
function closeCartPanel() {
  cartSection.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Display products
function displayProducts(productsToShow) {
  productsGrid.innerHTML = productsToShow
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${
              product.id
            })" class="btn-add">Add to Cart</button>
        </div>
    `
    )
    .join("");
}

// Add to Cart
function addToCart(productId) {
  if (cart.length >= 100) {
    console.log("Cart cannot contain more than 100 products!");
    return;
  }

  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product });
  }

  updateCartUI();
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

// Calculate Total Price
function calculateTotalPrice() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Calculate Average Price
function calculateAveragePrice() {
  if (cart.length === 0) return 0;
  return (
    calculateTotalPrice() /
    cart.reduce((total, item) => total + item.quantity, 0)
  );
}

// Filter Products
function filterProducts(maxPrice) {
  const filtered = products.filter(
    (product) => !maxPrice || product.price <= maxPrice
  );
  displayProducts(filtered);
}

// Sort Cart
function sortProducts(direction) {
  let sortedProducts = [...products];
  if (direction === "asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (direction === "desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  displayProducts(sortedProducts);
}

// Clear Cart
function clearCart() {
  cart = [];
  updateCartUI();
}

// Setup search functionality
function setupSearch() {
  const handleSearch = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
  };

  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
}

// Show toast notification
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  let icon;
  switch (type) {
    case "success":
      icon = "check-circle";
      break;
    case "error":
      icon = "exclamation-circle";
      break;
    default:
      icon = "info-circle";
  }

  toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;

  const toastContainer = document.getElementById("toast-container");
  toastContainer.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Update Cart UI
function updateCartUI() {
  // Update cart items display
  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${
              item.id
            })" class="btn-remove">Remove</button>
        </div>
    `
    )
    .join("");

  // Update summary
  const total = calculateTotalPrice();
  const average = calculateAveragePrice();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  cartCount.textContent = itemCount;
  totalItems.textContent = itemCount;
  totalPrice.textContent = total.toFixed(2);
  averagePrice.textContent = average.toFixed(2);
}

// Event Listeners
clearCartBtn.addEventListener("click", clearCart);
priceFilter.addEventListener("input", (e) =>
  filterProducts(Number(e.target.value))
);
sortSelect.addEventListener("change", (e) => sortProducts(e.target.value));

// Add keyboard event listener for closing cart with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCartPanel();
  }
});

// Initialize the store when the page loads
initializeStore();
