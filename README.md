# Visualli.ai Frontend Challenge

---

## 🧭 Overview

This project is a **multi-layered interactive visualization** inspired by **Google Maps’ smooth zooming behavior**.  
Users can explore hierarchical data layers (e.g., _Water Cycle → Cloud Formation → Raindrop Process_) through intuitive zoom-in / zoom-out interactions with animated transitions.

The app is fully **responsive** and **interactive**, offering a rich visual experience for desktop and mobile users.

---

## 🧩 Design

### 🎨 UI / UX Approach

- Each **layer** is displayed on a central **canvas** with circular nodes arranged radially around a core concept.
- Clicking (or scrolling up) on a node **zooms into** the next layer.
- Right-clicking (or scrolling down) **zooms out** to the parent layer.
- A vertical sidebar shows **layer history as bubbles** — clicking a bubble jumps to that layer.
- **Background color transitions** smoothly based on the active node’s color.

### 💫 Animation Details

- Smooth **fade-in/out** transitions between layers (`framer-motion`).
- **Node hover animations**: subtle scale-up and glow.
- **Zoom-in/out transitions**: physics-based spring animation (`react-spring`).
- **Emoji animation**: small bounce on zoom for visual appeal.

### 🧱 Architecture

- `App.tsx` → Handles state, layer navigation, and background
- `Canvas.tsx` → Konva canvas, gesture handling, animations
- `Node.tsx` → Node rendering (emoji + label + hover effects)
- `UIControls.tsx` → Home button + layer navigation bubbles
- `data/layers.json` → Layer hierarchy and node definitions
- `data/layerGradients.ts` → Background gradients per layer

---

## ⚙️ Tech Choices

| Category       | Choice                           | Justification                                                    |
| -------------- | -------------------------------- | ---------------------------------------------------------------- |
| Framework      | **React + TypeScript**           | Component-based architecture and type safety for maintainability |
| Canvas Library | **React-Konva**                  | Efficient 2D rendering for interactive nodes                     |
| Animation      | **Framer Motion + React Spring** | Smooth, physics-based animations                                 |
| Styling        | **TailwindCSS**                  | Rapid responsive UI development                                  |
| Gestures       | **@use-gesture/react**           | Pinch and drag support on desktop and mobile                     |
| Build Tool     | **Vite**                         | Fast development and optimized production builds                 |
| Deployment     | **Vercel**                       | Zero-config frontend deployment                                  |

---

## ✅ Tests

### 🧩 Run Locally

```bash
# Clone the repository
git clone https://github.com/<your-username>/visualli-challenge.git
cd visualli-challenge

# Install dependencies
npm install

# Start development server
npm run dev


Build & Preview
# Type-check
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview



Manual Verification

1. Hover on nodes → Node glows slightly

2. Click a node → Smooth zoom into child layer

3. Right-click → Zooms out to previous layer

4. Click Home button → Returns to top-level layer

5. Resize browser → Layout adapts dynamically

6. Pinch/scroll on mobile → Zoom gestures work correctly


Working Code

The project is fully responsive and works on modern browsers (Chrome, Safari, Edge, Firefox) and mobile devices.
Run locally with npm run dev or deploy to Vercel for production.


Author

Karina Saini
Frontend Developer — passionate about crafting interactive and intuitive user experiences.

📧 Email: hello@karinasaini.me

GitHub: https://github.com/karusaini/visualli-challenge
```
