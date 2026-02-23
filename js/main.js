// main.js - الملف الرئيسي لربط كل المكونات
document.addEventListener('DOMContentLoaded', async function() {
  // تحميل الهيدر والفوتر
  await loadComponents();
  
  // تهيئة مدير المنتجات
  await ProductManager.loadAllProducts();
  
  // الحصول على العناصر
  const productsContainer = document.getElementById('productsContainer');
  const searchInput = document.getElementById('searchInput');
  
  // المتغيرات العامة
  let currentCategory = 'hot';
  let currentProducts = ProductManager.getProductsByCategory('hot');
  
  // عرض المنتجات الأولية
  Renderer.renderProducts(currentProducts, productsContainer);
  
  // عرض أزرار التصنيفات
  Renderer.renderFilterTabs(
    ProductManager.getCategories(),
    currentCategory,
    function(categoryId) {
      currentCategory = categoryId;
      currentProducts = ProductManager.getProductsByCategory(categoryId);
      Renderer.renderProducts(currentProducts, productsContainer);
      searchInput.value = ''; // مسح البحث عند تغيير التصنيف
    }
  );
  
  // البحث المباشر
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.trim();
    
    if (query === '') {
      // لو البحث فاضي، نرجع منتجات التصنيف الحالي
      currentProducts = ProductManager.getProductsByCategory(currentCategory);
    } else {
      // بحث في جميع المنتجات
      const allProducts = ProductManager.getAllProducts();
      currentProducts = Filter.searchProducts(allProducts, query);
    }
    
    Renderer.renderProducts(currentProducts, productsContainer);
  });
  
  // تهيئة شريط العروض
  await OffersManager.initOffersSlider();
});

// تحميل مكونات الهيدر والفوتر
async function loadComponents() {
  try {
    // تحميل الهيدر
    const headerResponse = await fetch('components/header.html');
    const headerHtml = await headerResponse.text();
    document.getElementById('header-container').innerHTML = headerHtml;
    
    // تحميل الفوتر
    const footerResponse = await fetch('components/footer.html');
    const footerHtml = await footerResponse.text();
    document.getElementById('footer-container').innerHTML = footerHtml;
  } catch (error) {
    console.error('خطأ في تحميل المكونات:', error);
  }
}