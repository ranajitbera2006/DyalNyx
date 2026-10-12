import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <TypeAnimation
        sequence={[
          "I am a MERN Stack Developer",
          1000,
          "I am a Full-Stack Web Developer",
          1000,
          "I am a React.js Specialist",
          1000,
          "I am a Python Developer",
          1000,
          "I build Real-Time Web Apps",
          1000,
          "I am a Software Engineer",
          1000,
        ]}
        wrapper="span"
        speed={50}
        deletionSpeed={65}
        style={{
          fontSize: "clamp(1.1rem, 4.5vw, 2rem)",
          display: "inline-block",
          whiteSpace: "nowrap",
        }}
        repeat={Infinity}
      />
    </div>
  );
};

export default TypingAnimation;
