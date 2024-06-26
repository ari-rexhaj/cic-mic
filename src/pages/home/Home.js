import React from "react";
import { useState } from "react";
import {Helmet} from "react-helmet-async";
import "./Home.scss";

let trademark = [
  "0.00...% odds that you rolled this text",
  " love",
  " hate",
  " jan",
  " prayers",
  " notepad",
  " [I SEE YOU]",
  " time",
  "in",
  "out you",
  " :)",
  " no refunds",
];
const selectedTrademark =
  trademark[Math.ceil(Math.random() * (trademark.length - 1))];

const Home = () => {
  const [local1, setLocal1] = useState(false);
  const [local2, setLocal2] = useState(false);

  function handleButtonPress(index) {
    if (index === 0) {
      //open local menu
      setLocal1(!local1);
      if (!local1) {
        setLocal2(false)
      }
    }
    if (index === 1) {
      //opens bot difficulty menu
      setLocal2(!local2)
    } 
  }

  return (
    <div className="homeWrapper">
      <Helmet>
      <title>cic mic, an albanian board game. Simple but hard board game</title>
      <meta property="og:title" content="cic mic, an albanian board game"/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content="%PUBLIC_URL%/cic-mic.png"/>
      <meta property="og:url" content="https://cic-mic.com"/>
      <meta property="og:description" content="Play cic mic, a simple but strategic board game. Supports your phone, laptop or tablet and can be played with a friend, or online for free with no ads!"/>
      <meta property="og:site_name" content="cic-mic.com"/>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:title" content="cic mic, an albanian board game"/>
      <meta name="twitter:site" content="https://cic-mic.com"/>
      <meta name="twitter:image" content="%PUBLIC_URL%/cic-mic.png"/>
      <meta name="twitter:description" content="Play cic mic, a simple but strategic board game. Supports your phone, laptop or tablet and can be played with a friend, or online for free with no ads!"/>
      <meta name="description" content="Play cic mic, a simple but strategic board game. Supports your phone, laptop or tablet and can be played with a friend, or online for free with no ads!" />
      <link rel="canonical" href="https://cic-mic.com"/>
      </Helmet>
      <div className="homeTitle">
        <div>
          <div className="HomeInnerBrick" />
        </div>
        <h1>
          cic mic
          <br />
          <span>an albanian board game</span>
        </h1>
      </div>
      <div className="homeLocalWrapper">
        <button
          onClick={() => {
            handleButtonPress(0);
          }}
        >
          Play local
        </button>
        <div
          className="homeOptions opt1"
          style={{ display: local1 ? "flex" : "none" }}
        >
          <div className="homeOptionsLine" />
          <button
            onClick={() => {
              window.open("./local", "_self");
            }}
          >
            VS human
          </button>
          <button
            onClick={() => {
              handleButtonPress(1);
            }}
          >
            VS bot (WIP)
          </button>
          <div
            className="homeOptions opt2"
            style={{ display: local2 ? "flex" : "none" }}
          >
            <div className="homeOptionsLine" />
            <button onClick={() => {}}>Skanderberg (WIP)</button>
            <button onClick={() => {}}>Master (WIP)</button>
            <button onClick={() => {}}>Challenger (WIP)</button>
            <button onClick={() => {}}>Novice (WIP)</button>
            <button onClick={() => {}}>Serbian (WIP)</button>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          /*window.open("/multiplayer","_self")*/
        }}
      >
        Play online (WIP)
      </button>
      <div className="howTo">
        <h2>how to play cic mic, an albanian board game</h2>
        <h2>general rules (rules that apply at all times):</h2>
        <p>
          <strong>1.</strong> if a player gets 3 bricks in a straight horizontal
          or vertical line, they make what is called a wall. Once a player has
          made a wall, they can remove one of the other players bricks from the
          board before their turn ends
        </p>
        <p>
          <strong>2.</strong> a brick that is part of a wall is considered
          "walled" and cannot be removed from the board so long as it stays
          "walled"
        </p>
        <p>
          <strong>3.</strong> if a brick that is part of a wall is moved such
          that the wall is no longer formed, it and the other bricks that made
          up the wall are no longer "walled"
        </p>
        <p>
          <strong>4.</strong> a brick can only be placed or moved on an
          unoccupied spot
        </p>
        <p>
          <strong>5.</strong> if you've formed a wall, but all enemy bricks are
          walled. Rule 2 is vetoed and you can remove a walled brick.
        </p>

        <h2>gameplay:</h2>
        <p>
          the gameplay consist of 3 phrases and{" "}
          <span>all the general rules apply to all phases</span>
        </p>
        <h3>pregame:</h3>
        <p>
          players take turn placing one of their 9 total reserve bricks onto the
          board
        </p>
        <p> once 18 bricks total are on the board, the midgame phase begins</p>
        <h3>midgame:</h3>
        <p>
          players must now choose a brick to move and may only move it to a
          connected spot on the map (only moved to where the paths lead)
        </p>
        <p>
          {" "}
          a brick can only be moved one spot at a time, and moving a brick takes
          a turn.
        </p>
        <p>
          For players in the midgame phase, a new rule applies:
          <br />
          <strong>6.</strong> if all your bricks have no possible moves, your
          turn is skipped
        </p>
        <h3>endgame:</h3>
        <p>
          a player who has only 3 bricks left on the board will enter the
          endgame phase
        </p>
        <p>
          they can move their bricks anywhere that is unoccupied on the map,
          this only applies to the player with 3 bricks left
        </p>
        <p>both players can be in the endgame phase at the same time</p>
        <h3>win condition:</h3>
        <p>
          to win the game you must get your <span>enemies</span> bricks on the
          board to less than 3
        </p>
        <p>
          that is to say, if you only have 2 bricks left on the board, you've
          lost the game
        </p>

        <h2>visual guidance and controls:</h2>
        <p>
          this section explains how to understand the state of the game from the
          visuals and to explain the controls.
        </p>
        <p>
          the games only method of controls is clicking/tapping bricks, this is
          to support mobile with minimal work, allow for easy and intutive
          controls and also to make the programming simpler. Dragging may be
          added into the game at a later time
        </p>
        <h3>background color:</h3>
        <p>
          the background will shift from white and black as you take turns. If
          the background is white, that means that its team white's turn to
          play, and if its black, that means its team black's turn to play
        </p>
        <h3>selecting a brick to move:</h3>
        <p>
          in the midgame phase, you will have to move bricks around the map. To
          select the brick you'd like to move, simply click a brick on your
          team. The bricks inner color will tell you if you are able to move it.{" "}
        </p>
        <h4>brick blinked red:</h4>
        <p>
          if the bricks inner color blinked red, that means that the brick has
          no possible moves, and you need to select another brick
        </p>
        <h4>brick turns yellow:</h4>
        <p>
          if the bricks inner color turns yellow, that means that it is possible
          to move the brick. Simply click a neighboring spot that is unoccupied
          to move it to that spot
        </p>
        <h4>brick turns yellow, but blinked red twice:</h4>
        <p>
          this only happens in the midgame phase and if you've selected a brick
          that has atleast one possible move, but the spot you tried to move it
          to was not one of them. Remember to only select a{" "}
          <span>neighboring spot</span> that is unoccupied
        </p>
        <h4>enemies walled bricks turns grey:</h4>
        <p>
          this happens when you've formed a wall, and it helps you see which
          bricks cannot be removed. As stated in <span>rule 2</span>
        </p>

        <h2>thank you for playing!</h2>
      </div>
      <p
        onClick={() => {
          window.open("https://github.com/ari-rexhaj/cic-mic");
        }}
        className="trademark"
      >
        {" "}
        Please report bugs via the github page!
        <br />
        <span>Developed with{selectedTrademark} by Ari Rexhaj</span>
      </p>
    </div>
  );
};

export default Home;
