const results = [];

/* ============================
  Kör tester i FÖRSTA <section>
============================ */
(async () => {
  const page = await TU.getSourceHTML();
  const section = TU.getFirstSectionHTML(page);

  if (!section) {
    results.push('<div class="fail">❌ Hittade ingen &lt;section&gt; i källtexten</div>');
  } else {
    // h1: exakt en + innehåll
    const h1Count = TU.countPairs(section, "h1");
    if (h1Count === 1) {
      const h1Inner = TU.firstPairInner(section, "h1");
      if (TU.stripTags(h1Inner).length > 0) {
        results.push('<div class="pass">✔️ h1 finns exakt en gång och har innehåll</div>');
      } else {
        results.push('<div class="fail">❌ h1 saknar innehåll</div>');
      }
    } else if (h1Count === 0) {
      results.push('<div class="fail">❌ h1 saknas i första section</div>');
    } else {
      results.push('<div class="fail">❌ h1 finns fler än en gång i första section</div>');
    }

    // p: minst en, första med innehåll
    if (TU.hasPair(section, "p")) {
      const pInner = TU.firstPairInner(section, "p");
      if (TU.stripTags(pInner).length > 0) {
        results.push('<div class="pass">✔️ p finns och har innehåll</div>');
      } else {
        results.push('<div class="fail">❌ p saknar innehåll</div>');
      }
    } else {
      results.push('<div class="fail">❌ p saknas i första section</div>');
    }

    // ul + li: minst en ul, minst tre li med innehåll
    const ulOk = TU.hasPair(section, "ul");
    const liInners = TU.getAllLiPairs(section);
    const nonEmptyLiCount = liInners.filter(x => TU.stripTags(x).length > 0).length;

    if (!ulOk) {
      results.push('<div class="fail">❌ ul saknas eller är inte korrekt stängd i första section</div>');
    } else if (nonEmptyLiCount >= 3) {
      results.push('<div class="pass">✔️ ul finns och minst tre li har korrekta sluttaggar och innehåll</div>');
    } else {
      results.push('<div class="fail">❌ Minst tre li med korrekta sluttaggar och innehåll krävs</div>');
    }

    // img: endast FÖRSTA i FÖRSTA section
    const imgTag = TU.firstImgTag(section);
    if (TU.imgHasSrcAlt(imgTag)) {
      results.push('<div class="pass">✔️ första img i första section har giltig src och alt</div>');
    } else {
      results.push('<div class="fail">❌ första img i första section saknar giltig src eller alt</div>');
    }

    // button: första med innehåll
    if (TU.hasPair(section, "button")) {
      const btnInner = TU.firstPairInner(section, "button");
      if (TU.stripTags(btnInner).length > 0) {
        results.push('<div class="pass">✔️ första button i första section har start-/sluttagg och innehåll</div>');
      } else {
        results.push('<div class="fail">❌ första button saknar innehåll</div>');
      }
    } else {
      results.push('<div class="fail">❌ button saknas eller är inte korrekt stängd i första section</div>');
    }
  }

  // Visa resultaten i den renderade sidans första <section>
  const firstRenderedSection = document.querySelector('section');
  firstRenderedSection
    ? firstRenderedSection.insertAdjacentHTML('beforeend', results.join(''))
    : console.warn('Hittade ingen renderad <section> att skriva resultat i.');
})();
