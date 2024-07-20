import React from 'react';
import MoveList from './comoponent/MoveList'
import Sidebar from './comoponent/Sidebar'
import { Container, Row, Col } from 'react-bootstrap';
 import './App.css'

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            <h1>My Moves</h1>
            <main>
              <MoveList />
            </main>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
