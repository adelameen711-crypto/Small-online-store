/**
 * Main Script - LUXE E-commerce
 */

// --- 1. Product Data ---
const products = [
    {
        id: 1,
        title: "ساعة يد كلاسيكية",
        price: 1200,
        category: "إكسسوارات",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999&auto=format&fit=crop",
        description: "ساعة يد كلاسيكية فاخرة تجمع بين الأناقة والدقة. مصنوعة من الفولاذ المقاوم للصدأ ومزودة بحزام جلدي طبيعي يوفر راحة فائقة على المعصم.",
        specs: ["مقاومة للماء حتى 50 متر", "حزام من الجلد الطبيعي", "زجاج ياقوتي مقاوم للخدش", "حركة كوارتز سويسرية"]
    },
    {
        id: 2,
        title: "حقيبة جلدية فاخرة",
        price: 850,
        category: "حقائب",
        image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop",
        description: "حقيبة يومية أنيقة تتسع لجميع احتياجاتك. تتميز بتصميم كلاسيكي مع لمسات عصرية، مثالية للعمل والخروجات المتنوعة.",
        specs: ["مصنوعة من جلد البقر الأصلي 100%", "جيب داخلي مبطن للحاسوب المحمول", "حزام كتف قابل للتعديل والفصل", "سحابات معدنية متينة ضد الصدأ"]
    },
    {
        id: 3,
        title: "حذاء رياضي أنيق",
        price: 450,
        category: "أحذية",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
        description: "حذاء رياضي بتصميم عصري يمنحك راحة قصوى أثناء المشي بفضل النعل الداخلي المبطن بتقنية امتصاص الصدمات.",
        specs: ["نعل مطاطي مانع للانزلاق", "جزء علوي شبكي للتهوية", "وسادة داخلية لدعم قوس القدم", "تصميم خفيف الوزن"]
    },
    {
        id: 4,
        title: "عطر فرنسي مميز",
        price: 600,
        category: "عطور",
        image: "https://images.unsplash.com/photo-1523293115678-d2900f52f464?q=80&w=2105&auto=format&fit=crop",
        description: "عطر ساحر يمزج بين روائح الأخشاب الشرقية والزهور الطبيعية ليمنحك جاذبية تدوم طوال اليوم.",
        specs: ["الحجم: 100 مل", "ثبات عالي يدوم لأكثر من 12 ساعة", "مكونات طبيعية بنسبة 90%", "زجاجة كريستالية فخمة"]
    },
    {
        id: 5,
        title: "نظارة شمسية عصرية",
        price: 300,
        category: "إكسسوارات",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000&auto=format&fit=crop",
        description: "نظارة شمسية بتصميم يواكب أحدث صيحات الموضة. توفر حماية مثالية لعينيك من أشعة الشمس الضارة.",
        specs: ["حماية 100% من الأشعة فوق البنفسجية UV400", "إطار معدني خفيف جداً", "عدسات مستقطبة (Polarized)", "علبة جلدية فاخرة للحفظ"]
    },
    {
        id: 6,
        title: "محفظة رجالية كلاسيكية",
        price: 250,
        category: "إكسسوارات",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1974&auto=format&fit=crop",
        description: "محفظة جيب كلاسيكية بتفاصيل دقيقة، توفر مساحة كافية للبطاقات والنقود دون أن تسبب انتفاخاً في الجيب.",
        specs: ["جلد طبيعي عالي الجودة", "تحتوي على 8 جيوب للبطاقات", "جيب مخفي للعملات الورقية", "تقنية حجب موجات RFID لحماية البطاقات"]
    }
];

// --- 2. State & DOM Variables ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const body = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');
const cartBadge = document.getElementById('cart-badge');
const backToTopBtn = document.getElementById('back-to-top');

// --- 3. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateCartBadge();
    
    if(document.getElementById('featured-products-container')) {
        renderProducts(products, 'featured-products-container', 4);
        initSlider();
        initCountdown();
    }
    
    if(document.getElementById('all-products-container')) {
        renderProducts(products, 'all-products-container');
        initFilters();
    }
    
    // Initialize Product Details Page
    if(document.getElementById('product-details-container')) {
        initProductDetails();
    }

    if(document.getElementById('cart-content')) {
        renderCart();
    }

    if(document.getElementById('login-form')) {
        initLoginForm();
    }

    if(document.getElementById('contact-form')) {
        initContactForm();
    }

    initScrollObserver();
});

// --- 4. Dark Mode Logic ---
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="ph ph-sun"></i>';
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggleBtn.innerHTML = '<i class="ph ph-moon"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'light') {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="ph ph-sun"></i>';
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="ph ph-moon"></i>';
        }
    });
}

