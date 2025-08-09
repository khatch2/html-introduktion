const results = [];

function testTable() {
  // Testa att det finns en tabell med minst en rubrikrad och två datarader
  const table = document.querySelector('table');
  if (table) {
    const th = table.querySelectorAll('th');
    const tr = table.querySelectorAll('tr');
    if (th.length >= 1) {
      results.push('<div class="pass">✔️ Hittade rubrikrad</div>');
    } else {
      results.push('<div class="fail">❌ Tabellen saknar rubrikrad</div>');
    }
    if (tr.length >= 3) {
      results.push(`<div class="pass">✔️ Hittade ${tr.length - 1} datarader</div>`);
    } else {
      results.push('<div class="fail">❌ Minst två datarader krävs</div>');
    }
  } else {
    results.push('<div class="fail">❌ Ingen tabell hittades</div>');
  }
}

testTable();

const firstSection = document.querySelector('section');
if (firstSection) {
  firstSection.insertAdjacentHTML(
    'beforeend',
    "<h3 class='test-result'>Test Resultat:</h3>" + results.join('')
  );
}
