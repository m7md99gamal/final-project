let currentLang = 'ar';

const uiStrings = {
    ar: {
        location: 'المكان',
        priceRange: 'نطاق الأسعار',
        yearsExp: 'سنوات خبرة',
        completedJobs: 'مهمة مكتملة',
        specialty: 'التخصص',
        bookNow: 'احجز الآن',
        jobs: 'مهمة',
        filtersApplied: 'تم تطبيق الفلاتر بنجاح',
        loginFirst: 'يرجى تسجيل الدخول أولاً لحجز الخدمة',
        fillAllFields: 'يرجى ملء جميع الحقول',
        loginSuccess: 'تم تسجيل الدخول بنجاح!',
        registerSuccess: 'تم إنشاء الحساب بنجاح!',
        bookingSuccess: 'تم الحجز بنجاح! سيتم التواصل معك قريباً',
        craftsmanWelcome: 'يمكنك الآن إدارة خدماتك وطلباتك',
        hello: 'مرحباً،',
        dashboard: 'لوحة التحكم',
        currency: 'جنيه',
        searchPlaceholder: 'ابحث عن خدمات أو حرفيين',
        unexpectedError: 'حدث خطأ غير متوقع'
    },
    en: {
        location: 'Location',
        priceRange: 'Price Range',
        yearsExp: 'Years Exp.',
        completedJobs: 'Completed Jobs',
        specialty: 'Specialty',
        bookNow: 'Book Now',
        jobs: 'jobs',
        filtersApplied: 'Filters applied successfully',
        loginFirst: 'Please log in first to book a service',
        fillAllFields: 'Please fill in all fields',
        loginSuccess: 'Logged in successfully!',
        registerSuccess: 'Account created successfully!',
        bookingSuccess: 'Booking confirmed! We will contact you soon',
        craftsmanWelcome: 'You can now manage your services and requests',
        hello: 'Hello,',
        dashboard: 'Dashboard',
        currency: 'EGP',
        searchPlaceholder: 'Search for services or craftsmen',
        unexpectedError: 'An unexpected error occurred'
    }
};

const categoryNames = {
    ar: {
        carpentry: 'النجارة',
        electrical: 'الكهرباء',
        plumbing: 'السباكة',
        painting: 'الدهانات',
        cleaning: 'التنظيف'
    },
    en: {
        carpentry: 'Carpentry',
        electrical: 'Electrical',
        plumbing: 'Plumbing',
        painting: 'Painting',
        cleaning: 'Cleaning'
    }
};

// Sample data for craftsmen
const craftsmenData = [
    {
        id: 1,
        name: "أحمد محمود",
        businessName: "ورشة النجارة المتميزة",
        category: "carpentry",
        rating: 4.8,
        completedJobs: 127,
        yearsExperience: 8,
        location: "القاهرة",
        skills: ["أثاث منزلي", "مطابخ", "أبواب وشبابيك"],
        avatar: "🔨",
        priceRange: "300-2000 جنيه"
    },
    {
        id: 2,
        name: "محمد السيد",
        businessName: "كهربائي معتمد",
        category: "electrical",
        rating: 4.9,
        completedJobs: 89,
        yearsExperience: 12,
        location: "الجيزة",
        skills: ["تركيب أنظمة", "صيانة منزلية", "طوارئ"],
        avatar: "⚡",
        priceRange: "150-800 جنيه"
    },
    {
        id: 3,
        name: "إبراهيم فتحي",
        businessName: "سباك محترف",
        category: "plumbing",
        rating: 4.7,
        completedJobs: 156,
        yearsExperience: 10,
        location: "القاهرة",
        skills: ["تركيب حمامات", "صيانة مواسير", "حل مشاكل تسريب"],
        avatar: "🔧",
        priceRange: "200-1200 جنيه"
    },
    {
        id: 4,
        name: "سعيد رشدي",
        businessName: "فنان الدهانات",
        category: "painting",
        rating: 4.6,
        completedJobs: 94,
        yearsExperience: 7,
        location: "شرم الشيخ",
        skills: ["دهانات داخلية", "دهانات خارجية", "ورق جدران"],
        avatar: "🎨",
        priceRange: "250-1500 جنيه"
    },
    {
        id: 5,
        name: "حسن علي",
        businessName: "خدمات التنظيف الشامل",
        category: "cleaning",
        rating: 4.5,
        completedJobs: 203,
        yearsExperience: 15,
        location: "الإسكندرية",
        skills: ["تنظيف منازل", "تنظيف مكاتب", "تعقيم"],
        avatar: "🧹",
        priceRange: "100-500 جنيه"
    }
];

