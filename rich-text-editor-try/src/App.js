import { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import './App.css';
import Editor from './components/Editor';
import ExampleDocument from './utils/ExampleDocument';

function App() {
  const [document, updateDocument] = useState(ExampleDocument);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">
          <img alt="" src="/app-icon.png" width="30" height="30"className="d-inline-block align-top"/>{" "}
          WYSIWYG Editor
        </Navbar.Brand>
      </Navbar>
      <div className="App">
        <Editor document={document} onChange={updateDocument} />
      </div>
    </div>
  );
}

export default App;
