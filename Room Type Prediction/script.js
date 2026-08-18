/* ========================================
   CONFIGURATION & CONSTANTS
   ======================================== */
const API_BASE = 'http://127.0.0.1:8000';
const HEALTH_ENDPOINT = `${API_BASE}/health`;
const PREDICT_ENDPOINT = `${API_BASE}/predict`;

const STORAGE_KEY = 'roomai_prediction_history';

const NEIGHBOURHOODS = {
    'Bronx': [
        'Allerton', 'Bedford Park', 'Belmont', 'Bronx River', 'Castle Hill',
        'City Island', 'Co-op City', 'Eastchester', 'Fordham', 'High Bridge',
        'Hunts Point', 'Kingsbridge', 'Longwood', 'Morris Heights', 'Morris Park',
        'Mott Haven', 'Mount Eden', 'North Riverdale', 'Norwood', 'Parkchester',
        'Pelham Bay', 'Port Morris', 'Riverdale', 'Soundview', 'Spuyten Duyvil',
        'Throgs Neck', 'Tremont', 'University Heights', 'Wakefield',
        'Westchester Square', 'Williamsbridge', 'Woodlawn'
    ],
    'Brooklyn': [
        'Bay Ridge', 'Bedford-Stuyvesant', 'Bensonhurst', 'Boerum Hill',
        'Borough Park', 'Brighton Beach', 'Brooklyn Heights', 'Brownsville',
        'Bushwick', 'Canarsie', 'Carroll Gardens', 'Clinton Hill', 'Cobble Hill',
        'Coney Island', 'Crown Heights', 'Ditmas Park', 'Downtown Brooklyn',
        'DUMBO', 'Dyker Heights', 'East Flatbush', 'East New York', 'Flatbush',
        'Flatlands', 'Fort Greene', 'Gerritsen Beach', 'Gowanus', 'Greenpoint',
        'Gravesend', 'Greenwood Heights', 'Kensington', 'Marine Park', 'Midwood',
        'Mill Basin', 'Navy Yard', 'Park Slope', 'Prospect Heights',
        'Prospect Lefferts Gardens', 'Red Hook', 'Sheepshead Bay', 'Sunset Park',
        'Vinegar Hill', 'Windsor Terrace', 'Williamsburg'
    ],
    'Manhattan': [
        'Alphabet City', 'Battery Park City', 'Chelsea', 'Chinatown',
        'Civic Center', 'East Harlem', 'East Village', 'Financial District',
        'Flatiron', 'Gramercy Park', 'Greenwich Village', 'Hamilton Heights',
        'Harlem', 'Hell\'s Kitchen', 'Hudson Heights', 'Hudson Yards',
        'Inwood', 'Kips Bay', 'Lenox Hill', 'Lincoln Square',
        'Lower East Side', 'Midtown', 'Midtown East', 'Morningside Heights',
        'Murray Hill', 'Nolita', 'NoHo', 'Roosevelt Island', 'SoHo',
        'Stuyvesant Town', 'Sutton Place', 'Tenderloin', 'Times Square',
        'Tribeca', 'Two Bridges', 'Union Square', 'Upper East Side',
        'Upper West Side', 'Washington Heights', 'West Village'
    ],
    'Queens': [
        'Astoria', 'Bayside', 'Briarwood', 'College Point', 'Corona',
        'Ditmars Steinway', 'Douglaston', 'East Elmhurst', 'Elmhurst',
        'Far Rockaway', 'Flushing', 'Forest Hills', 'Fresh Meadows',
        'Glendale', 'Hollis', 'Howard Beach', 'Jackson Heights', 'Jamaica',
        'Jamaica Estates', 'Kew Gardens', 'Laurelton', 'Little Neck',
        'Long Island City', 'Maspeth', 'Middle Village', 'Ozone Park',
        'Queens Village', 'Rego Park', 'Ridgewood', 'Rockaway Beach',
        'Rosedale', 'Saint Albans', 'South Ozone Park', 'Sunnyside',
        'Whitestone', 'Woodhaven', 'Woodside'
    ],
    'Staten Island': [
        'Annadale', 'Arden Heights', 'Arrochar', 'Bay Terrace', 'Bloomfield',
        'Brighton Heights', 'Bull\'s Head', 'Castleton Corners', 'Charleston',
        'Chelsea', 'Clifton', 'Concord', 'Dongan Hills', 'Eltingville',
        'Emerson Hill', 'Granitville', 'Grant City', 'Grasmere', 'Great Kills',
        'Greenridge', 'Grymes Hill', 'Heartland Village', 'Huguenot',
        'Lighthouse Hill', 'Livingston', 'Manor Heights', 'Mariner\'s Harbor',
        'Midland Beach', 'New Dorp', 'New Springville', 'Oakwood', 'Old Town',
        'Pleasant Plains', 'Port Richmond', 'Prince\'s Bay', 'Randall Manor',
        'Richmond Town', 'Rosebank', 'Rossville', 'Shore Acres', 'Silver Lake',
        'South Beach', 'St. George', 'Stapleton', 'Sunnyside', 'Todt Hill',
        'Tottenville', 'Travis', 'West Brighton', 'Willowbrook', 'Woodrow'
    ]
};

