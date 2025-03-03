import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim"; // slim version of tsparticles

const ConfettiParticles = (props) => {
  const [init, setInit] = useState(false);
  console.log(init);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Load the slim version of the engine
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = {
    background: {
      color: { value: "#000000" },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "repulse" },
        onHover: { enable: true, mode: "bubble" },
      },
      modes: {
        bubble: {
          distance: 200,
          size: 10,
          duration: 2,
          opacity: 0.8,
        },
        repulse: { distance: 150 },
      },
    },
    particles: {
      color: { value: ["#FF4500", "#32CD32", "#1E90FF", "#FFD700", "#8A2BE2"] },
      move: {
        enable: true,
        direction: "bottom-right",
        outModes: { default: "out" },
        speed: 2,
      },
      number: { value: 100 },
      opacity: { value: 0.6 },
      shape: { type: "star" },
      size: { value: { min: 3, max: 10 } },
    },
    detectRetina: true,
  };

  return <Particles id={props.id} options={options} />;
};

export default ConfettiParticles;
