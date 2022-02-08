import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Navbar, Container, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import PasteComponent from './components/Paste';

function App() {
  const [pastes, setPastes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(0);

  const pastesPerPage = 10;
  const pastesVisited = pageNum * pastesPerPage;

  const displayPastes = pastes
    .slice(pastesVisited, pastesVisited + pastesPerPage)
    .map((paste) => <PasteComponent paste={paste} />);

  const pageCount = Math.ceil(pastes.length / pastesPerPage);

  async function getPastes() {
    try {
      const response = await axios.get('http://localhost:8080/scrape');
      if (response.data.pastes && response.data.pastes.length !== pastes.length) {
        setPastes(response.data.pastes);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
