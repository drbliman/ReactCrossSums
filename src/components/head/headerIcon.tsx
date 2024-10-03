import React from "react";
import styles from "../settings/settings.module.scss";

interface IconProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ src, alt, onClick }) => {
  return <img className={styles.img} src={src} alt={alt} onClick={onClick} />;
};

export default Icon;
