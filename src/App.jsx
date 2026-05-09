import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import GameHeader from './components/GameHeader';
import WinMessage from './components/WinMessage';

const cardValues = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍊', '🍊', '🍉', '🍉', '🍍', '🍍', '🥭', '🥭'];

function App() {
  //transform the carddata
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards,setMatchedCards] =  useState([]);
  const [score,setScore] = useState(0);
  const [move,setMove]= useState(0);
  const [isLocked,setIsLocked] = useState(0)

const shuffleArray = ((array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;

});

  const initializeGame = () => {
    const shuffledValues = shuffleArray([...cardValues]);
    const finalCards = shuffledValues.map((item, index) => ({
      id: index,
      value: item,
      isMatched: false,
      isFlipped: false,
    }));

    setCards(finalCards);
    console.log(finalCards);

    setScore(0)
    setMove(0)
    setMatchedCards([])
    setFlippedCards([])
    setIsLocked(false)
  };

  useEffect(() => {
    initializeGame();
  }, []);


  const onReset = (()=>{
      console.log("new gaame initialized")
      initializeGame();
  })

  const handleCardClick = (clickedCard) => {
    console.log(clickedCard);
    // alert("a card was clicked")
    //dont allow clicking if the card is flipped
    if (clickedCard.isFlipped || clickedCard.isMatched || isLocked || flippedCards.length === 2) {
      console.log('card is already flipped');
     
      return;
    }

    const newCards = cards.map((card) => (card.id === clickedCard.id ? { ...card, isFlipped: true } : card));

    setCards(newCards);

    const newFlippedCard = [...flippedCards, clickedCard.id];
    setFlippedCards(newFlippedCard);
    console.log('flippedCard', newFlippedCard);

    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];

      if (firstCard.value === clickedCard.value) {

      setTimeout(()=> {
        console.log('a matched has occured');
        setMatchedCards((prev)=>[...prev,firstCard.id,clickedCard.id])
        const newMatchedCards = cards.map((c)=>{
          if(c.id === clickedCard.id || c.id === firstCard.id){
            return {...c,isMatched:true}
          }else{
            return c;
          }

        })

        setCards((prev)=> prev.map((c)=>{
          if(c.id === clickedCard.id || c.id === firstCard.id){
            return {...c,isMatched:true}
          }else{
            return c;
          }
        }));

        setFlippedCards([]);
        setIsLocked(false);


      },500)  

      setScore((prev)=>prev+1)

      } else {
        // console.log("newCARDS",newCards.length)
        setTimeout(() => {
          const flippedBackCard = newCards.map((c) => {
            if (newFlippedCard.includes(c.id) || c.id === clickedCard.id) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });

          console.log(flippedBackCard.length)

          setCards(flippedBackCard);
          setFlippedCards([]);
          setIsLocked(false);

        }, 300);
      }
    }
    //update the state of the current card selected

    setMove((prev)=>prev+1)
  };

  console.log(cards);

  return (
    <>
      <GameHeader score={score} moves={move} onReset={onReset} />
      {matchedCards.length === cardValues.length && <WinMessage move={move} onNewGame={onReset}/>}
      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </>
  );
}

export default App;
