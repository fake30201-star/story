/* =========================================================
   admin-dashboard.js — لوحة تحكم الإدارة الكاملة
   ========================================================= */
(function(){
  "use strict";

  let currentUser = null;
  let categories = [];
  let products = [];
  let orders = [];
  let selectedProductImageFile = null;

  /* ---------------- TOAST ---------------- */
  let toastTimer = null;
  function showToast(msg){
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> t.classList.remove("show"), 2600);
  }
  function money(n){ return `${Number(n).toFixed(0)} ج.م`; }

  /* ---------------- AUTH GUARD ---------------- */
  async function guard(){
    const { data: { session } } = await supabaseClient.auth.getSession();
    if(!session){ window.location.href = "login.html"; return; }
    const { data: adminRow, error } = await supabaseClient
      .from("admins").select("full_name").eq("user_id", session.user.id).maybeSingle();
    if(error || !adminRow){
      await supabaseClient.auth.signOut();
      window.location.href = "login.html";
      return;
    }
    currentUser = session.user;
    document.getElementById("who-label").textContent = adminRow.full_name || currentUser.email;
    initDashboard();
  }

  document.getElementById("btn-logout").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "login.html";
  });

  /* ---------------- NAVIGATION ---------------- */
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".view-panel").forEach(p => p.style.display = "none");
      document.getElementById(`view-${btn.dataset.view}`).style.display = "block";
      if(btn.dataset.view === "overview") loadOverview();
      if(btn.dataset.view === "categories") loadCategories();
      if(btn.dataset.view === "products") loadProducts();
      if(btn.dataset.view === "orders") loadOrders();
    });
  });

  function initDashboard(){
    loadOverview();
    loadCategories();
  }

  /* ================= OVERVIEW ================= */
  async function loadOverview(){
    const [{ count: prodCount }, { count: catCount }, { count: orderCount }, { count: pendingCount }, { data: recent }] = await Promise.all([
      supabaseClient.from("products").select("*", { count:"exact", head:true }),
      supabaseClient.from("categories").select("*", { count:"exact", head:true }),
      supabaseClient.from("orders").select("*", { count:"exact", head:true }),
      supabaseClient.from("orders").select("*", { count:"exact", head:true }).eq("status","قيد المراجعة"),
      supabaseClient.from("orders").select("*").order("created_at",{ascending:false}).limit(5)
    ]);
    document.getElementById("stat-products").textContent = prodCount ?? 0;
    document.getElementById("stat-categories").textContent = catCount ?? 0;
    document.getElementById("stat-orders").textContent = orderCount ?? 0;
    document.getElementById("stat-pending").textContent = pendingCount ?? 0;

    const body = document.getElementById("overview-orders-body");
    if(!recent || recent.length === 0){
      body.innerHTML = `<tr class="empty-row"><td colspan="5">لا توجد طلبات بعد</td></tr>`;
    } else {
      body.innerHTML = recent.map(o => `
        <tr>
          <td>${o.order_number}</td>
          <td>${o.customer_name}</td>
          <td>${money(o.total)}</td>
          <td><span class="pill pill-active">${o.status}</span></td>
          <td>${new Date(o.created_at).toLocaleDateString("ar-EG")}</td>
        </tr>`).join("");
    }
  }

  /* ================= CATEGORIES ================= */
  async function loadCategories(){
    const { data, error } = await supabaseClient.from("categories").select("*").order("sort_order",{ascending:true});
    if(error){ showToast("خطأ في تحميل الأقسام"); return; }
    categories = data || [];
    renderCategoriesTable();
    fillCategorySelects();
  }

  function renderCategoriesTable(){
    const body = document.getElementById("categories-body");
    if(categories.length === 0){
      body.innerHTML = `<tr class="empty-row"><td colspan="5">لا توجد أقسام بعد</td></tr>`;
      return;
    }
    body.innerHTML = categories.map(c => `
      <tr>
        <td>${c.sort_order}</td>
        <td>${c.name}</td>
        <td>${c.slug}</td>
        <td><span class="pill ${c.is_active ? 'pill-active':'pill-inactive'}">${c.is_active ? 'مفعّل':'موقوف'}</span></td>
        <td>
          <button class="action-btn" data-edit-cat="${c.id}" title="تعديل">✏️</button>
          <button class="action-btn" data-del-cat="${c.id}" title="حذف">🗑️</button>
        </td>
      </tr>`).join("");

    body.querySelectorAll("[data-edit-cat]").forEach(b => b.addEventListener("click", () => openCategoryModal(b.dataset.editCat)));
    body.querySelectorAll("[data-del-cat]").forEach(b => b.addEventListener("click", () => deleteCategory(b.dataset.delCat)));
  }

  function fillCategorySelects(){
    const options = categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    document.getElementById("prod-cat").innerHTML = `<option value="">بدون قسم</option>` + options;
    document.getElementById("product-filter-cat").innerHTML = `<option value="">كل الأقسام</option>` + options;
  }

  document.getElementById("btn-add-category").addEventListener("click", () => openCategoryModal(null));

  function openCategoryModal(id){
    const isEdit = !!id;
    document.getElementById("category-modal-title").textContent = isEdit ? "تعديل القسم" : "إضافة قسم";
    document.getElementById("cat-delete-btn").style.display = isEdit ? "inline-block" : "none";
    const c = isEdit ? categories.find(x => x.id === id) : null;
    document.getElementById("cat-id").value = id || "";
    document.getElementById("cat-name").value = c ? c.name : "";
    document.getElementById("cat-slug").value = c ? c.slug : "";
    document.getElementById("cat-sort").value = c ? c.sort_order : categories.length;
    document.getElementById("cat-active").checked = c ? c.is_active : true;
    document.getElementById("modal-category").classList.add("active");
  }

  document.getElementById("cat-name").addEventListener("input", (e) => {
    const slugField = document.getElementById("cat-slug");
    if(!document.getElementById("cat-id").value){ // only auto-slug on create
      slugField.value = e.target.value.trim().toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF\s-]/g,"")
        .replace(/\s+/g,"-");
    }
  });

  document.getElementById("category-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("cat-save-btn");
    btn.disabled = true; btn.textContent = "جاري الحفظ...";
    const id = document.getElementById("cat-id").value;
    const payload = {
      name: document.getElementById("cat-name").value.trim(),
      slug: document.getElementById("cat-slug").value.trim(),
      sort_order: Number(document.getElementById("cat-sort").value) || 0,
      is_active: document.getElementById("cat-active").checked
    };
    try{
      let error;
      if(id){
        ({ error } = await supabaseClient.from("categories").update(payload).eq("id", id));
      } else {
        ({ error } = await supabaseClient.from("categories").insert(payload));
      }
      if(error) throw error;
      showToast("تم الحفظ بنجاح");
      closeModal("modal-category");
      loadCategories();
    }catch(err){
      console.error(err);
      showToast("حدث خطأ: " + (err.message || "تأكدي من عدم تكرار الرابط"));
    }finally{
      btn.disabled = false; btn.textContent = "حفظ";
    }
  });

  document.getElementById("cat-delete-btn").addEventListener("click", () => {
    const id = document.getElementById("cat-id").value;
    if(id) deleteCategory(id);
  });

  async function deleteCategory(id){
    if(!confirm("هل تريدين حذف هذا القسم؟ المنتجات المرتبطة به ستصبح بدون قسم.")) return;
    const { error } = await supabaseClient.from("categories").delete().eq("id", id);
    if(error){ showToast("تعذّر الحذف"); return; }
    showToast("تم حذف القسم");
    closeModal("modal-category");
    loadCategories();
  }

  /* ================= PRODUCTS ================= */
  async function loadProducts(){
    const { data, error } = await supabaseClient.from("products").select("*").order("created_at",{ascending:false});
    if(error){ showToast("خطأ في تحميل المنتجات"); return; }
    products = data || [];
    renderProductsTable();
  }

  function categoryName(id){
    const c = categories.find(c => c.id === id);
    return c ? c.name : "بدون قسم";
  }

  function renderProductsTable(){
    const search = document.getElementById("product-search").value.trim().toLowerCase();
    const catFilter = document.getElementById("product-filter-cat").value;
    let list = products;
    if(search) list = list.filter(p => p.name.toLowerCase().includes(search));
    if(catFilter) list = list.filter(p => p.category_id === catFilter);

    const body = document.getElementById("products-body");
    if(list.length === 0){
      body.innerHTML = `<tr class="empty-row"><td colspan="7">لا توجد منتجات مطابقة</td></tr>`;
      return;
    }
    body.innerHTML = list.map(p => `
      <tr>
        <td>${p.image_url ? `<img class="row-thumb" src="${p.image_url}">` : `<div class="row-thumb" style="display:flex;align-items:center;justify-content:center;font-size:10px;color:#999;">لا يوجد</div>`}</td>
        <td>${p.name}</td>
        <td>${categoryName(p.category_id)}</td>
        <td>${money(p.price)}</td>
        <td>${p.stock <= 0 ? `<span class="pill pill-stock-low">نفدت</span>` : p.stock}</td>
        <td><span class="pill ${p.is_active ? 'pill-active':'pill-inactive'}">${p.is_active ? 'مفعّل':'موقوف'}</span></td>
        <td>
          <button class="action-btn" data-edit-prod="${p.id}" title="تعديل">✏️</button>
          <button class="action-btn" data-del-prod="${p.id}" title="حذف">🗑️</button>
        </td>
      </tr>`).join("");

    body.querySelectorAll("[data-edit-prod]").forEach(b => b.addEventListener("click", () => openProductModal(b.dataset.editProd)));
    body.querySelectorAll("[data-del-prod]").forEach(b => b.addEventListener("click", () => deleteProduct(b.dataset.delProd)));
  }

  document.getElementById("product-search").addEventListener("input", renderProductsTable);
  document.getElementById("product-filter-cat").addEventListener("change", renderProductsTable);
  document.getElementById("btn-add-product").addEventListener("click", () => openProductModal(null));

  function openProductModal(id){
    const isEdit = !!id;
    selectedProductImageFile = null;
    document.getElementById("product-modal-title").textContent = isEdit ? "تعديل المنتج" : "إضافة منتج";
    document.getElementById("prod-delete-btn").style.display = isEdit ? "inline-block" : "none";
    document.getElementById("prod-image-file").value = "";
    document.getElementById("prod-image-status").textContent = "";

    const p = isEdit ? products.find(x => x.id === id) : null;
    document.getElementById("prod-id").value = id || "";
    document.getElementById("prod-name").value = p ? p.name : "";
    document.getElementById("prod-desc").value = p ? (p.description || "") : "";
    document.getElementById("prod-cat").value = p ? (p.category_id || "") : "";
    document.getElementById("prod-stock").value = p ? p.stock : 0;
    document.getElementById("prod-price").value = p ? p.price : "";
    document.getElementById("prod-compare").value = p && p.compare_price ? p.compare_price : "";
    document.getElementById("prod-sizes").value = p ? (p.sizes || "") : "";
    document.getElementById("prod-colors").value = p ? (p.colors || "") : "";
    document.getElementById("prod-active").checked = p ? p.is_active : true;
    document.getElementById("prod-featured").checked = p ? p.is_featured : false;

    const preview = document.getElementById("prod-img-preview");
    preview.innerHTML = p && p.image_url ? `<img src="${p.image_url}">` : "لا توجد صورة";

    document.getElementById("modal-product").classList.add("active");
  }

  document.getElementById("prod-image-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if(!file) return;
    selectedProductImageFile = file;
    const preview = document.getElementById("prod-img-preview");
    const reader = new FileReader();
    reader.onload = (ev) => { preview.innerHTML = `<img src="${ev.target.result}">`; };
    reader.readAsDataURL(file);
    document.getElementById("prod-image-status").textContent = file.name;
  });

  async function uploadProductImage(file){
    const ext = file.name.split(".").pop();
    const path = `products/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
    const { error } = await supabaseClient.storage.from(PRODUCT_IMAGES_BUCKET).upload(path, file, { upsert:false });
    if(error) throw error;
    const { data } = supabaseClient.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }

  document.getElementById("product-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("prod-save-btn");
    btn.disabled = true; btn.textContent = "جاري الحفظ...";
    const id = document.getElementById("prod-id").value;

    try{
      let imageUrl;
      if(selectedProductImageFile){
        btn.textContent = "جاري رفع الصورة...";
        imageUrl = await uploadProductImage(selectedProductImageFile);
      } else if(id){
        const existing = products.find(x => x.id === id);
        imageUrl = existing ? existing.image_url : null;
      }

      const payload = {
        name: document.getElementById("prod-name").value.trim(),
        description: document.getElementById("prod-desc").value.trim(),
        category_id: document.getElementById("prod-cat").value || null,
        stock: Number(document.getElementById("prod-stock").value) || 0,
        price: Number(document.getElementById("prod-price").value) || 0,
        compare_price: document.getElementById("prod-compare").value ? Number(document.getElementById("prod-compare").value) : null,
        sizes: document.getElementById("prod-sizes").value.trim(),
        colors: document.getElementById("prod-colors").value.trim(),
        is_active: document.getElementById("prod-active").checked,
        is_featured: document.getElementById("prod-featured").checked,
        image_url: imageUrl
      };

      btn.textContent = "جاري الحفظ...";
      let error;
      if(id){
        ({ error } = await supabaseClient.from("products").update(payload).eq("id", id));
      } else {
        ({ error } = await supabaseClient.from("products").insert(payload));
      }
      if(error) throw error;

      showToast("تم حفظ المنتج بنجاح");
      closeModal("modal-product");
      loadProducts();
      loadOverview();
    }catch(err){
      console.error(err);
      showToast("حدث خطأ أثناء الحفظ: " + (err.message || ""));
    }finally{
      btn.disabled = false; btn.textContent = "حفظ";
    }
  });

  document.getElementById("prod-delete-btn").addEventListener("click", () => {
    const id = document.getElementById("prod-id").value;
    if(id) deleteProduct(id);
  });

  async function deleteProduct(id){
    if(!confirm("هل تريدين حذف هذا المنتج نهائيًا؟")) return;
    const { error } = await supabaseClient.from("products").delete().eq("id", id);
    if(error){ showToast("تعذّر الحذف"); return; }
    showToast("تم حذف المنتج");
    closeModal("modal-product");
    loadProducts();
    loadOverview();
  }

  /* ================= ORDERS ================= */
  async function loadOrders(){
    const { data, error } = await supabaseClient.from("orders").select("*").order("created_at",{ascending:false});
    if(error){ showToast("خطأ في تحميل الطلبات"); return; }
    orders = data || [];
    renderOrdersTable();
  }

  function statusPillClass(status){
    if(status === "تم التسليم") return "pill-active";
    if(status === "ملغي") return "pill-inactive";
    return "pill-active";
  }

  function renderOrdersTable(){
    const filter = document.getElementById("order-filter-status").value;
    let list = orders;
    if(filter) list = list.filter(o => o.status === filter);

    const body = document.getElementById("orders-body");
    if(list.length === 0){
      body.innerHTML = `<tr class="empty-row"><td colspan="7">لا توجد طلبات</td></tr>`;
      return;
    }
    body.innerHTML = list.map(o => `
      <tr>
        <td>${o.order_number}</td>
        <td>${o.customer_name}</td>
        <td>${o.phone}</td>
        <td>${money(o.total)}</td>
        <td><span class="pill ${statusPillClass(o.status)}">${o.status}</span></td>
        <td>${new Date(o.created_at).toLocaleDateString("ar-EG")}</td>
        <td><button class="action-btn" data-view-order="${o.id}" title="عرض">👁️</button></td>
      </tr>`).join("");

    body.querySelectorAll("[data-view-order]").forEach(b => b.addEventListener("click", () => openOrderModal(b.dataset.viewOrder)));
  }

  document.getElementById("order-filter-status").addEventListener("change", renderOrdersTable);

  let currentOrderId = null;
  async function openOrderModal(id){
    currentOrderId = id;
    const o = orders.find(x => x.id === id);
    if(!o) return;
    document.getElementById("order-detail-number").textContent = `#${o.order_number}`;
    document.getElementById("order-status-select").value = o.status;

    const body = document.getElementById("order-detail-body");
    body.innerHTML = `<p style="font-size:13.5px;color:var(--a-ink-soft);">جاري تحميل تفاصيل الطلب...</p>`;
    document.getElementById("modal-order").classList.add("active");

    const { data: items, error } = await supabaseClient.from("order_items").select("*").eq("order_id", id);
    const itemsHtml = (!error && items && items.length)
      ? items.map(i => `<tr><td>${i.product_name}</td><td>${[i.size,i.color].filter(Boolean).join(" · ") || "—"}</td><td>${i.quantity}</td><td>${money(i.subtotal)}</td></tr>`).join("")
      : `<tr><td colspan="4">لا توجد عناصر</td></tr>`;

    body.innerHTML = `
      <div class="f-field"><label>العميل</label><div>${o.customer_name} · ${o.phone}</div></div>
      <div class="f-field"><label>العنوان</label><div>${o.address || "—"}</div></div>
      ${o.notes ? `<div class="f-field"><label>ملاحظات</label><div>${o.notes}</div></div>` : ""}
      <table style="margin-top:10px;">
        <thead><tr><th>المنتج</th><th>الخيارات</th><th>الكمية</th><th>الإجمالي</th></tr></thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <div style="text-align:left;margin-top:10px;font-weight:800;">الإجمالي الكلي: ${money(o.total)}</div>
    `;
  }

  document.getElementById("order-status-save").addEventListener("click", async () => {
    if(!currentOrderId) return;
    const newStatus = document.getElementById("order-status-select").value;
    const { error } = await supabaseClient.from("orders").update({ status:newStatus }).eq("id", currentOrderId);
    if(error){ showToast("تعذّر تحديث الحالة"); return; }
    showToast("تم تحديث حالة الطلب");
    closeModal("modal-order");
    loadOrders();
    loadOverview();
  });

  /* ================= MODAL HELPERS ================= */
  function closeModal(id){ document.getElementById(id).classList.remove("active"); }
  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.dataset.close));
  });
  document.querySelectorAll(".a-modal-overlay").forEach(m => {
    m.addEventListener("click", (e) => { if(e.target === m) closeModal(m.id); });
  });

  /* ================= INIT ================= */
  guard();

})();
