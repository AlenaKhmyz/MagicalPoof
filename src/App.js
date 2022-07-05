import { useState, useEffect, useCallback, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./Main";
import "../src/styles/snakeGame.css";
import Snake from "../src/components/Snake.js";
import Food from "../src/components/Food.js";

const randomInt = (min, max) => {
  return Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
}

const randomFoodOnTop = () => {
  return [randomInt(0, 98), 0]
}

const randomFoodOnRight = () => {
  return [98, randomInt(0, 98)]
}

const randomFoodOnBottom = () => {
  return [randomInt(0, 98), 98];
};

const randomFoodOnLeft = () => {
  return [0, randomInt(0, 98)];
};


const borders = [
  randomFoodOnTop,
  randomFoodOnRight,
  randomFoodOnBottom,
  randomFoodOnLeft,
];

const getRandomCordinates = () => {
  return borders[randomInt(0,3)]()
};

function App() {
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);
  const [food, setFood] = useState(randomFoodOnTop());
  //const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(200);

  const direction = useRef("RIGHT");

  // const onKeyDown = (e) => {
  //   e = e || window.event;

  //   switch (e.keyCode) {
  //     case 38:
  //       direction.current = "UP";
  //       break;
  //     case 40:
  //       direction.current = "DOWN";
  //       break;
  //     case 37:
  //       direction.current = "LEFT";
  //       break;
  //     case 39:
  //       direction.current = "RIGHT";
  //       break;
  //   }
  // };

  const moveSnake = () => {
    setSnakeDots((snakeDots) => {
      let dots = [...snakeDots];
      let head = dots[dots.length - 1];

      switch (direction.current) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
      }
      dots.push(head);
      dots.shift();

      return dots;
    });
  };

  const onGameOver = () => {
    alert(`Game Over. Snake lenght is ${snakeDots.length}`);
  };

  const chekIfOutsOfBorders = () => {
    const head = snakeDots[snakeDots.length - 1];
    // if(head[0] >= 100) {
    //   direction = "DOWN"
    // }
    // if(head[1] >= 100) {
    //   direction = "LEFT";
    // }
    // if(head[0] < 0) {
    //   direction = "UP";
    // }
    // if (head[1] < 0) {
    //   direction = "RIGHT";
    // }
    // console.log(head[0]);
    // if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
    // если змейка выходит за рамку - игра закончена
    //   onGameOver();
    // }
  };

  const autoTurn = () => {
    const head = snakeDots[snakeDots.length - 1];
    if (head[0] > 96 && head[1] === 0) {
      direction.current = "DOWN";
    }
     if (head[0] === 98 && head[1] > 96 ) {
       direction.current = "LEFT";
     }
     if (head[0] < 2 && head[1] === 98) {
       direction.current = "UP";
     }
     if (head[0] === 0 && head[1] < 2) {
       direction.current = "RIGHT";
     }
  };

  const enlargeSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  const increaseSpeed = () => {
    if (speed > 10) {
      setSpeed(speed - 10);
    }
  };

  const checkIfCollapsed = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        onGameOver();
      }
    });
  };

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] == food[0] && head[1] == food[1]) {
      setFood(getRandomCordinates);
      enlargeSnake();
      increaseSpeed();
    }
  };

  useEffect(() => {
    setInterval(moveSnake, speed);
    // document.onkeydown = onKeyDown;
  }, []);

  useEffect(() => {
    chekIfOutsOfBorders();
    checkIfCollapsed();
    autoTurn();
  }, [snakeDots]);

  useEffect(() => {
    checkIfEat();
  }, [snakeDots]);

  return (
    <div className="game-area">
      <Snake snakeDots={snakeDots} />
      <Food dot={food} />
      <Main />
    </div>
  );
}

export default App;
