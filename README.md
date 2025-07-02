# 🎓 2025-S4 Pràctica Acadèmica / 2025-S4 Academic Practice

Albert Valls

---

## 📚 Índex / Table of Contents

1. [Sobre el projecte / About](#1-sobre-el-projecte--about)
2. [Funcionalitats / Features](#2-funcionalitats--features)
3. [Tecnologia / Tech Stack](#3-tecnologia--tech-stack)
4. [Demo en línia / Live Demo](#4-demo-en-línia--live-demo)
5. [Repositori / Repository](#5-repositori--repository)
6. [Instal·lació / Installation](#6-instal·lació--installation)

---

## 1. Sobre el projecte / About

**CAT:**  
Aquest projecte és una aplicació web “vanilla” escrita en TypeScript i transpilada a JavaScript directament amb `tsc` (sense bundlers ni frameworks com Vite). Tota la configuració —inclosa la lectura de variables d’entorn des d’un fitxer `.env`— es fa amb un script Node.js personalitzat que executa la compilació en mode “watch” i reinicia automàticament l’entorn de desenvolupament.

La primera funcionalitat és un lector d’acudits: mitjançant l’API externa d’acudits obtenim un element aleatori que es mostra en una targeta. L’usuari pot demanar un nou acudit amb un clic i puntuar-lo de l’1 al 3 amb emojis, gràcies a peticions HTTP fetes amb `axios`.

La segona part és un mòdul de meteorologia: obtenim la ubicació GPS del navegador (latitud/longitud), consultem l’API d’OpenStreetMap per fer reverse-geocoding i determinar-ne el municipi, i a partir d’un JSON local amb els codis de municipi de l’AEMET fem una petició a l’API d’AEMET per recuperar les previsions. Cal que l’usuari autoritzi l’accés a la ubicació al navegador per activar aquesta opció.

**EN:**  
This project is a “vanilla” web application written in TypeScript and transpiled to JavaScript directly with `tsc` (no bundlers or frameworks like Vite). All setup tasks—including loading environment variables from a `.env` file—are handled by a custom Node.js script that runs the compiler in watch mode and restarts the dev environment automatically.

The first feature is a joke reader: an external jokes API returns a random joke displayed in a card. Users can request a new joke by clicking a button and rate it from 1 to 3 using emojis, with all HTTP calls made via `axios`.

The second feature is a weather module: the browser provides GPS coordinates (latitude/longitude), which we reverse-geocode through the OpenStreetMap API to determine the municipality. Using a local JSON mapping of AEMET municipality codes, we then fetch that location’s forecast from the AEMET API—so the user must grant location permission in the browser.

---

## 2. Funcionalitats / Features

- ✅ **TypeScript → JavaScript**
- ✅ **Consultes a API REST**

---

## 3. Tecnologia / Tech Stack

- **JavaScript (ES6+)**
- **TypeScript**
- **SASS**
- **CSS**
- **Git & GitHub**
- **Node.js**
- **Axios**
- **API REST**

---

## 4. Demo en línia / Live Demo

**Live:** 👉 https://jokes-albert.netlify.app/

**CAT:**  
Visita la demo en línia per veure l’aplicació en funcionament.

**EN:**  
Check out the live demo to see the application in action.

---

## 5. Repositori / Repository

**Github:** 👉 https://github.com/albertvallsbe/2025-s4-albertvalls

## 6. Instal·lació / Installation

**CAT:**

_Segueix aquests passos per clonar el projecte i fer servir el compilador TypeScript en mode “watch” i executa els estils amb SASS també en mode "watch"._

**EN:**

Follow these steps to clone the project, use the TypeScript compiler in “watch” mode, and run the styles with SASS also in “watch” mode.\_

**Requeriments / Prerequisites**

- Node.js

### 1) Clonar el repositori / Clone the repository

```bash
git clone https://github.com/albertvallsbe/2025-s4-albertvalls.git
```

### 2) Entrar al directori del projecte / Navigate into the project directory

```
cd 2025-s4-albertvalls
```

### 3) Instal·lar dependències / Install dependencies

```
npm i
```

### 4) Executar el compilador TypeScript en watch mode / Run TypeScript compiler in watch mode

```
npm run ts-w
```

or:

```
npx tsc --watch
```

### 5) Executar el compilador Sass en watch mode / Run Sass compiler in watch mode

```
npm run sass-w
```

### 6) Obre el live Server de VSCode / Open the Live Server of VSCode
