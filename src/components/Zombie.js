import "./Zombie.css";

const Zombie = (props) => {
  const { dna } = props;
  const parseDna = (dna) => {
    return {
      hatType: (parseInt(dna.substring(0, 2)) % 7) + 1,
      eyeType: (parseInt(dna.substring(2, 4)) % 11) + 1,
      shirtType: (parseInt(dna.substring(4, 6)) % 6) + 1,
      skinColor: (parseInt(dna.substring(6, 8)) / 100) * 360,
      eyeColor: (parseInt(dna.substring(2, 4)) / 100) * 360,
      clothesColor: (parseInt(dna.substring(2, 4)) / 100) * 360,
    };
  };
  const { hatType, eyeType, shirtType, skinColor, eyeColor, clothesColor } =
    parseDna(dna);

  function getColor(deg) {
    return { filter: `hue-rotate(${deg}deg)` };
  }

  return (
    <div className="zombie-char">
      <div className="zombie-parts partsVisible">
        <img
          className="left-feet"
          src="./img/zombieparts/left-feet-1@2x.png"
          style={getColor(clothesColor)}
          alt=""
        />
        <img
          className="right-feet"
          src="./img/zombieparts/right-feet-1@2x.png"
          style={getColor(clothesColor)}
          alt=""
        />

        <img
          className="left-leg"
          src="./img/zombieparts/left-leg-1@2x.png"
          style={getColor(clothesColor)}
          alt=""
        />
        <img
          className="right-leg"
          src="./img/zombieparts/right-leg-1@2x.png"
          style={getColor(clothesColor)}
          alt=""
        />

        <img
          className="left-thigh"
          src="./img/zombieparts/left-thigh-1@2x.png"
          style={getColor(clothesColor)}
          alt=""
        />
        <img
          className="right-thigh"
          src="./img/zombieparts/right-thigh-1@2x.png"
          style={getColor(clothesColor)}
          alt=""
        />

        <img
          className="left-forearm"
          src="./img/zombieparts/left-forearm-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />
        <img
          className="right-forearm"
          src="./img/zombieparts/right-forearm-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />

        <img
          className="right-upper-arm"
          src="./img/zombieparts/right-upper-arm-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />

        <img
          className="torso"
          src="./img/zombieparts/torso-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />

        <img
          className="shirt"
          src={`./img/zombieparts/shirt-${shirtType}@2x.png`}
          style={getColor(clothesColor)}
          alt=""
        />

        <img
          className="left-upper-arm"
          src="./img/zombieparts/left-upper-arm-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />

        <img
          className="left-forearm"
          src="./img/zombieparts/left-forearm-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />
        <img
          className="right-forearm"
          src="./img/zombieparts/right-forearm-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />

        <img
          className="left-hand"
          src="./img/zombieparts/hand1-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />
        <img
          className="right-hand"
          src="./img/zombieparts/hand-2-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />

        <img
          className="head head-part-1"
          src={`./img/zombieparts/head-${hatType}@2x.png`}
          style={getColor(skinColor)}
          alt=""
        />
        <img
          className="eye"
          src={`./img/zombieparts/eyes-${eyeType}@2x.png`}
          style={getColor(eyeColor)}
          alt=""
        />

        <img
          className="mouth"
          src="./img/zombieparts/mouth-1@2x.png"
          style={getColor(eyeColor)}
          alt=""
        />
      </div>
    </div>
  );
};

export default Zombie;