// --- 5. Render Products ---
function renderProducts(productsList, containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const displayList = limit ? productsList.slice(0, limit) : productsList;

    if (displayList.length === 0) {
        const noRes = document.getElementById('no-results');
        if(noRes) noRes.style.display = 'block';
    } else {
        const noRes = document.getElementById('no-results');
        if(noRes) noRes.style.display = 'none';
    }

    displayList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <div class="product-overlay">
                    <button class="action-btn add-to-cart" data-id="${product.id}" aria-label="إضافة للسلة">
                        <i class="ph ph-shopping-cart-simple"></i>
                    </button>
                    <!-- Eye button now navigates to product details page -->
                    <button class="action-btn quick-view" data-id="${product.id}" aria-label="التفاصيل والمواصفات">
                        <i class="ph ph-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${product.price} ر.س</div>
            </div>
        `;
        
        container.appendChild(productCard);
    });

    attachProductEvents();
}

// --- 6. Filters & Search (Products Page) ---
function initFilters() {
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categorySelect.value;

        const filtered = products.filter(p => {
            const matchSearch = p.title.toLowerCase().includes(searchTerm);
            const matchCategory = category === 'الكل' || p.category === category;
            return matchSearch && matchCategory;
        });

        renderProducts(filtered, 'all-products-container');
    }

    searchInput.addEventListener('input', filterProducts);
    categorySelect.addEventListener('change', filterProducts);
}

// --- 7. Product Details Page Logic ---
function initProductDetails() {
    // Parse URL parameter e.g., product-details.html?id=2
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    const product = products.find(p => p.id === productId);

    if(!product) {
        document.getElementById('error-message').style.display = 'block';
        return;
    }

    // Populate data
    document.getElementById('product-details-container').style.display = 'flex';
    document.getElementById('pd-image').src = product.image;
    document.getElementById('pd-image').alt = product.title;
    document.getElementById('pd-category').textContent = product.category;
    document.getElementById('pd-title').textContent = product.title;
    document.getElementById('pd-price').textContent = `${product.price} ر.س`;
    document.getElementById('pd-description').textContent = product.description;
    
    const specsList = document.getElementById('pd-specs');
    specsList.innerHTML = '';
    product.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
    });

    const addBtn = document.getElementById('pd-add-btn');
    addBtn.onclick = () => {
        addToCart(product.id);
    };
}

function openQuickView(productId) {
    // Navigates to the details page with the ID parameter
    window.location.href = `product-details.html?id=${productId}`;
}

// --- 8. Product Actions (Cart & Quick View) ---
function attachProductEvents() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const quickViewBtns = document.querySelectorAll('.quick-view');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.getAttribute('data-id'));
            addToCart(productId);
        });
    });

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.getAttribute('data-id'));
            openQuickView(productId); // This now redirects!
        });
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showCustomAlert(`تم إضافة "${product.title}" إلى السلة بنجاح!`, 'success');
}

function updateCartBadge() {
    if(cartBadge) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.style.transform = 'scale(1.5)';
        setTimeout(() => {
            cartBadge.style.transform = 'scale(1)';
        }, 300);
    }
}

// --- 9. Cart Page Logic (Calculator) ---
function renderCart() {
    const container = document.getElementById('cart-items-container');
    const emptyMsg = document.getElementById('empty-cart-msg');
    
    if(!container) return;

    container.innerHTML = '';

    if(cart.length === 0) {
        emptyMsg.style.display = 'block';
        document.querySelector('.cart-summary').style.display = 'none';
        return;
    } else {
        emptyMsg.style.display = 'none';
        document.querySelector('.cart-summary').style.display = 'block';
    }

    cart.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.style.cssText = 'display: flex; gap: 1.5rem; background: var(--surface-color); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-color); align-items: center; position: relative; flex-wrap: wrap;';
        
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.title}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1; min-width: 150px;">
                <span style="color: var(--text-muted); font-size: 0.85rem;">${item.category}</span>
                <h4 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--text-color);">${item.title}</h4>
                <div style="color: var(--secondary-color); font-weight: bold;">${item.price} ر.س</div>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem; background: var(--background-color); padding: 0.5rem; border-radius: 50px; border: 1px solid var(--border-color);">
                <button class="qty-btn minus" data-index="${index}" style="width: 30px; height: 30px; border-radius: 50%; background: var(--surface-color); border: 1px solid var(--border-color); color: var(--text-color); display: flex; justify-content: center; align-items: center;"><i class="ph ph-minus"></i></button>
                <span style="font-weight: bold; width: 20px; text-align: center; color: var(--text-color);">${item.quantity}</span>
                <button class="qty-btn plus" data-index="${index}" style="width: 30px; height: 30px; border-radius: 50%; background: var(--surface-color); border: 1px solid var(--border-color); color: var(--text-color); display: flex; justify-content: center; align-items: center;"><i class="ph ph-plus"></i></button>
            </div>
            <button class="remove-btn" data-index="${index}" style="position: absolute; top: 15px; left: 15px; color: var(--error-color); background: none; border: none; font-size: 1.2rem; cursor: pointer;"><i class="ph ph-trash"></i></button>
        `;
        container.appendChild(itemEl);
    });

    attachCartEvents();
    calculateTotals();
}

