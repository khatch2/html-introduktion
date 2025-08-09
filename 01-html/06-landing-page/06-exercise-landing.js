const results = [];

function testLanding() {
  // Testa att det finns en h1, minst en p, en img och en button
  const h1 = document.querySelectorAll('h1');
  const p = document.querySelectorAll('p');
  const img = document.querySelectorAll('img');
  const button = document.querySelectorAll('button');
  if (h1.length === 1) {
    results.push('<div class="pass">✔️ Hittade huvudrubrik (h1)</div>');
  } else {
    results.push('<div class="fail">❌ Huvudrubrik (h1) saknas eller finns fler än en</div>');
  }
  if (p.length >= 1) {
    results.push('<div class="pass">✔️ Hittade beskrivning (p)</div>');
  } else {
    results.push('<div class="fail">❌ Beskrivning (p) saknas</div>');
  }
  if (img.length >= 1) {
    results.push('<div class="pass">✔️ Hittade bild (img)</div>');
  } else {
    results.push('<div class="fail">❌ Bild (img) saknas</div>');
  }
  if (button.length >= 1) {
    results.push('<div class="pass">✔️ Hittade knapp (button)</div>');
  } else {
    results.push('<div class="fail">❌ Knapp (button) saknas</div>');
  }
}

testLanding();

const firstSection = document.querySelector('section');
if (firstSection) {
  firstSection.insertAdjacentHTML(
    'beforeend',
    "<h3 class='test-result'>Test Resultat:</h3>" + results.join('')
  );
}
