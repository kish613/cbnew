// Admin Portal JavaScript
const ADMIN_PASSWORD = '34Hillcrest!';
const STORAGE_KEY = 'crestbourne_portfolios';
const AUTH_KEY = 'crestbourne_admin_auth';

// Portfolio data structure
let portfolioData = {
    residential: [],
    commercial: []
};

// Current state
let currentTab = 'residential';
let editingPortfolio = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadPortfolioData();
    initializeEventListeners();
});

// Authentication
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem(AUTH_KEY) === 'true';
    if (isAuthenticated) {
        showDashboard();
    } else {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    loadPortfolios();
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        showDashboard();
    } else {
        errorMessage.textContent = 'Invalid password';
        document.getElementById('password').value = '';
    }
});

// Logout
function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    showLogin();
}

// Initialize event listeners
function initializeEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentTab = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadPortfolios();
        });
    });

    // Portfolio form submission
    document.getElementById('portfolioForm').addEventListener('submit', (e) => {
        e.preventDefault();
        savePortfolio();
    });
}

// Load portfolio data from localStorage
function loadPortfolioData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            portfolioData = JSON.parse(savedData);
        } catch (e) {
            console.error('Error loading portfolio data:', e);
            loadDefaultPortfolios();
        }
    } else {
        loadDefaultPortfolios();
    }
}

