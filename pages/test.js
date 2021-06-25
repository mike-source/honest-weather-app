import styles from '../styles/App.module.css'
import LocationForecast from '../components/LocationForecast.js';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__header--main-heading">What is the weather going to be like ?</h1>
      </header>
      <main>
        <LocationForecast></LocationForecast>
      </main>
    </div>
  );
}

export default App;