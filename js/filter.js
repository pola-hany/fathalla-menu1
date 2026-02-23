// filter.js - فلترة وبحث المنتجات
const Filter = (function() {
  // فلترة حسب التصنيف
  function filterByCategory(products, categoryId) {
    if (categoryId === 'all') return products;
    return products.filter(p => p.category === categoryId);
  }

  // بحث في المنتجات
  function searchProducts(products, query) {
    if (!query || query.trim() === '') return products;
    
    const searchTerm = query.toLowerCase().trim();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      (product.description && product.description.toLowerCase().includes(searchTerm))
    );
  }

  // ترتيب المنتجات
  function sortProducts(products, sortBy = 'name') {
    return [...products].sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      return a.name.localeCompare(b.name);
    });
  }

  return {
    filterByCategory,
    searchProducts,
    sortProducts
  };
})();