import React, { CSSProperties } from "react";
import "./card.css";
type chilPropsType = {
  children: React.ReactNode;
  styleAsProps?: CSSProperties;
};
const Card = ({ children, styleAsProps }: chilPropsType) => (
  <div className="myCard" style={styleAsProps}>
    {children}
  </div>
);

export default Card;