// Load default portfolios (current site data)
function loadDefaultPortfolios() {
    portfolioData = {
        residential: [
            {
                id: generateId(),
                title: "Spire Portfolio",
                category: "residential",
                location: "Chesterfield and Mansfield",
                type: "Mixed Portfolio",
                address: "",
                description: "A collection of 42 residential properties across Chesterfield and Mansfield, featuring a mix of terraced houses, semi-detached homes, and apartments.",
                details: [
                    { icon: "ri-building-line", text: "42 Properties" },
                    { icon: "ri-map-pin-line", text: "Derbyshire" },
                    { icon: "ri-home-4-line", text: "Mixed Portfolio" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421155/spire_10_hx3pfn.png", alt: "Spire Portfolio - Chesterfield and Mansfield Properties" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421153/spire_4_rksn9r.png", alt: "Spire Portfolio - Chesterfield and Mansfield Properties" }
                ]
            },
            {
                id: generateId(),
                title: "Cobbler Northampton Portfolio",
                category: "residential",
                location: "Northampton",
                type: "Terraced Houses",
                address: "Baker Street, Northampton, NN1",
                description: "High-quality terraced properties in Northampton, fully refurbished and managed by our in-house team. Features modern amenities and prime locations.",
                details: [
                    { icon: "ri-building-line", text: "15 Houses" },
                    { icon: "ri-map-pin-line", text: "Central Northampton" },
                    { icon: "ri-shield-check-line", text: "Fully Managed" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/Screenshot_2025-06-06_at_18.14.52_f7b7ve.png", alt: "Cobbler Northampton Portfolio - Baker Street Properties" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/Screenshot_2025-06-06_at_18.16.26_qwtdl9.png", alt: "Cobbler Northampton Portfolio - Baker Street Properties" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421149/Screenshot_2025-06-06_at_18.10.19_vwowlh.png", alt: "Cobbler Northampton Portfolio - Baker Street Properties" }
                ]
            },
            {
                id: generateId(),
                title: "Newlands Croft",
                category: "residential",
                location: "Bromley, London",
                type: "Block Management",
                address: "Lennard Rd, London, SE20 7LW",
                description: "Originally built in the 1940s as 16 flats, redeveloped into 12 spacious flats in Bromley, London. Purchased with vacant possession and now fully managed in-house by Fast Homes Investments.",
                details: [
                    { icon: "ri-building-line", text: "12 Flats" },
                    { icon: "ri-calendar-line", text: "Est. 1940s" },
                    { icon: "ri-shield-check-line", text: "Full Management" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954163/11_qsbhoy.jpg", alt: "Newlands Croft - Bromley London Development" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954162/10_wkcxlm.jpg", alt: "Newlands Croft - Bromley London" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954161/9_cotwuf.jpg", alt: "Newlands Croft - Development View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954160/8_xguh79.jpg", alt: "Newlands Croft - Property View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954157/5_eokekc.jpg", alt: "Newlands Croft - Building Exterior" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954156/4_zxhnan.jpg", alt: "Newlands Croft - Residential Complex" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954155/3_wd1vmi.jpg", alt: "Newlands Croft - Building View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954153/2_l3x89g.jpg", alt: "Newlands Croft - Property Development" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954153/1_ozefup.jpg", alt: "Newlands Croft - Flats Complex" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954153/0_ro4x2j.jpg", alt: "Newlands Croft - Bromley Development" }
                ]
            },
            {
                id: generateId(),
                title: "Brown Portfolio",
                category: "residential",
                location: "Birmingham",
                type: "Mixed Use",
                address: "",
                description: "Large mixed-use portfolio in Birmingham generating £455,156 annually. Features residential units above commercial spaces in prime city locations with excellent rental yields.",
                details: [
                    { icon: "ri-building-line", text: "28 Units" },
                    { icon: "ri-map-pin-line", text: "Birmingham City" },
                    { icon: "ri-store-2-line", text: "Mixed Use" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384332/48_v4gvu9.jpg", alt: "Brown Portfolio - Mixed Use" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384333/49_pbexac.jpg", alt: "Brown Portfolio - Birmingham Properties" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384320/39_qnosuc.jpg", alt: "Brown Portfolio - Commercial Space" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384311/32_srz9ju.jpg", alt: "Brown Portfolio - Retail Unit" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384305/27_bzpphg.jpg", alt: "Brown Portfolio - Property View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384278/10_vn2var.jpg", alt: "Brown Portfolio - Building Exterior" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384296/21_yci8qq.jpg", alt: "Brown Portfolio - Street View" }
                ]
            },
            {
                id: generateId(),
                title: "London Portfolio",
                category: "residential",
                location: "Various London Locations",
                type: "Premium Residential",
                address: "",
                description: "Premium residential properties across prime London locations including Kensington, Chelsea, and Westminster. High-specification apartments and houses.",
                details: [
                    { icon: "ri-building-line", text: "35 Properties" },
                    { icon: "ri-map-pin-line", text: "Prime London" },
                    { icon: "ri-vip-crown-line", text: "Premium Grade" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/0_sqbh8z.jpg", alt: "38 Ladbrook Road, London", address: "38 Ladbrook Road, London, SE25 6QD" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/1_swez7b.jpg", alt: "3 Tranmere Road, Edmonton", address: "3 Tranmere Road, Edmonton, London, N9 9EJ" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/2_whspyj.jpg", alt: "78 Long Lane, Addiscombe", address: "78 Long Lane, Addiscombe, London, CR0 7AP" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/3_s0ye02.jpg", alt: "30 Pitchford Street", address: "30 Pitchford Street, London, E15 4RX" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/4_vdq81a.jpg", alt: "3 Ulverston Road, Walthamstow", address: "3 Ulverston Road, Walthamstow, London, E17 4BN" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/5_oayrve.jpg", alt: "677A London Road, Thornton Heath", address: "677A London Road, Thornton Heath, CR7 6AZ" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/6_rrjhnu.jpg", alt: "183 Kempton Road", address: "183 Kempton Road, London, E6 2PD" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/7_vjfynr.jpg", alt: "119 Boston Road, Croydon", address: "119 Boston Road, Croydon, CR0 3EH" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/8_fia5z5.jpg", alt: "11 Salisbury Road", address: "11 Salisbury Road, London, E4 6TA" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056355/9_pficfj.jpg", alt: "44 Retford Road, Romford", address: "44 Retford Road, Romford, RM3 9NB" }
                ]
            },
            {
                id: generateId(),
                title: "Midlands Portfolio",
                category: "residential",
                location: "West Midlands",
                type: "Family Homes",
                address: "",
                description: "Extensive portfolio of family homes across the West Midlands, including Birmingham, Coventry, and Wolverhampton. Mix of Victorian terraces and modern developments.",
                details: [
                    { icon: "ri-building-line", text: "52 Properties" },
                    { icon: "ri-map-pin-line", text: "West Midlands" },
                    { icon: "ri-home-heart-line", text: "Family Homes" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056401/0_w1z5et.jpg", alt: "98 Condover Road, Birmingham", address: "98 Condover Road, Birmingham, West Midlands, B31 3QX" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056401/1_ziknpn.jpg", alt: "89 Honiton Crescent, Birmingham", address: "89 Honiton Crescent, Birmingham, West Midlands, B31" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056402/2_lf47ji.jpg", alt: "197 Field Road, Bloxwich", address: "197 Field Road, Bloxwich, Walsall, West Midlands, WS3 3NA" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056402/3_hdv15s.jpg", alt: "106 Cheverton Road, Birmingham", address: "106 Cheverton Road, Birmingham, West Midlands, B31 1RT" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056402/4_srljfn.jpg", alt: "4 Rowland Gardens, Walsall", address: "4 Rowland Gardens, WALSALL, West Midlands, WS2 8UL" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056403/5_b1udmb.jpg", alt: "25 Lower Valley Road, Brierley Hill", address: "25 Lower Valley Road, Brierley Hill, West Midlands, DY5 3NP" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056403/6_o6zvhg.jpg", alt: "70 Rutherford Road, Walsall", address: "70 Rutherford Road, Beechdale, Walsall, West Midlands, WS2 7JQ" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056404/7_tweooh.jpg", alt: "210 Jiggins Lane, Birmingham", address: "210 Jiggins Lane, Birmingham, West Midlands, B32 3ER" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056405/8_k79nsu.jpg", alt: "16 Tipton Road, Dudley", address: "16 Tipton Road, DUDLEY, West Midlands, DY1 4SH" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056405/9_cbc41k.jpg", alt: "11 Wills Avenue, West Bromwich", address: "11 Wills Avenue, West Bromwich, West Midlands, B71 2QS" }
                ]
            },
            {
                id: generateId(),
                title: "North West Portfolio",
                category: "residential",
                location: "Manchester & Liverpool",
                type: "Urban Residential",
                address: "",
                description: "Strategic portfolio across Manchester and Liverpool city centers. Modern apartments and converted warehouse spaces targeting young professionals.",
                details: [
                    { icon: "ri-building-line", text: "38 Properties" },
                    { icon: "ri-map-pin-line", text: "North West Region" },
                    { icon: "ri-community-line", text: "Community Focus" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972570/48_worsley_road_sJHUDn_mr9hib.jpg", alt: "48 Worsley Road North, Manchester", address: "48 Worsley Road North, Manchester, M28 3GW" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972574/5_bela_sJHUDn_ej77zi.jpg", alt: "5 Bela Grove, Blackpool", address: "5 Bela Grove, Blackpool, FY1 5JZ" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972559/16_sissons_sJHUDn_as8ryp.jpg", alt: "16 Sissons Crescent, Leeds", address: "16 Sissons Crescent, Leeds, LS10 4LN" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972565/12_bright_sJHUDn_hqp51y.jpg", alt: "12 Bright Street, Bradford", address: "12 Bright Street, Bradford, BD15 7QT" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056356/Liverpool-Property-_1_.jpg", alt: "81 Grane Road, Liverpool", address: "81 Grane Road, Liverpool, BB4 4LR" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869658/DJI_20220721_160904_038_lvb2kk.jpg", alt: "North West Portfolio - Aerial View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869661/IMG_2934_w4r7nn.jpg", alt: "North West Portfolio - Street View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721219/20220810_133732_Original_2_lr7xen.jpg", alt: "North West Portfolio - Property View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056407/10_vusklp.jpg", alt: "North West Portfolio - Manchester Area" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056408/11_iwhdlp.jpg", alt: "North West Portfolio - Liverpool Area" }
                ]
            },
            {
                id: generateId(),
                title: "Properties Bought Individually",
                category: "residential",
                location: "Birmingham, Melksham, Wednesbury, Kettering, Dudley, Manchester, Blackpool, Leeds, Bradford, Chesterfield, Stoke-on-Trent, Croydon",
                type: "Individual Acquisitions",
                address: "",
                description: "A diverse collection of individual property acquisitions across England, including residential properties in Birmingham, the West Midlands, Greater Manchester, Yorkshire, and the South East. Each property has been strategically selected for its rental yield potential and capital growth prospects.",
                details: [
                    { icon: "ri-building-line", text: "12 Properties" },
                    { icon: "ri-map-pin-line", text: "Multiple Locations" },
                    { icon: "ri-home-4-line", text: "Individual Acquisitions" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972554/110_hillaries_sJHUDn_anrvh2.jpg", alt: "110 Hillaries Road, Birmingham", address: "110 Hillaries Road, Birmingham, B23 7QT" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972564/16_berryfield_2_sJHUDn_ii39ya.jpg", alt: "16 Berryfield Park, Melksham", address: "16 Berryfield Park, Melksham, SN12 6ED" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972553/1_booth_sJHUDn_jlke5x.jpg", alt: "1 Booth Road, Wednesbury", address: "1 Booth Road, Wednesbury, WS10 0EN" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972572/6_welland_sJHUDn_qebjhf.jpg", alt: "6 Welland Court, Kettering", address: "6 Welland Court, Kettering, NN15 5ST" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972566/68_stourbridge_sJHUDn_qvef0w.jpg", alt: "68 Stourbridge Road, Dudley", address: "68 Stourbridge Road, Dudley, DY1 2DF" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972570/48_worsley_road_sJHUDn_mr9hib.jpg", alt: "48 Worsley Road North, Manchester", address: "48 Worsley Road North, Manchester, M28 3GW" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972574/5_bela_sJHUDn_ej77zi.jpg", alt: "5 Bela Grove, Blackpool", address: "5 Bela Grove, Blackpool, FY1 5JZ" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972559/16_sissons_sJHUDn_as8ryp.jpg", alt: "16 Sissons Crescent, Leeds", address: "16 Sissons Crescent, Leeds, LS10 4LN" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972565/12_bright_sJHUDn_hqp51y.jpg", alt: "12 Bright Street, Bradford", address: "12 Bright Street, Bradford, BD15 7QT" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972568/15_harvey_sJHUDn_cf6z5f.jpg", alt: "15 Harvey Court, Chesterfield", address: "15 Harvey Court, Chesterfield, S44 6SJ" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972569/8_essex_sJHUDn_fbqhrz.jpg", alt: "8 Essex Drive, Stoke-on-Trent", address: "8 Essex Drive, Stoke-on-Trent, ST7 1HE" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972575/8_keens_rd_sJHUDn_rbil7y.jpg", alt: "8 Keens Road, Croydon", address: "8 Keens Road, Croydon, CR0 1AH" }
                ]
            }
        ],
        commercial: [
            {
                id: generateId(),
                title: "Accrington Parade",
                category: "commercial",
                location: "Accrington, Lancashire",
                type: "Retail Parade",
                address: "Church Street, Accrington, BB5",
                description: "Prime retail parade in Accrington town center generating £57,000 annually. Features national retailers and local businesses with high footfall location and excellent transport links.",
                details: [
                    { icon: "ri-store-2-line", text: "8 Retail Units" },
                    { icon: "ri-map-pin-line", text: "Town Centre" },
                    { icon: "ri-percent-line", text: "95% Occupied" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1749656102/Acc1_1_qrftg9.jpg", alt: "Accrington Parade - Church Street" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1749656102/Acc2_1_sddqk8.jpg", alt: "Accrington Parade - Retail Units" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1749656102/Acc3_1_vkk2ph.jpg", alt: "Accrington Parade - Street View" }
                ]
            },
            {
                id: generateId(),
                title: "Tower Bridge Quarter",
                category: "commercial",
                location: "London Bridge",
                type: "Mixed Use Development",
                address: "Tooley Street, London, SE1",
                description: "Prestigious mixed-use development near Tower Bridge featuring retail, office, and residential units generating £899,875 annually. Prime location with views of the Thames.",
                details: [
                    { icon: "ri-building-3-line", text: "Mixed Use" },
                    { icon: "ri-map-pin-line", text: "South Bank" },
                    { icon: "ri-bar-chart-box-line", text: "High Yield" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890666/portfolio_by_abby__image34_k1njkg.png", alt: "Tower Bridge Quarter - London" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890666/portfolio_by_abby__image4_sba74a.png", alt: "Tower Bridge Quarter - South Bank" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890665/portfolio_by_abby__image12_ncrky6.png", alt: "Tower Bridge Quarter - Mixed Use" }
                ]
            },
            {
                id: generateId(),
                title: "Cheltenham Parade",
                category: "commercial",
                location: "Cheltenham",
                type: "Town Centre Retail",
                address: "High Street, Cheltenham, GL50",
                description: "Victorian retail parade in affluent Cheltenham town center generating £187,500 annually. Mix of boutique shops, cafes, and professional services with strong covenant tenants.",
                details: [
                    { icon: "ri-store-2-line", text: "12 Units" },
                    { icon: "ri-map-pin-line", text: "Town Centre" },
                    { icon: "ri-shield-check-line", text: "Strong Covenants" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890809/portfolio_by_abby__image36_qx5h2n.png", alt: "Cheltenham Parade - Town Centre" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890809/portfolio_by_abby__image15_d2jw4c.png", alt: "Cheltenham Parade - Retail" }
                ]
            },
            {
                id: generateId(),
                title: "Eastbourne Parade",
                category: "commercial",
                location: "Eastbourne",
                type: "Multi-Level Retail",
                address: "Terminus Road, Eastbourne, BN21",
                description: "Modern multi-level retail development in Eastbourne town center generating £310,400 annually. Anchor tenants include national chains with long-term leases.",
                details: [
                    { icon: "ri-building-2-line", text: "Multi-Level" },
                    { icon: "ri-map-pin-line", text: "Eastbourne Centre" },
                    { icon: "ri-time-line", text: "Long Leases" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384175/4_dquvnu.jpg", alt: "Eastbourne Parade - Multi-Level" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384175/3_shzqxz.jpg", alt: "Eastbourne Parade - Retail Units" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384186/12_ptus5z.jpg", alt: "Eastbourne Parade - Street View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754384258/23_c23095.jpg", alt: "Eastbourne Parade - Building" }
                ]
            },
            {
                id: generateId(),
                title: "Southport Parade",
                category: "commercial",
                location: "Southport",
                type: "Grade II Listed Retail",
                address: "Lord Street, Southport, PR8",
                description: "Historic Grade II listed Victorian shopping arcade on Lord Street generating £98,000 annually. Premium retail destination with unique architectural features.",
                details: [
                    { icon: "ri-building-4-line", text: "Grade II Listed" },
                    { icon: "ri-map-pin-line", text: "Lord Street" },
                    { icon: "ri-vip-crown-line", text: "Heritage Site" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421111/Cheltenham-62-RZD_yzz0xl.jpg", alt: "Southport Parade - Grade II Listed" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421118/0e69c0b2-953e-11ef-afc8-0242ac110002---auto--_har00y.jpg", alt: "Southport Parade - Lord Street" }
                ]
            },
            {
                id: generateId(),
                title: "Barry Retail Parade",
                category: "commercial",
                location: "Barry, Wales",
                type: "High Street Retail",
                address: "Holton Road, Barry, CF63",
                description: "Established retail parade on Barry's main shopping street generating an annual income of £401,550. Mix of national chains and independent retailers serving the local community.",
                details: [
                    { icon: "ri-store-2-line", text: "15 Shops" },
                    { icon: "ri-map-pin-line", text: "Holton Road" },
                    { icon: "ri-group-line", text: "Community Hub" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/8.Barry-31RZD_v61kgp.jpg", alt: "Barry Retail Parade - Corner View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/5.Barry-13-RZD_l2kgx7.jpg", alt: "Barry Retail Parade - Street View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/3.Barry-57-RZD_a3eta0.jpg", alt: "Barry Retail Parade - Shops" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/6.Barry-12-RZD_mxrwec.jpg", alt: "Barry Retail Parade - Detail" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/4.Barry-5-RZD_nnylrs.jpg", alt: "Barry Retail Parade - Front View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727915/1.-Barry-28-MAIN-RZD_op2fd3.jpg", alt: "Barry Retail Parade - Main View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727915/2.Barry-63-RZD_jvxb9t.jpg", alt: "Barry Retail Parade - Aerial" }
                ]
            },
            {
                id: generateId(),
                title: "Nottingham Tesco",
                category: "commercial",
                location: "Nottingham",
                type: "Supermarket Investment",
                address: "Upper Parliament Street, Nottingham, NG1",
                description: "Long-leasehold Tesco Express with residential units above generating £109,029 annually. Prime city center location with strong footfall and secure rental income.",
                details: [
                    { icon: "ri-shopping-cart-line", text: "Tesco Express" },
                    { icon: "ri-map-pin-line", text: "Upper Parliament" },
                    { icon: "ri-building-line", text: "Mixed Use" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727215/78e013275d371a9e8f01d3cc67d18173_t6swic.png", alt: "Nottingham Tesco - Upper Parliament" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727212/3fe49f017f3624049458efd5ed90b4a2_mcirbl.jpg", alt: "Nottingham Tesco - Building View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727212/2ff06c90b87f1246ea3077d97a18c964_rya2ho.jpg", alt: "Nottingham Tesco - Street View" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727212/17482b683d08ffe498c9dc6cba204fba_q7hedc.jpg", alt: "Nottingham Tesco - Side View" }
                ]
            },
            {
                id: generateId(),
                title: "Long Row Nottingham",
                category: "commercial",
                location: "Nottingham City Centre",
                type: "Historic Retail",
                address: "Long Row, Nottingham, NG1 2DZ",
                description: "Premium retail units on Nottingham's historic Long Row generating £130,000 annually. The city's main shopping thoroughfare featuring period architecture with modern retail spaces.",
                details: [
                    { icon: "ri-store-2-line", text: "Premium Retail" },
                    { icon: "ri-map-pin-line", text: "Long Row" },
                    { icon: "ri-building-4-line", text: "Historic Location" }
                ],
                images: [
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753728407/f0cca6d4-d357-11ef-9049-0242ac110002---auto--_uvqjfm.jpg", alt: "Long Row Nottingham - Historic Building" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753728406/0e66eaec-d358-11ef-baf2-0242ac110002---auto--_evworq.jpg", alt: "Long Row Nottingham - Retail Space" },
                    { url: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753728405/d7fff70c-d409-11ef-a907-0242ac110002---auto--_cpiupa.jpg", alt: "Long Row Nottingham - Street View" }
                ]
            }
        ]
    };
    savePortfolioData();
}

// Save portfolio data to localStorage
function savePortfolioData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
}

// Load portfolios into the UI
function loadPortfolios() {
    const portfolioList = document.getElementById('portfolioList');
    const portfolios = portfolioData[currentTab];
    
    portfolioList.innerHTML = '';
    
    portfolios.forEach((portfolio, index) => {
        const portfolioItem = createPortfolioItem(portfolio, index);
        portfolioList.appendChild(portfolioItem);
    });
}

// Create portfolio item element
function createPortfolioItem(portfolio, index) {
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.draggable = true;
    item.dataset.index = index;
    
    item.innerHTML = `
        <div class="portfolio-thumbnail">
            ${portfolio.images && portfolio.images.length > 0 ? 
                `<img src="${portfolio.images[0].url}" alt="${portfolio.images[0].alt}">
                 <span class="image-count">${portfolio.images.length} images</span>` :
                '<div style="background: #ddd; height: 100%; display: flex; align-items: center; justify-content: center; color: #999;">No Image</div>'
            }
        </div>
        <div class="portfolio-info">
            <h3>${portfolio.title}</h3>
            <div class="portfolio-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${portfolio.location}</span>
                ${portfolio.type ? `<span><i class="fas fa-tag"></i> ${portfolio.type}</span>` : ''}
            </div>
            <p class="portfolio-description">${portfolio.description}</p>
            <div class="portfolio-details">
                ${portfolio.details.map(detail => 
                    `<span><i class="${detail.icon}"></i> ${detail.text}</span>`
                ).join('')}
            </div>
        </div>
        <div class="portfolio-actions">
            <button class="btn-primary" onclick="editPortfolio(${index})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn-danger" onclick="deletePortfolio(${index})">
                <i class="fas fa-trash"></i> Delete
            </button>
            <button class="btn-move" onclick="movePortfolio(${index}, -1)" ${index === 0 ? 'disabled' : ''}>
                <i class="fas fa-arrow-up"></i>
            </button>
            <button class="btn-move" onclick="movePortfolio(${index}, 1)" ${index === portfolios.length - 1 ? 'disabled' : ''}>
                <i class="fas fa-arrow-down"></i>
            </button>
        </div>
    `;
    
    // Add drag and drop functionality
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);
    
    return item;
}

// Modal functions
function openAddPortfolioModal() {
    editingPortfolio = null;
    document.getElementById('modalTitle').textContent = 'Add New Portfolio';
    document.getElementById('portfolioForm').reset();
    document.getElementById('portfolioCategory').value = currentTab;
    document.getElementById('imageList').innerHTML = '';
    document.getElementById('portfolioModal').classList.add('active');
}

function editPortfolio(index) {
    editingPortfolio = index;
    const portfolio = portfolioData[currentTab][index];
    
    document.getElementById('modalTitle').textContent = 'Edit Portfolio';
    document.getElementById('portfolioId').value = portfolio.id;
    document.getElementById('portfolioIndex').value = index;
    document.getElementById('portfolioTitle').value = portfolio.title;
    document.getElementById('portfolioCategory').value = portfolio.category;
    document.getElementById('portfolioLocation').value = portfolio.location;
    document.getElementById('portfolioType').value = portfolio.type || '';
    document.getElementById('portfolioAddress').value = portfolio.address || '';
    document.getElementById('portfolioDescription').value = portfolio.description;
    
    // Load details
    if (portfolio.details && portfolio.details.length > 0) {
        document.getElementById('portfolioDetail1Icon').value = portfolio.details[0]?.icon || '';
        document.getElementById('portfolioDetail1Text').value = portfolio.details[0]?.text || '';
        document.getElementById('portfolioDetail2Icon').value = portfolio.details[1]?.icon || '';
        document.getElementById('portfolioDetail2Text').value = portfolio.details[1]?.text || '';
        document.getElementById('portfolioDetail3Icon').value = portfolio.details[2]?.icon || '';
        document.getElementById('portfolioDetail3Text').value = portfolio.details[2]?.text || '';
    }
    
    // Load images
    loadImages(portfolio.images || []);
    
    document.getElementById('portfolioModal').classList.add('active');
}

function closeModal() {
    document.getElementById('portfolioModal').classList.remove('active');
    editingPortfolio = null;
}

// Image management
function loadImages(images) {
    const imageList = document.getElementById('imageList');
    imageList.innerHTML = '';
    
    images.forEach((image, index) => {
        addImageInput(image.url, image.alt, image.address);
    });
}

function addImageInput(url = '', alt = '', address = '') {
    const imageList = document.getElementById('imageList');
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    
    imageItem.innerHTML = `
        <input type="text" placeholder="Image URL (Cloudinary)" value="${url}" class="image-url">
        <input type="text" placeholder="Alt text" value="${alt}" class="image-alt">
        ${currentTab === 'residential' && editingPortfolio === 7 ? 
            `<input type="text" placeholder="Address (for overlay)" value="${address || ''}" class="image-address">` : 
            ''
        }
        <button type="button" class="btn-move-image" onclick="moveImage(this, -1)">
            <i class="fas fa-arrow-up"></i>
        </button>
        <button type="button" class="btn-move-image" onclick="moveImage(this, 1)">
            <i class="fas fa-arrow-down"></i>
        </button>
        <button type="button" class="btn-remove-image" onclick="removeImage(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    imageList.appendChild(imageItem);
}

function removeImage(button) {
    button.closest('.image-item').remove();
}

function moveImage(button, direction) {
    const item = button.closest('.image-item');
    const sibling = direction === -1 ? item.previousElementSibling : item.nextElementSibling;
    
    if (sibling) {
        if (direction === -1) {
            item.parentNode.insertBefore(item, sibling);
        } else {
            item.parentNode.insertBefore(sibling, item);
        }
    }
}

// Save portfolio
function savePortfolio() {
    const formData = {
        id: document.getElementById('portfolioId').value || generateId(),
        title: document.getElementById('portfolioTitle').value,
        category: document.getElementById('portfolioCategory').value,
        location: document.getElementById('portfolioLocation').value,
        type: document.getElementById('portfolioType').value,
        address: document.getElementById('portfolioAddress').value,
        description: document.getElementById('portfolioDescription').value,
        details: [],
        images: []
    };
    
    // Collect details
    const detail1Icon = document.getElementById('portfolioDetail1Icon').value;
    const detail1Text = document.getElementById('portfolioDetail1Text').value;
    if (detail1Icon && detail1Text) {
        formData.details.push({ icon: detail1Icon, text: detail1Text });
    }
    
    const detail2Icon = document.getElementById('portfolioDetail2Icon').value;
    const detail2Text = document.getElementById('portfolioDetail2Text').value;
    if (detail2Icon && detail2Text) {
        formData.details.push({ icon: detail2Icon, text: detail2Text });
    }
    
    const detail3Icon = document.getElementById('portfolioDetail3Icon').value;
    const detail3Text = document.getElementById('portfolioDetail3Text').value;
    if (detail3Icon && detail3Text) {
        formData.details.push({ icon: detail3Icon, text: detail3Text });
    }
    
    // Collect images
    const imageItems = document.querySelectorAll('.image-item');
    imageItems.forEach(item => {
        const url = item.querySelector('.image-url').value;
        const alt = item.querySelector('.image-alt').value;
        const addressInput = item.querySelector('.image-address');
        if (url && alt) {
            const imageData = { url, alt };
            if (addressInput) {
                imageData.address = addressInput.value;
            }
            formData.images.push(imageData);
        }
    });
    
    // Save to appropriate category
    if (editingPortfolio !== null) {
        // If category changed, move to new category
        if (formData.category !== currentTab) {
            portfolioData[currentTab].splice(editingPortfolio, 1);
            portfolioData[formData.category].push(formData);
            currentTab = formData.category;
            // Update tab UI
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === currentTab);
            });
        } else {
            portfolioData[currentTab][editingPortfolio] = formData;
        }
    } else {
        portfolioData[formData.category].push(formData);
    }
    
    savePortfolioData();
    loadPortfolios();
    closeModal();
}

// Delete portfolio
function deletePortfolio(index) {
    if (confirm('Are you sure you want to delete this portfolio?')) {
        portfolioData[currentTab].splice(index, 1);
        savePortfolioData();
        loadPortfolios();
    }
}

// Move portfolio up/down
function movePortfolio(index, direction) {
    const portfolios = portfolioData[currentTab];
    const newIndex = index + direction;
    
    if (newIndex >= 0 && newIndex < portfolios.length) {
        // Swap portfolios
        [portfolios[index], portfolios[newIndex]] = [portfolios[newIndex], portfolios[index]];
        savePortfolioData();
        loadPortfolios();
    }
}

// Drag and drop handlers
let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== this) {
        const draggedIndex = parseInt(draggedElement.dataset.index);
        const targetIndex = parseInt(this.dataset.index);
        
        const portfolios = portfolioData[currentTab];
        const draggedPortfolio = portfolios[draggedIndex];
        
        // Remove from old position
        portfolios.splice(draggedIndex, 1);
        
        // Insert at new position
        if (draggedIndex < targetIndex) {
            portfolios.splice(targetIndex - 1, 0, draggedPortfolio);
        } else {
            portfolios.splice(targetIndex, 0, draggedPortfolio);
        }
        
        savePortfolioData();
        loadPortfolios();
    }
    
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Close modal on outside click
document.getElementById('portfolioModal').addEventListener('click', (e) => {
    if (e.target.id === 'portfolioModal') {
        closeModal();
    }
});

// Export function for portfolio.html to use
window.getPortfolioData = function() {
    return portfolioData;
};