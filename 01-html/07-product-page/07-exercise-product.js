const results = [];

function testProduct() {
  // Testa att det finns en h1, en img, minst två p, och en button
  const h1 = document.querySelectorAll('h1');
  const img = document.querySelectorAll('img');
  const p = document.querySelectorAll('p');
  const button = document.querySelectorAll('button');
  if (h1.length === 1) {
    results.push('<div class="pass">✔️ Hittade produktnamn (h1)</div>');
  } else {
    results.push('<div class="fail">❌ Produktnamn (h1) saknas eller finns fler än en</div>');
  }
  if (img.length >= 1) {
    results.push('<div class="pass">✔️ Hittade produktbild (img)</div>');
  } else {
    results.push('<div class="fail">❌ Produktbild (img) saknas</div>');
  }
  if (p.length >= 2) {
    results.push('<div class="pass">✔️ Hittade beskrivning och pris (p)</div>');
  } else {
    results.push('<div class="fail">❌ Beskrivning och pris (p) saknas</div>');
  }
  if (button.length >= 1) {
    results.push('<div class="pass">✔️ Hittade köp-knapp (button)</div>');
  } else {
    results.push('<div class="fail">❌ Köp-knapp (button) saknas</div>');
  }
}

testProduct();

const firstSection = document.querySelector('section');
if (firstSection) {
  firstSection.insertAdjacentHTML(
    'beforeend',
    "<h3 class='test-result'>Test Resultat:</h3>" + results.join('')
  );
}