function t(key) {
    return uiStrings[currentLang][key] || uiStrings.ar[key] || key;
}

function applyLanguage(lang) {
    currentLang = lang;
    const isAr = lang === 'ar';

    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        const hasTranslatableChild = Array.from(element.children).some(
            child => child.hasAttribute('data-ar') || child.hasAttribute('data-en')
        );
        if (hasTranslatableChild) return;

        const value = element.getAttribute(isAr ? 'data-ar' : 'data-en');
        if (!value) return;

        if (element.tagName === 'TITLE' || element.id === 'pageTitle') {
            element.textContent = value;
            return;
        }

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            return;
        }

        if (element.tagName === 'OPTION') {
            element.textContent = value;
            return;
        }

        element.textContent = value;
    });

    document.querySelectorAll('[data-ar-placeholder][data-en-placeholder]').forEach(input => {
        input.placeholder = input.getAttribute(isAr ? 'data-ar-placeholder' : 'data-en-placeholder');
    });

    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.textContent = isAr ? 'English' : 'العربية';
        langBtn.setAttribute('aria-label', isAr ? 'Switch to English' : 'التبديل إلى العربية');
    }

    document.querySelectorAll('[data-i18n-search="true"]').forEach(input => {
        input.placeholder = t('searchPlaceholder');
    });

    updateBudgetLabel();
    refreshCraftsmenGrid();
    updateLoggedInNavLabels();
}

function toggleLanguage() {
    applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
}

function updateBudgetLabel() {
    const budgetSlider = document.getElementById('budget');
    const budgetValue = document.getElementById('budgetValue');
    if (!budgetSlider || !budgetValue) return;

    const amount = budgetSlider.value;
    budgetValue.textContent = currentLang === 'ar' ? `${amount} جنيه` : `${amount} EGP`;
    budgetValue.setAttribute('data-ar', `${amount} جنيه`);
    budgetValue.setAttribute('data-en', `${amount} EGP`);
}

function refreshCraftsmenGrid() {
    const grid = document.getElementById('craftsmenGrid');
    if (!grid) return;

    const category = document.getElementById('category')?.value || '';
    const rating = document.getElementById('rating')?.value || '0';

    const filtered = craftsmenData.filter(craftsman => {
        const matchesCategory = !category || craftsman.category === category;
        const matchesRating = !rating || parseFloat(rating) === 0 || craftsman.rating >= parseFloat(rating);
        return matchesCategory && matchesRating;
    });

    grid.innerHTML = '';
    filtered.forEach(craftsman => grid.appendChild(createCraftsmanCard(craftsman)));
}