const LOADING_STAGES = [
    'Collecting listing signals',
    'Processing location features',
    'Analyzing property characteristics',
    'Running XGBoost model',
    'Generating prediction'
];

/* ========================================
   DOM REFERENCES
   ======================================== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const statusDot = $('#statusDot');
const statusText = $('#statusText');
const navHamburger = $('#navHamburger');
const navLinks = $('#navLinks');

const form = $('#predictionForm');
const predictBtn = $('#predictBtn');
const neighbourhoodGroupSel = $('#neighbourhoodGroup');
const neighbourhoodInput = $('#neighbourhood');
const neighbourhoodDropdown = $('#neighbourhoodDropdown');
const neighbourhoodError = $('#neighbourhoodError');

const loadingOverlay = $('#loadingOverlay');
const loadingStages = $$('.loading-stage');

const resultsSection = $('#results');
const resultType = $('#resultType');
const resultConfidence = $('#resultConfidence');
const confidenceCircle = $('#confidenceCircle');
const gaugeValue = $('#gaugeValue');
const probBars = ['#probBar0', '#probBar1', '#probBar2'].map(s => $(s));
const probVals = ['#probVal0', '#probVal1', '#probVal2'].map(s => $(s));
const summaryGrid = $('#summaryGrid');

const toastContainer = $('#toastContainer');

// Save & Export
const saveBtn = $('#saveBtn');
const downloadCsvBtn = $('#downloadCsvBtn');
const clearHistoryBtn = $('#clearHistoryBtn');
const saveBadgeCount = $('#saveBadgeCount');
const historySection = $('#historySection');
const historyCount = $('#historyCount');
const historyBody = $('#historyBody');

// Modals
const clearModal = $('#clearModal');
const clearModalCount = $('#clearModalCount');
const clearModalCancel = $('#clearModalCancel');
const clearModalConfirm = $('#clearModalConfirm');

const deleteOneModal = $('#deleteOneModal');
const deleteOneModalCancel = $('#deleteOneModalCancel');
const deleteOneModalConfirm = $('#deleteOneModalConfirm');

// State for current prediction (needed for saving)
let currentPredictionData = null;
let currentInputPayload = null;
let deleteTargetId = null;

/* ========================================
   TOAST NOTIFICATION SYSTEM
   ======================================== */
function showToast(message, type = 'info', duration = 4500) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('removing');
        toast.addEventListener('animationend', () => toast.remove());
    }, duration);
}

/* ========================================
   HEALTH CHECK
   ======================================== */
