const API_BASE = "https://openapi.programming-hero.com/api";
let cart = [];
let activeCategory = "all";

// Load Categories
async function loadCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  const data = await res.json();
  const categories = document.getElementById("categories");
  categories.innerHTML = "";

  // Add "All Trees" manually
  const allBtn = document.createElement("li");
  allBtn.innerHTML = `<button onclick="selectCategory('all')" 
    class="block w-full text-left px-3 py-2 rounded-md ${activeCategory === 'all' ? 'bg-green-600 text-white' : 'hover:bg-green-100'}">
    All Trees</button>`;
  categories.appendChild(allBtn);

  // Add categories from API
  data.categories.forEach(cat => {
    const li = document.createElement("li");
    li.innerHTML = `<button 
      class="block w-full text-left px-3 py-2 rounded-md ${activeCategory === cat.id ? 'bg-green-600 text-white' : 'hover:bg-green-100'}"
      onclick="selectCategory('${cat.id}')">
      ${cat.category_name}</button>`;
    categories.appendChild(li);
  });
}

// Unified category selection
function selectCategory(id) {
  activeCategory = id;
  loadCategories(); // re-render categories with active highlight

  if (id === "all") {
    loadPlants();
  } else {
    loadPlantsByCategory(id);
  }
}

// Load All Plants
async function loadPlants() {
  showLoading();
  try {
    const res = await fetch(`${API_BASE}/plants`);
    const data = await res.json();
    displayPlants(data.plants);
  } catch (err) {
    console.error("Error loading plants:", err);
  } finally {
    hideLoading();
  }
}

// Load Plants by Category
async function loadPlantsByCategory(id) {
  showLoading();
  try {
    const res = await fetch(`${API_BASE}/category/${id}`);
    const data = await res.json();
    displayPlants(data.data || []); // safety check
  } catch (err) {
    console.error("Error loading category:", err);
  } finally {
    hideLoading();
  }
}

// Display Plant Cards
function displayPlants(plants) {
  const grid = document.getElementById("tree-grid");
  grid.innerHTML = "";

  if (plants.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">No trees found in this category.</p>`;
    return;
  }

  plants.forEach(plant => {
    const div = document.createElement("div");
    div.className = "bg-white rounded-lg shadow p-4 flex flex-col";
    div.innerHTML = `
      <div class="bg-gray-200 h-40 w-full rounded-md mb-3 flex items-center justify-center">
        <img src="${plant.image}" alt="${plant.name}" class="h-full object-cover rounded-md"/>
      </div>
      <h4 onclick="showPlantDetail('${plant.id}')" class="font-bold text-green-800 cursor-pointer hover:underline">${plant.name}</h4>
      <p class="text-gray-600 text-sm mb-2">${plant.description.slice(0, 60)}...</p>
      <span class="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded mb-2">${plant.category || "Tree"}</span>
      <div class="mt-auto flex justify-between items-center">
        <p class="font-bold text-green-700">৳${plant.price}</p>
        <button onclick="addToCart('${plant.name}', ${plant.price})" 
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 text-sm">Add to Cart</button>
      </div>
    `;
    grid.appendChild(div);
  });
}

// Show Loading Spinner
function showLoading() {
  const grid = document.getElementById("tree-grid");
  grid.innerHTML = `<div class="col-span-full flex justify-center py-10">
    <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
  </div>`;
}
function hideLoading() {}

// Add to Cart
function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

// Render Cart
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-green-50 p-2 rounded";
    li.innerHTML = `
      <span>${item.name} ৳${item.price} × 1</span>
      <button onclick="removeFromCart(${index})" class="text-red-500 font-bold">×</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.innerText = `Total: ৳${total}`;
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Show Plant Detail Modal
async function showPlantDetail(id) {
  try {
    const res = await fetch(`${API_BASE}/plant/${id}`);
    const data = await res.json();
    alert(`🌳 ${data.plant.name}\n\n${data.plant.description}\n\nPrice: ৳${data.plant.price}`);
  } catch (err) {
    console.error("Error fetching plant details:", err);
  }
}

// Init
loadCategories();
loadPlants();
