# Who Wants to Be a Bible Giant — AFC Bible Giant

### *An Ultra-Luxury 2030 Live Tournament Broadcast Platform*
**The Apostolic Faith Church (AFM WECA) — Ekiti Area & Youth Development Directorate (YDD)**

> *"Jesus, The Light of the World"* (John 8:12)  
> *"Africa for Christ"* (Mark 16:15)  
> *"Raising & retaining an Army of Outstanding Youth going to Heaven & persuading others to come along."* — YDD Canonical Slogan

---

## 🌟 Overview & Architectural Vision

**AFC Bible Giant** is a state-of-the-art live tournament broadcast platform engineered for The Apostolic Faith Church's Youth Development Directorate. Built to 2030 broadcast aesthetics, the platform unifies two competition tiers:

1. **Engine Mode A — Ekiti Area Inter-Zonal Bible Challenge**:
   - Iconic **Pick-a-Number Board** with active → used → removed transitions.
   - Dynamic board sizing (automatic grid fitting for published questions).
   - 5 Rounds: Objective, German Gap-Fill (word bank), and Theory / Open answers.
   - Rapid-fire **60-Second Ultimate Challenge** with live keyboard marks and subtotal commit.
   - **Turn-Order Spinner** ("Who Plays First?") with authentic gold bezel physics.
   - **Grand Podium Ceremony** with sequential reveals (last-to-first) and fanfare.

2. **Engine Mode B — WECA Digital Live Quiz (APOQUIZ-Style)**:
   - **Team Device Client (`/play`)**: Competing units join via Session Code, field 2 named players, and submit speed-weighted answers on podium tablets/laptops.
   - **Audience Companion App (`/join`)**: Congregational members scan QR or enter Session Code to answer trivia simultaneously and participate in the "Who's Winning?" team prediction ranking.
   - **Simultaneous Round Format**: 3-stage animated countdown timer bar (blue → amber → crimson) with live 0/N submission dots.
   - **Correct-Answer Reveal Grid**: Per-team response cards showing their choice, check/cross, and speed points earned (+850 pts).
   - **Speed-Weighted Scoring Formula**: Scales from 1,000 pts down to 300 pts floor based on response latency.

3. **Sacred Symphonic Classical Sound Engine**:
   - Zero-dependency Web Audio API synthesizer generating authentic orchestral chimes, suspense drones, metronome ticks, fanfare, and applause.

4. **Heritage Pavilion & Archive**:
   - Interactive museum featuring Church Pioneers (Rev. Florence Crawford, Rev. Timothy G. Oshokoya "Brother T", Portland Headquarters Orchestra).
   - Sacred Church Emblems and The Three Definite Works of Grace (Salvation, Entire Sanctification, Baptism of the Holy Ghost with fire).
   - Authentic high-resolution photography and transparent church emblems.

---

## 🚀 Application Surfaces & Routes

| Route | Surface | Description |
|---|---|---|
| `/` | **Public Home Page** | Celestial hero, Faith in Frames gallery, Heritage Pavilion modal, and tournament portals. |
| `/stage` | **Stage Broadcast Screen** | Dual-screen sanctuary projector display with dynamic scoreboard, number board, and digital live view. |
| `/play` | **Team Device Client** | Podia laptop/tablet client for Zone representatives with speed-weighted answer submission. |
| `/join` | **Audience Companion App** | Mobile QR-join client for congregational trivia participation and team prediction ranking. |
| `/admin/login` | **Quizmaster Login** | Master password authentication with lockout protection and session management. |
| `/admin` | **Command Portal Dashboard** | Overview hub, Engine Mode switch, Session Code generator, and module launchpad. |
| `/admin/live` | **Live Stage Controller** | Primary live console: tile picking, judgment, UC keyboard console, digital view switcher, soundboard. |
| `/admin/questions` | **Question Bank Manager** | CRUD for Objective, German Gap-Fill, Theory questions, and `.docx` bulk importer. |
| `/admin/zones` | **Zones & Rounds Setup** | Competing units roster (2–8 zones), score adjustments with mandatory audit reasons, topic labels. |
| `/admin/podium` | **Grand Podium & Ceremony** | Automated rank reveal sequence and Certificate of Scriptural Mastery generation. |
| `/admin/security` | **Security & Audit Logs** | Master password rotation and real-time audit trail. |

---

## 🛠 Tech Stack

- **Framework**: React 19 + Vite 6
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS + Custom Celestial Design System (Gold, Navy, Ivory tokens)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Audio**: Web Audio API Sound Synthesis Engine
- **Icons**: Lucide React
- **Deployment**: Vercel SPA (`vercel.json` rewrite routing)

---

## 📦 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/Phemmy09/afm-Bible-Giant.git

# Navigate to project folder
cd "AFC Bible Giant 3"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🔒 Master Admin Credentials

- **Default Password**: `afc2025`
- Configurable via `/admin/security` once authenticated.

---

## 🏛 Headquarters & Ministry Credits

- **International Headquarters**: Portland, Oregon, USA
- **WECA Headquarters**: Faith City, Igbesa & Anthony Village, Lagos, Nigeria
- **Ekiti Area Headquarters**: 74 Ajilosun St, Ado-Ekiti, Ekiti State, Nigeria
- **Commissioning Directorate**: Youth Development Directorate (YDD)

*Soli Deo Gloria.*
