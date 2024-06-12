import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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
    <div className="text-red-600  bg-transparent h-fit w-fit ">
      <div className="roulette-container relative">
        {data && (
          <Wheel
            outerBorderWidth={5}
            spinDuration={[0.2]}
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
        <img
          className="roulette-logo logo"
          src={"/logo.png"}
          width={50}
          height={50}
          alt="logo"
        />
      </div>
      <div className="flex justify-center">
        <button
          className={"btn-registro animate-pulse"}
          onClick={() => handleSpinClick()}
          disabled={mustSpin}
        >
          {mustSpin ? "Suerte" : "Girar"}
        </button>
      </div>
      {/* <h1>111</h1>
      <button
        className="btn-ruleta w-fit py-2 px-1 from-rgba(14,83,244,1) absolute  top-72 right-0 transform rotate-180 to-rgba(0,23,73,1) 100%) rounded-tr-lg rounded-br-lg "
        style={{ writingMode: "vertical-lr" }}
        onClick={() =>
          document.getElementById("modal_ruleta_movil").showModal()
        }
      >
        <span className=" tracking-[0.2rem] "> RULETA MOVIL</span>
      </button> */}
      {/* <dialog id="modal_ruleta_movil" className="modal">
        <div className="modal-box bg-white overflow-hidden border-2 border-yellow-200">
          <div className="flex justify-end">
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="flex justify-center items-center gap-2 w-8 h-8 transition-all
              cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r
               from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500
                hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                >
                  x
                </button>
              </form>
            </div>
          </div>

          <div className="flex justify-center">
            <h3 className="font-bold text-lg text-center px-5 py-2 tituloRuleta rounded-badge ">
              Movil {data?.nombre}
            </h3>
          </div>

          <div className="flex justify-center">
            <h1 className={`block h-8 text-lg text-white`}>{message}</h1>
          </div>

         
        </div>
      </dialog> */}
    </div>
  );
}

export default App;
