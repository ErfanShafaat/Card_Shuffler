import Cards from "./components/Cards";
import { useState, useEffect, useMemo } from "react";
import "./App.css";

const cardImages2 = [
  { src: "/images/ronaldo.jpg", matched: false },
  { src: "/images/messi.jpg", matched: false },
  { src: "/images/pepe.jpg", matched: false },
  { src: "/images/zlatan.jpg", matched: false },
  { src: "/images/pique.jpeg", matched: false },
  { src: "/images/ramos.jpg", matched: false },
  { src: "/images/kroos.jpg", matched: false },
  { src: "/images/taremi.jpg", matched: false },
  { src: "/images/neymar.jpg", matched: false },
  { src: "/images/benzema.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffledCards = useMemo(() => {
    return [...cardImages2, ...cardImages2]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: crypto.randomUUID() }));
  }, []);
  const startNewGame = () => {
    const shuffled = [...cardImages2, ...cardImages2]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: crypto.randomUUID() }));

    setCards(shuffled);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 800);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1 className="appTitle"> کارت بازی</h1>
        <button onClick={startNewGame} className="NewGameBTN">
          بازی مجدد
        </button>
      </div>
      <div className="cardContainer">
        {cards.map((card) => (
          <Cards
            key={card.id}
            x={card}
            play={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disable={disabled}
          />
        ))}
        <p>تعداد نوبت‌ها: {turns}</p>
      </div>
    </div>
  );
}

export default App;
