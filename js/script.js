document.addEventListener('DOMContentLoaded', function() {
    // 1. قائمة الهاتف المنزلقة
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        navbar.classList.toggle('menu-open'); // إضافة كلاس للتحكم بالتنسيقات
        
        // التحكم في التمرير عند فتح/إغلاق القائمة
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // 2. إغلاق القائمة عند النقر على رابط
    const mobileLinks = document.querySelectorAll('.mobile-links a, .mobile-donate-btn');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // إذا كان الرابط يشير إلى # فقط
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            navbar.classList.remove('menu-open');
        });
    });
    
    // 3. نظام البحث
    const searchIcon = document.querySelector('.search-icon');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.querySelector('.search-container input');
    
    if (searchIcon && searchOverlay) {
        searchIcon.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (searchInput) searchInput.focus();
            
            // إغلاق قائمة الهاتف إذا كانت مفتوحة
            if (mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                navbar.classList.remove('menu-open');
            }
        });
        
        closeSearch.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // إغلاق البحث عند الضغط على ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // 4. تحسينات للأجهزة المحمولة
    if (window.innerWidth < 992) {
        // تأخير تحميل الصور (Lazy Loading)
        const lazyLoadImages = function() {
            const images = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '200px 0px' // بدء التحميل قبل ظهور الصورة ب 200px
            });
            
            images.forEach(img => imageObserver.observe(img));
        };
        
        // تحميل الصور عند التمرير
        window.addEventListener('load', lazyLoadImages);
        window.addEventListener('scroll', lazyLoadImages);
        window.addEventListener('resize', lazyLoadImages);
    }
    
    // 5. إغلاق القوائم عند النقر خارجها
    document.addEventListener('click', function(e) {
        // إغلاق قائمة الهاتف عند النقر خارجها
        if (mobileMenu.classList.contains('active') && 
            !e.target.closest('.mobile-menu') && 
            !e.target.closest('.hamburger-menu')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            navbar.classList.remove('menu-open');
        }
        
        // إغلاق البحث عند النقر خارج منطقة البحث
        if (searchOverlay && searchOverlay.classList.contains('active') && 
            !e.target.closest('.search-container') && 
            !e.target.closest('.search-icon')) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});