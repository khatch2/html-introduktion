const results13 = [];

// Use shared TU helpers

(async () => {
  const page = await TU.getSourceHTML();
  const section = TU.getFirstSectionHTML(page);

  if (!section) {
    results13.push('<div class="fail">❌ Hittade ingen &lt;section&gt; i källtexten</div>');
  } else {
    // h1
    if (TU.hasPair(section, 'h1')) {
      const inner = TU.firstPairInner(section, 'h1');
      results13.push(TU.stripTags(inner).length > 0 ? '<div class="pass">✔️ h1 har starttag, innehåll och sluttag</div>' : '<div class="fail">❌ h1 saknar innehåll</div>');
    } else {
      results13.push('<div class="fail">❌ h1 saknas eller är inte korrekt stängd</div>');
    }

    // p (minst en)
    if (TU.hasPair(section, 'p')) {
      const inner = TU.firstPairInner(section, 'p');
      results13.push(TU.stripTags(inner).length > 0 ? '<div class="pass">✔️ p har starttag, innehåll och sluttag</div>' : '<div class="fail">❌ p saknar innehåll</div>');
    } else {
      results13.push('<div class="fail">❌ p saknas eller är inte korrekt stängd</div>');
    }

    // h2 (minst en)
    if (TU.hasPair(section, 'h2')) {
      const inner = TU.firstPairInner(section, 'h2');
      results13.push(TU.stripTags(inner).length > 0 ? '<div class="pass">✔️ h2 har starttag, innehåll och sluttag</div>' : '<div class="fail">❌ h2 saknar innehåll</div>');
    } else {
      results13.push('<div class="fail">❌ h2 saknas eller är inte korrekt stängd</div>');
    }

    // ol + li (minst 1 li med innehåll)
    if (TU.hasPair(section, 'ol')) {
      const liInners = TU.getAllLiPairs(section);
      const nonEmptyLi = liInners.filter(x => TU.stripTags(x).length > 0).length;
      results13.push(nonEmptyLi >= 1 ? '<div class="pass">✔️ ol/li har korrekta taggar och innehåll</div>' : '<div class="fail">❌ li saknar innehåll</div>');
    } else {
      results13.push('<div class="fail">❌ ol saknas eller är inte korrekt stängd</div>');
    }

    // footer
    if (TU.hasPair(section, 'footer')) {
      const inner = TU.firstPairInner(section, 'footer');
      results13.push(TU.stripTags(inner).length > 0 ? '<div class="pass">✔️ footer har starttag, innehåll och sluttag</div>' : '<div class="fail">❌ footer saknar innehåll</div>');
    } else {
      results13.push('<div class="fail">❌ footer saknas eller är inte korrekt stängd</div>');
    }
  }

  const firstRenderedSection = document.querySelector('section');
  firstRenderedSection && firstRenderedSection.insertAdjacentHTML('beforeend', results13.join(''));
})();
