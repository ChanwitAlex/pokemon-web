# Pokémon Web

A web application for searching and viewing Pokémon information, built with **Next.js** and **Material-UI (MUI)**, fetching real-time data from the [PokéAPI](https://pokeapi.co/).

This project was developed to learn and apply concepts of Pagination, Dynamic Routing, and Data Fetching from PokéAPI, along with building a responsive layout using Material-UI — with a focus on creating a great user experience for browsing Pokémon data.

---

## Features

- 🔍 **Pokédex Home Page** — Displays a list of Pokémon with pagination support
- 📄 **Pokémon Detail Page (Dynamic Routing)** — Click into any Pokémon to view in-depth information, including:
  - Official artwork and ID number
  - Types
  - Base stats
  - Evolution chain, with clickable navigation to other stages in the chain
  - A button to play the Pokémon's cry sound
- ℹ️ **About Page** — Developer information and contact channels
- 📱 **Responsive Design** — Works seamlessly on both mobile and desktop

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript / React |
| UI Library | [Material-UI (MUI)](https://mui.com/) |
| Data Source | [PokéAPI](https://pokeapi.co/) |
| Icons | MUI Icons |

---
# Screenshots

## Home Page

<img width="1365" height="981" alt="image" src="https://github.com/user-attachments/assets/8fe46ab7-0ac0-44ff-8ced-ea12a859229f" />

---
## Pokémon Detail
<img width="996" height="693" alt="image" src="https://github.com/user-attachments/assets/df8952bb-b5ca-4862-a2b5-8556b48e5e42" />

---
## About This Project
<img width="522" height="859" alt="image" src="https://github.com/user-attachments/assets/32b76c51-a2b2-40b4-89c3-1f29faac200a" />

---





## 📂 Project Structure

```
pokemon-web/
├── app/
│   ├── layout.tsx                   # Root layout (fonts, MUI theme provider, metadata)
│   ├── page.tsx                     # Home page — Pokédex list with pagination
│   ├── globals.css                  # Global styles
│   │
│   ├── pokemon/
│   │   └── [pokemonname]/
│   │       └── page.tsx             # Pokémon detail page (Dynamic Route)
│   │                                 #   - Fetches /pokemon/{name} from PokéAPI
│   │                                 #   - Fetches species + evolution chain
│   │                                 #   - Shows artwork, types, base stats, cry sound
│   │
│   └── about/
│       └── page.tsx                 # About page — developer info & contact links
│
├── public/                          # Static assets (icons, images, etc.)
│
├── node_modules/                    # Installed dependencies
│
├── package.json                     # Project metadata & dependencies
├── package-lock.json
├── tsconfig.json                    # TypeScript configuration
├── next.config.ts                   # Next.js configuration
├── next-env.d.ts
└── README.md                        # Project documentation
```

---

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/ChanwitAlex/pokemon-web.git
   cd pokemon-web
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open your browser at [http://localhost:3000](http://localhost:3000)

---

# 🌐 API Reference

Official API

https://pokeapi.co/

Example Endpoint

```
https://pokeapi.co/api/v2/pokemon
```

## 👨‍💻 Developer Information

| Detail | Information |
|---|---|
| **Full Name** | ชาญวิทย์ อุ่นสกุล |
| **Student ID** | 673450187-3 |
| **Field of Study** | Computer and Information Science |
| **Course** | Front-end Web Programming |
| **Faculty / University** | Faculty of Interdisciplinary Studies, Khon Kaen University, Nong Khai Campus |

### Contact Channels

- 📧 Email: [Gmail](https://mail.google.com)
- 📘 Facebook: [chanwit.unsakul.3](https://www.facebook.com/chanwit.unsakul.3?locale=th_TH)
- 📸 Instagram: [chanwit_alex](https://www.instagram.com/chanwit_alex/)
- 💻 GitHub Repository: [pokemon-web](https://github.com/ChanwitAlex/pokemon-web)

---

## 📜 License

This project was created solely for educational purposes as part of the Front-end Web Programming course.
