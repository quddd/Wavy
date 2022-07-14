import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import TopNews from './components/TopNews';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<TopNews />}/>
          <Route path="/news/:id" element={<News />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
