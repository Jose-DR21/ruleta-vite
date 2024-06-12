import { useState } from "react";
import { Wheel } from "react-custom-roulette";

import "./App.css";

const data = {
  ruleta: [
    {
      id: 0,
      option: "5%",
      probabilidad: [1, 5],
      message: "Bien",
    }, //5%
    {
      id: 1,
      option: "10%",
      probabilidad: [6, 15],
      message: "Bien1",
    }, // 10%
    {
      id: 2,
      option: "15%",
      style: { textColor: "#000" },
      probabilidad: [16, 30],
      message: "Bien2",
    }, //15%
    {
      id: 3,
      option: "30%",
      probabilidad: [31, 60],
      message: "Bien3",
    }, //30%
    {
      id: 4,
      option: "40%",
      style: { textColor: "#000" },
      probabilidad: [61, 100],
      message: "Bien4",
    }, //40%
  ],
};
const ruletaStart = async () => {
  let min = 1;
  let max = 100;

  // const data = await getRuleta();

  if (!data) {
    return null;
  }

  const numero = Math.floor(Math.random() * (max - min + 1) + min);

  const respuesta = data?.ruleta?.filter((x) => {
    if (numero >= x.probabilidad[0] && numero <= x.probabilidad[1]) {
      return x;
    }
  });
  return respuesta[0].id;
};

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [message, setMessage] = useState("");
  const backgroundColors = ["red", "blue", "white", "blue", "white"];

  const handleSpinClick = async () => {
    if (!mustSpin) {
      let resp = await ruletaStart();

      setPrizeNumber(resp);
      setMustSpin(true);
    }
  };

  return (
    <div className="modal-box max-h-screen overflow-hidden  h-full w-full  text-red-600  bg-transparent">
      <div className="roulette-container h-fit flex justify-center items-start ">
        <div className="w-fit h-fit flex flex-col justify-center relative">
        {data && (
          <Wheel
            outerBorderWidth={5}
            spinDuration={[0.3]}
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data?.ruleta}
            backgroundColors={backgroundColors}
            radiusLineWidth={0}
            radiusLineColor="transparent"
            innerBorderColor="black"
            outerBorderColor="yellow"
            disableInitialAnimation={false}
            onStopSpinning={() => {
              setMustSpin(false);
              setMessage(data?.ruleta[prizeNumber].message);
            }}
          />
        )}
        {/* <img
          className="roulette-logo logo"
          src={"/logo.png"}
          width={50}
          height={50}
          alt="logo"
        /> */}
        <div className="flex justify-center">
        <button
          className={"btn-registro animate-pulse"}
          onClick={() => {handleSpinClick()}}
          disabled={mustSpin}
        >
          {mustSpin ? "Suerte" : "Girar"}
        </button>
        </div>
    

        </div>
      
      </div>

    </div>
  );
}

export default App;
