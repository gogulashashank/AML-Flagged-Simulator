import React, { useState } from 'react';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { toggleMute, getMuted, playSound } from '../utils/sfx';
import { Volume2, VolumeX, ShieldAlert, Activity } from 'lucide-react';
import styles from '../styles/HUD.module.css';

export const HUD: React.FC = () => {
  const {
    dirtyFunds,
    cleanFunds,
    heatScore,
    sarCount,
    difficulty,
    amlPhase
  } = useSimulatorStore();

  const [muted, setMuted] = useState(getMuted());

  const handleMuteToggle = () => {
    const newMuted = toggleMute();
    setMuted(newMuted);
    if (!newMuted) {
      playSound('beep');
    }
  };

  // Determine heat bar color-coding class
  let heatColorClass = styles.heatGreen;
  if (heatScore >= 70) {
    heatColorClass = styles.heatRed;
  } else if (heatScore >= 35) {
    heatColorClass = styles.heatOrange;
  }

  // Phase indicator classes
  const getPhaseClass = (phase: 'placement' | 'layering' | 'integration') => {
    if (amlPhase === phase) {
      return styles.pipelineActive;
    }
    const order = ['placement', 'layering', 'integration'];
    const currentIdx = order.indexOf(amlPhase);
    const targetIdx = order.indexOf(phase);
    if (targetIdx < currentIdx) {
      return styles.pipelineDone;
    }
    return '';
  };

  return (
    <div className={`${styles.hudContainer} glass-panel`}>
      {/* Top Utility Row */}
      <div className={styles.topUtilityRow}>
        <div className={styles.infoMeta}>
          <span className={styles.metaItem}>
            OPERATIONAL TIERS: <strong>{difficulty === 'easy' ? 'COMPLIANCE ASSISTANT' : 'CHIEF COMPLIANCE OFFICER'}</strong>
          </span>
          <span className={styles.metaItem}>
            TARGET OBJECTIVE: <strong>CLEAN LIQUID CASH</strong>
          </span>
        </div>
        <button 
          className={styles.audioToggle}
          onClick={handleMuteToggle}
          title={muted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span>{muted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
        </button>
      </div>

      {/* Cash Indicators */}
      <div className={styles.metricCard}>
        <div className={styles.labelRow}>
          <span>UNPLACED LIQUID CASH</span>
          <ShieldAlert size={12} className={styles.dirtyVal} />
        </div>
        <div className={styles.valueRow}>
          <span className={`${styles.currencyVal} ${styles.dirtyVal}`}>
            ${dirtyFunds.toLocaleString()}
          </span>
          <span className={styles.unit}>USD</span>
        </div>
      </div>

      <div className={styles.metricCard}>
        <div className={styles.labelRow}>
          <span>LAUNDERED ASSETS</span>
          <Activity size={12} className={styles.cleanVal} />
        </div>
        <div className={styles.valueRow}>
          <span className={`${styles.currencyVal} ${styles.cleanVal}`}>
            ${cleanFunds.toLocaleString()}
          </span>
          <span className={styles.unit}>USD</span>
        </div>
      </div>

      {/* Heat Meter */}
      <div className={styles.metricCard}>
        <div className={styles.labelRow}>
          <span>INVESTIGATION HEAT LEVEL</span>
          <span className={`${styles.heatPercent} ${heatScore >= 70 ? 'glow-text-error' : heatScore >= 35 ? 'glow-text-warning' : 'glow-text-success'}`} style={{ color: heatScore >= 70 ? 'var(--color-error)' : heatScore >= 35 ? 'var(--color-warning)' : 'var(--color-success)' }}>
            {heatScore}%
          </span>
        </div>
        <div className={styles.heatBarContainer}>
          <div 
            className={`${styles.heatBarFill} ${heatColorClass}`}
            style={{ width: `${heatScore}%` }}
          />
        </div>
      </div>

      {/* SAR Indicators */}
      <div className={styles.metricCard}>
        <div className={styles.labelRow}>
          <span>SUSPICIOUS ACTIVITY REPORTS (SARs)</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: sarCount > 0 ? 'var(--color-error)' : 'var(--color-text-dim)' }}>
            {sarCount}/3 FILED
          </span>
        </div>
        <div className={styles.sarIndicator}>
          <div className={`${styles.sarLight} ${sarCount >= 1 ? styles.sarLightActive : ''}`} />
          <div className={`${styles.sarLight} ${sarCount >= 2 ? styles.sarLightActive : ''}`} />
          <div className={`${styles.sarLight} ${sarCount >= 3 ? styles.sarLightActive : ''}`} />
        </div>
      </div>

      {/* AML Phase Pipeline */}
      <div className={styles.topUtilityRow} style={{ gridColumn: 'span 4', borderBottom: 'none', paddingBottom: 0, marginTop: '0.75rem', marginBottom: 0 }}>
        <span className={styles.labelRow} style={{ marginBottom: 0 }}>AML FLOW PIPELINE:</span>
        <div className={styles.pipelineContainer} style={{ width: '80%' }}>
          <div className={styles.pipelineLine} />
          <span className={`${styles.pipelineStep} ${getPhaseClass('placement')}`}>1. Placement</span>
          <span className={`${styles.pipelineStep} ${getPhaseClass('layering')}`}>2. Layering</span>
          <span className={`${styles.pipelineStep} ${getPhaseClass('integration')}`}>3. Integration</span>
        </div>
      </div>
    </div>
  );
};
