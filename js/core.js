// ==========================================
// CORE SYSTEM CONFIGURATION & CACHE
// ==========================================
export const API_BASE_URL = ""; 
export const DISCORD_CLIENT_ID = "1441022662699909182"; 
export const REDIRECT_URI = window.location.origin + "/"; 

export let currentSelectedGuild = "";
export let cacheActiveCommands = [];
export let selectedGlobalTheme = 'default';
export let selectedGlobalLang = 'en';

// BLAZING FAST CACHE SYSTEM
let userGuildsCache = null;
let serverFeaturesCache = new Map();

// ==========================================
// DYNAMIC AUTO-TRANSLATE API SYSTEM
// ==========================================
const baseEnglish = {
    nav_support: "Support Server", nav_premium: "Premium", btn_login: "Dashboard Login",
    status_syncing: "Syncing Engine", hero_title: "Control the Western Wind.",
    hero_desc: "Harness Zephyr's potential. Configure core clusters, establish auto-responder rules, design welcome aesthetics, and monitor bot telemetry natively.",
    btn_invite: "Invite Zephyr", btn_vote: "Vote on Top.gg", btn_enter: "Enter Dashboard",
    stat_clusters: "Clusters", stat_users: "Total Users", stat_engine: "Engine Core",
    dash_target: "Target Workspace", dash_fetching: "Fetching authorized hubs...",
    dash_select: "Select Workspace", dash_awaiting: "Awaiting Selection",
    promo_title: "Upgrade to Zephyr Premium!", promo_desc: "Boost your server performance! Unlock feature limits, gain system priority, and manage everything without restrictions.",
    promo_btn: "Buy Premium", modal_title: "Personal Settings", modal_lang: "Language",
    modal_lang_desc: "Choose the dashboard display language.", modal_theme: "Dashboard Theme",
    modal_theme_desc: "Change the visual appearance of your dashboard.", theme_standard: "Standard Themes (Free)",
    theme_default: "Default Zephyr (Dark)", theme_ocean: "Ocean Deep (Blue Gradient)",
    theme_sunset: "Sunset Horizon (Red/Pink)", theme_midnight: "Midnight (Dark Purple)",
    theme_premium: "Premium Themes", theme_locked: "Zephyr Theme is locked. Purchase Premium.",
    modal_cancel: "Cancel", modal_save: "Save"
};

