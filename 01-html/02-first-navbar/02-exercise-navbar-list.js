const results = [];

function testNavbar() {
  // Testa att det finns ett <nav> element med en oordnad lista och minst tre länkar
  const navs = document.querySelectorAll('nav');
  let foundNavbar = false;
  if (navs.length > 0) {
    results.push(`<div class="pass">&lt;nav&gt;: ✔️ Hittade ${navs.length} nav-element</div>`);
    for (const nav of navs) {
      const ul = nav.querySelector('ul');
      if (ul) {
        const links = ul.querySelectorAll('a');
        if (links.length >= 3) {
          foundNavbar = true;
          results.push(`<div class="pass">Navbar i &lt;nav&gt;: ✔️ Oordnad lista med ${links.length} länkar</div>`);
          break;
        }
      }
    }
    if (!foundNavbar) {
      results.push(`<div class="fail">Navbar i &lt;nav&gt;: ❌ Ingen oordnad lista med minst tre länkar hittades i nav</div>`);
    }
  } else {
    results.push(`<div class="fail">&lt;nav&gt;: ❌ Inget nav-element hittades</div>`);
  }
}

function testOrderedList() {
  // Testa att det finns en ordnad lista med minst tre punkter
  const ol = document.querySelector('ol');
  if (ol) {
    const items = ol.querySelectorAll('li');
    if (items.length >= 3) {
      results.push(`<div class="pass">Ordnad lista: ✔️ Hittade ${items.length} punkter</div>`);
    } else {
      results.push(`<div class="fail">Ordnad lista: ❌ Hittade ${items.length}, förväntade minst 3</div>`);
    }
  } else {
    results.push(`<div class="fail">Ordnad lista: ❌ Ingen ordnad lista hittades</div>`);
  }
}

testNavbar();
testOrderedList();

const firstSection = document.querySelector('section');
if (firstSection) {
  firstSection.insertAdjacentHTML(
    'beforeend',
    "<h3 class='test-result'>Test Resultat:</h3>" + results.join('')
  );
}
