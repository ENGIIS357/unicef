document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const searchIcon = document.querySelector('.search-icon');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearch = document.querySelector('.close-search');
    
    // فتح/إغلاق قائمة الهاتف
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // منع التمرير عند فتح القائمة
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // فتح نافذة البحث
    searchIcon.addEventListener('click', function() {
        searchOverlay.classList.add('active');
        document.querySelector('.search-container input').focus();
    });
    
    // إغلاق نافذة البحث
    closeSearch.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
    });
    
    // إغلاق القائمة عند النقر على رابط
    const mobileLinks = document.querySelectorAll('.mobile-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});