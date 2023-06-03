import './App.css';
import SwipeableWord from "./SwipeableWord"

const handleSwipe = (direction) => {
  console.log('Swiped', direction);
};

const App = () => {
  return <SwipeableWord onSwipe={handleSwipe} />;
};


export default App;
