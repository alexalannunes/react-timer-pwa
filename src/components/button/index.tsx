import React, { CSSProperties } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import style from "./button.module.scss";

interface Props {
  onClick: () => void;
  icon: "play" | "pause";
  variant?: "primary" | "secondary";
  styles?: CSSProperties;
}

const ButtonRounded: React.FC<Props> = ({
  onClick,
  icon,
  variant = "primary",
  styles,
}) => {
  const classNameVariant =
    variant === "primary" ? style.primary : style.secondary;
  return (
    <button
      style={styles}
      onClick={onClick}
      className={`${style.button} ${classNameVariant}`}
    >
      {icon === "play" ? <FaPlay size={32} /> : <FaPause size={32} />}
    </button>
  );
};

export { ButtonRounded };
