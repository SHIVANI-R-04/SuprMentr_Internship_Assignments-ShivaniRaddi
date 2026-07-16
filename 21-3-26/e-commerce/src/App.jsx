import { useState, useMemo } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PRODUCTS = [
  { id: 1,  name: "Arc Leather Tote",       category: "Bags",        price: 15699, rating: 4.8, reviews: 214, badge: "Bestseller", color: "#c8a882", emoji: "👜" },
  { id: 2,  name: "Merino Knit Sweater",    category: "Clothing",    price: 10299, rating: 4.6, reviews: 98,  badge: "New",        color: "#8fa8c8", emoji: "🧥" },
  { id: 3,  name: "Ceramic Pour-Over Set",  category: "Home",        price:  5649, rating: 4.9, reviews: 431, badge: "Top Rated",  color: "#c89fa8", emoji: "☕" },
  { id: 4,  name: "Slim Wool Trousers",     category: "Clothing",    price: 12035, rating: 4.4, reviews: 77,  badge: null,         color: "#a8b8a0", emoji: "👖" },
  { id: 5,  name: "Brass Desk Lamp",        category: "Home",        price: 17430, rating: 4.7, reviews: 162, badge: "New",        color: "#c8bc8a", emoji: "🪔" },
  { id: 6,  name: "Suede Chelsea Boots",    category: "Footwear",    price: 21999, rating: 4.5, reviews: 309, badge: "Bestseller", color: "#b8a898", emoji: "👢" },
  { id: 7,  name: "Linen Throw Pillow",     category: "Home",        price:  3486, rating: 4.3, reviews: 55,  badge: null,         color: "#c8c0b0", emoji: "🛋️" },
  { id: 8,  name: "Minimalist Watch",       category: "Accessories", price: 26560, rating: 4.9, reviews: 512, badge: "Top Rated",  color: "#b0b8c8", emoji: "⌚" },
  { id: 9,  name: "Canvas Weekender Bag",   category: "Bags",        price:  8134, rating: 4.5, reviews: 188, badge: null,         color: "#b8c0a8", emoji: "🎒" },
  { id: 10, name: "Ribbed Cotton Tee",      category: "Clothing",    price:  3984, rating: 4.2, reviews: 340, badge: null,         color: "#c0b0c8", emoji: "👕" },
  { id: 11, name: "Leather Card Holder",    category: "Accessories", price:  4565, rating: 4.6, reviews: 222, badge: "New",        color: "#c8b0a0", emoji: "💳" },
  { id: 12, name: "White Sneakers",         category: "Footwear",    price: 11454, rating: 4.7, reviews: 405, badge: "Bestseller", color: "#d0ccc8", emoji: "👟" },
];

const CATEGORIES = ["All", "Clothing", "Bags", "Footwear", "Accessories", "Home"];
const SORT_OPTIONS = [
  { value: "default",    label: "Featured" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating",     label: "Top Rated" },
  { value: "reviews",    label: "Most Reviewed" },
];
const BADGE_COLORS = {
  "Bestseller": { bg: "rgba(230,180,80,0.15)",  border: "rgba(230,180,80,0.4)",  text: "#e6b450" },
  "New":        { bg: "rgba(80,200,160,0.15)",  border: "rgba(80,200,160,0.4)",  text: "#50c8a0" },
  "Top Rated":  { bg: "rgba(100,160,240,0.15)", border: "rgba(100,160,240,0.4)", text: "#64a0f0" },
};

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #f5f2ee;
  --bg2:       #ede9e3;
  --surface:   #ffffff;
  --border:    rgba(0,0,0,0.08);
  --border2:   rgba(0,0,0,0.14);
  --ink:       #1a1814;
  --ink2:      #6b6460;
  --ink3:      #9b9490;
  --accent:    #2a1f14;
  --accent2:   #c8864a;
  --shadow:    0 2px 12px rgba(0,0,0,0.07);
  --shadow-lg: 0 8px 40px rgba(0,0,0,0.12);
  --radius:    16px;
  --sans:      'Outfit', sans-serif;
  --serif:     'Playfair Display', serif;
}

body { font-family: var(--sans); background: var(--bg); color: var(--ink); min-height: 100vh; }

/* ── Layout ── */
.shell { max-width: 1400px; margin: 0 auto; padding: 0 32px 80px; }

