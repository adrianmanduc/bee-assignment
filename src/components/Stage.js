/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

import { useGameDispatch, useGameStore, GAME_ACTIONS } from '@context/GameContext';
import { MIXINS, BREAKPOINTS } from '@styles';
import { checkIfBee, checkIfWasp, checkIfValidMove } from '@helpers/GameHelpers';
import { PLAYERS } from '@constants/config';
import Character from './Character';

export default () => {
  const { board, characters, selected, winner } = useGameStore();
  const dispatch = useGameDispatch();

  const handleClick = React.useCallback((position, character, isValidMove) => {
    const isBee = checkIfBee(character);
    const isWasp = checkIfWasp(character);

    if (isBee) {
      // Select
      dispatch({ type: GAME_ACTIONS.SELECT, payload: { position } });
    } else if (selected) {
      // Move or attack
      if (isValidMove) {
        if (isWasp) {
          // Attack
          const selectedCharacterId = board[selected.row][selected.col].characterId;
          dispatch({ type: GAME_ACTIONS.ATTACK, payload: { attackerId: selectedCharacterId, defenderId: character.id } });
        } else {
          // Move
          dispatch({ type: GAME_ACTIONS.MOVE, payload: { source: selected, destination: position, } });
        }
      } else {
        // Invalid
        Swal.fire({
          title: 'Oops!',
          text: 'Invalid action',
          icon: 'error',
          confirmButtonColor: '#c49e26',
          background: '#000'
        });
      }
    }
  }, [board, characters, selected]);

  return (
    <div>
      <Board>
        {board.map((row) => row.map(({ position, characterId }) => {

          const isSelected = selected?.row === position.row && selected?.col === position.col;
          const character = characterId && characters.normalized[characterId];
          const isValidMove = checkIfValidMove(selected, position, character);

          return (
            <Tile
              selected={isSelected}
              onClick={() => handleClick(position, character, isValidMove)}
              key={`${position.row},${position.col}`}
              label={`${position.row + 1}, ${position.col + 1}`}
              character={character}
              isValidMove={isValidMove}
            />
          );
        }))}
        {winner && (
        <GameOver>
          <div>Game Over</div>
          <GameOverStatus>{winner === PLAYERS.HUMAN ? 'You win' : 'You lose'}</GameOverStatus>
        </GameOver>
        )}
      </Board>
    </div>
  );
};

const Tile = (props) => {
  const {
    character, onClick, selected, isValidMove, label
  } = props;
  return (
    <TileWrapper onClick={onClick} selected={selected} isValidMove={isValidMove}>
      {character && <Character character={character} /> }
      <TileNumber>{label}</TileNumber>
    </TileWrapper>
  );
};

Tile.propTypes = {
  selected: PropTypes.bool.isRequired,
  isValidMove: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const Board = styled.div`
  width: 700px;
  padding: 20px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 1fr;
  position: relative;

  ${BREAKPOINTS.MOBILE}{
    width: 100%;
  }

`;

const GameOver = styled.div`
  ${MIXINS.FILL};
  background: #161515e6;
  z-index: 2;
  display: flex;
  font-size: 30px;
  align-items: center;
  justify-content: center;
  color: white;
  flex-direction: column;
`;

const GameOverStatus = styled.div`
  font-size: 44px;
  margin-top: 20px;
  padding: 12px 20px;
  border: 1px solid #fff;
`;

const TileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${(props) => (props.isValidMove ? props.theme.colors.hintBackground : props.theme.colors.board)};
  ${(props) => props.selected && `
    border: 2px solid ${props.theme.colors.selectedBorder};  
    background: ${props.theme.colors.selectedBackground};  
  `};
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &::before{
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

`;

const TileNumber = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 4px;
    font-size: 9px;
    background: #424141;
    padding: 4px;
    font-weight: 600;
    align-items: center;
    display: flex;

    ${BREAKPOINTS.MOBILE} {
      display: none;
    }
`;
