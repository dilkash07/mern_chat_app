import React, { useEffect, useState } from "react";

const OtpTimer = ({ initialMinutes = 0, initialSeconds = 30, onResend }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  // Effect to handle the countdown
  useEffect(() => {
    let timer;
    if (isActive && (minutes > 0 || seconds > 0)) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0 && seconds === 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        }
      }, 1000);
    }

    if (minutes === 0 && seconds === 0) {
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, minutes, seconds]);

  // Handler for the "Resend" button
  const handleResend = () => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsActive(true);
    if (onResend) {
      onResend();
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {/* Countdown Timer */}
      {isActive ? (
        <span>
          Resend OTP in:{" "}
          <span className="font-semibold">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </span>
      ) : (
        <button
          className="hover:text-orange-500 hover:underline"
          onClick={handleResend}
        >
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default OtpTimer;
