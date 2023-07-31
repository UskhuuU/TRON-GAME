import { useEffect, useState } from "react";
import * as React from "react";
import useInterval from "use-interval";
const zoom = 15;
const areaWidth = 80;
const areaHeight = 60;

export default function Home() {
  const [body, setbody] = useState([
    { top: 29, left: 10 },
    { top: 29, left: 9 },
    { top: 29, left: 8 },
  ]);
  const [bodyTwo, setbodyTwo] = useState([
    { top: 29, left: 73 },
    { top: 29, left: 74 },
    { top: 29, left: 75 },
  ]);
  const [direction, setDirection] = useState("right");
  const [directionTwo, setDirectionTwo] = useState("left");
  useEffect((e) => {
    window.addEventListener(`keydown`, (e) => {
      setDirection((prevDirection) => {
        switch (e.code) {
          case "KeyA":
            if (prevDirection !== `right`) {
              return "left";
            }
            break;
          case "KeyD":
            if (prevDirection !== `left`) {
              return "right";
            }
            break;
          case "KeyW":
            if (prevDirection !== `down`) {
              return `up`;
            }
            break;
          case "KeyS":
            if (prevDirection !== `up`) {
              return `down`;
            }
            break;
        }
        return prevDirection;
      });
      setDirectionTwo((prevDirectionTwo) => {
        switch (e.code) {
          case "ArrowLeft":
            if (prevDirectionTwo !== `right`) {
              return "left";
            }
            break;
          case "ArrowRight":
            if (prevDirectionTwo !== `left`) {
              return "right";
            }
            break;
          case "ArrowUp":
            if (prevDirectionTwo !== `down`) {
              return `up`;
            }
            break;
          case "ArrowDown":
            if (prevDirectionTwo !== `up`) {
              return `down`;
            }
            break;
        }
        return prevDirectionTwo;
      });
    });
  }, []);

  function goRight() {
    let newLeft = body[0].left + 1;
    if (newLeft > areaWidth - 1) {
      newLeft = 0;
    }
    return { ...body[0], left: newLeft };
  }

  function goDown() {
    let newTop = body[0].top + 1;
    if (newTop > areaHeight - 1) {
      newTop = 0;
    }
    return { ...body[0], top: newTop };
  }

  function goLeft() {
    let newRight = body[0].left - 1;
    if (newRight < 0) {
      newRight = areaWidth - 1;
    }
    return { ...body[0], left: newRight };
  }
  function goUp() {
    let newBottom = body[0].top - 1;
    if (newBottom < 0) {
      newBottom = areaHeight - 1;
    }

    return { ...body[0], top: newBottom };
  }
  function goRightTwo() {
    let newLeft = bodyTwo[0].left + 1;
    if (newLeft > areaWidth - 1) {
      newLeft = 0;
    }
    return { ...bodyTwo[0], left: newLeft };
  }

  function goDownTwo() {
    let newTop = bodyTwo[0].top + 1;
    if (newTop > areaHeight - 1) {
      newTop = 0;
    }
    return { ...bodyTwo[0], top: newTop };
  }

  function goLeftTwo() {
    let newRight = bodyTwo[0].left - 1;
    if (newRight < 0) {
      newRight = areaWidth - 1;
    }
    return { ...bodyTwo[0], left: newRight };
  }
  function goUpTwo() {
    let newBottom = bodyTwo[0].top - 1;
    if (newBottom < 0) {
      newBottom = areaHeight - 1;
    }

    return { ...bodyTwo[0], top: newBottom };
  }
  useInterval(() => {
    const newbody = [...body];
    const newbodyTwo = [...bodyTwo];
    let newHead = null;
    let newHeadTwo = null;
    switch (direction) {
      case "right":
        newHead = goRight();
        break;
      case "down":
        newHead = goDown();
        break;
      case "left":
        newHead = goLeft();
        break;
      case "up":
        newHead = goUp();
        break;
      default:
        newHead = goRight();
    }
    switch (directionTwo) {
      case "right":
        newHeadTwo = goRightTwo();
        break;
      case "down":
        newHeadTwo = goDownTwo();
        break;
      case "left":
        newHeadTwo = goLeftTwo();
        break;
      case "up":
        newHeadTwo = goUpTwo();
        break;
      default:
        newHeadTwo = goRightTwo();
    }

    const deletePlayerOne = [...body];
    const deletePlayerTwo = [...bodyTwo];
    deletePlayerOne.shift();
    deletePlayerTwo.shift();
    if (
      deletePlayerTwo.find(
        (e) => e.top === body[0].top && e.left === body[0].left
      )
    ) {
      // alert("Player 2 win");
      location.reload();
    } else if (
      deletePlayerOne.find(
        (e) => e.top === bodyTwo[0].top && e.left === bodyTwo[0].left
      )
    ) {
      alert("Player 1 win");
      location.reload();
    } else if (
      deletePlayerOne.find(
        (e) => e.top === body[0].top && e.left === body[0].left
      )
    ) {
      alert("Player 2 win");
      location.reload();
    } else if (
      deletePlayerTwo.find(
        (e) => e.top === bodyTwo[0].top && e.left === bodyTwo[0].left
      )
    ) {
      alert("Player 1 win");
      location.reload();
    }

    newbody.unshift(newHead);
    setbody(newbody);
    newbodyTwo.unshift(newHeadTwo);
    setbodyTwo(newbodyTwo);
  }, 100);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div
        className="relative bg-slate-300"
        style={{ width: areaWidth * zoom, height: areaHeight * zoom }}
      >
        {" "}
        {body.map((segment) => (
          <div
            className="absolute rounded bg-blue-900"
            style={{
              top: segment.top * zoom,
              left: segment.left * zoom,
              width: zoom,
              height: zoom,
            }}
          ></div>
        ))}
        {bodyTwo.map((segment) => (
          <div
            className="absolute rounded bg-pink-900"
            style={{
              top: segment.top * zoom,
              left: segment.left * zoom,
              width: zoom,
              height: zoom,
            }}
          ></div>
        ))}
      </div>
    </main>
  );
}
