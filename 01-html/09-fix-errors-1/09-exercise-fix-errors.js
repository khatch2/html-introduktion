const results = [];

/* ============================
   1) Hämta käll-HTML
============================ */
async function getSourceHTML() {
  try {
    const res = await fetch(window.location.href, { cache: "no-store" });
    return await res.text();
  } catch (e) {
    // Fallback: läs från <script type="text/plain" id="source"> om den finns
    const fallback = document.querySelector('script#source[type="text/plain"]');
    if (fallback) return fallback.textContent || "";
    // Sista utväg (OBS: kan vara reparerad DOM, men bättre än inget)
    return document.documentElement.outerHTML;
  }
}

/* ============================
   2) Hjälpfunktioner (regex)
============================ */
function getFirstSectionHTML(html) {
  const m = html.match(/<section\b[\s\S]*?<\/section>/i);
  return m ? m[0] : "";
}

function hasPair(str, tag) {
  const re = new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`, "i");
  return re.test(str);
}

function countPairs(str, tag) {
  const re = new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`, "gi");
  const matches = str.match(re);
  return matches ? matches.length : 0;
}

function firstPairInner(str, tag) {
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = str.match(re);
  return m ? m[1] : "";
}

function stripTags(s) {
  return s.replace(/<[^>]*>/g, "").trim();
}

// Endast första <img> i strängen
function firstImgTag(str) {
  const m = str.match(/<img\b[\s\S]*?>/i);
  return m ? m[0] : "";
}

// Kräver att en och samma <img> har src och alt (icke-tomma), oavsett radbrytningar/ordning/citat
function imgHasSrcAlt(imgTag) {
  if (!imgTag) return false;
  const re = /<img\b(?=[^>]*\bsrc\s*=\s*(?:"[^"]+"|'[^']+'))(?=[^>]*\balt\s*=\s*(?:"[^"]+"|'[^']+'))[\s\S]*?>/i;
  return re.test(imgTag);
}

// Hämta alla li-par (icke-nestat exakt, men robust för denna övning)
function getAllLiPairs(str) {
  const re = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
  const out = [];
  let m;
  while ((m = re.exec(str))) out.push(m[1]);
  return out;
}

/* ============================
   3) Kör tester i FÖRSTA <section>
============================ */
(async () => {
  const page = await getSourceHTML();
  const section = getFirstSectionHTML(page);

  if (!section) {
    results.push('<div class="fail">❌ Hittade ingen &lt;section&gt; i källtexten</div>');
  } else {
    // h1: exakt en + innehåll
    const h1Count = countPairs(section, "h1");
    if (h1Count === 1) {
      const h1Inner = firstPairInner(section, "h1");
      if (stripTags(h1Inner).length > 0) {
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
    if (hasPair(section, "p")) {
      const pInner = firstPairInner(section, "p");
      if (stripTags(pInner).length > 0) {
        results.push('<div class="pass">✔️ p finns och har innehåll</div>');
      } else {
        results.push('<div class="fail">❌ p saknar innehåll</div>');
      }
    } else {
      results.push('<div class="fail">❌ p saknas i första section</div>');
    }

    // ul + li: minst en ul, minst tre li med innehåll
    const ulOk = hasPair(section, "ul");
    const liInners = getAllLiPairs(section);
    const nonEmptyLiCount = liInners.filter(x => stripTags(x).length > 0).length;

    if (!ulOk) {
      results.push('<div class="fail">❌ ul saknas eller är inte korrekt stängd i första section</div>');
    } else if (nonEmptyLiCount >= 3) {
      results.push('<div class="pass">✔️ ul finns och minst tre li har korrekta sluttaggar och innehåll</div>');
    } else {
      results.push('<div class="fail">❌ Minst tre li med korrekta sluttaggar och innehåll krävs</div>');
    }

    // img: endast FÖRSTA i FÖRSTA section
    const imgTag = firstImgTag(section);
    if (imgHasSrcAlt(imgTag)) {
      results.push('<div class="pass">✔️ första img i första section har giltig src och alt</div>');
    } else {
      results.push('<div class="fail">❌ första img i första section saknar giltig src eller alt</div>');
    }

    // button: första med innehåll
    if (hasPair(section, "button")) {
      const btnInner = firstPairInner(section, "button");
      if (stripTags(btnInner).length > 0) {
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