/* ── Header ── */
.header {
  display: flex; align-items: flex-end; justify-content: space-between;
  padding: 48px 0 40px;
  border-bottom: 1px solid var(--border2);
  margin-bottom: 40px;
  animation: fadeDown 0.6s cubic-bezier(0.22,1,0.36,1) both;
}
.store-eyebrow {
  font-size: 11px; font-weight: 600; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--accent2); margin-bottom: 6px;
}
.store-name {
  font-family: var(--serif); font-size: clamp(28px, 4vw, 44px);
  font-weight: 700; line-height: 1; color: var(--accent);
}
.header-right { display: flex; align-items: center; gap: 16px; }
.cart-btn {
  display: flex; align-items: center; gap: 8px;
  background: var(--accent); color: #fff;
  border: none; border-radius: 100px; padding: 10px 20px;
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
}
.cart-btn:hover { background: #3d2e1e; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(42,31,20,0.3); }
.cart-count {
  background: var(--accent2); color: #fff;
  border-radius: 99px; padding: 1px 7px; font-size: 11px; font-weight: 700;
}

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Toolbar ── */
.toolbar {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 16px;
  margin-bottom: 32px;
  animation: fadeUp 0.6s 0.1s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Category pills */
.cat-pills { display: flex; gap: 8px; flex-wrap: wrap; }
.cat-pill {
  padding: 8px 18px; border-radius: 100px;
  font-size: 13px; font-weight: 500;
  border: 1px solid var(--border2);
  background: var(--surface); color: var(--ink2);
  cursor: pointer; transition: all 0.2s; white-space: nowrap;
}
.cat-pill:hover { border-color: var(--accent2); color: var(--accent); }
.cat-pill.active {
  background: var(--accent); color: #fff;
  border-color: var(--accent); box-shadow: 0 2px 10px rgba(42,31,20,0.25);
}

/* Toolbar right */
.toolbar-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }

.search-wrap { position: relative; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: var(--ink3); pointer-events: none; }
.search-input {
  padding: 9px 14px 9px 34px;
  border: 1px solid var(--border2); border-radius: 100px;
  background: var(--surface); font-family: var(--sans); font-size: 13px;
  color: var(--ink); outline: none; width: 200px; transition: all 0.2s;
}
.search-input::placeholder { color: var(--ink3); }
.search-input:focus { border-color: var(--accent2); box-shadow: 0 0 0 3px rgba(200,134,74,0.12); width: 240px; }

.sort-select {
  padding: 9px 14px; border: 1px solid var(--border2); border-radius: 100px;
  background: var(--surface); font-family: var(--sans); font-size: 13px;
  color: var(--ink2); cursor: pointer; outline: none; transition: border-color 0.2s;
}
.sort-select:focus { border-color: var(--accent2); }

.price-filter { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink2); }
.price-filter input[type=range] { width: 100px; accent-color: var(--accent2); cursor: pointer; }
.price-val { font-weight: 600; color: var(--accent); min-width: 48px; }

/* ── Results bar ── */
.results-bar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 24px; font-size: 13px; color: var(--ink2);
}
.results-count strong { color: var(--ink); font-weight: 600; }
.view-toggles { display: flex; gap: 4px; }
.view-btn {
  width: 34px; height: 34px; border-radius: 8px;
  border: 1px solid var(--border2); background: var(--surface);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  font-size: 14px; transition: all 0.2s; color: var(--ink3);
}
.view-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }

/* ── Grid ── */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}
.product-grid.list-view { grid-template-columns: 1fr; gap: 16px; }

/* ── Product card ── */
.p-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  animation: cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
  position: relative;
}
.p-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }

.p-card:nth-child(1)  { animation-delay: 0.05s; }
.p-card:nth-child(2)  { animation-delay: 0.10s; }
.p-card:nth-child(3)  { animation-delay: 0.15s; }
.p-card:nth-child(4)  { animation-delay: 0.20s; }
.p-card:nth-child(5)  { animation-delay: 0.25s; }
.p-card:nth-child(6)  { animation-delay: 0.30s; }
.p-card:nth-child(7)  { animation-delay: 0.35s; }
.p-card:nth-child(8)  { animation-delay: 0.40s; }
.p-card:nth-child(9)  { animation-delay: 0.45s; }
.p-card:nth-child(10) { animation-delay: 0.50s; }
.p-card:nth-child(11) { animation-delay: 0.55s; }
.p-card:nth-child(12) { animation-delay: 0.60s; }

