import React from 'react';

import { Container } from './style';

interface IMessageBoxProps {
  title: string;
  description: string;
  footerText: string;
  icon: string;
}

const MessageBox: React.FC<IMessageBoxProps> = ({ title, description, footerText, icon}) => (
  <Container>
    <header>
      <h1>
        {title}
        <img src={icon} alt="" />
      </h1>
      <p>{description}</p>
    </header>
    <footer>
      <span>{footerText}</span>
    </footer>
  </Container>
);

export default MessageBox;
