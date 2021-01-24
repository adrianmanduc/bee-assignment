import { generateGame, fight, move } from '@helpers/GameHelpers';
import { createStore } from './StoreCreator';

const initialState = generateGame();

const reducer = (draft, action) => {
  const { payload = {} } = action;
  switch (action.type) {
    case ACTIONS.SELECT: {
      const { position } = payload;
      return {
        ...draft,
        selected: position
      };
    }
    case ACTIONS.MOVE: {
      const { source, destination } = payload;
      const { board, logs } = move(source, destination, draft);

      return {
        ...draft,
        selected: null,
        board,
        logs
      };
    }
    case ACTIONS.ATTACK: {
      const { attackerId, defenderId } = payload;
      const { characters, selectedAlive, winner, logs } = fight(attackerId, defenderId, draft);

      return {
        ...draft,
        characters,
        winner,
        selected: selectedAlive ? draft.selected : null,
        logs
      };
    }
    case ACTIONS.NEW_GAME: {
      return generateGame();
    }
    default:
      return draft;
  }
};

const [
  GameProvider,
  useGameStore,
  useGameDispatch
] = createStore(reducer, initialState);

const ACTIONS = { SELECT: 'SELECT', MOVE: 'MOVE', ATTACK: 'ATTACK', NEW_GAME: 'NEW_GAME' };

export { GameProvider, useGameStore, useGameDispatch, ACTIONS as GAME_ACTIONS };
