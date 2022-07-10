import { useState, useEffect, useCallback, useRef } from "react";
import Content from "./Content";
import "../styles/snakeGame.css";
import Snake from "./Snake";
import Food from "./Food";

const SIZEOFSCREEN = 98
const SIZEOFSNAKE = 2
const SPEED = 200

const randomInt = (min, max) => {
  return (
    Math.floor((Math.random() * (max - min + 1) + min) / SIZEOFSNAKE) *
    SIZEOFSNAKE
  );
};

const randomFoodOnTop = () => {
  return [randomInt(0, SIZEOFSCREEN), 0];
};

const randomFoodOnRight = () => {
  return [SIZEOFSCREEN, randomInt(0, SIZEOFSCREEN)];
};

const randomFoodOnBottom = () => {
  return [randomInt(0, SIZEOFSCREEN), SIZEOFSCREEN];
};

const randomFoodOnLeft = () => {
  return [0, randomInt(0, SIZEOFSCREEN)];
};

const borders = [
  randomFoodOnTop,
  randomFoodOnRight,
  randomFoodOnBottom,
  randomFoodOnLeft,
];

const getRandomCordinates = () => {
  return borders[randomInt(0, 3)]();
};

const SnakeGame = () => {
    const [snakeDots, setSnakeDots] = useState([
      [0, 0],
      [SIZEOFSNAKE, 0],
    ]);
    const [food, setFood] = useState(randomFoodOnTop());
    const [speed, setSpeed] = useState(SPEED);
    const direction = useRef("RIGHT");

    const moveSnake = () => {
       setSnakeDots((snakeDots) => {
         let dots = [...snakeDots];
         let head = dots[dots.length - 1];

         switch (direction.current) {
           case "RIGHT":
             head = [head[0] + SIZEOFSNAKE, head[1]];
             break;
           case "LEFT":
             head = [head[0] - SIZEOFSNAKE, head[1]];
             break;
           case "DOWN":
             head = [head[0], head[1] + SIZEOFSNAKE];
             break;
           case "UP":
             head = [head[0], head[1] - SIZEOFSNAKE];
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
    };

    const autoTurn = () => {
       const head = snakeDots[snakeDots.length - 1];
       if (head[0] > 96 && head[1] === 0) {
         direction.current = "DOWN";
       }
       if (head[0] === SIZEOFSCREEN && head[1] > 96) {
         direction.current = "LEFT";
       }
       if (head[0] < SIZEOFSNAKE && head[1] === SIZEOFSCREEN) {
         direction.current = "UP";
       }
       if (head[0] === 0 && head[1] < SIZEOFSNAKE) {
         direction.current = "RIGHT";
       }
    };

    const enlargeSnake = () => {
      let newSnake = [...snakeDots];
      if (newSnake.length <= 18) {
        newSnake.unshift([]);
      }
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
      if (head[0] === food[0] && head[1] === food[1] && snakeDots !== food) {
        setFood(getRandomCordinates);
        enlargeSnake();
        increaseSpeed();
      }
    };

    useEffect(() => {
      setInterval(moveSnake, speed);
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
        {document.documentElement.offsetWidth >= 1400 && (
          <>
            <Snake snakeDots={snakeDots} />
            <Food dot={food} />
          </>
        )}
        <Content />
      </div>
    );

}

export default SnakeGame;