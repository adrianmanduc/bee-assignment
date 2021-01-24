import React from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Stage, Console } from '@components';
import { BREAKPOINTS } from '@styles/';

export default function App() {

  return (
    <Router>
      <GameContainer path="/" />
      <Redirect to={{ pathname: '/' }} />
    </Router>
  );
}

const GameContainer = () => {
  return (
    <Wrapper>
      <Stage />
      <Console />
    </Wrapper>
  );
};

const Wrapper = styled.div`
    background: ${(props) => props.theme.colors.foreground};
    display: flex;
    max-width: 1440px;
    margin: 100px auto 0;
    align-items: center;

    ${BREAKPOINTS.MOBILE}{
      flex-direction: column;
    }

`;