async function checkHealth() {
    try {
        const res = await fetch(HEALTH_ENDPOINT, { method: 'GET' });
        if (res.ok) {
            statusDot.classList.add('online');
            statusDot.classList.remove('offline');
            statusText.classList.add('online');
            statusText.classList.remove('offline');
            statusText.textContent = 'API Online';
        } else {
            throw new Error('Non-OK response');
        }
    } catch {
        statusDot.classList.add('offline');
        statusDot.classList.remove('online');
        statusText.classList.add('offline');
        statusText.classList.remove('online');
        statusText.textContent = 'API Offline';
    }
}

/* ========================================
   NAVIGATION
   ======================================== */
navHamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navHamburger.classList.toggle('active');
    navHamburger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navHamburger.classList.remove('active');
        navHamburger.setAttribute('aria-expanded', 'false');
    });
});

/* ========================================
   NEIGHBOURHOOD DROPDOWN
   ======================================== */
let selectedNeighbourhood = '';
let dropdownIndex = -1;
let filteredOptions = [];

neighbourhoodGroupSel.addEventListener('change', () => {
    selectedNeighbourhood = '';
    neighbourhoodInput.value = '';
    closeDropdown();
});

neighbourhoodInput.addEventListener('focus', () => {
    const group = neighbourhoodGroupSel.value;
    if (!group) {
        showToast('Please select a Neighbourhood Group first.', 'info');
        neighbourhoodGroupSel.focus();
        return;
    }
    renderDropdown(neighbourhoodInput.value);
    openDropdown();
});

neighbourhoodInput.addEventListener('input', () => {
    selectedNeighbourhood = '';
    const group = neighbourhoodGroupSel.value;
    if (!group) return;
    renderDropdown(neighbourhoodInput.value);
    if (!neighbourhoodDropdown.classList.contains('open')) openDropdown();
});

neighbourhoodInput.addEventListener('keydown', (e) => {
    if (!neighbourhoodDropdown.classList.contains('open')) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        dropdownIndex = Math.min(dropdownIndex + 1, filteredOptions.length - 1);
        updateDropdownHighlight();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        dropdownIndex = Math.max(dropdownIndex - 1, 0);
        updateDropdownHighlight();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (dropdownIndex >= 0 && dropdownIndex < filteredOptions.length) {
            selectNeighbourhood(filteredOptions[dropdownIndex]);
        }
    } else if (e.key === 'Escape') {
        closeDropdown();
        neighbourhoodInput.blur();
    }
});

function renderDropdown(query) {
    const group = neighbourhoodGroupSel.value;
    if (!group) return;

    const list = NEIGHBOURHOODS[group] || [];
    const q = query.toLowerCase().trim();
    filteredOptions = q ? list.filter(n => n.toLowerCase().includes(q)) : list;

    dropdownIndex = -1;
    neighbourhoodDropdown.innerHTML = '';

    if (filteredOptions.length === 0) {
        const noRes = document.createElement('div');
        noRes.className = 'nb-option no-results';
        noRes.textContent = 'No neighbourhoods found';
        noRes.setAttribute('role', 'option');
        neighbourhoodDropdown.appendChild(noRes);
        return;
    }

    filteredOptions.forEach((name, i) => {
        const opt = document.createElement('div');
        opt.className = 'nb-option';
        opt.textContent = name;
        opt.setAttribute('role', 'option');
        opt.dataset.index = i;
        opt.addEventListener('mousedown', (e) => {
            e.preventDefault();
            selectNeighbourhood(name);
        });
        neighbourhoodDropdown.appendChild(opt);
    });
}

function updateDropdownHighlight() {
    neighbourhoodDropdown.querySelectorAll('.nb-option').forEach((el, i) => {
        el.classList.toggle('active', i === dropdownIndex);
    });
}

function selectNeighbourhood(name) {
    selectedNeighbourhood = name;
    neighbourhoodInput.value = name;
    closeDropdown();
    clearError('neighbourhood');
}

function openDropdown() {
    neighbourhoodDropdown.classList.add('open');
    neighbourhoodInput.setAttribute('aria-expanded', 'true');
}

