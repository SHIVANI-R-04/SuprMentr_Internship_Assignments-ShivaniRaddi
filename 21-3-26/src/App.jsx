import { useState } from "react";
import ProductCard from "./ProductCard";

const productsData = [
  {
    id: 1,
    title: "Headphones",
    price: 2000,
    category: "Electronics",
    rating: 4.5,
    image: "https://tse2.mm.bing.net/th/id/OIP.D40sayhjKVxAF3HPZkVz5QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 2,
    title: "Shoes",
    price: 1500,
    category: "Fashion",
    rating: 4.2,
    image: "https://tse4.mm.bing.net/th/id/OIP.U0o1aOp3ryuRMWWCp47LgQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 3,
    title: "Watch",
    price: 3000,
    category: "Electronics",
    rating: 4.8,
    image: "https://cdn.pixabay.com/photo/2022/05/16/11/45/watch-7200156_1280.jpg"
  },
  {
    id: 4,
    title: "T-Shirt",
    price: 800,
    category: "Fashion",
    rating: 4.1,
    image: "https://cdn.pixabay.com/photo/2024/04/29/04/21/tshirt-8726716_1280.jpg"
  },
  {
    id: 5,
    title: "Laptop",
    price: 55000,
    category: "Electronics",
    rating: 4.7,
    image: "https://th.bing.com/th/id/OIP.I_2lg0dqZbrBXzJY6rMUWAHaEn?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 6,
    title: "Backpack",
    price: 1200,
    category: "Fashion",
    rating: 4.3,
    image: "https://tse4.mm.bing.net/th/id/OIP.2PzynhI60dga806RHk2sqAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 7,
    title: "Sunglasses",
    price: 999,
    category: "Accessories",
    rating: 4.0,
    image: "https://th.bing.com/th/id/OIP.DMVd9IrH-b0FUfbzIh4GTQHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 8,
    title: "Keyboard",
    price: 2500,
    category: "Electronics",
    rating: 4.6,
    image: "https://tse2.mm.bing.net/th/id/OIP.EAElO4103Vj8We19MdO9QgHaE6?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 9,
    title: "Mouse",
    price: 1200,
    category: "Electronics",
    rating: 4.4,
    image: " https://static.vecteezy.com/system/resources/previews/041/164/080/original/ai-generated-sleek-wired-computer-mouse-free-png.png"
  },
  {
    id: 10,
    title: "Jacket",
    price: 3500,
    category: "Fashion",
    rating: 4.5,
    image: "https://tse2.mm.bing.net/th/id/OIP.ucJW50um8_IGrG4lmEZb6wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 11,
    title: "Cap",
    price: 500,
    category: "Accessories",
    rating: 3.9,
    image: "https://tse1.explicit.bing.net/th/id/OIP.a5r9stU0EDywEL8qCBNbYQHaEy?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 12,
    title: "Smartphone",
    price: 25000,
    category: "Electronics",
    rating: 4.8,
    image: "https://cdn.futura-sciences.com/buildsv6/images/largeoriginal/6/e/8/6e8f3c01ad_86838_smartphone-def.jpg"
  }

];

function App() {
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState([]); 
  const addToCart = (product) => {
  const updatedCart = [...cart, product];
  setCart(updatedCart);

  // 🧾 List of items
  const cartItems = updatedCart
    .map((item) => item.title)
    .join(", ");

  // 💰 Total cost
  const totalCost = updatedCart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  // 🔢 Total items
  const totalItems = updatedCart.length;

  alert(
    `${product.title} added!\n\n` +
    `Items (${totalItems}):\n${cartItems}\n\n` +
    `Total Cost: ₹${totalCost}`
  );
};

  const filteredProducts = productsData.filter(
    (p) => !category || p.category === category
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Product Listing</h1>

      {/* Filter */}
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
      </select>

      {/* Grid */}
      <div className="grid">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p}  addToCart={addToCart} />
        ))}
      </div>
      <h2>🛒 Cart</h2>

{cart.length === 0 ? (
  <p>No items in cart</p>
) : (
  cart.map((item, index) => (
    <div key={index}>
      {item.title} - ₹{item.price}
    </div>
  ))
)}
    </div>
  );
}

export default App;