function attachCartEvents() {
    document.querySelectorAll('.qty-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            cart[index].quantity += 1;
            updateCartData();
        });
    });

    document.querySelectorAll('.qty-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            if(cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            updateCartData();
        });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('mouseover', (e) => {
            e.currentTarget.style.transform = 'scale(1.2)';
        });
        btn.addEventListener('mouseout', (e) => {
            e.currentTarget.style.transform = 'scale(1)';
        });

        btn.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            cart.splice(index, 1);
            updateCartData();
        });
    });
}

function updateCartData() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    if(document.getElementById('subtotal')) {
        document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)} ر.س`;
        document.getElementById('tax').textContent = `${tax.toFixed(2)} ر.س`;
        document.getElementById('total').textContent = `${total.toFixed(2)} ر.س`;
    }
}

// --- 10. Forms Validation ---
function initLoginForm() {
    const form = document.getElementById('login-form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const togglePass = document.getElementById('toggle-password');

    togglePass.addEventListener('click', () => {
        if(password.type === 'password') {
            password.type = 'text';
            togglePass.classList.replace('ph-eye', 'ph-eye-slash');
        } else {
            password.type = 'password';
            togglePass.classList.replace('ph-eye-slash', 'ph-eye');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if(!email.value.includes('@') || email.value.trim() === '') {
            email.classList.add('error');
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        } else {
            email.classList.remove('error');
            document.getElementById('email-error').style.display = 'none';
        }

        if(password.value.length < 6) {
            password.classList.add('error');
            document.getElementById('password-error').style.display = 'block';
            isValid = false;
        } else {
            password.classList.remove('error');
            document.getElementById('password-error').style.display = 'none';
        }

        if(isValid) {
            showCustomAlert('تم تسجيل الدخول بنجاح!', 'success');
            setTimeout(() => { window.location.href = 'index.html'; }, 1500);
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const name = document.getElementById('name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if(name.value.trim() === '') {
            name.classList.add('error');
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        } else {
            name.classList.remove('error');
            document.getElementById('name-error').style.display = 'none';
        }

        if(!email.value.includes('@') || email.value.trim() === '') {
            email.classList.add('error');
            document.getElementById('contact-email-error').style.display = 'block';
            isValid = false;
        } else {
            email.classList.remove('error');
            document.getElementById('contact-email-error').style.display = 'none';
        }

        if(message.value.trim().length < 10) {
            message.classList.add('error');
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        } else {
            message.classList.remove('error');
            document.getElementById('message-error').style.display = 'none';
        }

        if(isValid) {
            showCustomAlert('تم إرسال رسالتك بنجاح. سنتواصل معك قريباً!', 'success');
            form.reset();
        }
    });
}

// --- 11. Alerts & Utilities ---
function showCustomAlert(message, type = 'success') {
    const container = document.getElementById('alerts-container');
    if (!container) return;

    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    
    const icon = type === 'success' 
        ? '<i class="ph ph-check-circle" style="color: var(--success-color); font-size: 1.5rem;"></i>' 
        : '<i class="ph ph-warning-circle" style="color: var(--error-color); font-size: 1.5rem;"></i>';
    
    alert.innerHTML = `
        ${icon}
        <span style="font-weight: 500;">${message}</span>
    `;
    
    container.appendChild(alert);
    
    setTimeout(() => alert.classList.add('show'), 10);
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 500); 
    }, 3000);
}

function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    if (!slides.length) return;
    let currentSlide = 0;
    
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    function nextSlide() { goToSlide((currentSlide + 1) % slides.length); }
    function prevSlide() { goToSlide(currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1); }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    setInterval(nextSlide, 6000);
}

function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    const elements = ['days', 'hours', 'minutes', 'seconds'].map(id => document.getElementById(id));

    function updateTimer() {
        const distance = endDate.getTime() - new Date().getTime();
        if (distance < 0) {
            countdownEl.innerHTML = "<h3 style='color: var(--text-color); font-weight: 700;'>انتهى العرض!</h3>";
            return;
        }
        const values = [
            Math.floor(distance / (1000 * 60 * 60 * 24)),
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            Math.floor((distance % (1000 * 60)) / 1000)
        ];
        elements.forEach((el, i) => { if(el) el.textContent = values[i] < 10 ? '0' + values[i] : values[i]; });
    }
    updateTimer();
    setInterval(updateTimer, 1000);
}

function initScrollObserver() {
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => revealOnScroll.observe(reveal));

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            if(backToTopBtn) backToTopBtn.classList.add('show');
        } else {
            if(backToTopBtn) backToTopBtn.classList.remove('show');
        }
    });

    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}
