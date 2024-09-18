
function GameBoard({
                    totalPhotoArray, setTotalPhotoArray,
                    displayPhotoArray, setDisplayPhotoArray,
                    clickedPhotos, setClickedPhotos,
                    actualPoints, setActualPoints,
                    maxPoints, setMaxPoints, 
                    setPlaying,
                    setPageNum
}) {
    
    const isAnImageWithId = (id) => {
      let result = false;
      for (let j = 0; j < clickedPhotos.length && result==false; j++){
        if( clickedPhotos[j].id == id ){
          result=true;
        }
      }
      return result;
    }

    const handleClickImage = (id, photo) => {
      if(isAnImageWithId(id)){
        setPlaying(false);
        if( actualPoints > maxPoints ){
          setMaxPoints(actualPoints)
        }
        setActualPoints(0);
        setPageNum(1);
        setClickedPhotos([]);
        setTotalPhotoArray([]);
      }else{
        setClickedPhotos((prevArray) => {
          const newArray = [...prevArray, photo];
          setTotalPhotoArray(prevArray => prevArray.filter((elem) => elem.id !== photo.id));
          anotherRound(newArray); 
          return newArray;
        });
        setActualPoints(prevPoints => prevPoints + 1);
      }
    }

    const anotherRound = (updatedClickedPhotos) => {
      let newArray = [];
      let auxTotalPhotoArray = totalPhotoArray;
      let aux = Math.floor(updatedClickedPhotos.length / 3) + 1;
      let iClickedPhoto = aux > 6 ? 6 : aux; 
      for(let i = 0; i < displayPhotoArray.length; i++){
        let clickedOrNew = Math.floor(Math.random() * (1 + 1)); //If 0 put a newPhoto If 1 put a clickedPhoto
        if( clickedOrNew==1 && iClickedPhoto > 0 && updatedClickedPhotos.length > 0 ){
          let positionInClickedArray = Math.floor(Math.random() * (updatedClickedPhotos.length));
          newArray.push(updatedClickedPhotos[positionInClickedArray]);
          iClickedPhoto--;
        }else{
          if( i + iClickedPhoto == displayPhotoArray.length && updatedClickedPhotos.length > 0  ){
            let positionInClickedArray = Math.floor(Math.random() * (updatedClickedPhotos.length));
            newArray.push(updatedClickedPhotos[positionInClickedArray]);
            iClickedPhoto--;
          }else{
            let positionInTotalArray =  Math.floor(Math.random() * (auxTotalPhotoArray.length));
            newArray.push(auxTotalPhotoArray[positionInTotalArray]);
            auxTotalPhotoArray = auxTotalPhotoArray.filter((_, i) => i !== positionInTotalArray);
          }
        }
      }
      setDisplayPhotoArray(newArray);
    }


    return (
      <div className="game-board">
        {displayPhotoArray.map((photo, index) => (
          <div className="photo-cell" key={`${photo.id}-${index}`} onClick={ () => handleClickImage(photo.id, photo)}>
            <img src={photo.src.medium} alt={photo.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          </div>
        ))}
      </div>
    );
  }
  
  export default GameBoard;
  