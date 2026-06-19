import React, { useState } from 'react';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { playSound } from '../utils/sfx';
import { RefreshCw, Copy, CheckCircle } from 'lucide-react';
import styles from '../styles/OutcomeScreen.module.css';

export const OutcomeScreen: React.FC = () => {
  const { cleanFunds, heatScore, sarCount, difficulty, resetGame } = useSimulatorStore();
  const [copied, setCopied] = useState(false);

  // Classify outcomes
  const isBusted = heatScore >= 100 || sarCount >= 3;
  const isSuccess = !isBusted && heatScore < 50 && sarCount === 0;

  // Sound feedback on load (only once, managed by state or sound controller trigger on rendering)
  // Let's trigger appropriate sound once if possible, but component render sound triggers are best handled on mount.
  React.useEffect(() => {
    if (isBusted) {
      playSound('critical');
    } else if (isSuccess) {
      playSound('success');
    } else {
      playSound('warning');
    }
  }, [isBusted, isSuccess]);

  const handleCopyReport = () => {
    playSound('beep');
    let outcomeName = '';
    if (isBusted) outcomeName = 'ASSET SEIZURE (BUSTED)';
    else if (isSuccess) outcomeName = 'SUCCESSFUL CLEAN RUN (LEGITIMATE)';
    else outcomeName = 'COMPROMISED RUN (UNDER SURVEILLANCE)';

    const shareText = `🕵️ FLAGGED: AML SIMULATOR REPORT 🕵️
Mode: ${difficulty === 'easy' ? 'Compliance Assistant' : 'Chief Compliance Officer'}
Outcome: ${outcomeName}
Laundered Yield: $${isBusted ? '0' : cleanFunds.toLocaleString()}
Heat Level: ${heatScore}%
SAR Audits Filed: ${sarCount}/3
AML Telemetry Scorecard completed. Check your FinCrime compliance knowledge!`;

    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleRestart = () => {
    playSound('intro');
    resetGame();
  };

  // Content configurations
  const getOutcomeConfig = () => {
    if (isBusted) {
      return {
        badge: 'Busted / Seized',
        badgeClass: styles.badgeBusted,
        title: 'Laundering Cycle Intercepted',
        titleClass: styles.titleBusted,
        cardClass: styles.glowBusted,
        narrative: 'Your laundering trail was too flagrant. compliance systems flagged structured deposits, shell payments, or currency movements. The Financial Intelligence Unit issued immediate asset freezing orders, and law enforcement agencies dispatched an arrest warrant for money laundering. All assets have been seized by the state.',
        yieldValue: '$0',
        recoveryValue: '$0 (ALL SEIZED)',
        yieldColor: 'var(--color-error)',
      };
    } else if (isSuccess) {
      return {
        badge: 'Legitimate / Evaded',
        badgeClass: styles.badgeSuccess,
        title: 'Successful Clean Run',
        titleClass: styles.titleSuccess,
        cardClass: styles.glowSuccess,
        narrative: 'Masterful execution. You successfully placed, layered, and integrated the funds with maximum efficiency. By keeping transfers structured cleanly, selecting low-monitoring pathways, and disguising corporate registries, compliance systems failed to flag suspicious behavior. Your clean capital is fully integrated.',
        yieldValue: `$${cleanFunds.toLocaleString()}`,
        recoveryValue: `$${cleanFunds.toLocaleString()} (100% SECURE)`,
        yieldColor: 'var(--color-success)',
      };
    } else {
      return {
        badge: 'Compromised Operation',
        badgeClass: styles.badgeCompromised,
        title: 'Operation Suspected',
        titleClass: styles.titleCompromised,
        cardClass: styles.glowCompromised,
        narrative: 'You completed the integration chain, but left a significant compliance footprint. Transaction monitoring nodes flagged high-risk layering transfers, and several alerts have queued up. While you holds clean funds on paper, tax bureaus and regulatory inspectors have opened active inquiries into your front companies. Seizure is highly likely.',
        yieldValue: `$${cleanFunds.toLocaleString()}`,
        recoveryValue: `$${cleanFunds.toLocaleString()} (UNDER SURVEILLANCE)`,
        yieldColor: 'var(--color-warning)',
      };
    }
  };

  const config = getOutcomeConfig();

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${config.cardClass} anim-pulse-glow`}>
        <div className={`${styles.badge} ${config.badgeClass}`}>
          {config.badge}
        </div>
        <h1 className={`${styles.title} ${config.titleClass}`}>
          {config.title}
        </h1>
        <p className={styles.narrative}>
          {config.narrative}
        </p>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Integrated Yield</span>
            <span className={styles.statValue} style={{ color: config.yieldColor }}>
              {config.yieldValue}
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Operations Mode</span>
            <span className={styles.statValue} style={{ color: 'var(--color-primary)', fontSize: '1.2rem', textTransform: 'uppercase' }}>
              {difficulty === 'easy' ? 'Assistant' : 'CCO Mode'}
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Investigation Heat Level</span>
            <span className={styles.statValue} style={{ color: heatScore >= 70 ? 'var(--color-error)' : 'var(--color-warning)' }}>
              {heatScore}%
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Suspicious Activity Reports</span>
            <span className={styles.statValue} style={{ color: sarCount > 0 ? 'var(--color-error)' : 'var(--color-text-main)' }}>
              {sarCount}/3 FILED
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={handleRestart}>
            <RefreshCw size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            New Simulation
          </button>
          <button className={styles.btnSecondary} onClick={handleCopyReport}>
            <Copy size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Copy Audit Report
          </button>
        </div>

        {copied && (
          <div className={styles.copiedMessage}>
            <CheckCircle size={12} style={{ marginRight: '0.25rem', verticalAlign: 'middle', display: 'inline' }} />
            Compliance report copied to clipboard.
          </div>
        )}
      </div>
    </div>
  );
};