function closeDropdown() {
    neighbourhoodDropdown.classList.remove('open');
    neighbourhoodInput.setAttribute('aria-expanded', 'false');
    dropdownIndex = -1;
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('#neighbourhoodWrapper')) {
        closeDropdown();
    }
});

/* ========================================
   FORM VALIDATION
   ======================================== */
function setError(field, message) {
    const input = $(`#${field}`);
    const errorEl = $(`#${field}Error`);
    if (input) input.classList.add('input-error');
    if (errorEl) errorEl.textContent = message;
}

function clearError(field) {
    const input = $(`#${field}`);
    const errorEl = $(`#${field}Error`);
    if (input) input.classList.remove('input-error');
    if (errorEl) errorEl.textContent = '';
}

function clearAllErrors() {
    ['latitude', 'longitude', 'price', 'minimumNights', 'numberOfReviews',
     'reviewsPerMonth', 'hostListingsCount', 'availability365', 'neighbourhood'
    ].forEach(clearError);
}

function validateForm() {
    clearAllErrors();
    let valid = true;

    const lat = parseFloat($('#latitude').value);
    const lon = parseFloat($('#longitude').value);
    const price = parseFloat($('#price').value);
    const minNights = parseInt($('#minimumNights').value, 10);
    const numReviews = parseInt($('#numberOfReviews').value, 10);
    const reviewsPerMonth = parseFloat($('#reviewsPerMonth').value);
    const hostCount = parseInt($('#hostListingsCount').value, 10);
    const availability = parseInt($('#availability365').value, 10);
    const group = neighbourhoodGroupSel.value;
    const nb = selectedNeighbourhood || neighbourhoodInput.value.trim();

    if (isNaN(lat) || lat < -90 || lat > 90) {
        setError('latitude', 'Latitude must be between -90 and 90.');
        valid = false;
    }
    if (isNaN(lon) || lon < -180 || lon > 180) {
        setError('longitude', 'Longitude must be between -180 and 180.');
        valid = false;
    }
    if (isNaN(price) || price <= 0) {
        setError('price', 'Price must be a positive number.');
        valid = false;
    }
    if (isNaN(minNights) || minNights < 1 || minNights > 365) {
        setError('minimumNights', 'Minimum nights must be between 1 and 365.');
        valid = false;
    }
    if (isNaN(numReviews) || numReviews < 0) {
        setError('numberOfReviews', 'Number of reviews cannot be negative.');
        valid = false;
    }
    if (isNaN(reviewsPerMonth) || reviewsPerMonth < 0) {
        setError('reviewsPerMonth', 'Reviews per month cannot be negative.');
        valid = false;
    }
    if (isNaN(hostCount) || hostCount < 0) {
        setError('hostListingsCount', 'Host listing count cannot be negative.');
        valid = false;
    }
    if (isNaN(availability) || availability < 0 || availability > 365) {
        setError('availability365', 'Availability must be between 0 and 365.');
        valid = false;
    }
    if (!group) {
        showToast('Please select a Neighbourhood Group.', 'info');
        valid = false;
    }
    if (!nb) {
        setError('neighbourhood', 'Please select a neighbourhood.');
        valid = false;
    }

    return valid;
}

['latitude', 'longitude', 'price', 'minimumNights', 'numberOfReviews',
 'reviewsPerMonth', 'hostListingsCount', 'availability365'].forEach(id => {
    const el = $(`#${id}`);
    if (el) el.addEventListener('input', () => clearError(id));
});

/* ========================================
   LOADING ANIMATION
   ======================================== */
let loadingStageTimers = [];

function startLoadingAnimation() {
    loadingOverlay.classList.add('active');
    loadingOverlay.setAttribute('aria-hidden', 'false');

    loadingStages.forEach(s => s.classList.remove('active', 'complete'));
    loadingStageTimers.forEach(t => clearTimeout(t));
    loadingStageTimers = [];

    LOADING_STAGES.forEach((_, i) => {
        const t = setTimeout(() => {
            if (i > 0) loadingStages[i - 1].classList.add('complete');
            loadingStages[i].classList.add('active');
        }, i * 500);
        loadingStageTimers.push(t);
    });
}

