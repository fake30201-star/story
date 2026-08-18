/* =========================================================
   أتيليه — Storefront logic
   ========================================================= */
(function(){
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  let categories = [];
  let products = [];
  let activeCategory = "";
  let currentProduct = null;
  let selectedSize = null;
  let selectedColor = null;
  let qty = 1;

  const CART_KEY = "atelier_cart_v1";
  let cart = loadCart();

  /* ---------------- HELPERS ---------------- */
  function money(n){ return `${Number(n).toFixed(0)} ج.م`; }
  function loadCart(){
    try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){ return []; }
  }
  function saveCart(){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }
  let toastTimer=null;
  function showToast(msg){
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> t.classList.remove("show"), 2400);
  }

  /* ---------------- FETCH DATA ---------------- */
  async function fetchCategories(){
    const { data, error } = await supabaseClient
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending:true });
    if(error){ console.error(error); return; }
    categories = data || [];
    renderCategoryNav();
  }

  async function fetchProducts(){
    let query = supabaseClient.from("products").select("*").eq("is_active", true).order("created_at", { ascending:false });
    if(activeCategory) query = query.eq("category_id", activeCategory);
    const { data, error } = await query;
    if(error){ console.error(error); document.getElementById("product-grid").innerHTML = `<p class="empty-note">تعذّر تحميل المنتجات. تأكدي من إعداد Supabase.</p>`; return; }
    products = data || [];
    renderProducts();
  }

  function categoryName(id){
    const c = categories.find(c => c.id === id);
    return c ? c.name : "";
  }

  /* ---------------- RENDER ---------------- */
  function renderCategoryNav(){
    const nav = document.getElementById("category-nav");
    nav.innerHTML = `<a href="#" class="cat-pill ${activeCategory===""?"active":""}" data-cat="">الكل</a>` +
      categories.map(c => `<a href="#" class="cat-pill ${activeCategory===c.id?"active":""}" data-cat="${c.id}">${c.name}</a>`).join("");
    nav.querySelectorAll(".cat-pill").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        activeCategory = el.dataset.cat;
        document.getElementById("products-heading").textContent = activeCategory ? categoryName(activeCategory) : "جميع المنتجات";
        fetchProducts();
        renderCategoryNav();
      });
    });
  }

  function renderProducts(){
    const grid = document.getElementById("product-grid");
    document.getElementById("products-count").textContent = products.length ? `${products.length} منتج` : "";
    if(products.length === 0){
      grid.innerHTML = `<p class="empty-note">لا توجد منتجات في هذا القسم حاليًا.</p>`;
      return;
    }
    grid.innerHTML = products.map(p => {
      const soldOut = p.stock <= 0;
      const onSale = p.compare_price && p.compare_price > p.price;
      return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-image">
          ${p.image_url ? `<img src="${p.image_url}" alt="${p.name}" loading="lazy">` : ""}
          ${onSale ? `<span class="badge-sale">خصم</span>` : ""}
          ${soldOut ? `<span class="badge-soldout">نفدت الكمية</span>` : ""}
        </div>
        <div class="product-info">
          <p class="product-name">${p.name}</p>
          <p class="product-cat">${categoryName(p.category_id) || ""}</p>
          <div class="product-price">
            <span class="price-now">${money(p.price)}</span>
            ${onSale ? `<span class="price-was">${money(p.compare_price)}</span>` : ""}
          </div>
        </div>
      </div>`;
    }).join("");

    grid.querySelectorAll(".product-card").forEach(card => {
      card.addEventListener("click", () => openProductModal(card.dataset.id));
    });
  }

  /* ---------------- PRODUCT MODAL ---------------- */
  function openProductModal(id){
    const p = products.find(x => x.id === id);
    if(!p) return;
    currentProduct = p;
    selectedSize = null; selectedColor = null; qty = 1;

    document.getElementById("pm-image").src = p.image_url || "";
    document.getElementById("pm-cat").textContent = categoryName(p.category_id) || "";
    document.getElementById("pm-name").textContent = p.name;
    document.getElementById("pm-desc").textContent = p.description || "";
    document.getElementById("pm-price").textContent = money(p.price) + (p.compare_price > p.price ? `  ` : "");
    document.getElementById("pm-qty").textContent = "1";

    const sizeGroup = document.getElementById("pm-size-group");
    const sizesEl = document.getElementById("pm-sizes");
    if(p.sizes && p.sizes.trim()){
      const sizes = p.sizes.split(",").map(s=>s.trim()).filter(Boolean);
      sizesEl.innerHTML = sizes.map(s => `<button type="button" class="chip" data-size="${s}">${s}</button>`).join("");
      sizeGroup.style.display = "block";
      selectedSize = sizes[0];
      updateChipSelection(sizesEl, selectedSize, "size");
      sizesEl.querySelectorAll(".chip").forEach(ch => ch.addEventListener("click", () => {
        selectedSize = ch.dataset.size; updateChipSelection(sizesEl, selectedSize, "size");
      }));
    } else { sizeGroup.style.display = "none"; }

    const colorGroup = document.getElementById("pm-color-group");
    const colorsEl = document.getElementById("pm-colors");
    if(p.colors && p.colors.trim()){
      const colors = p.colors.split(",").map(s=>s.trim()).filter(Boolean);
      colorsEl.innerHTML = colors.map(c => `<button type="button" class="chip" data-color="${c}">${c}</button>`).join("");
      colorGroup.style.display = "block";
      selectedColor = colors[0];
      updateChipSelection(colorsEl, selectedColor, "color");
      colorsEl.querySelectorAll(".chip").forEach(ch => ch.addEventListener("click", () => {
        selectedColor = ch.dataset.color; updateChipSelection(colorsEl, selectedColor, "color");
      }));
    } else { colorGroup.style.display = "none"; }

    const addBtn = document.getElementById("pm-add-cart");
    addBtn.disabled = p.stock <= 0;
    addBtn.textContent = p.stock <= 0 ? "نفدت الكمية" : "أضف إلى السلة";

    document.getElementById("modal-product").classList.add("active");
  }

  function updateChipSelection(container, value, attr){
    container.querySelectorAll(".chip").forEach(ch => {
      ch.classList.toggle("selected", ch.dataset[attr] === value);
    });
  }

  document.getElementById("pm-qty-minus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    document.getElementById("pm-qty").textContent = qty;
  });
  document.getElementById("pm-qty-plus").addEventListener("click", () => {
    qty = Math.min(currentProduct ? currentProduct.stock || 99 : 99, qty + 1);
    document.getElementById("pm-qty").textContent = qty;
  });

  document.getElementById("pm-add-cart").addEventListener("click", () => {
    if(!currentProduct) return;
    const existing = cart.find(i => i.productId === currentProduct.id && i.size === selectedSize && i.color === selectedColor);
    if(existing){
      existing.qty += qty;
    } else {
      cart.push({
        productId: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image_url,
        size: selectedSize,
        color: selectedColor,
        qty
      });
    }
    saveCart();
    closeModal("modal-product");
    showToast("تمت الإضافة إلى السلة");
  });

  /* ---------------- CART ---------------- */
  function cartTotal(){
    return cart.reduce((sum,i) => sum + i.price * i.qty, 0);
  }
  function cartCount(){
    return cart.reduce((sum,i) => sum + i.qty, 0);
  }

  function renderCart(){
    const countEl = document.getElementById("cart-count");
    const n = cartCount();
    countEl.textContent = n;
    countEl.style.display = n > 0 ? "flex" : "none";

    const itemsEl = document.getElementById("cart-items");
    if(cart.length === 0){
      itemsEl.innerHTML = `<p class="empty-note">السلة فارغة</p>`;
    } else {
      itemsEl.innerHTML = cart.map((i, idx) => `
        <div class="cart-item">
          <img src="${i.image || ""}" alt="">
          <div class="cart-item-info">
            <p class="cart-item-name">${i.name}</p>
            <p class="cart-item-opts">${[i.size, i.color].filter(Boolean).join(" · ")}</p>
            <div class="cart-item-controls">
              <span>${money(i.price)} × ${i.qty}</span>
              <button class="cart-item-remove" data-idx="${idx}">إزالة</button>
            </div>
          </div>
        </div>
      `).join("");
      itemsEl.querySelectorAll(".cart-item-remove").forEach(btn => {
        btn.addEventListener("click", () => {
          cart.splice(Number(btn.dataset.idx), 1);
          saveCart();
        });
      });
    }

    document.getElementById("cart-total").textContent = money(cartTotal());
    document.getElementById("co-total").textContent = money(cartTotal());
  }

  document.getElementById("btn-open-cart").addEventListener("click", () => {
    document.getElementById("cart-drawer").classList.add("active");
    document.getElementById("cart-backdrop").classList.add("active");
  });
  function closeCart(){
    document.getElementById("cart-drawer").classList.remove("active");
    document.getElementById("cart-backdrop").classList.remove("active");
  }
  document.getElementById("btn-close-cart").addEventListener("click", closeCart);
  document.getElementById("cart-backdrop").addEventListener("click", closeCart);

  /* ---------------- MODALS GENERIC ---------------- */
  function closeModal(id){ document.getElementById(id).classList.remove("active"); }
  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.dataset.close));
  });
  document.querySelectorAll(".modal-overlay").forEach(m => {
    m.addEventListener("click", (e) => { if(e.target === m) closeModal(m.id); });
  });

  /* ---------------- CHECKOUT ---------------- */
  document.getElementById("btn-checkout").addEventListener("click", () => {
    if(cart.length === 0){ showToast("السلة فارغة"); return; }
    closeCart();
    document.getElementById("checkout-form").style.display = "flex";
    document.getElementById("confirm-box").style.display = "none";
    document.getElementById("co-total").textContent = money(cartTotal());
    document.getElementById("modal-checkout").classList.add("active");
  });

  document.getElementById("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector("button[type=submit]");
    submitBtn.disabled = true; submitBtn.textContent = "جاري الإرسال...";

    const name = document.getElementById("co-name").value.trim();
    const phone = document.getElementById("co-phone").value.trim();
    const address = document.getElementById("co-address").value.trim();
    const notes = document.getElementById("co-notes").value.trim();
    const total = cartTotal();

    try{
      const { data: order, error: orderErr } = await supabaseClient
        .from("orders")
        .insert({ customer_name:name, phone, address, notes, total })
        .select()
        .single();
      if(orderErr) throw orderErr;

      const items = cart.map(i => ({
        order_id: order.id,
        product_id: i.productId,
        product_name: i.name,
        size: i.size,
        color: i.color,
        price: i.price,
        quantity: i.qty,
        subtotal: i.price * i.qty
      }));
      const { error: itemsErr } = await supabaseClient.from("order_items").insert(items);
      if(itemsErr) throw itemsErr;

      document.getElementById("checkout-form").style.display = "none";
      document.getElementById("confirm-box").style.display = "block";
      document.getElementById("confirm-order-no").textContent = order.order_number || order.id.slice(0,8);

      cart = [];
      saveCart();
      e.target.reset();
    }catch(err){
      console.error(err);
      showToast("حدث خطأ أثناء إرسال الطلب. حاولي مرة أخرى.");
    }finally{
      submitBtn.disabled = false; submitBtn.textContent = "تأكيد الطلب";
    }
  });

  /* ---------------- INIT ---------------- */
  renderCart();
  fetchCategories();
  fetchProducts();

})();
