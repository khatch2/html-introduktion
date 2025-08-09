// Test Utilities Namespace
// Exposes helper functions under TU to avoid global name collisions.
(function (global) {
  const TU = {};

  // Fetch raw page HTML (avoid DOM auto-fixes)
  TU.getSourceHTML = async function getSourceHTML() {
    try {
      const res = await fetch(window.location.href, { cache: 'no-store' });
      return await res.text();
    } catch {
      const fallback = document.querySelector('script#source[type="text/plain"]');
      if (fallback) return fallback.textContent || '';
      return document.documentElement.outerHTML;
    }
  };

  // Extract first <section>...</section>
  TU.getFirstSectionHTML = function getFirstSectionHTML(html) {
    const m = html.match(/<section\b[\s\S]*?<\/section>/i);
    return m ? m[0] : '';
  };

  // Check for a start/end tag pair
  TU.hasPair = function hasPair(str, tag) {
    const re = new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`, 'i');
    return re.test(str);
  };

  // Count tag pairs
  TU.countPairs = function countPairs(str, tag) {
    const re = new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`, 'gi');
    const matches = str.match(re);
    return matches ? matches.length : 0;
  };

  // Get inner HTML of first tag pair
  TU.firstPairInner = function firstPairInner(str, tag) {
    const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
    const m = str.match(re);
    return m ? m[1] : '';
  };

  // Strip all tags and trim
  TU.stripTags = function stripTags(s) {
    return s.replace(/<[^>]*>/g, '').trim();
  };

  // First <img ...>
  TU.firstImgTag = function firstImgTag(str) {
    const m = str.match(/<img\b[\s\S]*?>/i);
    return m ? m[0] : '';
  };

  // Same <img> has non-empty src and alt
  TU.imgHasSrcAlt = function imgHasSrcAlt(imgTag) {
    if (!imgTag) return false;
    const re = /<img\b(?=[^>]*\bsrc\s*=\s*(?:"[^"]+"|'[^']+'))(?=[^>]*\balt\s*=\s*(?:"[^"]+"|'[^']+'))[\s\S]*?>/i;
    return re.test(imgTag);
  };

  // All <li> pairs
  TU.getAllLiPairs = function getAllLiPairs(str) {
    const re = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
    const out = [];
    let m;
    while ((m = re.exec(str))) out.push(m[1]);
    return out;
  };

  global.TU = TU;
})(window);
