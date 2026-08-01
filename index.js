// Configuración y Estado del Proyecto
const ALL_ROLES = ['Superior', 'Jungla', 'Medio', 'Tirador', 'Soporte'];
let userRole = null;
let toastTimeoutId = null;

// Referencias del DOM
const roleSelectionScreen = document.getElementById('role-selection-screen');
const draftScreen = document.getElementById('draft-screen');
const rolesSelector = document.getElementById('roles-selector');
const continueBtn = document.getElementById('continue-btn');
const myTeamGrid = document.getElementById('my-team-grid');
const enemyTeamGrid = document.getElementById('enemy-team-grid');
const toast = document.getElementById('toast');

// Inicialización de la Aplicación
document.addEventListener('DOMContentLoaded', () => {
    initEvents();
});

function initEvents() {
    rolesSelector.addEventListener('click', handleRoleSelection);
    continueBtn.addEventListener('click', handleContinue);
}

// Manejar selección de rol en Pantalla 1
function handleRoleSelection(event) {
    const button = event.target.closest('.role-btn');
    if (!button) return;

    userRole = button.dataset.role;

    // Actualizar estados visuales de los botones
    const roleButtons = rolesSelector.querySelectorAll('.role-btn');
    roleButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Mostrar botón de continuar
    continueBtn.classList.remove('hidden');
}

// Cambiar a la Pantalla de Selección (Draft)
function handleContinue() {
    if (!userRole) return;

    roleSelectionScreen.classList.add('hidden');
    renderDraftScreen();
    draftScreen.classList.remove('hidden');
}

// Renderizar secciones de la Pantalla de Selección
function renderDraftScreen() {
    renderMyTeam();
    renderEnemyTeam();
}

function renderMyTeam() {
    myTeamGrid.innerHTML = '';
    const remainingRoles = ALL_ROLES.filter(role => role !== userRole);

    remainingRoles.forEach(role => {
        const card = createDraftCard(role);
        myTeamGrid.appendChild(card);
    });
}

function renderEnemyTeam() {
    enemyTeamGrid.innerHTML = '';

    ALL_ROLES.forEach(role => {
        const card = createDraftCard(role);
        enemyTeamGrid.appendChild(card);
    });
}

// Helper para crear tarjetas de rol
function createDraftCard(role) {
    const card = document.createElement('button');
    card.className = 'draft-card';
    card.textContent = `+ ${role}`;
    card.addEventListener('click', handleCardClick);
    return card;
}

// Manejar clic en una tarjeta (Mensaje temporal)
function handleCardClick() {
    showToast('Aquí se abrirá el selector de campeones.');
}

// Mostrar notificación temporal
function showToast(message) {
    if (toastTimeoutId) {
        clearTimeout(toastTimeoutId);
    }

    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.classList.remove('hidden');

    toastTimeoutId = setTimeout(() => {
        toast.classList.add('hidden');
    }, 2500);
}