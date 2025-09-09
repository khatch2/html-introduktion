// ...existing code...
import { useEffect, useState } from 'react';
import './App.css';

const port = 3000;
const url = "http://localhost:";
const path = "/api/hello";

async function fetchData () {
  const response = await fetch(`${url}${port}${path}`);
  const data = await response.text();
  return data;
}

function App() {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const result = await fetchData();
      setData(result);
    } catch (err) {
      console.error("Error fetching data:", err);
      setData("Failed to load data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* {data ? <p>{data}</p> : <p>Loading...</p> } */}
      <div className="hero-wrapper">
        <header>
          <nav className="nav-mobile">
            <ul>
              <li>Elektriker Jansson</li>
              <li className="call">
                <i className="fa-solid fa-phone-volume fa-lg"></i>
                <strong> Ring +460 123 45 67</strong>
              </li>
              <li className="hamburger">
                <a href="#"><i className="fa-solid fa-bars fa-lg"></i></a>
              </li>
            </ul>
          </nav>

          <nav className="nav-desktop">
            <ul>
              <li className="company-name">Elektriker Jansson</li>
              <li className="button"><a href="om-oss.html">Om oss</a></li>
              <li className="button"><a href="tjanster.html">Tjänster</a></li>
              <li className="button"><a href="kontakt.html">Kontakt</a></li>
              <li className="button">
                <a href="mailto:info@elektrikerjansson.se">Maila oss!</a>
              </li>
              <li className="button button--cta call-desktop">
                <i className="fa-solid fa-phone-volume fa-lg"></i>
                <strong> Ring +460 123 45 67</strong>
              </li>
            </ul>
          </nav>
        </header>

        <section className="hero">
          <h1>Elektriker Jansson</h1>
          <p>Din pålitliga partner för alla elarbeten</p>
          <a className="button button--cta" href="tjanster.html">BÖRJA DIN PLANERING</a>
        </section>
      </div>

      <main>
        <section className="hero-livingroom" />

        <article>
          <img src="../images/emmanuel-light-card-mobile.png" alt="" width="100%" />
          <h2>Varför anlita Elektriker Jansson</h2>
          <p>På Elektriker Jansson erbjuder vi högkvalitativa elarbeten med fokus på säkerhet, tillförlitlighet och kundnöjdhet.</p>
          <a className="button" href="#">Upptäck våra tjänster</a>
        </article>

        <article>
          <img src="../images/david-cain-installation-mobile.png" alt="" width="100%" />
          <h2>Vårt team är certifierade och dedikerade elektriker</h2>
          <p>Vårt team av certifierade elektriker är dedikerade till att leverera förstklassigt hantverk för både bostäder och kommersiella projekt.</p>
          <a className="button" href="#">Lär känna vårt team</a>
        </article>

        <article className="full-width">
          <h2>Även rådgivare</h2>
          <p>På Elektriker Jansson är vi inte bara elektriker, vi är också rådgivare och partners för våra kunder.</p>
          <p>Vi tar oss tid att förstå dina specifika behov och erbjuder skräddarsydda lösningar som passar just dig.</p>
        </article>

        <article>
          <h2>Tjänster vi erbjuder</h2>
          <p>Vi erbjuder ett brett utbud av elarbeten inklusive:</p>
          <ul>
            <li>installationer</li>
            <li>reparationer</li>
            <li>underhåll</li>
            <li>akuttjänster</li>
          </ul>
          <a className="button" href="#">Läs mer om våra tjänster</a>
        </article>

        <article className="cta">
          <h3>Har du en fråga eller behöver en offert?</h3>
          <p><strong>Kontakta oss idag!</strong> Inget jobb är för stort eller för litet för oss.</p>
          <ul className="cta--list">
            <li><i className="fa-solid fa-phone-volume"></i> 0123-456789</li>
            <li><i className="fa-solid fa-envelope"></i> info@elektrikerjansson.se</li>
            <li><i className="fa-solid fa-location-dot"></i> Exempelgatan 1, 123 45 Staden</li>
          </ul>
        </article>
      </main>

      <footer>
        <p>Skapad av Johan Hellberg 2024 &copy;</p>
      </footer>
    </>
  );
}

export default App;
