---
marp: true
theme: default
paginate: true
size: 16:9
title: Appendix – SSDLC i historiskt perspektiv
description: Appendix – SSDLC i historiskt perspektiv
lang: sv
# backgroundImage: linear-gradient(120deg, #0B1020 0%, #131C3A 60%, #0B1020 100%)
# backgroundColor: #0B1020
style: |
  :root {
    --accent: #F9C66E;      /* "cantaloupe" */
    --accent-2: #ADD8E6;    /* "baby blue" */
    --accent-3: #E68A6E;    
    --ink: #222;         /* text */
  --inline-code-bg: #E2E8F0;
  --inline-bg: #E2E8F0;
  --inline-text: #1f2937;
  --code-border: #CBD5E1;
  }
  section {
    font-size: 28px;
    line-height: 1.35;
    color: var(--ink);
  }
  h1, h2, h3 {
    letter-spacing: .2px;
  }
  .lead h1 { font-size: 72px; margin-bottom: .25em; }
  .lead p { font-size: 34px; opacity: .9; }
  .accent { color: #662246; }
  .pill {
    display:inline-block; padding:.2em .6em; border-radius:999px;
    background: var(--accent); font-weight:700;
  }
  .two-col {
    display:grid; gap: 24px; grid-template-columns: 1fr 1fr;
    align-items:start;
  }
  .note {
    padding: 14px 16px; border-radius: 12px; background: #f7f7fb; border:1px solid #e6e6f0;
  }
  .callout {
    padding: 18px; border-left: 8px solid var(--accent);
    background: #fff8e9; border-radius: 10px;
  }
  code, pre code { 
  background: var(--inline-bg);
  color: var(--inline-text);
  padding: .12em .4em;
  border-radius: 6px;
  }
  footer {
    margin: 0; width: 100%;
    background-color: #662246; color: white;
    font-size: 16px; padding: .75rem 1rem;
  }
  section.no-footer footer {
  display: none !important;
  }
  /* utility: remove bullets for specific lists */
  .no-bullets, .no-bullets ul {
    list-style: none;
  }
  .header-float {
  position: absolute;
  top: 2rem;
  left: 2rem;
  }
  section::after {
  color: whitesmoke;
  padding: .8rem;
  font-size: 20px;
  }
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .img-row {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2em 0;
    width: 100%;
  }
  .img-row img {
  max-width: 80vw;
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  background: #fff;
  }

footer: "SSDLC i historiskt perspektiv"
---

<!-- _class: lead -->

# SSDLC i historiskt perspektiv

Från eftertanke till grundpelare

<p>Utbildare: Johan Hellberg</p>

---

## Säkerhetsutveckling genom tiderna

**Tidslinje – från hålkort till SSDLC**

---

# SSDLC – Tidslinje

- **1950–60** – Hålkort, batch-jobb, isolerade system
- **1970–80** – PC & nätverk, interaktiv utveckling
- **1990** – Webben, XSS/SQLi, reaktiv patchning
- **2000** – SDL (Microsoft), OWASP
- **2010** – Agilt, DevOps → DevSecOps, “shift left”
- **Idag** – SSDLC standard, SAMM/ISO, AI & supply chain

---

### 1950–1960-tal – Hålkortseran

- Program skrivs på hålkort, körs i batch på stordatorer
- Debugging svårt → krav på noggrann planering
- Tillgång exklusivt (universitet, storföretag)
- Säkerhet inget fokus – systemen isolerade

---

### 1970–1980-tal – Persondatorer & nätverk

- PDP och IBM PC → fler användare
- Interaktiv programmering men säkerhet sekundär
- Databaser växer → första risker för dataexponering

---

### 1990-tal – Webben exploderar

- Internet blir globalt
- XSS & SQL injection vanliga attacker
- Säkerhet hanteras oftast i efterhand via patchar

---

### 2000-tal – SDL & OWASP

- Microsoft introducerar SDL
- OWASP (2001) ger community-standarder
- Säkerhet ses för första gången som en del av utvecklingsprocessen

---

### 2010-tal – Agil, DevOps & DevSecOps

- Kortare release-cykler → säkerhet måste in tidigt (“shift left”)
- CI/CD med automatiserade säkerhetstester (SAST, DAST, dependency scanning)
- Säkerhet blir hela teamets ansvar

---

### Idag – SSDLC som norm

- Säkerhet integrerat i hela livscykeln: krav → drift
- Standarder: OWASP SAMM, ISO/IEC 27034
- Nya utmaningar: AI-genererad kod, moln, supply chain-attacker

---

## Förr vs Nu

| Förr (pre-SSDLC)           | Idag (SSDLC)                           |
| -------------------------- | -------------------------------------- |
| Säkerhet som eftertanke    | Säkerhet i alla steg                   |
| Test sent i processen      | Automatiserade tester i CI/CD          |
| “IT:s problem”             | Teamansvar, DevSecOps-kultur           |
| Ad hoc-fixar               | Standardiserade processer (OWASP, ISO) |
| Fokus: funktion > säkerhet | Balanserat fokus                       |

---

## Historisk bakgrund – innan SSDLC

### Hålkort och tidig programmering

```
      PROGRAM ADD
      INTEGER A, B, SUM
      A = 5
      B = 3
      SUM = A + B
      PRINT *, SUM
      END
```

---

## Koppling till SSDLC

- **Förr:** disciplin behövdes för att spara tid och resurser
- **Nu:** disciplin genom SSDLC krävs för att skydda användare och data
- **Skillnad:** från tekniska begränsningar → till säkerhetskrav i en global och uppkopplad värld
