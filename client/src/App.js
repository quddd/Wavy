import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import TopNews from './components/TopNews';
import Navbar from './components/Navbar';
import News from './components/News';
import Users from './components/User';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<TopNews />}/>
          <Route path="/news/:id" element={<News />}/>
          <Route path="/users/:id" element={<Users/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
