import React, { useState } from 'react';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { playSound } from '../utils/sfx';
import { ShieldAlert, ShieldCheck, Play, Award } from 'lucide-react';
import styles from '../styles/IntroScreen.module.css';

export const IntroScreen: React.FC = () => {
  const startGame = useSimulatorStore((state) => state.startGame);
  const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('easy');

  const handleStart = () => {
    playSound('intro');
    startGame(difficulty);
  };

  const selectDifficulty = (diff: 'easy' | 'hard') => {
    playSound('beep');
    setDifficulty(diff);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.titleCard} anim-pulse-glow`}>
        <div className={styles.badge}>
          <ShieldAlert size={36} />
        </div>
        <h1 className={styles.title}>Flagged</h1>
        <p className={styles.subtitle}>AML Detection Simulator</p>

        <div className={styles.terminalBriefing}>
          <div className={styles.terminalHeader}>
            <span>COMMUNICATION CHANNEL: SECURE FIU BROADCAST</span>
            <span>STATUS: ACTIVE</span>
          </div>
          <p>
            <span className={styles.terminalPrompt}>&gt;</span>
            Welcome to the Financial Intelligence Unit training workbench. Your mission is to simulate the laundering of <span className="glow-text-primary" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>$100,000</span> in illicit physical cash while learning how standard transaction monitoring systems identify money laundering.
          </p>
          <p style={{ marginTop: '0.8rem' }}>
            <span className={styles.terminalPrompt}>&gt;</span>
            Money laundering progresses through three distinct sequential phases:
          </p>
          
          <div className={styles.phasesGrid}>
            <div className={styles.phaseItem}>
              <div className={styles.phaseTitle} style={{ color: 'var(--color-success)' }}>1. Placement</div>
              <div className={styles.phaseDesc}>Moving raw physical cash into banks or retail card networks to kickstart the digital trail.</div>
            </div>
            <div className={styles.phaseItem}>
              <div className={styles.phaseTitle} style={{ color: 'var(--color-warning)' }}>2. Layering</div>
              <div className={styles.phaseDesc}>Splitting and transferring funds across borders, shell invoices, or crypto mixers to mask the source.</div>
            </div>
            <div className={styles.phaseItem}>
              <div className={styles.phaseTitle} style={{ color: 'var(--color-error)' }}>3. Integration</div>
              <div className={styles.phaseDesc}>Drawing funds back into mainstream assets (property, angel invest, director loans) as clean capital.</div>
            </div>
          </div>
        </div>

        <div className={styles.difficultySection}>
          <h2 className={styles.sectionTitle}>Select Operations Mode</h2>
          <div className={styles.difficultyCards}>
            {/* EASY CARD */}
            <div 
              className={`${styles.diffCard} ${difficulty === 'easy' ? styles.diffCardActive : ''}`}
              onClick={() => selectDifficulty('easy')}
            >
              <div className={styles.diffHeader}>
                <ShieldCheck className={styles.diffTitleEasy} size={24} />
                <span className={`${styles.diffTitle} ${styles.diffTitleEasy}`}>Compliance Assistant</span>
              </div>
              <p className={styles.diffDesc}>
                Perfect for first-time compliance learners. Risk markers are explicitly detailed, providing visible signals to avoid detection.
              </p>
              <ul className={styles.diffSpecs}>
                <li>Starts with low alert level (10% Heat)</li>
                <li>Previews risk tiers on choice cards</li>
                <li>Low probability of triggering SAR audits</li>
              </ul>
            </div>

            {/* HARD CARD */}
            <div 
              className={`${styles.diffCard} ${difficulty === 'hard' ? styles.diffCardActive : ''}`}
              onClick={() => selectDifficulty('hard')}
            >
              <div className={styles.diffHeader}>
                <Award className={styles.diffTitleHard} size={24} />
                <span className={`${styles.diffTitle} ${styles.diffTitleHard}`}>Chief Compliance Officer</span>
              </div>
              <p className={styles.diffDesc}>
                Maximum stakes. Option previews are hidden under an "Unresolved Risk" alert mask. Requires direct familiarity with AML typologies.
              </p>
              <ul className={styles.diffSpecs}>
                <li>Starts with elevated suspicion (25% Heat)</li>
                <li>Option risk previews are hidden</li>
                <li>Accelerated SAR triggers on questionable transfers</li>
              </ul>
            </div>
          </div>
        </div>

        <button className={styles.playButton} onClick={handleStart}>
          <Play size={20} fill="currentColor" />
          Initiate Simulation
        </button>
      </div>
    </div>
  );
};