function stopLoadingAnimation() {
    loadingStages.forEach(s => {
        s.classList.remove('active');
        s.classList.add('complete');
    });

    setTimeout(() => {
        loadingOverlay.classList.remove('active');
        loadingOverlay.setAttribute('aria-hidden', 'true');
        loadingStages.forEach(s => s.classList.remove('active', 'complete'));
    }, 400);
}

/* ========================================
   PREDICTION FLOW
   ======================================== */
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
        latitude: parseFloat($('#latitude').value),
        longitude: parseFloat($('#longitude').value),
        price: parseFloat($('#price').value),
        minimum_nights: parseInt($('#minimumNights').value, 10),
        number_of_reviews: parseInt($('#numberOfReviews').value, 10),
        reviews_per_month: parseFloat($('#reviewsPerMonth').value),
        calculated_host_listings_count: parseInt($('#hostListingsCount').value, 10),
        availability_365: parseInt($('#availability365').value, 10),
        neighbourhood_group: neighbourhoodGroupSel.value,
        neighbourhood: selectedNeighbourhood || neighbourhoodInput.value.trim()
    };

    predictBtn.classList.add('loading');
    predictBtn.disabled = true;
    startLoadingAnimation();

    try {
        const res = await fetch(PREDICT_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            let errorMsg = 'Prediction failed. Please try again.';
            try {
                const errData = await res.json();
                if (errData.detail) {
                    if (Array.isArray(errData.detail)) {
                        errorMsg = errData.detail.map(d => d.msg).join('; ');
                    } else {
                        errorMsg = errData.detail;
                    }
                }
            } catch {
                console.error('Failed to parse error response:', res.status);
            }
            throw new Error(errorMsg);
        }

        const data = await res.json();
        console.log('Prediction response:', data);

        stopLoadingAnimation();

        // Store for saving
        currentPredictionData = data;
        currentInputPayload = payload;

        displayResults(data, payload);
        updateSaveButtonState();
        showToast('Prediction completed successfully.', 'success');

    } catch (err) {
        stopLoadingAnimation();
        console.error('Prediction error:', err);

        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
            showToast('Backend unavailable. Make sure FastAPI is running on http://127.0.0.1:8000', 'error', 6000);
        } else {
            showToast(err.message, 'error', 5000);
        }
    } finally {
        predictBtn.classList.remove('loading');
        predictBtn.disabled = false;
    }
});

/* ========================================
   DISPLAY RESULTS
   ======================================== */
function displayResults(data, payload) {
    const predictedType = data.Predicted_room_type || 'Unknown';
    const probabilities = data.Probability || {};

    const probValues = Object.values(probabilities).map(v => parseFloat(v));
    const confidence = probValues.length > 0 ? Math.max(...probValues) : 0;

    resultType.textContent = predictedType.toUpperCase();
    resultConfidence.textContent = confidence.toFixed(2) + '%';
    gaugeValue.textContent = Math.round(confidence) + '%';

    const circumference = 326.73;
    const offset = circumference * (1 - confidence / 100);
    confidenceCircle.style.strokeDashoffset = circumference.toString();
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            confidenceCircle.style.strokeDashoffset = offset.toString();
        });
    });

    const classOrder = ['Entire home/apt', 'Private room', 'Shared room'];
    classOrder.forEach((cls, i) => {
        const val = parseFloat(probabilities[cls]) || 0;
        probBars[i].style.width = '0%';
        probVals[i].textContent = '0%';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                probBars[i].style.width = val + '%';
                animateNumber(probVals[i], 0, val, 1000, v => v.toFixed(2) + '%');
            });
        });
    });

    buildSummary(payload);

    resultsSection.classList.add('visible');

    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
}

