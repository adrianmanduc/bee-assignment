/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import { format } from 'date-fns';
import { useGameStore, useGameDispatch, GAME_ACTIONS } from '@context/GameContext';
import { LOG_TYPES } from '@constants/config';
import { BREAKPOINTS } from '../styles/index';

export default () => {

  const { logs } = useGameStore();
  const dispatch = useGameDispatch();
  const scrollContainerRef = React.useRef(null);

  React.useEffect(() => {
    scrollContainerRef.current?.scrollToBottom();
  }, [logs]);

  const handleNewGameClick = React.useCallback(() => {
    dispatch({ type: GAME_ACTIONS.NEW_GAME });
  }, [dispatch]);

  return React.useMemo(() => {
    return (
      <ConsoleWrapper>
        <ConsoleHeader>
          <ConsoleLabel>Game Info</ConsoleLabel>
          <Restart onClick={handleNewGameClick}>New Game</Restart>
        </ConsoleHeader>
        <StyledScrollbars ref={scrollContainerRef}>
          {logs.map((log, index) => <Log key={index} log={log} />)}
        </StyledScrollbars>
      </ConsoleWrapper>
    );
  }, [logs]);
};

const Log = ({ log }) => {
  const { message, type = LOG_TYPES.MOVE, timestamp } = log;
  return (
    <LogWrapper type={type.toLowerCase()}>
      <LogDate>{`[${format(new Date(timestamp), 'HH:mm:ss')}]`}</LogDate>
      <LogType>{`[${type}]`}</LogType>
      <LogMessage dangerouslySetInnerHTML={{ __html: message }} />
    </LogWrapper>
  );
};

const ConsoleWrapper = styled.div`
  align-self: stretch;
  overflow: hidden;
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const LogWrapper = styled.div`
  padding: 8px 0;
  display: flex;
  color: ${(props) => props.theme.colors.logs[props.type]}
`;

const ConsoleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

const ConsoleLabel = styled.div`
  font-size: 18px;
  color: #fff;
`;

const Restart = styled.button`
    padding: 12px 20px;
    border: 0;
    background: ${(props) => props.theme.colors.buttonBackground};
    cursor: pointer;
    color: #fff;
    font-weight: 600;
`;

const LogDate = styled.div``;

const LogType = styled.div`
  padding: 0px 4px;
`;

const LogMessage = styled.div``;

const StyledScrollbars = styled(Scrollbars)`
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;

  > div:first-of-type {
    inset: -1px !important;
  }

  ${BREAKPOINTS.MOBILE} {
    min-height: 300px; 
  }
`;
