//App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './components/Todo';
import Welcome from './components/Welcome';
import ProgressBar from './components/Navbar';
function App() {
  const headStyle = {
    textAlign: "center",
  }
  return (
    <div>
      <BrowserRouter>
        <Routes> <Route path="/Task-Manager" element={<Welcome />} />
          {/* Route for Todo Page */}
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