@keyframes cardIn {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Card image area */
.p-img-wrap {
  position: relative; width: 100%; aspect-ratio: 4/3;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.p-img-bg {
  position: absolute; inset: 0; opacity: 0.18; transition: opacity 0.3s;
}
.p-card:hover .p-img-bg { opacity: 0.28; }
.p-emoji { font-size: 64px; position: relative; z-index: 1; transition: transform 0.3s ease; user-select: none; }
.p-card:hover .p-emoji { transform: scale(1.12) rotate(-3deg); }

.p-badge {
  position: absolute; top: 12px; left: 12px; z-index: 2;
  font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; padding: 4px 10px; border-radius: 99px; border: 1px solid;
}
.p-wish {
  position: absolute; top: 10px; right: 10px; z-index: 2;
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(255,255,255,0.9); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; transition: all 0.2s; opacity: 0;
}
.p-card:hover .p-wish { opacity: 1; }
.p-wish.wished { opacity: 1; }
.p-wish:hover { transform: scale(1.15); }

/* Card body */
.p-body { padding: 18px 20px 20px; }
.p-cat {
  font-size: 10px; font-weight: 600; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--accent2); margin-bottom: 5px;
}
.p-name {
  font-family: var(--serif); font-size: 17px; font-weight: 600;
  color: var(--accent); line-height: 1.3; margin-bottom: 10px;
}
.p-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.p-rating { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--ink2); }
.stars { color: #e6a820; font-size: 11px; letter-spacing: -1px; }
.p-footer { display: flex; align-items: center; justify-content: space-between; }
.p-price { font-family: var(--serif); font-size: 22px; font-weight: 700; color: var(--accent); }
.p-add-btn {
  display: flex; align-items: center; gap: 6px;
  background: var(--accent); color: #fff;
  border: none; border-radius: 100px; padding: 8px 16px;
  font-family: var(--sans); font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
}
.p-add-btn:hover { background: #3d2e1e; transform: scale(1.04); }
.p-add-btn.added { background: #2d8a60; }

/* ── LIST VIEW ── */
.list-view .p-card { display: flex; align-items: center; }
.list-view .p-img-wrap { width: 130px; min-width: 130px; aspect-ratio: 1/1; border-radius: 0; }
.list-view .p-emoji { font-size: 48px; }
.list-view .p-body { flex: 1; display: flex; align-items: center; gap: 32px; padding: 20px 24px; }
.list-view .p-info { flex: 1; }
.list-view .p-name { margin-bottom: 4px; font-size: 18px; }
.list-view .p-meta { margin-bottom: 0; }
.list-view .p-footer { flex-direction: column; align-items: flex-end; gap: 10px; min-width: 140px; }

/* ── Empty state ── */
.empty { grid-column: 1 / -1; text-align: center; padding: 80px 20px; }
.empty-icon { font-size: 56px; margin-bottom: 16px; opacity: 0.4; }
.empty h3 { font-family: var(--serif); font-size: 22px; color: var(--ink2); margin-bottom: 6px; }
.empty p  { font-size: 14px; color: var(--ink3); }

/* ── Cart toast ── */
.toast {
  position: fixed; bottom: 28px; right: 28px; z-index: 100;
  background: var(--accent); color: #fff;
  border-radius: 12px; padding: 14px 20px;
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; font-weight: 500; font-family: var(--sans);
  box-shadow: 0 8px 32px rgba(42,31,20,0.35);
  animation: toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
}
@keyframes toastIn {
  from { opacity: 0; transform: translateY(20px) scale(0.9); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.toast.out { animation: toastOut 0.3s ease forwards; }
@keyframes toastOut {
  to { opacity: 0; transform: translateY(10px) scale(0.95); }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .shell { padding: 0 16px 60px; }
  .header { flex-direction: column; align-items: flex-start; gap: 16px; padding: 32px 0 28px; }
  .toolbar { flex-direction: column; align-items: flex-start; }
  .search-input, .search-input:focus { width: 160px; }
  .list-view .p-body { flex-wrap: wrap; gap: 12px; }
  .list-view .p-footer { flex-direction: row; align-items: center; min-width: unset; }
}
@media (max-width: 480px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .p-body { padding: 12px 14px 14px; }
  .p-name { font-size: 14px; }
  .p-price { font-size: 18px; }
  .p-add-btn { padding: 7px 12px; font-size: 11px; }
  .list-view .p-img-wrap { width: 90px; min-width: 90px; }
}
`;

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  const [category, setCategory] = useState("All");
  const [search,   setSearch]   = useState("");
  const [sort,     setSort]     = useState("default");
  const [maxPrice, setMaxPrice] = useState(30000);
  const [view,     setView]     = useState("grid");
  const [cart,     setCart]     = useState([]);
  const [wished,   setWished]   = useState([]);
  const [added,    setAdded]    = useState([]);
  const [toast,    setToast]    = useState(null);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== "All") list = list.filter(p => p.category === category);
    if (search.trim())      list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    list = list.filter(p => p.price <= maxPrice);
    switch (sort) {
      case "price-asc":  list.sort((a, b) => a.price - b.price);    break;
      case "price-desc": list.sort((a, b) => b.price - a.price);    break;
      case "rating":     list.sort((a, b) => b.rating - a.rating);  break;
      case "reviews":    list.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }
    return list;
  }, [category, search, maxPrice, sort]);

  const showToast = (msg) => {
    setToast({ msg, out: false });
    setTimeout(() => setToast(t => t ? { ...t, out: true } : null), 2000);
    setTimeout(() => setToast(null), 2350);
  };

  const addToCart = (p) => {
    setCart(c => [...c, p.id]);
    setAdded(a => [...a, p.id]);
    showToast(`${p.emoji} "${p.name}" added to cart`);
    setTimeout(() => setAdded(a => a.filter(id => id !== p.id)), 2000);
  };

  const toggleWish = (id) =>
    setWished(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  return (
    <>
      <style>{CSS}</style>
      <div className="shell">

        {/* ── Header ── */}
        <header className="header">
          <div className="header-left">
            <p className="store-eyebrow">Curated Collection</p>
            <h1 className="store-name">Maison&nbsp;Cléa</h1>
          </div>
          <div className="header-right">
            <button className="cart-btn">
              🛒 Cart {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
          </div>
        </header>

        {/* ── Toolbar ── */}
        <div className="toolbar">
          <div className="cat-pills">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`cat-pill ${category === c ? "active" : ""}`}
                onClick={() => setCategory(c)}
              >{c}</button>
            ))}
          </div>

          <div className="toolbar-right">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="price-filter">
              <span>Up to</span>
              <input
                type="range" min={3000} max={30000} step={500}
                value={maxPrice}
                onChange={e => setMaxPrice(+e.target.value)}
              />
              <span className="price-val">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>

            <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* ── Results bar ── */}
        <div className="results-bar">
          <p className="results-count">
            <strong>{filtered.length}</strong> product{filtered.length !== 1 ? "s" : ""}
            {category !== "All" ? ` in ${category}` : ""}
            {search ? ` matching "${search}"` : ""}
          </p>
          <div className="view-toggles">
            <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")} title="Grid view">⊞</button>
            <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")} title="List view">☰</button>
          </div>
        </div>

        {/* ── Product Grid / List ── */}
        <div className={`product-grid ${view === "list" ? "list-view" : ""}`}>
          {filtered.length === 0 && (
            <div className="empty">
              <div className="empty-icon">🔎</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search term.</p>
            </div>
          )}

          {filtered.map((p) => {
            const bc       = p.badge ? BADGE_COLORS[p.badge] : null;
            const isWished = wished.includes(p.id);
            const isAdded  = added.includes(p.id);

            return (
              <div className="p-card" key={p.id}>

                {/* Image */}
                <div className="p-img-wrap">
                  <div
                    className="p-img-bg"
                    style={{ background: `radial-gradient(circle at 50% 60%, ${p.color}, transparent 70%)` }}
                  />
                  <span className="p-emoji">{p.emoji}</span>

                  {bc && (
                    <span
                      className="p-badge"
                      style={{ background: bc.bg, borderColor: bc.border, color: bc.text }}
                    >{p.badge}</span>
                  )}

                  <button
                    className={`p-wish ${isWished ? "wished" : ""}`}
                    onClick={e => { e.stopPropagation(); toggleWish(p.id); }}
                    title={isWished ? "Remove from wishlist" : "Add to wishlist"}
                  >{isWished ? "❤️" : "🤍"}</button>
                </div>

                {/* Body */}
                <div className="p-body">
                  {view === "list" ? (
                    <div className="p-info">
                      <p className="p-cat">{p.category}</p>
                      <p className="p-name">{p.name}</p>
                      <div className="p-meta">
                        <div className="p-rating">
                          <span className="stars">{stars(p.rating)}</span>
                          <span>{p.rating} ({p.reviews.toLocaleString()})</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="p-cat">{p.category}</p>
                      <p className="p-name">{p.name}</p>
                      <div className="p-meta">
                        <div className="p-rating">
                          <span className="stars">{stars(p.rating)}</span>
                          <span>{p.rating} ({p.reviews.toLocaleString()})</span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="p-footer">
                    <span className="p-price">₹{p.price.toLocaleString('en-IN')}</span>
                    <button
                      className={`p-add-btn ${isAdded ? "added" : ""}`}
                      onClick={() => addToCart(p)}
                    >
                      {isAdded ? "✓ Added" : "+ Add to Cart"}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className={`toast ${toast.out ? "out" : ""}`}>
          {toast.msg}
        </div>
      )}
    </>
  );
}