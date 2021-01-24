import { GAME_CONFIG, CHAR_TYPES, LABELS, LOG_TYPES, PLAYERS } from '@constants/config';
import { randomNumber } from '@helpers/utils';

export function generateGame() {
  const characters = generateCharacters();
  const board = generateBoard(characters);

  const { GBS, GWS, QB, QW } = characters;
  const charactersArr = [...GBS, ...GWS, QB, QW];
  const normalized = charactersArr.reduce((acc, character) => ({ ...acc, [character.id]: character }), {});

  return {
    characters: { list: charactersArr, normalized },
    board,
    selected: null,
    winner: null,
    logs: [{ type: LOG_TYPES.INFO, message: 'Game started...', timestamp: (new Date()).valueOf() }]
  };
}

export function checkIfWasp(character) {
  if (!character) return false;
  const { type } = character;
  return type === CHAR_TYPES.QUEEN_WASP || type === CHAR_TYPES.GUARDIAN_WASP;
}

export function checkIfBee(character) {
  if (!character) return false;
  const { type } = character;
  return type === CHAR_TYPES.QUEEN_BEE || type === CHAR_TYPES.GUARDIAN_BEE;
}

export function checkIfQueen(character) {
  if (!character) return false;
  const { type } = character;
  return type === CHAR_TYPES.QUEEN_BEE || type === CHAR_TYPES.QUEEN_WASP;
}

export function getHealthData(character) {
  const { HP, INITIAL_HP } = character;

  const percentage = Math.floor((HP * 100) / INITIAL_HP);
  const label = `${HP}/${INITIAL_HP}`;
  let color = '#076927';
  if (percentage < 60) {
    if (percentage > 40) {
      color = '#827715';
    } else {
      color = '#690707';
    }
  }

  return {
    percentage,
    label,
    color
  };
}

export function checkIfValidMove(selected, position, character) {
  if (!selected) return false;
  const validCharacter = !character || checkIfWasp(character);
  const isNeighbor = checkIfNeighbor(selected, position);
  return validCharacter && isNeighbor;
}

function checkIfNeighbor(current, target) {
  const isNorth = current.row === target.row + 1 && current.col === target.col;
  const isEast = current.row === target.row && current.col === target.col - 1;
  const isSouth = current.row === target.row - 1 && current.col === target.col;
  const isWest = current.row === target.row && current.col === target.col + 1;
  return isNorth || isEast || isSouth || isWest;
}

export function move(source, destination, draft) {
  const board = [...draft.board];

  const selectedCharacterId = board[source.row][source.col].characterId;
  const selectedCharacter = draft.characters.normalized[selectedCharacterId];

  board[destination.row][destination.col].characterId = board[source.row][source.col].characterId;
  board[source.row][source.col].characterId = null;

  const logs = [
    ...draft.logs,
    {
      type: LOG_TYPES.MOVE,
      timestamp: (new Date()).valueOf(),
      message: `
        ${LABELS[selectedCharacter.type]} (${selectedCharacterId}) moved 
        (${source.row + 1}, ${source.col + 1}) &#8594; (${destination.row + 1}, ${destination.col + 1})
      `
    }
  ];

  return {
    board,
    logs
  };
}

export function fight(p1Id, p2Id, draft) {

  let characters = { ...draft.characters };
  let logs = [...draft.logs];

  const P1 = characters.normalized[p1Id];
  const P2 = characters.normalized[p2Id];

  [characters, logs] = fightRound(P1, P2, characters, logs);
  [characters, logs] = fightRound(P2, P1, characters, logs);

  const selectedAlive = characters.normalized[p1Id];

  let winner;
  if (!characters.normalized.qb || !characters.normalized.qw) {
    winner = !characters.normalized.qb ? PLAYERS.COMPUTER : PLAYERS.HUMAN;
    logs.push({
      type: LOG_TYPES.INFO,
      timestamp: (new Date()).valueOf(),
      message: winner === PLAYERS.HUMAN ? '<span>You win</span>' : '<span>The enemy wins</span>'
    });
  }

  return { characters, selectedAlive, winner, logs };
}

function fightRound(attacker, defender, characters, logs) {

  let damage = Math.round(attacker.AK * attacker.LUCK - defender.DF * defender.LUCK);

  if (damage < 0) damage = 0;

  defender.HP -= damage;
  defender.AK -= Math.round(0.25 * damage);
  logs.push({
    type: LOG_TYPES.ATTACK,
    timestamp: (new Date()).valueOf(),
    message: `${LABELS[attacker.type]} (${attacker.id}) deals ${damage} damage to ${LABELS[defender.type]} (${defender.id})`
  });

  if (defender.HP < 0) {
    characters = removeCharacter(defender.id, characters);
    logs.push({
      type: LOG_TYPES.DEATH,
      timestamp: (new Date()).valueOf(),
      message: `${LABELS[defender.type]} (${defender.id}) dies`
    });
  }

  return [characters, logs];
}

function removeCharacter(id, characters) {
  delete characters.normalized[id];

  return {
    ...characters,
    list: characters.list.filter((c) => c.id !== id),
  };
}

function generateBoard(characters) {
  const size = GAME_CONFIG.BOARD_SIZE;
  const board = new Array(size).fill(0).map((row, rowIndex) => new Array(size).fill(0).map((col, colIndex) => ({
    position: {
      row: rowIndex,
      col: colIndex
    },
    characterId: null
  })));

  // Place characters
  const { GBS, GWS, QB, QW } = characters;

  // Wasps
  board[0][2].characterId = QW.id;
  board[1][1].characterId = GWS[0].id;
  board[1][2].characterId = GWS[1].id;
  board[1][3].characterId = GWS[2].id;

  // Bees
  board[4][2].characterId = QB.id;
  board[3][1].characterId = GBS[0].id;
  board[3][2].characterId = GBS[1].id;
  board[3][3].characterId = GBS[2].id;

  return board;
}

function generateCharacters() {
  const GBS = [];
  const GWS = [];

  // Guardians
  for (let i = 0; i < 3; i++) {
    const GB = createCharacter('GUARDIAN_BEE', `gb${i}`);
    const GW = createCharacter('GUARDIAN_WASP', `gw${i}`);
    GBS.push(GB);
    GWS.push(GW);
  }

  // Queens
  const QB = createCharacter('QUEEN_BEE', 'qb');
  const QW = createCharacter('QUEEN_WASP', 'qw');

  return { GBS, GWS, QB, QW };
}

function createCharacter(type, id) {
  const props = GAME_CONFIG.CHARACTERS[type];
  const {
    AK, HP, DF, LUCK, img
  } = props;
  return {
    type,
    id,
    Icon: img.component,
    iconSize: img.size,
    AK,
    HP,
    INITIAL_HP: HP,
    INITIAL_AK: AK,
    INITIAL_DF: DF,
    DF,
    LUCK: randomNumber(LUCK.min, LUCK.max)
  };
}
