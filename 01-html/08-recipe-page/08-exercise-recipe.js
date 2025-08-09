const results = [];

function testRecipe() {
  // Testa att det finns en h1, en img, en h2, en ul med minst tre li, och en p
  const h1 = document.querySelectorAll('h1');
  const img = document.querySelectorAll('img');
  const h2 = document.querySelectorAll('h2');
  const ul = document.querySelectorAll('ul');
  const p = document.querySelectorAll('p');
  let ingredientCount = 0;
  if (ul.length > 0) {
    ul.forEach(list => {
      ingredientCount += list.querySelectorAll('li').length;
    });
  }
  if (h1.length === 1) {
    results.push('<div class="pass">✔️ Hittade rubrik (h1)</div>');
  } else {
    results.push('<div class="fail">❌ Rubrik (h1) saknas eller finns fler än en</div>');
  }
  if (img.length >= 1) {
    results.push('<div class="pass">✔️ Hittade bild (img)</div>');
  } else {
    results.push('<div class="fail">❌ Bild (img) saknas</div>');
  }
  if (h2.length >= 1) {
    results.push('<div class="pass">✔️ Hittade ingrediensrubrik (h2)</div>');
  } else {
    results.push('<div class="fail">❌ Ingrediensrubrik (h2) saknas</div>');
  }
  if (ingredientCount >= 3) {
    results.push(`<div class="pass">✔️ Hittade ${ingredientCount} ingredienser</div>`);
  } else {
    results.push('<div class="fail">❌ Minst tre ingredienser krävs</div>');
  }
  if (p.length >= 1) {
    results.push('<div class="pass">✔️ Hittade beskrivning (p)</div>');
  } else {
    results.push('<div class="fail">❌ Beskrivning (p) saknas</div>');
  }
}

testRecipe();

const firstSection = document.querySelector('section');
if (firstSection) {
  firstSection.insertAdjacentHTML(
    'beforeend',
    "<h3 class='test-result'>Test Resultat:</h3>" + results.join('')
  );
}
