import React from 'react';
import styled from 'styled-components';
import { GiHealthNormal, GiShield, GiBroadsword, GiCloverSpiked } from 'react-icons/gi';
import { MdInfoOutline } from 'react-icons/md';
import { Popover } from 'react-tiny-popover';

import { checkIfWasp, getHealthData } from '@helpers/GameHelpers';
import { MIXINS, BREAKPOINTS } from '@styles';
import { LABELS } from '@constants/config';

const Character = (props) => {
  const { character } = props;
  const { Icon, iconSize } = character;
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);

  const isWasp = checkIfWasp(character);
  const { percentage, label, color } = getHealthData(character);

  return (

    <CharacterWrapper enemy={isWasp}>
      <CharacterHealthBar percentage={percentage} color={color}>
        <span>{label}</span>
      </CharacterHealthBar>
      <CharacterIcon>
        <Icon height={iconSize} />
      </CharacterIcon>
      <CharacterInfo>
        <CharacterOverlay isOpen={isPopoverOpen} setOpen={(value) => setPopoverOpen(value)} character={character} />
      </CharacterInfo>
    </CharacterWrapper>
  );
};

export default Character;

const STATS = [
  { label: 'Health', value: 'HP', initialValue: 'INITIAL_HP', icon: <GiHealthNormal /> },
  { label: 'Defense', value: 'DF', initialValue: 'INITIAL_DF', icon: <GiShield /> },
  { label: 'Attack', value: 'AK', initialValue: 'INITIAL_AK', icon: <GiBroadsword /> },
  { label: 'Luck', value: 'LUCK', icon: <GiCloverSpiked /> },
];

const CharacterOverlay = (props) => {
  const { character, isOpen, setOpen } = props;
  const { type, id, Icon } = character;
  return (
    <Popover
      isOpen={isOpen}
      padding={10}
      onClickOutside={() => setOpen(false)}
      content={() => (
        <CharacterOverlayWrapper>
          <CharacterLabel>
            <Icon height={20} />
            <span>{LABELS[type]}</span>
            <span>{`(${id})`}</span>
          </CharacterLabel>
          <CharacterStats>
            {STATS.map((stat) => {
              const { label, value, icon, initialValue } = stat;
              return (
                <Stat>
                  <StatIcon>{icon}</StatIcon>
                  <StatLabel>{`${label}:`}</StatLabel>
                  <StatValue>
                    {`${character[value]}${initialValue ? `  (initially ${character[initialValue]})` : ''}`}
                  </StatValue>
                </Stat>
              );
            })}
          </CharacterStats>
        </CharacterOverlayWrapper>
      )}
    >
      <CharacterInfoButton
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <MdInfoOutline />
      </CharacterInfoButton>
    </Popover>
  );
};

const CharacterWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.enemy ? 'column-reverse' : 'column')};
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

const CharacterHealthBar = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  padding: 3px 4px;
  font-weight: 600;
  background: ${(props) => props.theme.colors.healthBars};
  position: relative;

  span {
    z-index: 1;
  }

  &::before{
    content: '';
    background: ${(props) => props.color};
    ${MIXINS.FILL};
    z-index: 0;
    width: ${(props) => `${props.percentage}%`};
  }
`;

const CharacterInfo = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 4px;

    ${BREAKPOINTS.MOBILE} {
        display: none;
    }
`;

const CharacterIcon = styled.div`
  margin: 8px;
  ${BREAKPOINTS.MOBILE}{
      transform: scale(0.7);
  }
`;

const CharacterOverlayWrapper = styled.div`
    padding: 10px;
    background: #1a1919d1;
    color: #fff;
`;

const CharacterLabel = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;

    > span {
        margin-left: 5px;
    }
`;

const CharacterStats = styled.div`
    display: flex;
    flex-direction: column;
`;

const Stat = styled.div`
    display: flex;
    margin: 4px;
    align-items: center;
    font-size: 12px;
`;

const StatIcon = styled.div``;

const StatLabel = styled.div`
    width: 65px;
    margin-left: 5px;
`;

const StatValue = styled.div``;

const CharacterInfoButton = styled.button`
    background: none;
    border: 0;
    box-shadow: 0;
    color: #fff;
    cursor: pointer;
`;
