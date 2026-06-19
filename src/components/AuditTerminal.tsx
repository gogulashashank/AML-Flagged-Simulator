import React, { useEffect, useRef } from 'react';
import { useSimulatorStore, type LogEntry } from '../store/useSimulatorStore';
import { Terminal } from 'lucide-react';
import styles from '../styles/AuditTerminal.module.css';

export const AuditTerminal: React.FC = () => {
  const logs = useSimulatorStore((state) => state.terminalLogs);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of log feed
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogTypeClass = (type: LogEntry['type']) => {
    switch (type) {
      case 'info': return styles.type_info;
      case 'warning': return styles.type_warning;
      case 'alert': return styles.type_alert;
      case 'critical': return styles.type_critical;
      case 'success': return styles.type_success;
    }
  };

  return (
    <div className={styles.terminalContainer}>
      <div className={styles.terminalHeader}>
        <span className={styles.headerTitle}>
          <Terminal size={14} />
          Compliance Telemetry & Audit Trail
        </span>
        <div className={styles.statusIndicator}>
          <span className={styles.statusDot} />
          MONITORING
        </div>
      </div>

      <div className={styles.terminalBody} ref={terminalBodyRef}>
        {logs.map((log, index) => (
          <div key={index} className={styles.logLine}>
            <div className={styles.logCore}>
              <span className={styles.timestamp}>[{log.timestamp}]</span>
              <span className={`${getLogTypeClass(log.type)}`}>
                {log.message}
              </span>
            </div>
            
            {/* If choice has typology educational details, display details box */}
            {log.typology && (
              <div className={styles.typologyCallout}>
                <span className={styles.calloutLabel}>Typology Alert Details</span>
                <span className={styles.typologyName}>{log.typology}</span>
                {log.regulatoryRef && (
                  <span className={styles.regulatoryRef}>Ref: {log.regulatoryRef}</span>
                )}
              </div>
            )}
          </div>
        ))}

        <div className={styles.terminalPromptLine}>
          <span className={styles.promptSymbol}>&gt;</span>
          <span>awaiting next compliance transaction...</span>
          <span className={`${styles.promptCursor} cursor-blink`} />
        </div>
      </div>
    </div>
  );
};
