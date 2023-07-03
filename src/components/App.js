import { useEffect, useState } from 'react';
import '../styles/App.scss';

function App() {
  const urlApi =
    'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json';
  const [quoteList, setQuoteList] = useState([]);
  const [quoteSearch, setQuoteSearch] = useState('');
  const [filterByCharacter, setFilterByCharacter] = useState('Todos');
  const [newQuote, setNewQuote] = useState({});

  useEffect(() => {
    fetch(urlApi)
      .then((response) => response.json())
      .then((data) => {
        setQuoteList(data);
      });
  }, []);
  const renderQuotes = () => {
    return quoteList
      .filter((data) =>
        //filtro para filtrar por frase
        data.quote.toLowerCase().includes(quoteSearch.toLowerCase())
      )
      .filter((data) => {
        if (filterByCharacter === 'Todos') {
          return true; //todos los elementos cumplen la condición (se visualizan todos), seria lo mismo que pone return data;
        } else {
          return data.character === filterByCharacter;
          //si no, filtra la data que es igual que las opciones del filterByCharacter(se visualiza solo las frases del personaje que hemos seleccionado)
        }
      })
      .map((eachQuote, index) => (
        <li key={index} className="list_elements">
          <p className="text__quote">{eachQuote.quote}</p>
          <h4 className="text__character">{eachQuote.character}</h4>
        </li>
      ));
  };
  const handleFilterByQuote = (ev) => {
    setQuoteSearch(ev.target.value);
  };
  const handleFilterByCharacter = (ev) => {
    setFilterByCharacter(ev.target.value);
  };
  const handleNewQuote = (ev) => {
    //hacemos una copia se setNewQuote y le decimos que coja los datos del objeto (quote y character)
    setNewQuote({ ...newQuote, [ev.target.name]: ev.target.value });
  };
  const handleClick = (ev) => {
    ev.preventDefault();
    //hacemos copia de lo que tenemos y añadele la nueva info
    setQuoteList([...quoteList, newQuote]);
    setNewQuote({
      quote: '',
      character: '',
    });
  };
  return (
    <div className="page">
      <header className="hero">
        <h1 className="title">Frases de Friends</h1>
      </header>
      <main className="main">
        <form className="form">
          <label className="label" htmlFor="quote">
            Filtrar por frase
          </label>
          <input
            type="text"
            name="quote"
            id="quote"
            className="input"
            value={quoteSearch}
            onInput={handleFilterByQuote}
          />
          <label className="label" htmlFor="character">
            Filtrar por personaje
          </label>
          <select
            name="character"
            id="character"
            className="input"
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
        <form className="form">
          <label className="label" htmlFor="quote">
            Añade la frase
          </label>
          <input
            type="text"
            name="quote"
            className="input"
            onInput={handleNewQuote}
            value={newQuote.quote}
          />
          <label className="label" htmlFor="">
            Añade el personaje
          </label>
          <input
            type="text"
            name="character"
            className="input"
            onInput={handleNewQuote}
            value={newQuote.character}
          />
          <button className="btn" onClick={handleClick}>
            AÑADIR!
          </button>
        </form>
      </main>
      <footer>
        <img
          className="logo"
          src="https://1000marcas.net/wp-content/uploads/2020/12/Friends-logo-3.png"
          alt="Logo Friends"
        />
      </footer>
    </div>
  );
}

export default App;
