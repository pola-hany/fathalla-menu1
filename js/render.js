// render.js - عرض المنتجات في الصفحة
const Renderer = (function() {
  // عرض المنتجات في الشبكة
  function renderProducts(products, container) {
    if (!products || products.length === 0) {
      container.innerHTML = '<div class="no-products">لا توجد منتجات حالياً</div>';
      return;
    }

    let html = '';
    products.forEach((product, index) => {
      html += `
        <div class="product-card" style="animation-delay: ${index * 0.05}s">
          <img 
            src="${product.image}" 
            alt="${product.name}"
            loading="lazy"
            onerror="this.src='https://via.placeholder.com/400/000000/ffffff?text=فتح+الله'"
          >
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description || 'وصف غير متوفر'}</p>
          <div class="product-price">${product.price}</div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // عرض أزرار التصنيفات
  function renderFilterTabs(categories, activeId, onClickCallback) {
    const tabsContainer = document.getElementById('filterTabs');
    if (!tabsContainer) return;

    let html = '';
    categories.forEach(cat => {
      const activeClass = cat.id === activeId ? 'active' : '';
      html += `<button class="tab-btn ${activeClass}" data-category="${cat.id}">${cat.label}</button>`;
    });

    tabsContainer.innerHTML = html;

    // إضافة الأحداث
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const categoryId = btn.dataset.category;
        onClickCallback(categoryId);
        
        // تحديث الحالة النشطة
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  return {
    renderProducts,
    renderFilterTabs
  };
})();