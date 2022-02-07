import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Navbar, Container } from 'react-bootstrap';
import PasteComponent from './components/Paste';

function App() {
  const [pastes, setPastes] = useState([]);

  async function getPastes() {
    try {
      const response = await axios.get('http://localhost:8080/scrape');
      if (response.data.pastes) {
        setPastes(response.data.pastes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPastes();
  }, []);

  return (
    <div className="App">
      <Navbar className="mb-3" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Dashboard</Navbar.Brand>
        </Container>
      </Navbar>
      {console.log(pastes)}
      {pastes.map((paste) => (
        <PasteComponent paste={paste} />
      ))}
    </div>
  );
}

export default App;
