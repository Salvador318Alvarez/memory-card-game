import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/crocodile.jpg", matched: false },
  {"src": "/img/lion.jpg", matched: false},
  {"src": "/img/gorilla.jpg", matched: false},
  {"src": "/img/rhino.jpg", matched: false},
  {"src": "/img/horse.jpg", matched: false},
  {"src": "/img/giraffe.jpg", matched: false}
]

function App() {
  
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5 )
      .map((card) => ({...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)

  }


  // handle a choice

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src){
       setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
       })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 750);
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards);
  // reset choices and increase turn

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setDisabled(false)
  }

  //start game automatically
  useEffect(() => {
    shuffleCards()
  }, [])
  
  return (
    <div className="App">
      <h1>Memory Game</h1>
  
      <div className="card-grid">
        {cards.map(card => (
            <SingleCard 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
        ))}
      </div>
      <p>Turns: {turns}</p>
      <button onClick={shuffleCards}>New Game</button>
      
    </div>
  );
}

export default App;