function buildSummary(payload) {
    const items = [
        { label: 'Location', value: `${payload.neighbourhood}, ${payload.neighbourhood_group}` },
        { label: 'Neighbourhood', value: payload.neighbourhood },
        { label: 'Price', value: '$' + payload.price.toLocaleString() },
        { label: 'Minimum Stay', value: payload.minimum_nights + ' night' + (payload.minimum_nights > 1 ? 's' : '') },
        { label: 'Reviews', value: payload.number_of_reviews.toLocaleString() },
        { label: 'Reviews/Month', value: payload.reviews_per_month },
        { label: 'Host Listings', value: payload.calculated_host_listings_count },
        { label: 'Availability', value: payload.availability_365 + ' days' },
        { label: 'Coordinates', value: `${payload.latitude}, ${payload.longitude}` }
    ];

    summaryGrid.innerHTML = items.map(item => `
        <div class="summary-item">
            <div class="summary-item-label">${item.label}</div>
            <div class="summary-item-value">${item.value}</div>
        </div>
    `).join('');
}

/* ========================================
   ANIMATED NUMBER COUNTER
   ======================================== */
function animateNumber(el, start, end, duration, formatter) {
    const startTime = performance.now();
    const diff = end - start;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + diff * eased;
        el.textContent = formatter(current);
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

/* ========================================
   PREDICTION HISTORY (localStorage)
   ======================================== */
function getHistory() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function setHistory(history) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
        showToast('Could not save — browser storage may be full.', 'error');
    }
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
}

function formatDateTime(isoString) {
    const d = new Date(isoString);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function savePrediction() {
    if (!currentPredictionData || !currentInputPayload) {
        showToast('No prediction to save. Run a prediction first.', 'warn');
        return;
    }

    const history = getHistory();

    const probabilities = currentPredictionData.Probability || {};
    const probValues = Object.values(probabilities).map(v => parseFloat(v));
    const confidence = probValues.length > 0 ? Math.max(...probValues) : 0;

    const entry = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        input: { ...currentInputPayload },
        prediction: {
            room_type: currentPredictionData.Predicted_room_type || 'Unknown',
            confidence: confidence,
            prob_entire_home: parseFloat(probabilities['Entire home/apt']) || 0,
            prob_private_room: parseFloat(probabilities['Private room']) || 0,
            prob_shared_room: parseFloat(probabilities['Shared room']) || 0
        }
    };

    history.unshift(entry); // newest first
    setHistory(history);

    updateSaveUI();
    updateSaveButtonState();
    showToast('Prediction saved to history.', 'success');
}

function deletePrediction(id) {
    let history = getHistory();
    history = history.filter(e => e.id !== id);
    setHistory(history);
    updateSaveUI();
    showToast('Prediction removed from history.', 'info');
}

function clearAllHistory() {
    setHistory([]);
    updateSaveUI();
    updateSaveButtonState();
    showToast('All prediction history cleared.', 'info');
}

