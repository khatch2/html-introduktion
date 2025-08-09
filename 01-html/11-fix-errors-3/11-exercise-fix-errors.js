const results11 = [];

// Use shared TU helpers

(async () => {
  const page = await TU.getSourceHTML();
  const section = TU.getFirstSectionHTML(page);

  if (!section) {
    results11.push('<div class="fail">❌ Hittade ingen &lt;section&gt; i källtexten</div>');
  } else {
    // h1: exakt en + innehåll
  const h1Count = TU.countPairs(section, 'h1');
    if (h1Count === 1) {
  const inner = TU.firstPairInner(section, 'h1');
  results11.push(TU.stripTags(inner).length > 0 ? '<div class="pass">✔️ h1 finns exakt en gång och har innehåll</div>' : '<div class="fail">❌ h1 saknar innehåll</div>');
    } else if (h1Count === 0) {
      results11.push('<div class="fail">❌ h1 saknas i första section</div>');
    } else {
      results11.push('<div class="fail">❌ h1 finns fler än en gång i första section</div>');
    }

    // h2: minst en + innehåll
    if (TU.hasPair(section, 'h2')) {
      const inner = TU.firstPairInner(section, 'h2');
      results11.push(TU.stripTags(inner).length > 0 ? '<div class="pass">✔️ h2 finns och har innehåll</div>' : '<div class="fail">❌ h2 saknar innehåll</div>');
    } else {
      results11.push('<div class="fail">❌ h2 saknas i första section</div>');
    }

    // p: minst en + innehåll
    if (TU.hasPair(section, 'p')) {
      const inner = TU.firstPairInner(section, 'p');
      results11.push(TU.stripTags(inner).length > 0 ? '<div class="pass">✔️ p finns och har innehåll</div>' : '<div class="fail">❌ p saknar innehåll</div>');
    } else {
      results11.push('<div class="fail">❌ p saknas i första section</div>');
    }

    // ul + li: minst tre li med innehåll
  const ulOk = TU.hasPair(section, 'ul');
  const liInners = TU.getAllLiPairs(section);
  const nonEmptyLiCount = liInners.filter(x => TU.stripTags(x).length > 0).length;
    if (!ulOk) {
      results11.push('<div class="fail">❌ ul saknas eller är inte korrekt stängd i första section</div>');
    } else if (nonEmptyLiCount >= 3) {
      results11.push('<div class="pass">✔️ ul finns och minst tre li har korrekta sluttaggar och innehåll</div>');
    } else {
      results11.push('<div class="fail">❌ Minst tre li med korrekta sluttaggar och innehåll krävs</div>');
    }

    // img: första img i första section med src+alt
  const imgTag = TU.firstImgTag(section);
  results11.push(TU.imgHasSrcAlt(imgTag)
      ? '<div class="pass">✔️ första img i första section har giltig src och alt</div>'
      : '<div class="fail">❌ första img i första section saknar giltig src eller alt</div>');
  }

  const firstRenderedSection = document.querySelector('section');
  firstRenderedSection && firstRenderedSection.insertAdjacentHTML('beforeend', results11.join(''));
})();