function updateLoggedInNavLabels() {
    const user = JSON.parse(localStorage.getItem('alosta_user') || 'null');
    if (!user?.email) return;

    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    if (loginBtn) loginBtn.textContent = `${t('hello')} ${user.name}`;
    if (registerBtn) registerBtn.textContent = t('dashboard');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Initialize Leaflet Map
function initializeMap() {
    // Default to Cairo coordinates
    const map = L.map('map').setView([30.0444, 31.2357], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for sample craftsmen
    craftsmenData.forEach(craftsman => {
        // Generate random coordinates near Cairo for demo
        const lat = 30.0444 + (Math.random() - 0.5) * 0.2;
        const lng = 31.2357 + (Math.random() - 0.5) * 0.2;
        
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`
            <strong>${craftsman.businessName}</strong><br>
            ${craftsman.name}<br>
            ⭐ ${craftsman.rating} | ${craftsman.completedJobs} مهمة
        `);
    });
}

// Render craftsmen cards
function renderCraftsmen() {
    const grid = document.getElementById('craftsmenGrid');
    
    craftsmenData.forEach(craftsman => {
        const card = createCraftsmanCard(craftsman);
        grid.appendChild(card);
    });
}

// Create craftsman card HTML
function createCraftsmanCard(craftsman) {
    const card = document.createElement('div');
    card.className = 'craftsman-card';
    card.innerHTML = `
        <div class="craftsman-header">
            <div class="craftsman-avatar">${craftsman.avatar}</div>
            <div class="craftsman-info">
                <h4>${craftsman.businessName}</h4>
                <p>${craftsman.name}</p>
                <div class="craftsman-rating">
                    <span>⭐ ${craftsman.rating}</span>
                    <span>(${craftsman.completedJobs} ${t('jobs')})</span>
                </div>
            </div>
        </div>
        <p><strong>${t('location')}:</strong> ${craftsman.location}</p>
        <p><strong>${t('priceRange')}:</strong> ${craftsman.priceRange}</p>
        <div class="craftsman-stats">
            <div class="stat">
                <div class="stat-value">${craftsman.yearsExperience}</div>
                <div class="stat-label">${t('yearsExp')}</div>
            </div>
            <div class="stat">
                <div class="stat-value">${craftsman.completedJobs}</div>
                <div class="stat-label">${t('completedJobs')}</div>
            </div>
            <div class="stat">
                <div class="stat-value">${getCategoryName(craftsman.category)}</div>
                <div class="stat-label">${t('specialty')}</div>
            </div>
        </div>
        <button class="btn btn-primary btn-full" onclick="bookCraftsman(${craftsman.id})">${t('bookNow')}</button>
    `;
    return card;
}

function getCategoryName(category) {
    return categoryNames[currentLang][category] || category;
}

// Setup event listeners
function setupEventListeners() {
    // Auth buttons
    document.getElementById('loginBtn').addEventListener('click', () => openAuthModal('login'));
    document.getElementById('registerBtn').addEventListener('click', () => openAuthModal('register'));
    document.getElementById('closeModal').addEventListener('click', closeAuthModal);
    
    // Language toggle
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    
    // Budget slider
    const budgetSlider = document.getElementById('budget');
    const budgetValue = document.getElementById('budgetValue');
    
    budgetSlider.addEventListener('input', updateBudgetLabel);
    
    // Apply filters
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    
    // Modal close on outside click
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('authModal');
        if (event.target === modal) {
            closeAuthModal();
        }
    });
}

// Setup auth form interactions
function setupAuthForms() {
    // Tab switching
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchAuthTab(targetTab);
        });
    });
    
    // Form switching
    document.querySelectorAll('.auth-switch').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetForm = this.getAttribute('data-target');
            switchAuthTab(targetForm);
        });
    });
}

// Open auth modal
function openAuthModal(formType = 'login') {
    const modal = document.getElementById('authModal');
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    switchAuthTab(formType);
}

// Close auth modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

// Switch between login and register forms
function switchAuthTab(formType) {
    // Update tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === formType) {
            tab.classList.add('active');
        }
    });
    
    // Update forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
        if (form.id === `${formType}Form`) {
            form.classList.add('active');
        }
    });

    const modalContent = document.querySelector('.auth-modal-content');
    if (modalContent) {
        modalContent.classList.toggle('auth-modal-register', formType === 'register');
    }
}

// Apply search filters
function applyFilters() {
    refreshCraftsmenGrid();
    showNotification(t('filtersApplied'), 'success');
}

// Book a craftsman
function bookCraftsman(craftsmanId) {
    const craftsman = craftsmenData.find(c => c.id === craftsmanId);
    if (!craftsman) return;
    
    // Check if user is logged in (in real app)
    if (!isUserLoggedIn()) {
        openAuthModal('login');
        showNotification(t('loginFirst'), 'warning');
        return;
    }
    
    // Show booking modal or redirect to booking page
    showBookingModal(craftsman);
}

// Check if user is logged in (mock function)
function isUserLoggedIn() {
    // In real app, check authentication token
    return localStorage.getItem('alosta_user') !== null;
}

// Show booking modal
function showBookingModal(craftsman) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.style.display='none'">&times;</span>
            <h3 class="auth-title">حجز خدمة مع ${craftsman.businessName}</h3>
            <div class="form-group">
                <label for="bookingDescription">وصف المهمة</label>
                <textarea id="bookingDescription" class="form-select" rows="3" placeholder="صف المهمة المطلوبة بالتفصيل"></textarea>
            </div>
            <div class="form-group">
                <label for="bookingBudget">الميزانية (جنيه)</label>
                <input type="number" id="bookingBudget" placeholder="أدخل الميزانية المتوقعة">
            </div>
            <div class="form-group">
                <label for="bookingDate">التاريخ المتوقع</label>
                <input type="date" id="bookingDate">
            </div>
            <div class="form-group">
                <label for="bookingLocation">موقع العمل</label>
                <input type="text" id="bookingLocation" placeholder="أدخل العنوان">
            </div>
            <button class="btn btn-primary btn-full" onclick="submitBooking(${craftsman.id})">تأكيد الحجز</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Submit booking
