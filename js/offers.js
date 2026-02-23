// offers.js - التحكم في شريط العروض
const OffersManager = (function() {
  let currentIndex = 0;
  let intervalId = null;
  let offersData = [];

  // تهيئة السلايدر
  async function initOffersSlider() {
    const track = document.getElementById('offersTrack');
    if (!track) return;

    try {
      // تحميل بيانات العروض
      const response = await fetch('data/offers.json');
      offersData = await response.json();
      
      if (offersData.length === 0) return;

      // عرض العروض
      renderOffers(track, offersData);
      
      // بدء الحركة التلقائية
      startAutoSlide();
      
      // إيقاف الحركة عند المرور بالماوس
      track.addEventListener('mouseenter', stopAutoSlide);
      track.addEventListener('mouseleave', startAutoSlide);
      
    } catch (error) {
      console.error('خطأ في تحميل العروض:', error);
    }
  }

  // عرض العروض في السلايدر
  function renderOffers(track, offers) {
    let html = '';
    
    // نكرر العروض لعمل حركة لا نهائية
    for (let i = 0; i < 3; i++) {
      offers.forEach(offer => {
        html += `
          <div class="offer-card">
            <img 
              src="${offer.image}" 
              alt="${offer.name}"
              onerror="this.src='https://via.placeholder.com/300/000000/ffffff?text=عرض'"
            >
            <div class="offer-info">
              <h4>${offer.name}</h4>
              <p class="offer-description">${offer.description.substring(0, 50)}...</p>
              <div class="offer-price">${offer.price} جنيه</div>
            </div>
          </div>
        `;
      });
    }
    
    track.innerHTML = html;
  }

  // بدء الحركة التلقائية
  function startAutoSlide() {
    if (intervalId) return;
    
    const track = document.getElementById('offersTrack');
    const cards = document.querySelectorAll('.offer-card');
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth + 24; // عرض الكارد + الجاب
    
    intervalId = setInterval(() => {
      currentIndex++;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      track.style.transition = 'transform 0.6s ease';
      
      // إذا وصلنا للنهاية، نرجع للبداية بدون حركة
      if (currentIndex >= offersData.length) {
        setTimeout(() => {
          track.style.transition = 'none';
          currentIndex = 0;
          track.style.transform = 'translateX(0)';
          
          setTimeout(() => {
            track.style.transition = 'transform 0.6s ease';
          }, 50);
        }, 600);
      }
    }, 4000);
  }

  // إيقاف الحركة التلقائية
  function stopAutoSlide() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  return {
    initOffersSlider
  };
})();