import React from 'react';
import { HUD } from './HUD';
import { ScenarioCard } from './ScenarioCard';
import { AuditTerminal } from './AuditTerminal';
import styles from '../styles/GameBoard.module.css';

export const GameBoard: React.FC = () => {
  return (
    <div className={styles.boardContainer}>
      <HUD />
      <div className={styles.gridBody}>
        <ScenarioCard />
        <AuditTerminal />
      </div>
    </div>
  );
};
