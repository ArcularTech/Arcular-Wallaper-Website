// Sample wallpaper data - in real use, this could be fetched from a server or API
const wallpapers = [
    { id: 1, category: 'nature', src: './wallapers/Nature/N1.jpg', alt: 'Nature Wallpaper 1' },
    { id: 2, category: 'nature', src: 'images/nature2.jpg', alt: 'Nature Wallpaper 2' },
    { id: 3, category: 'abstract', src: 'images/abstract1.jpg', alt: 'Abstract Wallpaper 1' },
    { id: 4, category: 'animals', src: 'images/animals1.jpg', alt: 'Animals Wallpaper 1' },
    { id: 5, category: 'tech', src: 'images/tech1.jpg', alt: 'Tech Wallpaper 1' },
    { id: 6, category: 'quotes', src: 'images/quotes1.jpg', alt: 'Quotes Wallpaper 1' },
    { id: 7, category: 'abstract', src: 'images/abstract2.jpg', alt: 'Abstract Wallpaper 2' },
    { id: 8, category: 'animals', src: 'images/animals2.jpg', alt: 'Animals Wallpaper 2' },
    { id: 9, category: 'anime', src: 'images/anime1.jpg', alt: 'Anime Wallpaper 1' },
    { id: 10, category: 'nature', src: 'images/nature3.jpg', alt: 'Nature Wallpaper 3' },
    { id: 11, category: 'tech', src: 'images/tech2.jpg', alt: 'Tech Wallpaper 2' },
    { id: 12, category: 'quotes', src: 'images/quotes2.jpg', alt: 'Quotes Wallpaper 2' },
    { id: 13, category: 'anime', src: 'images/anime2.jpg', alt: 'Anime Wallpaper 2' },
    { id: 14, category: 'abstract', src: 'images/abstract3.jpg', alt: 'Abstract Wallpaper 3' },
    { id: 15, category: 'animals', src: 'images/animals3.jpg', alt: 'Animals Wallpaper 3' },
    { id: 16, category: 'super-hero', src: 'images/superhero1.jpg', alt: 'Super Hero Wallpaper 1' },
    { id: 17, category: 'super-hero', src: 'images/superhero2.jpg', alt: 'Super Hero Wallpaper 2' },
    { id: 18, category: 'sci-fi', src: 'images/scifi1.jpg', alt: 'Sci-Fi Wallpaper 1' },
    { id: 19, category: 'sci-fi', src: 'images/scifi2.jpg', alt: 'Sci-Fi Wallpaper 2' },
    { id: 20, category: 'desktop', src: 'images/desktop1.jpg', alt: 'Desktop Wallpaper 1' },
    { id: 21, category: 'desktop', src: 'images/desktop2.jpg', alt: 'Desktop Wallpaper 2' },
    { id: 22, category: 'laptop', src: 'images/laptop1.jpg', alt: 'Laptop Wallpaper 1' },
    { id: 23, category: 'laptop', src: 'images/laptop2.jpg', alt: 'Laptop Wallpaper 2' },
    { id: 24, category: 'mobile', src: 'images/mobile1.jpg', alt: 'Mobile Wallpaper 1' },
    { id: 25, category: 'mobile', src: 'images/mobile2.jpg', alt: 'Mobile Wallpaper 2' }
];

const wallpapersGrid = document.getElementById('wallpapersGrid');
const categoryNavItems = document.querySelectorAll('.categories-nav li');
const categoryCards = document.querySelectorAll('.category-card');
const paginationContainer = document.getElementById('pagination');

const ITEMS_PER_PAGE = 5;
let currentCategory = 'all';
let currentPage = 1;
let currentSearchQuery = '';

function renderWallpapers(category, page = 1, searchQuery = '') {
    wallpapersGrid.innerHTML = '';
    let filteredWallpapers = wallpapers;
    if (category && category !== 'all') {
        filteredWallpapers = wallpapers.filter(wp => wp.category === category);
    }
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredWallpapers = filteredWallpapers.filter(wp => wp.alt.toLowerCase().includes(lowerQuery));
    }
    if (filteredWallpapers.length === 0) {
        wallpapersGrid.innerHTML = '<p>No wallpapers found.</p>';
        paginationContainer.innerHTML = '';
        return;
    }

    const totalPages = Math.ceil(filteredWallpapers.length / ITEMS_PER_PAGE);
    if (page > totalPages) page = totalPages;
    if (page < 1) page = 1;

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const wallpapersToShow = filteredWallpapers.slice(startIndex, endIndex);

    wallpapersToShow.forEach(wp => {
        const card = document.createElement('div');
        card.className = 'wallpaper-card';
        card.innerHTML = `
            <img src="${wp.src}" alt="${wp.alt}" />
            <button class="download-btn" data-src="${wp.src}" aria-label="Download ${wp.alt}">Download</button>
        `;
        wallpapersGrid.appendChild(card);
    });

    renderPagination(totalPages, page);
}

function renderPagination(totalPages, currentPage) {
    paginationContainer.innerHTML = '';
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = 'page-btn';
        if (i === currentPage) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
            currentPage = i;
            renderWallpapers(currentCategory, currentPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(btn);
    }
}

function setActiveCategory(category) {
    currentCategory = category;
    currentPage = 1;
    categoryNavItems.forEach(item => {
        item.classList.toggle('active', item.dataset.category === category);
    });
    categoryCards.forEach(card => {
        card.classList.toggle('active', card.dataset.category === category);
    });
}

categoryNavItems.forEach(item => {
    if (!item.classList.contains('coming-soon')) {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            currentSearchQuery = '';
            document.getElementById('searchInput').value = '';
            setActiveCategory(category);
            renderWallpapers(category, currentPage, currentSearchQuery);
        });
    }
});

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        setActiveCategory(category);
        renderWallpapers(category, currentPage);
        // Scroll to wallpapers section
        document.querySelector('.wallpapers-section').scrollIntoView({ behavior: 'smooth' });
    });
});

wallpapersGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('download-btn')) {
        const src = e.target.dataset.src;
        const link = document.createElement('a');
        link.href = src;
        link.download = src.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value.trim();
    currentPage = 1;
    renderWallpapers(currentCategory, currentPage, currentSearchQuery);
});

// Initial render
renderWallpapers(currentCategory, currentPage, currentSearchQuery);
