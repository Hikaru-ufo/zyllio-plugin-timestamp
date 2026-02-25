# Zyllio Plugin - Timestamp Unix

Plugin Zyllio pour obtenir des timestamps Unix (en secondes).

## Fonctions disponibles

### `Timestamp maintenant`
Retourne le timestamp Unix de l'instant présent (secondes écoulées depuis le 1er janvier 1970).

- **Aucun paramètre requis**
- **Retourne** : nombre entier (ex: `1740470400`)

### `Timestamp depuis une date`
Retourne le timestamp Unix correspondant à une date donnée.

- **Paramètre** : `Date` — une date Zyllio
- **Retourne** : nombre entier (ex: `1740470400`)

## Installation dans Zyllio Studio

1. Dans Zyllio Studio, va dans les paramètres de ton projet
2. Ajoute un plugin avec l'URL suivante :

```
https://hikaru-ufo.github.io/zyllio-plugin-timestamp/src/timestamp-unix.js
```

ou via jsDelivr (recommandé) :

```
https://cdn.jsdelivr.net/gh/Hikaru-ufo/zyllio-plugin-timestamp@main/src/timestamp-unix.js
```

## Hébergement

- **GitHub Pages** : `https://hikaru-ufo.github.io/zyllio-plugin-timestamp/src/timestamp-unix.js`
- **jsDelivr CDN** : `https://cdn.jsdelivr.net/gh/Hikaru-ufo/zyllio-plugin-timestamp@main/src/timestamp-unix.js`

## Cas d'usage

- Enregistrer la date/heure d'une action utilisateur sous forme de timestamp
- Calculer des durées entre deux timestamps
- Intégration avec des APIs tierces qui utilisent des timestamps Unix
- Tri chronologique fiable de données

## Version

| Version | Date | Notes |
|---------|------|-------|
| 1.0.0 | 2026-02-25 | Version initiale — 2 fonctions (now + from date) |
