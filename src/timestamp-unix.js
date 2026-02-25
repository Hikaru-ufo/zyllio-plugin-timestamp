/**
 * Plugin Zyllio - Timestamp Unix
 * Version: 1.1.0
 * Auteur: Hikaru-ufo
 *
 * Fonctions disponibles :
 *  - timestamp-now       : Retourne le timestamp Unix actuel (en secondes)
 *  - timestamp-from-date : Retourne le timestamp Unix d'une date donnée (en secondes)
 */

const PLUGIN_INFO = {
    name: "Timestamp Unix",
    version: "1.1.0",
    author: "Hikaru-ufo",
    buildDate: "2026-02-25"
};

console.log('========================================');
console.log(`CHARGEMENT PLUGIN: ${PLUGIN_INFO.name} v${PLUGIN_INFO.version}`);
console.log('========================================');

// ─────────────────────────────────────────
// ICÔNE SVG partagée
// ─────────────────────────────────────────
const TimestampIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V8z"/>
</svg>
`;

// ─────────────────────────────────────────
// FONCTION 1 : Timestamp actuel (maintenant)
// ─────────────────────────────────────────
class TimestampNowFunction {
    async execute(properties, listItem) {
        try {
            const timestamp = Math.floor(Date.now() / 1000);
            console.log('[timestamp-now] Timestamp actuel:', timestamp);
            return timestamp;
        } catch (error) {
            console.error('[timestamp-now] Erreur:', error);
            return 0;
        }
    }
}

const TimestampNowMetadata = {
    id: 'timestamp-now',
    icon: TimestampIcon,
    label: 'Timestamp maintenant',
    category: 'Date',
    format: 'number',
    properties: [{
        id: 'dummy',
        name: 'Info',
        type: 'text',
        tooltip: 'Retourne le timestamp Unix de l\'instant présent (secondes)',
        default: 'now'
    }],
    translations: [{
        lang: 'fr',
        label: 'Timestamp maintenant',
        category: 'Date',
        properties: [{
            id: 'dummy',
            name: 'Info'
        }]
    }]
};

// ─────────────────────────────────────────
// FONCTION 2 : Timestamp d'une date donnée
// ─────────────────────────────────────────
class TimestampFromDateFunction {
    async execute(properties, listItem) {
        try {
            const dateProp = properties.find(p => p.id === 'date');

            if (!dateProp || !dateProp.value) {
                console.log('[timestamp-from-date] Propriété date manquante');
                return 0;
            }

            const dateString = await zySdk.services.dictionary.getValue(dateProp.value, listItem);
            console.log('[timestamp-from-date] Date reçue:', dateString);

            if (!dateString) {
                console.log('[timestamp-from-date] Valeur vide');
                return 0;
            }

            const date = new Date(Date.parse(dateString));

            if (isNaN(date.getTime())) {
                console.log('[timestamp-from-date] Date invalide:', dateString);
                return 0;
            }

            const timestamp = Math.floor(date.getTime() / 1000);
            console.log('[timestamp-from-date] Timestamp calculé:', timestamp);
            return timestamp;

        } catch (error) {
            console.error('[timestamp-from-date] Erreur:', error);
            return 0;
        }
    }
}

const TimestampFromDateMetadata = {
    id: 'timestamp-from-date',
    icon: TimestampIcon,
    label: 'Timestamp depuis une date',
    category: 'Date',
    format: 'number',
    properties: [{
        id: 'date',
        name: 'Date',
        type: 'date',
        tooltip: 'Sélectionnez la date à convertir en timestamp Unix (secondes)',
        default: '',
        main: true
    }],
    translations: [{
        lang: 'fr',
        label: 'Timestamp depuis une date',
        category: 'Date',
        properties: [{
            id: 'date',
            name: 'Date'
        }]
    }]
};

// ─────────────────────────────────────────
// ENREGISTREMENT DES FONCTIONS
// ─────────────────────────────────────────
if (typeof zySdk !== 'undefined' && zySdk.services && zySdk.services.registry) {
    zySdk.services.registry.registerFunction(TimestampNowMetadata, new TimestampNowFunction());
    console.log('[Plugin] Fonction "timestamp-now" enregistrée');

    zySdk.services.registry.registerFunction(TimestampFromDateMetadata, new TimestampFromDateFunction());
    console.log('[Plugin] Fonction "timestamp-from-date" enregistrée');

    console.log(`[Plugin] ${PLUGIN_INFO.name} v${PLUGIN_INFO.version} chargé avec succès !`);
} else {
    console.error('[Plugin] zySdk indisponible - plugin non chargé');
}

if (typeof window !== 'undefined') {
    window.ZYLLIO_TIMESTAMP_PLUGIN_INFO = PLUGIN_INFO;
}
