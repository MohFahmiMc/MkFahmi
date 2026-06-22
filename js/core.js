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
// Hanya perlu bahasa Inggris sebagai bahasa dasar (Base Dictionary)
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
    // 1. Terapkan Inggris langsung jika dipilih
    if (langCode === 'en') {
        applyDictToDOM(baseEnglish);
        return;
    }

    // 2. Cek apakah terjemahan sudah ada di Cache LocalStorage agar instan
    const cacheKey = `zephyr_lang_${langCode}`;
    const cachedDict = localStorage.getItem(cacheKey);

    if (cachedDict) {
        applyDictToDOM(JSON.parse(cachedDict));
        return;
    }

    // 3. Jika belum ada, gunakan API Google Translate untuk menerjemahkan secara otomatis
    try {
        triggerNotification("Translating dashboard...", "fa-language", "text-primary");
        const keys = Object.keys(baseEnglish);
        const textToTranslate = keys.map(k => baseEnglish[k]).join("\n"); // Gabungkan dengan enter agar API lebih hemat request
        
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${langCode}&dt=t&q=${encodeURIComponent(textToTranslate)}`);
        const data = await res.json();
        
        let fullTranslatedText = "";
        data[0].forEach(item => { fullTranslatedText += item[0]; });
        const translatedValues = fullTranslatedText.split("\n");

        const newDict = {};
        keys.forEach((k, index) => {
            newDict[k] = translatedValues[index] ? translatedValues[index].trim() : baseEnglish[k];
        });

        // Simpan ke cache untuk mempercepat muatan berikutnya
        localStorage.setItem(cacheKey, JSON.stringify(newDict));
        applyDictToDOM(newDict);
        triggerNotification("Translation applied!", "fa-check", "text-success");

    } catch (err) {
        console.error("Translation API failed", err);
        applyDictToDOM(baseEnglish); // Fallback ke Inggris jika API error
    }
}

function applyDictToDOM(dict) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            // Khusus untuk error yang ada icon html di dalamnya
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
// USER SETTINGS SYSTEM
// ==========================================
async function loadUserSettings(user) {
    const token = localStorage.getItem('zephyr_token');
    try {
        // Jangan blokir UI, lakukan di background
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

// ==========================================
// BOT TELEMETRY & AUTH API
// ==========================================
async function fetchBotInfo() {
    try {
        fetch(`${API_BASE_URL}/api/botinfo`)
            .then(res => res.json())
            .then(data => {
                if (data.status === "online" || data.success) {
                    document.getElementById('bot-nav-avatar').src = data.avatar || "https://cdn.discordapp.com/embed/avatars/0.png";
                    document.getElementById('bot-nav-name').innerText = data.botName || "Zephyr";
                    document.getElementById('stat-servers').innerText = data.totalServers ? `${data.totalServers}` : "Error DB";
                    document.getElementById('stat-users').innerText = data.totalUsers ? `${data.totalUsers.toLocaleString()}` : "Error DB";
                    
                    const badgeStatus = document.getElementById('system-status-badge');
                    badgeStatus.innerHTML = '<i class="fa-solid fa-circle text-success me-1" style="font-size:8px; vertical-align: middle;"></i> Core Active';
                    document.getElementById('stat-engine').innerText = "ONLINE";
                    document.getElementById('stat-engine').style.color = "#10b981";
                } else setBotOfflineUI();
            }).catch(setBotOfflineUI);
    } catch (err) {}
}

function setBotOfflineUI() {
    document.getElementById('stat-servers').innerText = "OFF";
    document.getElementById('stat-users').innerText = "OFF";
    const badgeStatus = document.getElementById('system-status-badge');
    badgeStatus.style.borderColor = "#ef4444";
    badgeStatus.style.color = "#ef4444";
    badgeStatus.innerHTML = '<i class="fa-solid fa-circle-exclamation me-1"></i> Node Disconnected';
    document.getElementById('stat-engine').innerText = "OFFLINE";
    document.getElementById('stat-engine').style.color = "#ef4444";
}

async function renderUserSession(user) {
    const avatarUrl = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png';

    document.getElementById('auth-section').innerHTML = `
        <div class="d-flex align-items-center gap-3 bg-card border border-theme px-3 py-1.5 rounded-pill shadow-sm">
            <button onclick="window.showDashboardView()" class="btn btn-link text-primary p-0 text-decoration-none fw-semibold d-none d-md-block transition hover-text-primary" style="font-size: 13px;" data-i18n="btn_enter">Dashboard</button>
            <div class="d-flex align-items-center gap-2">
                <img src="${avatarUrl}" class="rounded-circle" style="width:24px; height:24px; border: 1px solid var(--border-hairline);">
                <span class="fw-semibold text-strong" style="font-size:13px;">${user.username}</span>
            </div>
            <div class="border-start border-theme ps-3 d-flex gap-3 align-items-center">
                <button data-bs-toggle="modal" data-bs-target="#settingsModal" class="btn btn-link text-muted p-0 text-decoration-none hover-text-primary transition" title="Personal Settings"><i class="fa-solid fa-gear" style="font-size: 14px;"></i></button>
                <button onclick="window.logout()" class="btn btn-link text-muted p-0 text-decoration-none hover-text-primary transition" title="Logout"><i class="fa-solid fa-power-off" style="font-size: 14px;"></i></button>
            </div>
        </div>
    `;
    
    document.getElementById('loginBtnMain').classList.add('d-none');
    document.getElementById('dashboardBtnMain').classList.remove('d-none');

    loadUserSettings(user);
    return await loadUserServers(); 
}

// BLAZING FAST SERVER LOAD WITH CACHE
async function loadUserServers() {
    const select = document.getElementById('serverSelect');

    // MENGGUNAKAN MEMORI CACHE AGAR INSTAN
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
                if (guild.owner) return true;
                const perms = BigInt(guild.permissions);
                return (perms & 8n) === 8n || (perms & 32n) === 32n;
            });
            
            if(adminGuilds.length === 0) {
                select.innerHTML = '<option value="" disabled>No Authority Found</option>';
                return [];
            }

            userGuildsCache = adminGuilds; // SIMPAN KE CACHE
            select.innerHTML = '<option value="" selected disabled data-i18n="dash_select">Select Target Server</option>';
            adminGuilds.forEach(g => { select.innerHTML += `<option value="${g.id}">${g.name}</option>`; });

            applyLanguage(selectedGlobalLang);
            return adminGuilds;
        }
    } catch (err) {}
    return [];
}

window.handleServerSwitch = async (forcedGuild, forcedTab, skipUrlUpdate = false) => {
    const guildID = forcedGuild || document.getElementById('serverSelect').value;
    if(!guildID) return;
    
    currentSelectedGuild = guildID;
    localStorage.setItem('zephyr_selected_guild', guildID);
    
    const activeTab = forcedTab || localStorage.getItem('zephyr_active_tab') || pluginRegistry[0]?.id;
    
    if (!skipUrlUpdate) window.history.pushState({}, '', `/workspace/${guildID}/${activeTab}`);

    fetchDataServer(guildID, activeTab);
}

// BLAZING FAST SERVER DATA LOAD WITH MEMORY CACHE
async function fetchDataServer(guildID, tabToActivate) {
    const finalTab = tabToActivate || localStorage.getItem('zephyr_active_tab') || pluginRegistry[0]?.id;

    // JIKA DATA SUDAH DI CACHE, RENDER INSTAN DALAM 0 DETIK
    if (serverFeaturesCache.has(guildID)) {
        applyServerDataToUI(serverFeaturesCache.get(guildID));
        window.switchTab(finalTab, true);
        
        // Silent Fetch di background untuk update cache (jika ada perubahan di bot)
        silentFetchServer(guildID);
        return; 
    }

    // Tampilan Loading jika belum masuk cache
    document.getElementById('guild-name').innerText = "Connecting database...";
    document.getElementById('guild-premium-badge').innerHTML = "";
    document.getElementById('guild-status').className = "badge bg-warning text-strong fw-medium px-2 py-1 shadow-sm";
    document.getElementById('guild-status').innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i> Indexing...';
    document.body.classList.remove('theme-premium');
    
    const promoContainer = document.getElementById('premium-promo-container');
    if (promoContainer) promoContainer.classList.add('d-none');

    silentFetchServer(guildID).then(dataFeatures => {
        if (dataFeatures) {
            applyServerDataToUI(dataFeatures);
            window.switchTab(finalTab, true);
        }
    });
}

async function silentFetchServer(guildID) {
    let reqUserId = "";
    const userSessionStr = localStorage.getItem('zephyr_user');
    if (userSessionStr) { try { reqUserId = JSON.parse(userSessionStr).id; } catch(e) {} }

    try {
        const resFeatures = await fetch(`${API_BASE_URL}/api/features/${guildID}?reqUser=${reqUserId}`);
        const dataFeatures = await resFeatures.json();
        
        if (dataFeatures.success) {
            serverFeaturesCache.set(guildID, dataFeatures); // UPDATE CACHE
            return dataFeatures;
        } else {
            document.getElementById('guild-status').className = "badge bg-danger text-light fw-medium px-2 py-1 shadow-sm";
            document.getElementById('guild-status').innerHTML = 'Unlinked';
        }
    } catch (err) { 
        document.getElementById('guild-status').className = "badge bg-danger text-light fw-medium px-2 py-1 shadow-sm";
        document.getElementById('guild-status').innerHTML = 'Node Error'; 
    }
    return null;
}

function applyServerDataToUI(dataFeatures) {
    const promoContainer = document.getElementById('premium-promo-container');
    document.getElementById('guild-name').innerText = dataFeatures.guildName;
    document.getElementById('guild-status').className = "badge bg-success text-light fw-medium px-2 py-1 shadow-sm";
    document.getElementById('guild-status').innerHTML = '<i class="fa-solid fa-check me-1"></i> Linked';
    
    if (dataFeatures.isPremium === true) {
        document.body.classList.add('theme-premium');
        document.getElementById('guild-premium-badge').innerHTML = `<span class="badge badge-premium shadow-sm fw-bold px-2 py-1"><i class="fa-solid fa-crown"></i> PRO</span>`;
        if (promoContainer) promoContainer.classList.add('d-none'); 
    } else {
        document.body.classList.remove('theme-premium');
        document.getElementById('guild-premium-badge').innerHTML = `<span class="badge border border-theme text-muted px-2 bg-canvas" style="font-size:10px;"><i class="fa-solid fa-cube me-1"></i> Standard</span>`;
        if (promoContainer) promoContainer.classList.remove('d-none'); 
    }

    if (dataFeatures.guildIcon) document.getElementById('guild-avatar').innerHTML = `<img src="${dataFeatures.guildIcon}" class="w-100 h-100 rounded shadow-sm" style="object-fit:cover;">`;
    else document.getElementById('guild-avatar').innerHTML = `<i class="fa-solid fa-server"></i>`;
    
    cacheActiveCommands = dataFeatures.commands || [];
    if (window.renderModulesList) window.renderModulesList(dataFeatures.modules);
}

async function initializePlugins() {
    const sidebar = document.getElementById('sidebar-btn-container');
    const panelContainer = document.getElementById('panels-container');

    for (const file of PLUGIN_FILES) {
        try {
            const module = await import(`/plugins/${file}`);
            const plugin = module[Object.keys(module)[0]]; 
            if (plugin) pluginRegistry.push(plugin);
        } catch (err) {}
    }

    pluginRegistry.forEach((plugin, index) => {
        const isActive = index === 0 ? "active" : "";
        sidebar.innerHTML += `<button id="btn-tab-${plugin.id}" class="sidebar-btn ${isActive}" onclick="window.switchTab('${plugin.id}')"><i class="fa-solid ${plugin.icon} fa-fw text-center" style="width: 20px;"></i> ${plugin.name}</button>`;
        const isHidden = index === 0 ? "" : "d-none";
        panelContainer.innerHTML += `<div id="panel-${plugin.id}" class="dashboard-panel ${isHidden}">${plugin.html}</div>`;
    });

    pluginRegistry.forEach(plugin => { if (plugin.onInit) plugin.onInit(); });
}

window.switchTab = async (targetId, skipUrlUpdate = false) => {
    document.querySelectorAll('.dashboard-panel').forEach(el => el.classList.add('d-none'));
    document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`panel-${targetId}`).classList.remove('d-none');
    document.getElementById(`btn-tab-${targetId}`).classList.add('active');
    
    localStorage.setItem('zephyr_active_tab', targetId);

    if (!skipUrlUpdate && currentSelectedGuild) {
        window.history.pushState({}, '', `/workspace/${currentSelectedGuild}/${targetId}`);
    }

    const plugin = pluginRegistry.find(p => p.id === targetId);
    if (plugin && plugin.onSwitch && currentSelectedGuild) {
        // Jangan await plugin untuk menghindari UI lag
        plugin.onSwitch(currentSelectedGuild).catch(err => console.error(err));
    }
}

// ==========================================
// CENTRAL ROUTER CONTROLLER
// ==========================================
function routeHandler(guilds) {
    const pathParts = window.location.pathname.split('/').filter(p => p);
    
    if (pathParts[0] === 'workspace') {
        if (!localStorage.getItem('zephyr_token')) {
            window.location.href = '/'; 
            return;
        }
        
        document.getElementById('landing-view').classList.add('d-none');
        document.getElementById('dashboard-view').classList.remove('d-none');

        let urlGuild = pathParts[1];
        let urlPlugin = pathParts[2];

        let targetGuild = urlGuild || localStorage.getItem('zephyr_selected_guild');
        let targetTab = urlPlugin || localStorage.getItem('zephyr_active_tab') || pluginRegistry[0]?.id;

        if (targetGuild && guilds.some(g => g.id === targetGuild)) {
            document.getElementById('serverSelect').value = targetGuild;
            window.handleServerSwitch(targetGuild, targetTab, true);
        } else {
            window.history.replaceState({}, '', '/workspace');
        }
    } else {
        window.showLandingView(null, true);
    }
}

// Event Browser Navigation Back/Forward
window.addEventListener('popstate', () => {
    const pathParts = window.location.pathname.split('/').filter(p => p);
    if (pathParts[0] === 'workspace') {
        document.getElementById('landing-view').classList.add('d-none');
        document.getElementById('dashboard-view').classList.remove('d-none');
        
        let urlGuild = pathParts[1];
        let urlPlugin = pathParts[2];
        
        if (urlGuild && urlGuild !== currentSelectedGuild) {
             document.getElementById('serverSelect').value = urlGuild;
             window.handleServerSwitch(urlGuild, urlPlugin, true);
        } else if (urlPlugin) {
             window.switchTab(urlPlugin, true);
        }
    } else {
        window.showLandingView(null, true);
    }
});

// ==========================================
// INITIALIZATION
// ==========================================
window.onload = async () => {
    // Jalankan inisialisasi secara bersamaan agar UI lebih cepat siap
    await initializePlugins();
    fetchBotInfo();

    document.getElementById('user-lang').addEventListener('change', (e) => {
        applyLanguage(e.target.value);
    });

    document.getElementById('user-theme-standard').addEventListener('change', (e) => {
        selectedGlobalTheme = e.target.value;
        applyGlobalTheme(selectedGlobalTheme);
        document.getElementById('btn-theme-zephyr').classList.replace('btn-primary', 'btn-outline-primary');
    });

    document.getElementById('btn-theme-zephyr').addEventListener('click', () => {
        selectedGlobalTheme = 'zephyr';
        applyGlobalTheme(selectedGlobalTheme);
        document.getElementById('user-theme-standard').value = 'default';
        document.getElementById('btn-theme-zephyr').classList.replace('btn-outline-primary', 'btn-primary');
    });

    document.getElementById('globalSettingsForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('zephyr_token');
        const user = JSON.parse(localStorage.getItem('zephyr_user') || '{}');
        
        selectedGlobalLang = document.getElementById('user-lang').value;
        
        fetch(`${API_BASE_URL}/api/user/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ userId: user.id, language: selectedGlobalLang, theme: selectedGlobalTheme })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                applyLanguage(selectedGlobalLang);
                triggerNotification("Settings Saved!", "fa-check", "text-success");
                const modal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
                if (modal) modal.hide();
            } else {
                triggerNotification(data.error, "fa-lock", "text-danger");
                if (selectedGlobalTheme === 'zephyr') {
                    selectedGlobalTheme = 'default';
                    applyGlobalTheme('default');
                    document.getElementById('btn-theme-zephyr').classList.replace('btn-primary', 'btn-outline-primary');
                }
            }
        });
    });

    // AUTH LOGIC
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    let token = localStorage.getItem('zephyr_token');

    if (code) {
        window.history.replaceState({}, document.title, "/");
        try {
            document.getElementById('auth-section').innerHTML = `<span class="spinner-border spinner-border-sm text-primary" role="status"></span>`;
            const res = await fetch(`${API_BASE_URL}/api/auth/discord`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) });
            const data = await res.json();
            
            if (data.success) {
                localStorage.setItem('zephyr_token', data.token);
                localStorage.setItem('zephyr_user', JSON.stringify(data.user));
                const guilds = await renderUserSession(data.user);
                triggerNotification(`Welcome, ${data.user.username}!`, "fa-user-check", "text-success");
                
                window.history.pushState({}, '', '/workspace');
                routeHandler(guilds); 
            } else {
                document.getElementById('auth-section').innerHTML = `<button onclick="window.loginDiscord()" class="btn btn-discord btn-sm px-3 py-1.5 shadow-sm rounded-pill">Login</button>`;
            }
        } catch (err) { window.logout(); }
    } else if (token) {
        const userSessionStr = localStorage.getItem('zephyr_user');
        if (userSessionStr) {
            try { 
                const guilds = await renderUserSession(JSON.parse(userSessionStr)); 
                routeHandler(guilds); 
            } 
            catch (e) { window.logout(); }
        }
    } else {
        routeHandler([]);
    }
};
