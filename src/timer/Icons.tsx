import { FC } from "react";

interface IconProps {
  size?: number;
  color?: string;
}

export const PauseIcon: FC<IconProps> = ({ size = 24, color = "#282c34" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: `${size}px`, width: `${size}px` }}
    height={24}
    width={24}
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

export const PlayIcon: FC<IconProps> = ({ size = 24, color = "#282c34" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: `${size}px`, width: `${size}px` }}
    height={24}
    width={24}
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
  </svg>
);