function submitBooking(craftsmanId) {
    const description = document.getElementById('bookingDescription').value;
    const budget = document.getElementById('bookingBudget').value;
    const date = document.getElementById('bookingDate').value;
    const location = document.getElementById('bookingLocation').value;
    
    if (!description || !budget || !date || !location) {
        showNotification(t('fillAllFields'), 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        showNotification(t('bookingSuccess'), 'success');
        
        // Close modal
        const modal = document.querySelector('.modal');
        if (modal) modal.style.display = 'none';
    }, 1000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add styles for notification
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 3000;
                min-width: 300px;
                max-width: 500px;
                padding: 1rem;
                border-radius: 0.5rem;
                color: white;
                font-weight: 600;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                animation: slideIn 0.3s ease;
            }
            .notification-success { background: var(--success); }
            .notification-error { background: #EF4444; }
            .notification-warning { background: var(--secondary); }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
            }
            @keyframes slideIn {
                from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}



// Handle login
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification(t('fillAllFields'), 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        // Mock successful login
        localStorage.setItem('alosta_user', JSON.stringify({
            email: email,
            name: currentLang === 'ar' ? 'مستخدم تجريبي' : 'Demo User',
            role: 'client'
        }));
        
        showNotification(t('loginSuccess'), 'success');
        closeAuthModal();
        updateUIForLoggedInUser();
    }, 1000);
}

// Handle register
function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('userRole').value;
    
    if (!name || !email || !phone || !password) {
        showNotification(t('fillAllFields'), 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        // Mock successful registration
        localStorage.setItem('alosta_user', JSON.stringify({
            email: email,
            name: name,
            role: role
        }));
        
        showNotification(t('registerSuccess'), 'success');
        closeAuthModal();
        updateUIForLoggedInUser();
    }, 1000);
}

// Update UI for logged in user
function updateUIForLoggedInUser() {
    const user = JSON.parse(localStorage.getItem('alosta_user') || '{}');
    
    // Update auth buttons
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (user.email) {
        loginBtn.textContent = `${t('hello')} ${user.name}`;
        registerBtn.textContent = t('dashboard');
        loginBtn.removeAttribute('data-ar');
        loginBtn.removeAttribute('data-en');

        loginBtn.onclick = () => { window.location.href = '#dashboard'; };
        registerBtn.onclick = () => { window.location.href = '#dashboard'; };
        
        if (user.role === 'craftsman') {
            showNotification(t('craftsmanWelcome'), 'info');
        }
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = t('searchPlaceholder');
    searchInput.dataset.i18nSearch = 'true';
    searchInput.className = 'search-input';
    searchInput.style.marginBottom = '2rem';
    searchInput.style.padding = '0.75rem';
    searchInput.style.border = '2px solid #e5e7eb';
    searchInput.style.borderRadius = '0.5rem';
    searchInput.style.width = '100%';
    
    // Insert search input before craftsmen grid
    const craftsmenSection = document.querySelector('.featured-craftsmen .container');
    const existingSearch = craftsmenSection.querySelector('.search-input');
    if (!existingSearch) {
        craftsmenSection.insertBefore(searchInput, document.getElementById('craftsmenGrid'));
        
        const debouncedSearch = debounce(function() {
            const searchTerm = searchInput.value.toLowerCase();
            
            const filteredCraftsmen = craftsmenData.filter(craftsman => {
                return craftsman.businessName.toLowerCase().includes(searchTerm) ||
                      craftsman.name.toLowerCase().includes(searchTerm) ||
                      craftsman.skills.some(skill => skill.toLowerCase().includes(searchTerm));
            });
            
            // Re-render filtered craftsmen
            const grid = document.getElementById('craftsmenGrid');
            grid.innerHTML = '';
            
            filteredCraftsmen.forEach(craftsman => {
                const card = createCraftsmanCard(craftsman);
                grid.appendChild(card);
            });
        }, 300);
        
        searchInput.addEventListener('input', debouncedSearch);
    }
}

// AI Recommendations (mock)
function getAIRecommendations() {
    // Simulate AI-powered recommendations
    const recommendations = craftsmenData
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
    
    return recommendations;
}

// Initialize AI recommendations on page load
function initializeAIRecommendations() {
    const recommendations = getAIRecommendations();
    
    // You could display these in a special section
    console.log('AI Recommendations:', recommendations);
}

// Location services
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported'));
        } else {
            navigator.geolocation.getCurrentPosition(
                position => resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }),
                error => reject(error)
            );
        }
    });
}

