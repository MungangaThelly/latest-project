import './App.css'
import Counter from "./components/Counter.jsx";
import Login from './components/Login.jsx';
import Movie from './components/MovieComponent.jsx'

function App() {
  return (
    <>
      count is <Counter />

      <Login />
      <Movie />
    </>
  )
}

export default App