function updateSaveUI() {
    const history = getHistory();
    const count = history.length;

    // Badge
    saveBadgeCount.textContent = count;

    // Button states
    downloadCsvBtn.disabled = count === 0;
    clearHistoryBtn.disabled = count === 0;

    // History table
    if (count === 0) {
        historySection.style.display = 'none';
        return;
    }

    historySection.style.display = 'block';
    historyCount.textContent = `${count} prediction${count !== 1 ? 's' : ''}`;

    historyBody.innerHTML = history.map((entry, idx) => {
        const d = entry.prediction;
        return `
            <tr>
                <td>${count - idx}</td>
                <td>${formatDateTime(entry.timestamp)}</td>
                <td>${entry.input.neighbourhood_group}</td>
                <td>${entry.input.neighbourhood}</td>
                <td>$${entry.input.price.toLocaleString()}</td>
                <td><span class="type-badge">${d.room_type}</span></td>
                <td><span class="conf-value">${d.confidence.toFixed(2)}%</span></td>
                <td>
                    <button class="delete-row-btn" data-id="${entry.id}" aria-label="Delete prediction ${count - idx}" title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    // Attach delete handlers
    historyBody.querySelectorAll('.delete-row-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            deleteTargetId = btn.dataset.id;
            deleteOneModal.classList.add('active');
            deleteOneModal.setAttribute('aria-hidden', 'false');
        });
    });
}

function updateSaveButtonState() {
    if (!currentPredictionData || !currentInputPayload) {
        saveBtn.classList.remove('saved');
        return;
    }

    // Check if this exact prediction is already saved
    const history = getHistory();
    const probabilities = currentPredictionData.Probability || {};
    const probValues = Object.values(probabilities).map(v => parseFloat(v));
    const confidence = probValues.length > 0 ? Math.max(...probValues) : 0;

    const alreadySaved = history.some(e =>
        e.prediction.room_type === (currentPredictionData.Predicted_room_type || 'Unknown') &&
        Math.abs(e.prediction.confidence - confidence) < 0.01 &&
        e.input.latitude === currentInputPayload.latitude &&
        e.input.longitude === currentInputPayload.longitude &&
        e.input.price === currentInputPayload.price
    );

    if (alreadySaved) {
        saveBtn.classList.add('saved');
    } else {
        saveBtn.classList.remove('saved');
    }
}

/* ========================================
   CSV GENERATION & DOWNLOAD
   ======================================== */
function downloadCSV() {
    const history = getHistory();

    if (history.length === 0) {
        showToast('No predictions to download.', 'warn');
        return;
    }

    // CSV header row with clear, self-documenting column names
    const headers = [
        'S.No',
        'Date & Time',
        'Neighbourhood Group (Borough)',
        'Neighbourhood',
        'Latitude',
        'Longitude',
        'Price per Night (USD)',
        'Minimum Nights Required',
        'Total Number of Reviews',
        'Reviews per Month',
        'Host Listing Count',
        'Availability (days out of 365)',
        'Predicted Room Type',
        'Model Confidence (%)',
        'Probability: Entire home/apt (%)',
        'Probability: Private room (%)',
        'Probability: Shared room (%)'
    ];

    // Build metadata rows at the top
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const metaRows = [
        `RoomAI Prediction History Sheet`,
        `Generated on: ${formatDateTime(now.toISOString())}`,
        `Model Used: Tuned XGBoost Classifier`,
        `Total Predictions: ${history.length}`,
        `Note: Probabilities are model estimates, not guaranteed real-world probabilities.`,
        ``
    ];

    // Build data rows
    const dataRows = history.map((entry, idx) => {
        const inp = entry.input;
        const pred = entry.prediction;
        return [
            idx + 1,
            formatDateTime(entry.timestamp),
            inp.neighbourhood_group,
            `"${inp.neighbourhood}"`, // quote in case of commas/apostrophes
            inp.latitude,
            inp.longitude,
            inp.price,
            inp.minimum_nights,
            inp.number_of_reviews,
            inp.reviews_per_month,
            inp.calculated_host_listings_count,
            inp.availability_365,
            `"${pred.room_type}"`,
            pred.confidence.toFixed(2),
            pred.prob_entire_home.toFixed(2),
            pred.prob_private_room.toFixed(2),
            pred.prob_shared_room.toFixed(2)
        ].join(',');
    });

    // Combine all rows
    const csvContent = [
        ...metaRows.map(r => `# ${r}`),
        headers.join(','),
        ...dataRows
    ].join('\n');

    // Create and trigger download
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RoomAI_Predictions_${dateStr}.csv`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Downloaded ${history.length} predictions as CSV.`, 'success');
}

/* ========================================
   MODAL HANDLERS
   ======================================== */
// Clear all history modal
clearHistoryBtn.addEventListener('click', () => {
    const count = getHistory().length;
    if (count === 0) return;
    clearModalCount.textContent = count;
    clearModal.classList.add('active');
    clearModal.setAttribute('aria-hidden', 'false');
});

clearModalCancel.addEventListener('click', () => {
    clearModal.classList.remove('active');
    clearModal.setAttribute('aria-hidden', 'true');
});

clearModalConfirm.addEventListener('click', () => {
    clearModal.classList.remove('active');
    clearModal.setAttribute('aria-hidden', 'true');
    clearAllHistory();
});

