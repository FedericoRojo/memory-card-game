import './App.css'
import GameBoard from "./components/GameBoard.jsx"
import ScoreBoard from "./components/ScoreBoard.jsx"
import Restart from "./components/Restart.jsx"
import { createClient } from 'pexels';
import { useEffect, useState } from 'react';

const client = createClient(import.meta.env.VITE_PEXELS_API_KEY);


/*
Juego: -Panel para mostrar las imagenes:
          1) Un arreglo para mantener las imagenes actuales
          2) Un arreglo de ids para mantener el id de las imagenes ya cliqueadas 
          La idea es cada vez que clicken en una imagene chequemos con con el arreglo anterior
       -Contador: 1) ContadorActual 2) MaximaPuntuación

Componentes:
  1) Tablero
  2) Información  

Tener un arreglo grande con bastantes fotos, el juego va a tener 8 fotos en pantalla
Por lo que haria que cada 8 clicks hagamos un llamado para fotos nuevas 

Entonces vamos a tener un arreglo de 8 para mostrar por pantalla, este siempre va a tener 
(menos en la primera jugada) una imagen que ya haya sido clickeada. La idea es que tenga al menos una
y como maximo 6 o 7 para que se pueda seguir jugando. Cada una determinada cantidad de clicks positivos
hay que aumentar el minimo de imagenes ya clickeadas.

Tenemos un arrayDisplay(8)
Cuando alguien clickea guardamos la imagen en un arreglo ya clickeados (para no tener que buscar 
en el arreglo grande) y vamos sacando esas imagenes del arreglo grande.
En la formación del display dependiendo de la cantidad de clicks positivos agarramos mas o menos cantidad
de imagenes del arregloClickeadas y mas o menos del arregloGrande

Un 

*/



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
