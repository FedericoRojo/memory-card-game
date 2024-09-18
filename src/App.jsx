import './App.css'
import GameBoard from "./components/GameBoard.jsx"
import ScoreBoard from "./components/ScoreBoard.jsx"
import Restart from "./components/Restart.jsx"
import { createClient } from 'pexels';
import { useEffect, useState } from 'react';

const client = createClient(import.meta.env.VITE_PEXELS_API_KEY);

function App() {
  const [pagNum, setPageNum] = useState(1);
  const [totalPhotoArray, setTotalPhotoArray] = useState([]);
  const [displayPhotoArray, setDisplayPhotoArray] = useState([]);
  const [clickedPhotos, setClickedPhotos] = useState([]);
  const [actualPoints, setActualPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const [cantClicked, setCantClicked] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    client.photos.curated({ per_page: 40 }).then(response => {
      let aux = response.photos;
      let firstPart = aux.slice(0,8);
      let lasPart = aux.slice(8);
      setDisplayPhotoArray(firstPart);
      setTotalPhotoArray(lasPart);
    });
  }, []);

  useEffect(() => {
    if (totalPhotoArray.length < 8) {
      client.photos.curated({ per_page: 40, page: pagNum }).then(response => {
        setPageNum(prevPageNum => prevPageNum + 1);
        
        let aux = response.photos;
        let firstPart = aux.slice(0, 8);
        let lastPart = aux.slice(8);
        
        setDisplayPhotoArray(firstPart);
        setTotalPhotoArray(lastPart);
      });
    }
  }, [totalPhotoArray]); 
  

  const restart = () => {
    client.photos.curated({ per_page: 40 }).then(response => {
      let aux = response.photos;
      let firstPart = aux.slice(0,8);
      let lasPart = aux.slice(8);
      setDisplayPhotoArray(firstPart);
      setTotalPhotoArray(lasPart);
    });
  }


  return (
    <div className="game-container">
      { playing && <GameBoard 
                 totalPhotoArray={totalPhotoArray} setTotalPhotoArray={setTotalPhotoArray}
                 displayPhotoArray={displayPhotoArray} setDisplayPhotoArray={setDisplayPhotoArray} 
                 clickedPhotos={clickedPhotos} setClickedPhotos={setClickedPhotos}
                 actualPoints={actualPoints} setActualPoints={setActualPoints}
                 maxPoints={maxPoints} setMaxPoints={setMaxPoints} 
                 setPlaying={setPlaying}
                 cantClicked={cantClicked} setCantClicked={setCantClicked}
                 setPageNum={setPageNum} /> }
      { playing && <ScoreBoard actualPoints={actualPoints}
                               maxPoints={maxPoints}/> }
      { !playing && <Restart maxPoints={maxPoints} 
                             setPlaying={setPlaying}
                             restart={restart} />}
    </div>
  )
}

export default App