export async function applyLanguage(langCode) {
    if (langCode === 'en') {
        applyDictToDOM(baseEnglish);
        return;
    }

    const cacheKey = `zephyr_lang_${langCode}`;
    const cachedDict = localStorage.getItem(cacheKey);

    if (cachedDict) {
        applyDictToDOM(JSON.parse(cachedDict));
        return;
    }

    try {
        triggerNotification("Translating dashboard...", "fa-language", "text-primary");
        const keys = Object.keys(baseEnglish);
        const textToTranslate = keys.map(k => baseEnglish[k]).join("\n");
        
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${langCode}&dt=t&q=${encodeURIComponent(textToTranslate)}`);
        const data = await res.json();
        
        let fullTranslatedText = "";
        data[0].forEach(item => { fullTranslatedText += item[0]; });
        const translatedValues = fullTranslatedText.split("\n");

        const newDict = {};
        keys.forEach((k, index) => {
            newDict[k] = translatedValues[index] ? translatedValues[index].trim() : baseEnglish[k];
        });

        localStorage.setItem(cacheKey, JSON.stringify(newDict));
        applyDictToDOM(newDict);
        triggerNotification("Translation applied!", "fa-check", "text-success");
    } catch (err) {
        console.error("Translation API failed", err);
        applyDictToDOM(baseEnglish);
    }
}

function applyDictToDOM(dict) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (key === 'theme_locked') el.innerHTML = `<i class='fa-solid fa-triangle-exclamation'></i> ${dict[key]}`;
            else el.innerHTML = dict[key]; 
        }
    });
}

// ==========================================
// PLUGIN AUTO-LOADER SYSTEM
// ==========================================
const PLUGIN_FILES = [
    'modules.js', 'serverstats.js', 'pwelcome.js', 'automod.js', 'autorole.js',
    'invitetracker.js', 'announcements.js', 'triggers.js', 'prefix.js', 'commands.js', 'plogs.js'
];

let pluginRegistry = [];

export function triggerNotification(message, iconClass = "fa-circle-check", textColor = "text-success") {
    const toastEl = document.getElementById('apiToast');
    document.getElementById('toastMessage').innerText = message;
    let iconColor = textColor.includes('danger') ? '#ef4444' : textColor.includes('success') ? '#10b981' : 'var(--primary)';
    document.getElementById('toastIcon').className = `fa-solid ${iconClass}`;
    document.getElementById('toastIcon').style.color = iconColor;
    bootstrap.Toast.getOrCreateInstance(toastEl).show();
}

export function applyGlobalTheme(themeName) {
    document.body.classList.remove('theme-ocean', 'theme-sunset', 'theme-midnight', 'theme-zephyr');
    if (themeName && themeName !== 'default') {
        document.body.classList.add(`theme-${themeName}`);
    }
}

// ==========================================
// VIEW ROUTING ENGINE
// ==========================================
window.showLandingView = (e, skipUrlUpdate = false) => {
    if(e) e.preventDefault();
    document.getElementById('landing-view').classList.remove('d-none');
    document.getElementById('dashboard-view').classList.add('d-none');
    if (!skipUrlUpdate && window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
    }
}

window.showDashboardView = (e) => {
    if(e) e.preventDefault();
    
    let targetGuild = currentSelectedGuild || localStorage.getItem('zephyr_selected_guild');
    let targetTab = localStorage.getItem('zephyr_active_tab') || pluginRegistry[0]?.id;
    
    document.getElementById('landing-view').classList.add('d-none');
    document.getElementById('dashboard-view').classList.remove('d-none');

    if (targetGuild) {
        document.getElementById('serverSelect').value = targetGuild;
        window.handleServerSwitch(targetGuild, targetTab);
    } else {
        window.history.pushState({}, '', `/workspace`);
    }
}

window.loginDiscord = () => { window.location.href = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify+guilds`; }
window.logout = () => { localStorage.removeItem('zephyr_token'); localStorage.removeItem('zephyr_user'); localStorage.removeItem('zephyr_selected_guild'); window.location.href = "/"; }

// ==========================================
// USER SETTINGS & AUTH LOGIC
// ==========================================
async function loadUserSettings(user) {
    const token = localStorage.getItem('zephyr_token');
    try {
        fetch(`${API_BASE_URL}/api/user/settings?userId=${user.id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => {
                if (data.success && data.settings) {
                    selectedGlobalTheme = data.settings.theme || 'default';
                    selectedGlobalLang = data.settings.language || 'en';
                    applyGlobalTheme(selectedGlobalTheme);
                    applyLanguage(selectedGlobalLang);
                    document.getElementById('user-lang').value = selectedGlobalLang;
                    
                    if (selectedGlobalTheme === 'zephyr') {
                        document.getElementById('user-theme-standard').value = 'default';
                        document.getElementById('btn-theme-zephyr').classList.replace('btn-outline-primary', 'btn-primary');
                    } else {
                        document.getElementById('user-theme-standard').value = selectedGlobalTheme;
                        document.getElementById('btn-theme-zephyr').classList.replace('btn-primary', 'btn-outline-primary');
                    }
                    if (!data.isPremium) document.getElementById('premium-status-text').style.display = 'block';
                }
            }).catch(() => {});
    } catch (err) {}
}

async function renderUserSession(user) {
    const avatarUrl = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png';
    document.getElementById('auth-section').innerHTML = `
        <div class="d-flex align-items-center gap-3 bg-card border border-theme px-3 py-1.5 rounded-pill shadow-sm">
            <button onclick="window.showDashboardView()" class="btn btn-link text-primary p-0 text-decoration-none fw-semibold d-none d-md-block transition" style="font-size: 13px;" data-i18n="btn_enter">Dashboard</button>
            <div class="d-flex align-items-center gap-2">
                <img src="${avatarUrl}" class="rounded-circle" style="width:24px; height:24px;">
                <span class="fw-semibold text-strong" style="font-size:13px;">${user.username}</span>
            </div>
            <div class="border-start border-theme ps-3 d-flex gap-3 align-items-center">
                <button data-bs-toggle="modal" data-bs-target="#settingsModal" class="btn btn-link text-muted p-0 text-decoration-none"><i class="fa-solid fa-gear" style="font-size: 14px;"></i></button>
                <button onclick="window.logout()" class="btn btn-link text-muted p-0 text-decoration-none"><i class="fa-solid fa-power-off" style="font-size: 14px;"></i></button>
            </div>
        </div>
    `;
    document.getElementById('loginBtnMain').classList.add('d-none');
    document.getElementById('dashboardBtnMain').classList.remove('d-none');
    loadUserSettings(user);
    return await loadUserServers(); 
}

async function loadUserServers() {
    const select = document.getElementById('serverSelect');
    if (userGuildsCache) {
        select.innerHTML = '<option value="" selected disabled data-i18n="dash_select">Select Target Server</option>';
        userGuildsCache.forEach(g => { select.innerHTML += `<option value="${g.id}">${g.name}</option>`; });
        applyLanguage(selectedGlobalLang);
        return userGuildsCache;
    }
    const token = localStorage.getItem('zephyr_token');
    try {
        const res = await fetch(`${API_BASE_URL}/api/user/guilds`, { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await res.json();
        if (data.success && data.guilds) {
            const adminGuilds = data.guilds.filter(guild => {
                const perms = BigInt(guild.permissions);
                return guild.owner || (perms & 8n) === 8n || (perms & 32n) === 32n;
            });
            userGuildsCache = adminGuilds;
            select.innerHTML = '<option value="" selected disabled data-i18n="dash_select">Select Target Server</option>';
            adminGuilds.forEach(g => { select.innerHTML += `<option value="${g.id}">${g.name}</option>`; });
            applyLanguage(selectedGlobalLang);
            return adminGuilds;
        }
    } catch (err) {}
    return [];
}

// ==========================================
// INITIALIZATION
// ==========================================
window.onload = async () => {
    // Logic init plugins, auth, dll...
    await initializePlugins();
    
    // Auth Check
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    let token = localStorage.getItem('zephyr_token');

    if (code) {
        window.history.replaceState({}, document.title, "/");
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/discord`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('zephyr_token', data.token);
                localStorage.setItem('zephyr_user', JSON.stringify(data.user));
                const guilds = await renderUserSession(data.user);
                routeHandler(guilds); 
            }
        } catch (err) { window.logout(); }
    } else if (token) {
        const userSessionStr = localStorage.getItem('zephyr_user');
        if (userSessionStr) {
            try { const guilds = await renderUserSession(JSON.parse(userSessionStr)); routeHandler(guilds); } 
            catch (e) { window.logout(); }
        }
    }
};
