import { RecipeDemo } from './component/RecipeDemo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Details } from './component/Details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeDemo />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;