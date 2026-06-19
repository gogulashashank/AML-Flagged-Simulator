import React from 'react';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { SCENARIOS, type Choice } from '../data/scenarios';
import { playSound } from '../utils/sfx';
import { HelpCircle, Lock } from 'lucide-react';
import styles from '../styles/ScenarioCard.module.css';

export const ScenarioCard: React.FC = () => {
  const { currentScenarioIndex, difficulty, makeChoice } = useSimulatorStore();
  const scenario = SCENARIOS[currentScenarioIndex];

  if (!scenario) return null;

  const handleSelectChoice = (choice: Choice) => {
    // Play SFX based on choice risk indicator
    if (choice.riskIndicator === 'Low') {
      playSound('beep');
    } else if (choice.riskIndicator === 'Medium') {
      playSound('warning');
    } else {
      playSound('critical');
    }

    makeChoice(choice);
  };

  const getRiskClass = (indicator: Choice['riskIndicator']) => {
    switch (indicator) {
      case 'Low': return styles.riskLow;
      case 'Medium': return styles.riskMedium;
      case 'High': return styles.riskHigh;
    }
  };

  return (
    <div className={`${styles.cardContainer} glass-panel`}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>
          <HelpCircle size={18} />
          {scenario.title}
        </span>
        <span className={styles.phaseBadge}>
          {scenario.phase}
        </span>
      </div>

      <p className={styles.narrativeText}>
        {scenario.narrative}
      </p>

      <div className={styles.optionsGrid}>
        {scenario.choices.map((choice, index) => (
          <button
            key={choice.id}
            className={styles.optionCard}
            onClick={() => handleSelectChoice(choice)}
          >
            <div className={styles.optionHeader}>
              <div className={styles.optionNumber}>{index + 1}</div>
              <div className={styles.optionContent}>
                <span className={styles.optionText}>{choice.text}</span>
                <span className={styles.optionDesc}>{choice.description}</span>
              </div>
            </div>

            {difficulty === 'easy' ? (
              <div className={styles.previewsPanel}>
                <span className={styles.previewLabel}>RISK PREVIEW:</span>
                <span className={`${styles.indicatorPill} ${getRiskClass(choice.riskIndicator)}`}>
                  {choice.riskIndicator} RISK
                </span>
                <div className={styles.statImpacts}>
                  <span className={styles.impactBadge}>
                    Cleaned: <strong style={{ color: 'var(--color-success)' }}>+${choice.cleanFundsDelta.toLocaleString()}</strong>
                  </span>
                  <span className={styles.impactBadge}>
                    Heat: <strong style={{ color: choice.heatDelta > 0 ? 'var(--color-error)' : 'var(--color-success)' }}>
                      {choice.heatDelta > 0 ? `+${choice.heatDelta}` : choice.heatDelta}%
                    </strong>
                  </span>
                  <span className={styles.impactBadge}>
                    SAR Risk: <strong style={{ color: 'var(--color-warning)' }}>
                      {Math.round(choice.sarProbabilityEasy * 100)}%
                    </strong>
                  </span>
                </div>
              </div>
            ) : (
              <div className={styles.hardMask}>
                <Lock size={12} className={styles.hardMaskIcon} />
                <span>UNRESOLVED COMPLIANCE RISK PANEL (CCO MODE)</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
