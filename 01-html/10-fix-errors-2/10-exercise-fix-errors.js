const results10 = [];

// Helpers (copied/adapted from 09)
async function getSourceHTML10() {
  try {
    const res = await fetch(window.location.href, { cache: 'no-store' });
    return await res.text();
  } catch {
    const fallback = document.querySelector('script#source[type="text/plain"]');
    if (fallback) return fallback.textContent || '';
    return document.documentElement.outerHTML;
  }
}

function getFirstSectionHTML10(html) {
  const m = html.match(/<section\b[\s\S]*?<\/section>/i);
  return m ? m[0] : '';
}
function hasPair10(str, tag) {
  const re = new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`, 'i');
  return re.test(str);
}
function countPairs10(str, tag) {
  const re = new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`, 'gi');
  const matches = str.match(re);
  return matches ? matches.length : 0;
}
function firstPairInner10(str, tag) {
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = str.match(re);
  return m ? m[1] : '';
}
function stripTags10(s) {
  return s.replace(/<[^>]*>/g, '').trim();
}
function firstImgTag10(str) {
  const m = str.match(/<img\b[\s\S]*?>/i);
  return m ? m[0] : '';
}
function imgHasSrcAlt10(imgTag) {
  if (!imgTag) return false;
  const re = /<img\b(?=[^>]*\bsrc\s*=\s*(?:"[^"]+"|'[^']+'))(?=[^>]*\balt\s*=\s*(?:"[^"]+"|'[^']+'))[\s\S]*?>/i;
  return re.test(imgTag);
}

(async () => {
  const page = await getSourceHTML10();
  const section = getFirstSectionHTML10(page);

  if (!section) {
    results10.push('<div class="fail">❌ Hittade ingen &lt;section&gt; i källtexten</div>');
  } else {
    // h1: exakt en + innehåll
    const h1Count = countPairs10(section, 'h1');
    if (h1Count === 1) {
      const inner = firstPairInner10(section, 'h1');
      results10.push(stripTags10(inner).length > 0
        ? '<div class="pass">✔️ h1 finns exakt en gång och har innehåll</div>'
        : '<div class="fail">❌ h1 saknar innehåll</div>');
    } else if (h1Count === 0) {
      results10.push('<div class="fail">❌ h1 saknas i första section</div>');
    } else {
      results10.push('<div class="fail">❌ h1 finns fler än en gång i första section</div>');
    }

    // p: minst två p-par med innehåll
    const pCount = countPairs10(section, 'p');
    if (pCount >= 2) {
      const firstP = firstPairInner10(section, 'p');
      const okFirst = stripTags10(firstP).length > 0;
      // Kontrollera att minst två p har innehåll
      const pAll = section.match(/<p\b[\s\S]*?<\/p>/gi) || [];
      const nonEmpty = pAll.filter(p => stripTags10(p).length > 0).length;
      results10.push(okFirst && nonEmpty >= 2
        ? '<div class="pass">✔️ minst två p har start-/sluttagg och innehåll</div>'
        : '<div class="fail">❌ minst två p med start-/sluttagg och innehåll krävs</div>');
    } else {
      results10.push('<div class="fail">❌ minst två p-par krävs i första section</div>');
    }

    // img: första img i första section med src+alt
    const imgTag = firstImgTag10(section);
    results10.push(imgHasSrcAlt10(imgTag)
      ? '<div class="pass">✔️ första img i första section har giltig src och alt</div>'
      : '<div class="fail">❌ första img i första section saknar giltig src eller alt</div>');

    // button: minst en med innehåll
    if (hasPair10(section, 'button')) {
      const btnInner = firstPairInner10(section, 'button');
      results10.push(stripTags10(btnInner).length > 0
        ? '<div class="pass">✔️ första button i första section har start-/sluttagg och innehåll</div>'
        : '<div class="fail">❌ första button saknar innehåll</div>');
    } else {
      results10.push('<div class="fail">❌ button saknas eller är inte korrekt stängd i första section</div>');
    }
  }

  const firstRenderedSection = document.querySelector('section');
  firstRenderedSection && firstRenderedSection.insertAdjacentHTML('beforeend', results10.join(''));
})();
