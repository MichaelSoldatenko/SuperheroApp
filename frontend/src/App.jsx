import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SuperheroList from "./components/SuperheroList";
import SuperheroForm from "./components/SuperheroForm";
import SuperheroDetails from "./pages/SuperheroDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>Superhero DB</h1>
          <div>
            <Link to="/">All Heroes</Link>
            <Link to="/add" className="btn-add">
              Add New Hero
            </Link>
          </div>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={<SuperheroList />} />
            <Route path="/add" element={<SuperheroForm />} />
            <Route path="/hero/:id" element={<SuperheroDetails />} />
            <Route path="/edit/:id" element={<SuperheroForm isEdit={true} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
