# SSDLC i historiskt perspektiv

Från eftertanke till grundpelare

Utbildare: Johan Hellberg

## Säkerhetsutveckling genom tiderna

**Tidslinje – från hålkort till SSDLC**

## SSDLC – Tidslinje

- **1950–60** – Hålkort, batch-jobb, isolerade system
- **1970–80** – PC & nätverk, interaktiv utveckling
- **1990** – Webben, XSS/SQLi, reaktiv patchning
- **2000** – SDL (Microsoft), OWASP
- **2010** – Agilt, DevOps → DevSecOps, “shift left”
- **Idag** – SSDLC standard, SAMM/ISO, AI & supply chain

### 1950–1960-tal – Hålkortseran

- Program skrivs på hålkort, körs i batch på stordatorer
- Debugging svårt → krav på noggrann planering
- Tillgång exklusivt (universitet, storföretag)
- Säkerhet inget fokus – systemen isolerade

### 1970–1980-tal – Persondatorer & nätverk

- PDP och IBM PC → fler användare
- Interaktiv programmering men säkerhet sekundär
- Databaser växer → första risker för dataexponering

### 1990-tal – Webben exploderar

- Internet blir globalt
- XSS & SQL injection vanliga attacker
- Säkerhet hanteras oftast i efterhand via patchar

### 2000-tal – SDL & OWASP

- Microsoft introducerar SDL
- OWASP (2001) ger community-standarder
- Säkerhet ses för första gången som en del av utvecklingsprocessen

### 2010-tal – Agil, DevOps & DevSecOps

- Kortare release-cykler → säkerhet måste in tidigt (“shift left”)
- CI/CD med automatiserade säkerhetstester (SAST, DAST, dependency scanning)
- Säkerhet blir hela teamets ansvar

### Idag – SSDLC som norm

- Säkerhet integrerat i hela livscykeln: krav → drift
- Standarder: OWASP SAMM, ISO/IEC 27034
- Nya utmaningar: AI-genererad kod, moln, supply chain-attacker

## Förr vs Nu

| Förr (pre-SSDLC)           | Idag (SSDLC)                           |
| -------------------------- | -------------------------------------- |
| Säkerhet som eftertanke    | Säkerhet i alla steg                   |
| Test sent i processen      | Automatiserade tester i CI/CD          |
| “IT:s problem”             | Teamansvar, DevSecOps-kultur           |
| Ad hoc-fixar               | Standardiserade processer (OWASP, ISO) |
| Fokus: funktion > säkerhet | Balanserat fokus                       |

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

## Koppling till SSDLC

- **Förr:** disciplin behövdes för att spara tid och resurser
- **Nu:** disciplin genom SSDLC krävs för att skydda användare och data
- **Skillnad:** från tekniska begränsningar → till säkerhetskrav i en global och uppkopplad
