import React, { useState, useEffect } from "react";
import "./styles.css";
import somdozapzapestourado from "../../src/assets/sounds/som-do-zap-zap-estourado.mp3";
import dingsound from "../../src/assets/sounds/ding-sound.mp3";
import parabenspravoce from "../../src/assets/videos/parabenspravoce.mp4";
import QuestionModal from "src/feature/component/QuestionModal/QuestionModal";

function HomePage() {
  const [count, setCount] = useState(0);
  const [audioZap, setAudioZap] = useState<HTMLAudioElement | null>(null);
  const [audioDing, setAudioDing] = useState<HTMLAudioElement | null>(null);
  const [showModal, setShowModal] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString("pt-BR");

  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudioZap(new Audio(somdozapzapestourado));
      setAudioDing(new Audio(dingsound));
    }
  }, []);

  function handleCloseModal() {
    setShowModal(false);
  }

  function parabensParaVoce() {
    const hoje = new Date();
    const nascimento = new Date(inputValue);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();


    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

  return (
    <div className="homepage-container">
      {showModal ? (
        <QuestionModal isOpen={showModal} onClose={handleCloseModal}
          content={
            <input type="date" className="form-control" placeholder="Digite sua resposta" value={inputValue} onChange={(e) => { setInputValue(e.target.value), console.log(dataFormatada) }} />
          } />
      ) : (
        <>
          {count === parabensParaVoce() && (
            <video className="background-video" autoPlay loop>
              <source src={parabenspravoce} type="video/mp4" />
            </video>
          )}

          <div className="title-container">
            <h1 className="title">Contador de parabéns</h1>
            <h5 className="subtitle">conte até a sua idade</h5>
          </div>

          <div className="counter-container">
            <p className="counter-value">{count >= 0 ? count : 0}</p>
          </div>

          <div className="button-container">
            <div className="increment-button">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (audioDing) {
                      audioDing.currentTime = 0; 
                      audioDing.play();          
                    }
                  setCount(count + 1);
                }}
              >
                Incrementar
              </button>
            </div>

            <div className="decrement-button">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (count > 0) {
                    setCount(count - 1);
                  } else {
                    audioZap?.play();
                    alert("Não é possível decrementar (valor negativo)");
                  }
                }}
              >
                Decrementar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
