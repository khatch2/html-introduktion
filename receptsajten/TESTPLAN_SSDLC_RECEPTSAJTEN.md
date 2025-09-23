# Testplan & SSDLC – Slutprojekt Receptsajten

Detta dokument beskriver hur vi säkerställer kvalitet och säkerhet i frontend-projektet **Receptsajten** (React + API från backend-teamet).

## Definition of Done (SSDLC-minimum)

- [ ] Hot-analys + tillitgränser dokumenterade
- [ ] Pull request blockerad tills:
  - [ ] Code review av en annan utvecklare
  - [ ] Tester för kodsäkerhet har körts
- [ ] CI kör:
  - [ ] lint
  - [ ] `npm audit` (inga high/critical blocker)
  - [ ] semgrep körs och skapar analys rapport
  - [ ] Tester enligt krav
- [ ] Localhost skannad med ZAP baseline (inga high)
- [ ] Åtgärda eller förstå medium & low varningar
- [ ] Incidentplan finns och kontaktväg testad

## Testplan för Receptsajten

### Unit tests (ViTest)

- [ ] `formatTime(minutes)` formatterar korrekt
- [ ] `getIngredientCount(recipe)` räknar ingredienser
- [ ] `filterRecipes(recipes, query)` filtrerar case-insensitive
- [ ] `countByCategory(recipes)` returnerar korrekt `{kategori: antal}`
- [ ] `<RecipeCard />` renderar namn, bild (alt), rating, ingrediensantal, tid

### Integration tests (React Testing Library)

- [ ] Startsida laddar och visar receptkort + kategorilista
- [ ] Sökfält filtrerar receptlistan och rensning visar alla igen
- [ ] Klick på kategori navigerar till rätt sida
- [ ] Tom-/fel-state (inga recept / API-fel) visar rätt meddelande

### E2E tests (Playwright)

- [ ] Happy path: startsidan visar receptkort och kategorier
- [ ] Sökflöde: sökning minskar lista, rensa visar alla igen, query i URL (om finns) funkar på reload
- [ ] API-fel på startsidan (`GET /recipes` eller `/categories` svarar 500/timeout) → användaren ser felmeddelande och “Försök igen”-knapp fungerar (retry lyckas)