// Delete single prediction modal
deleteOneModalCancel.addEventListener('click', () => {
    deleteOneModal.classList.remove('active');
    deleteOneModal.setAttribute('aria-hidden', 'true');
    deleteTargetId = null;
});

deleteOneModalConfirm.addEventListener('click', () => {
    deleteOneModal.classList.remove('active');
    deleteOneModal.setAttribute('aria-hidden', 'true');
    if (deleteTargetId) {
        deletePrediction(deleteTargetId);
        deleteTargetId = null;
        updateSaveButtonState();
    }
});

// Close modals on overlay click
[clearModal, deleteOneModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            deleteTargetId = null;
        }
    });
});

// Close modals on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        [clearModal, deleteOneModal].forEach(modal => {
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
                deleteTargetId = null;
            }
        });
    }
});

/* ========================================
   SAVE & EXPORT EVENT LISTENERS
   ======================================== */
saveBtn.addEventListener('click', savePrediction);
downloadCsvBtn.addEventListener('click', downloadCSV);

/* ========================================
   SCROLL REVEAL
   ======================================== */
function initScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        $$('.scroll-reveal').forEach(el => el.classList.add('revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    $$('.scroll-reveal').forEach(el => observer.observe(el));
}

/* ========================================
   METRIC COUNTER ANIMATION
   ======================================== */
function initMetricCounters() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.target);
                const suffix = el.dataset.suffix || '';

                if (prefersReducedMotion) {
                    el.textContent = target.toFixed(2) + suffix;
                } else {
                    animateNumber(el, 0, target, 1500, v => v.toFixed(2) + suffix);
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    $$('.metric-value[data-target]').forEach(el => observer.observe(el));
}

/* ========================================
   COMPARISON BAR ANIMATION
   ======================================== */
function initComparisonBars() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.comp-bar-fill');
                bars.forEach((bar, i) => {
                    const targetWidth = bar.dataset.width;
                    if (prefersReducedMotion) {
                        bar.style.width = targetWidth + '%';
                    } else {
                        setTimeout(() => {
                            bar.style.width = targetWidth + '%';
                        }, i * 150);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const compBars = $('#comparisonBars');
    if (compBars) observer.observe(compBars);
}

/* ========================================
   HERO CANVAS PARTICLES
   ======================================== */
function initHeroCanvas() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = $('#heroCanvas');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouseX = -1000, mouseY = -1000;
    const PARTICLE_COUNT = 65;
    const CONNECTION_DIST = 140;
    const MOUSE_RADIUS = 120;

    const colors = [
        'rgba(99, 102, 241, 0.6)',
        'rgba(139, 92, 246, 0.5)',
        'rgba(34, 211, 238, 0.5)',
        'rgba(99, 130, 255, 0.4)'
    ];

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
    }

    function createParticle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.max(1.2, Math.random() * 2.5),
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 0.3 + Math.random() * 0.5
        };
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(createParticle());
        }
    }

    function update() {
        particles.forEach(p => {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS && dist > 0) {
                const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.02;
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
            }
            p.vx *= 0.99;
            p.vy *= 0.99;
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 130, 255, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        });
    }

    function animate() {
        update();
        draw();
        requestAnimationFrame(animate);
    }

    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
    });

    window.addEventListener('resize', resize);
    init();
    animate();
}

/* ========================================
   NAVBAR SCROLL EFFECT
   ======================================== */
function initNavbarScroll() {
    const navbar = $('#navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(6, 11, 24, 0.92)';
        } else {
            navbar.style.background = 'rgba(6, 11, 24, 0.8)';
        }
    }, { passive: true });
}

/* ========================================
   INITIALIZATION
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    checkHealth();
    setInterval(checkHealth, 30000);

    initHeroCanvas();
    initScrollReveal();
    initMetricCounters();
    initComparisonBars();
    initNavbarScroll();

    // Load saved history on page load
    updateSaveUI();
});