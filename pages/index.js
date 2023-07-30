import { useEffect, useState } from "react";
import useInterval from "use-interval";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const zoom = 20;

const areaWidth = 30;

const areaHeight = 30;

export default function Home() {
  const [body, setbody] = useState([
    { top: 15, left: 7 },
    { top: 15, left: 6 },
    { top: 15, left: 5 },
  ]);
  const [bodyTwo, setbodyTwo] = useState([
    { top: 15, left: 23 },
    { top: 15, left: 24 },
    { top: 15, left: 25 },
  ]);

  const [direction, setDirection] = useState("up");

  const [directionTwo, setDirectionTwo] = useState("down");
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
    });
  }, []);
  useEffect((e) => {
    window.addEventListener(`keydown`, (e) => {
      setDirectionTwo((prevDirectionTwo) => {
        switch (e.code) {
          case "ArrowLeft":
            if (prevDirectionTwo !== `right`) {
              return "leftTwo";
            }
            break;
          case "ArrowRight":
            if (prevDirectionTwo !== `left`) {
              return "rightTwo";
            }
            break;
          case "ArrowUp":
            if (prevDirectionTwo !== `down`) {
              return `upTwo`;
            }
            break;
          case "ArrowDown":
            if (prevDirectionTwo !== `up`) {
              return `downTwo`;
            }
            break;
        }
        return prevDirectionTwo;
      });
    });
  }, []);

  useInterval(() => {
    end();
  }, 100);

  const end = () => {
    const deleteSnake = [...body];
    deleteSnake.shift();
    if (
      deleteSnake.find((e) => e.top === body[0].top && e.left === body[0].left)
    ) {
      alert("Game Over");
      location.reload();
    } else if (
      deleteSnake.find(
        () => bodyTwo[0].top === body[0].top && bodyTwo[0].left === body[0].left
      )
    ) {
      alert("Game Over");
      location.reload();
    } else if (
      deleteSnake.find(
        (e) => e.top === bodyTwo[0].top && e.left === bodyTwo[0].left
      )
    ) {
      alert("Game Over");
      location.reload();
    }
  };

  function goRight() {
    const newbody = [...body];
    let newLeft = newbody[0].left + 1;
    if (newLeft > areaWidth - 1) {
      newLeft = 0;
    }
    newbody.unshift({ ...newbody[0], left: newLeft });
    setbody(newbody);
  }

  function goDown() {
    const newbody = [...body];
    let newTop = newbody[0].top + 1;
    if (newTop > areaHeight - 1) {
      newTop = 0;
    }
    newbody.unshift({ ...newbody[0], top: newTop });
    setbody(newbody);
  }

  function goLeft() {
    const newbody = [...body];
    let newRight = newbody[0].left - 1;

    if (newRight < 0) {
      newRight = areaWidth - 1;
    }
    newbody.unshift({ ...newbody[0], left: newRight });
    setbody(newbody);
  }
  function goUp() {
    const newbody = [...body];
    let newBottom = newbody[0].top - 1;
    if (newBottom < 0) {
      newBottom = areaHeight - 1;
    }
    newbody.unshift({ ...newbody[0], top: newBottom });
    setbody(newbody);
  }

  function goRightTwo() {
    const newbodyTwo = [...bodyTwo];
    let newLeft = newbodyTwo[0].left + 1;
    if (newLeft > areaWidth - 1) {
      newLeft = 0;
    }
    newbodyTwo.unshift({ ...newbodyTwo[0], left: newLeft });
    setbodyTwo(newbodyTwo);
  }

  function goDownTwo() {
    const newbodyTwo = [...bodyTwo];
    let newTop = newbodyTwo[0].top + 1;
    if (newTop > areaHeight - 1) {
      newTop = 0;
    }
    newbodyTwo.unshift({ ...newbodyTwo[0], top: newTop });
    setbodyTwo(newbodyTwo);
  }

  function goLeftTwo() {
    const newbodyTwo = [...bodyTwo];
    let newRight = newbodyTwo[0].left - 1;

    if (newRight < 0) {
      newRight = areaWidth - 1;
    }
    newbodyTwo.unshift({ ...newbodyTwo[0], left: newRight });
    setbodyTwo(newbodyTwo);
  }
  function goUpTwo() {
    const newbodyTwo = [...bodyTwo];
    let newBottom = newbodyTwo[0].top - 1;
    if (newBottom < 0) {
      newBottom = areaHeight - 1;
    }
    newbodyTwo.unshift({ ...newbodyTwo[0], top: newBottom });
    setbodyTwo(newbodyTwo);
  }
  useInterval(() => {
    switch (direction) {
      case "right":
        goRight();
        break;
      case "down":
        goDown();
        break;
      case "left":
        goLeft();
        break;
      case "up":
        goUp();
        break;
    }
  }, 300);
  useInterval(() => {
    switch (directionTwo) {
      case "rightTwo":
        goRightTwo();
        break;
      case "downTwo":
        goDownTwo();
        break;
      case "leftTwo":
        goLeftTwo();
        break;
      case "upTwo":
        goUpTwo();
        break;
    }
  }, 300);

  return (
    <main className={`flex min-h-screen flex-col items-center  p-24`}>
      <div
        className="relative bg-slate-300"
        style={{ width: areaWidth * zoom, height: areaHeight * zoom }}
      >
        {body.map((segment) => (
          <div
            className="absolute rounded bg-slate-900"
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
            className="absolute rounded bg-slate-900"
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
