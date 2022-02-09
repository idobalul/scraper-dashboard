import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Navbar, Container, Spinner, Form } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import PasteComponent from './components/Paste';
import Stats from './components/Stats';

function App() {
  const [pastes, setPastes] = useState([]);
  const [searchVal, setVal] = useState('');
  const [stats, setStats] = useState({
    General: 0,
    Crypto: 0,
    MaybeScams: 0,
    Hacking: 0,
    Market: 0,
    IllegalAdultContent: 0,
  });
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const pastesPerPage = 10;
  const pastesVisited = pageNum * pastesPerPage;

  const displayPastes = pastes
    .filter((paste: Paste) => paste.Title.toLowerCase().includes(searchVal.toLowerCase()))
    .slice(pastesVisited, pastesVisited + pastesPerPage)
    .map((paste) => <PasteComponent paste={paste} />);

  const pageCount = Math.ceil(pastes.length / pastesPerPage);

  async function getPastes() {
    try {
      const response = await axios.get('http://localhost:8080/scrape');
      if (response.data.pastes && response.data.pastes.length !== pastes.length) {
        setPastes(response.data.pastes);
      }
      if (response.data.stats) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  const debounce = (func: Function, delay = 500) => {
    let timer: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(null);
      }, delay);
    };
  };

  const search = () => {
    if (input && input.current instanceof HTMLInputElement) {
      const { value } = input.current;
      setVal(value);
    }
  };

  useEffect(() => {
    getPastes();
    setInterval(() => {
      getPastes();
    }, 120000);
  }, []);

  useEffect(() => {
    if (pastes.length > 0) {
      setLoading(false);
    }
  }, [pastes]);

  return (
    <div className="App">
      <Navbar className="mb-3" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Form.Control
            ref={input}
            className="input"
            type="text"
            placeholder="Search by title"
            onChange={debounce(() => search())}
          />
        </Container>
      </Navbar>
      {loading && (
        <div className="spinners">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
        </div>
      )}
      <Stats percentage={stats} />
      {displayPastes}
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        pageCount={pageCount}
        onPageChange={({ selected }) => setPageNum(selected)}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
}

export default App;