// Update map based on user location
function updateMapWithUserLocation() {
    getUserLocation()
        .then(location => {
            // Recenter map on user location
            const map = L.map('map');
            map.setView([location.lat, location.lng], 12);
            
            // Add user location marker
            L.marker([location.lat, location.lng])
                .addTo(map)
                .bindPopup('موقعك الحالي')
                .openPopup();
        })
        .catch(error => {
            console.warn('Could not get user location:', error);
        });
}

// Payment integration (mock FawryPay)
function initializePayment() {
    // Mock FawryPay initialization
    console.log('FawryPay initialized');
}

// Rating system
function submitRating(bookingId, ratings) {
    const { quality, punctuality, cleanliness, professionalism, comment } = ratings;
    
    // Calculate overall rating
    const overallRating = (quality + punctuality + cleanliness + professionalism) / 4;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('شكراً لك! تم إضافة تقييمك بنجاح', 'success');
        
        // Update craftsman's average rating
        updateCraftsmanRating(bookingId, overallRating);
    }, 1000);
}

// Update craftsman's average rating
function updateCraftsmanRating(bookingId, newRating) {
    // In real app, this would update the backend
    console.log(`Updated rating for booking ${bookingId}: ${newRating}`);
}

// Admin verification system (mock)
function verifyCraftsman(craftsmanId) {
    // Simulate admin verification
    setTimeout(() => {
        showNotification('تم التحقق من الحرفي بنجاح', 'success');
    }, 1000);
}

// Dispute resolution system
function createDispute(bookingId, reason) {
    // Simulate dispute creation
    setTimeout(() => {
        showNotification('تم تقديم الشكوى بنجاح، سيتم التواصل معك قريباً', 'info');
    }, 1000);
}



// Mobile menu toggle (for smaller screens)
function setupMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    
    menuToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('mobile-open');
    });
    
    // Add to nav on mobile
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.nav');
        nav.insertBefore(menuToggle, nav.querySelector('.nav-links'));
    }
}

// Add mobile menu styles
const mobileStyles = `
    .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .nav-links {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            right: 0;
            background: var(--white);
            box-shadow: var(--shadow);
            width: 200px;
        }
        
        .nav-links.mobile-open {
            display: flex;
        }
    }
`;

// Add mobile styles to document
if (!document.querySelector('#mobile-styles')) {
    const style = document.createElement('style');
    style.id = 'mobile-styles';
    style.textContent = mobileStyles;
    document.head.appendChild(style);
}

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Cache management
const cache = new Map();

function getCachedData(key) {
    return cache.get(key);
}

function setCachedData(key, data, ttl = 3600000) { // 1 hour default
    cache.set(key, {
        data: data,
        expiry: Date.now() + ttl
    });
    
    // Clean up expired cache entries periodically
    setTimeout(() => {
        const now = Date.now();
        for (const [cacheKey, entry] of cache.entries()) {
            if (entry.expiry < now) {
                cache.delete(cacheKey);
            }
        }
    }, 60000); // Clean every minute
}

// Export functions for global access (if needed)
window.AlOsta = {
    bookCraftsman,
    submitRating,
    verifyCraftsman,
    createDispute,
    getAIRecommendations,
    openAuthModal,
    closeAuthModal,
    scrollToSection,
    toggleLanguage,
    handleLogin,
    handleRegister
};

// Error handling
// window.addEventListener('error', function(e) {
//     console.error('Application error:', e.error);
//     showNotification('حدث خطأ غير متوقع', 'error');
// });

// Service Worker for PWA features (basic implementation)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
}

// Offline functionality
function setupOfflineSupport() {
    caches.open('alosta-v1').then(cache => {
        // Cache essential assets
        return cache.addAll([
            '/',
            '/style.css',
            '/script.js'
        ]);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Al-Osta Marketplace Initialized');

    initializeMap();
    renderCraftsmen();
    setupEventListeners();
    setupAuthForms();
    setupSearch();
    initializeAIRecommendations();
    initializePayment();
    setupMobileMenu();
    setupOfflineSupport();
    applyLanguage(currentLang);

    if (isUserLoggedIn()) {
        updateUIForLoggedInUser();
    }
});
