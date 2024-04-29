import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);
  const [mainVisible, setMainVisible] = useState(false);
  const [itemCount, setItemCount] = useState();
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [clickedItemIds, setClickedItemIds] = useState(new Set());
  const [winScreenVisible, setWinScreenVisible] = useState(false);

  const handlePlayClick = () => {
    setPlayClicked(true);
    setMenuActive(true);
  };

  const handleMenuClick = () => {
    setPlayClicked(false);
    setMenuActive(false);
    setScore(0);
  };

  const handleDifficultyClick = (count) => {
    setPlayClicked(true);
    setMenuActive(false);
    setMainVisible(true);
    setItemCount(count);
  };

  const handleGameClick = () => {
    setMainVisible(false);
    setMenuActive(true);
    setScore(0);
  };

  const getRandomItems = (list, count) => {
    const shuffledItems = [...list].sort(() => Math.random() - 0.5);
    return shuffledItems.slice(0, count);
  };

  useEffect(() => {
    fetch("https://bymykel.github.io/CSGO-API/api/en/skins.json")
      .then((response) => response.json())
      .then((json) => {
        const shuffledItems = getRandomItems(json, itemCount);
        setItems(shuffledItems.map((item, index) => ({ ...item, id: index })));
      });
  }, [mainVisible]);

  useEffect(() => {
    if (score === itemCount && score !== 0) {
      setMainVisible(false);
      setWinScreenVisible(true);
      setScore(0);
    }
  }, [score, itemCount]);

  useEffect(() => {
    if (score === 0) {
      // Reset clicked items when score is 0
      setClickedItemIds(new Set());
    }
  }, [score]);

  const onItemClick = (itemId) => {
    if (clickedItemIds.has(itemId)) {
      setScore(0);
      setClickedItemIds(new Set());
    } else {
      setScore(score + 1);
      setClickedItemIds(new Set(clickedItemIds).add(itemId));
    }

    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffledItems);
  };

  return (
    <>
      <div className={`main-menu ${playClicked ? "hidden" : ""}`}>
        <img
          src="cs2-skin-memory.png"
          alt="an awesome image for the logo of the game"
        />
        <a className="play-button" onClick={handlePlayClick}>
          play GAME cyka
        </a>
      </div>
      <div className={`difficulty-menu ${menuActive ? "active" : ""}`}>
        <div className="menu-actions">
          <p>choose difficulty blyaaat</p>
          <a onClick={handleMenuClick}>&rarr;</a>
        </div>
        <div className="difficulty-buttons">
          <a onClick={() => handleDifficultyClick(6)}>noob</a>
          <a onClick={() => handleDifficultyClick(12)}>rizzler</a>
          <a onClick={() => handleDifficultyClick(20)}>hakcer!</a>
        </div>
      </div>
      <div className={`main ${mainVisible ? "visible" : ""}`}>
        <div className="overview">
          <p>Score: {score}</p>
          <a onClick={handleGameClick}>&rarr;</a>
        </div>

        <div className={"game"}>
          {items.map((item) => (
            <a key={item.id} onClick={() => onItemClick(item.id)}>
              <img src={item.image} alt={item.name} />
            </a>
          ))}
        </div>
      </div>
      <div className={`win-screen ${winScreenVisible ? "visible" : ""}`}>
        <p>YOU WIN BLYAAAAT!!</p>
        <div className="options">
          <a
            onClick={() => {
              setWinScreenVisible(false);
              setMenuActive(true);
            }}
          >
            go back na hui
          </a>
          <a
            onClick={() => {
              setWinScreenVisible(false);
              setMainVisible(true);
              setScore(0);
            }}
          >
            restart 😎
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
