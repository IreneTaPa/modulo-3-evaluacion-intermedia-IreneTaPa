import { useEffect, useState } from 'react';
import '../styles/App.scss';

function App() {
  const urlApi =
    'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json';
  const [quoteList, setQuoteList] = useState([]);
  const [quoteSearch, setQuoteSearch] = useState('');
  const [filterByCharacter, setFilterByCharacter] = useState('Todos');

  useEffect(() => {
    fetch(urlApi)
      .then((response) => response.json())
      .then((data) => {
        setQuoteList(data);
      });
  }, []);
  const renderQuotes = () => {
    const filteredQuotes = quoteList.filter((data) =>
      data.quote.toLowerCase().includes(quoteSearch.toLowerCase())
    );
    /*.filter((data) => !quoteSearch || data.character === filterByCharacter);*/

    return filteredQuotes.map((eachQuote, index) => (
      <li key={index} className="list_elements">
        {eachQuote.quote}
        <p>{eachQuote.character}</p>
      </li>
    ));
  };
  const handleFilterByQuote = (ev) => {
    setQuoteSearch(ev.target.value);
  };
  const handleFilterByCharacter = (ev) => {
    setFilterByCharacter(ev.target.value);
  };
  return (
    <div>
      <h3>Frases de Friends</h3>
      <form>
        <label htmlFor="quote">Filtrar por frase</label>
        <input
          type="text"
          name="quote"
          id="quote"
          value={quoteSearch}
          onInput={handleFilterByQuote}
        />
        <label htmlFor="character">Filtrar por personaje</label>
        <select
          name="character"
          id="character"
          value={filterByCharacter}
          onChange={handleFilterByCharacter}
        >
          <option value="Todos">Todos</option>
          <option value="Ross">Ross</option>
          <option value="Monica">Monica</option>
          <option value="Joey">Joey</option>
          <option value="Phoebe">Phoebe</option>
          <option value="Chandler">Chandler</option>
          <option value="Rachel">Rachel</option>
        </select>
      </form>
      <ul className="quote__list">{renderQuotes()}</ul>
    </div>
  );
}

export default App;
