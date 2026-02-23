// products.js - إدارة وتحضير بيانات المنتجات
const ProductManager = (function() {
  // قائمة التصنيفات مع أسمائها
  const categories = [
    { id: 'hot', label: 'مشروبات ساخنة', file: 'hot-drinks.json' },
    { id: 'ice', label: 'مشروبات مثلجة', file: 'ice-drinks.json' },
    { id: 'pizza', label: 'البيتزا', file: 'pizza.json' },
    { id: 'fatir', label: 'الفطير المحشي', file: 'fatir.json' },
    { id: 'meals', label: 'الوجبات', file: 'meals.json' },
    { id: 'pasta', label: 'المكرونة', file: 'pasta.json' },
    { id: 'offers', label: 'العروض المميزة', file: 'offers.json' }
  ];

  // مخزن البيانات
  let productsData = {};

  // تحميل جميع ملفات JSON
  async function loadAllProducts() {
    try {
      const fetchPromises = categories.map(async cat => {
        const response = await fetch(`data/${cat.file}`);
        const data = await response.json();
        productsData[cat.id] = data;
      });

      await Promise.all(fetchPromises);
      console.log('تم تحميل جميع المنتجات بنجاح');
      return productsData;
    } catch (error) {
      console.error('خطأ في تحميل المنتجات:', error);
      return {};
    }
  }

  // الحصول على منتجات تصنيف معين
  function getProductsByCategory(categoryId) {
    return productsData[categoryId] || [];
  }

  // الحصول على جميع المنتجات (للبحث)
  function getAllProducts() {
    return Object.values(productsData).flat();
  }

  // الحصول على قائمة التصنيفات
  function getCategories() {
    return categories;
  }

  return {
    loadAllProducts,
    getProductsByCategory,
    getAllProducts,
    getCategories
  };
})();