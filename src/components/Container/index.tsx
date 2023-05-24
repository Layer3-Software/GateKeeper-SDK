import React from 'react';
import '../../components/styles.css';

interface ContainerProps {
  children: JSX.Element;
  bgColor: string;
  textColor: string;
}

const Container = ({ children, bgColor, textColor }: ContainerProps) => {
  return (
    <div
      className="modal"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
