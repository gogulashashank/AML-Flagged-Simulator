import { create } from 'zustand';
import { SCENARIOS, type Choice } from '../data/scenarios';

export interface LogEntry {
  timestamp: string;
  type: 'info' | 'warning' | 'alert' | 'critical' | 'success';
  message: string;
  typology?: string;
  regulatoryRef?: string;
}

export interface SimulatorState {
  gameStage: 'intro' | 'playing' | 'outcome';
  amlPhase: 'placement' | 'layering' | 'integration';
  difficulty: 'easy' | 'hard';
  dirtyFunds: number;
  cleanFunds: number;
  heatScore: number;
  sarCount: number;
  terminalLogs: LogEntry[];
  currentScenarioIndex: number;
  selectedChoices: string[];
  
  startGame: (difficulty: 'easy' | 'hard') => void;
  makeChoice: (choice: Choice) => void;
  resetGame: () => void;
  addLog: (message: string, type: LogEntry['type'], typology?: string, regulatoryRef?: string) => void;
}

const getTimestamp = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0]; // HH:MM:SS
};

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  gameStage: 'intro',
  amlPhase: 'placement',
  difficulty: 'easy',
  dirtyFunds: 100000,
  cleanFunds: 0,
  heatScore: 10,
  sarCount: 0,
  terminalLogs: [],
  currentScenarioIndex: 0,
  selectedChoices: [],

  startGame: (difficulty) => {
    const isEasy = difficulty === 'easy';
    const initialHeat = isEasy ? 10 : 25;
    const initialLogs: LogEntry[] = [
      {
        timestamp: getTimestamp(),
        type: 'info',
        message: `SYSTEM: Initialization success. Selected Mode: ${difficulty.toUpperCase()}.`,
      },
      {
        timestamp: getTimestamp(),
        type: 'warning',
        message: `TARGET PROFILE: Suspicious asset cluster identified. Value: $100,000 in physical currency.`,
      },
      {
        timestamp: getTimestamp(),
        type: 'info',
        message: 'AML PHASE: PLACEMENT. Task: Inject currency into financial institutions.',
      }
    ];

    set({
      gameStage: 'playing',
      amlPhase: 'placement',
      difficulty,
      dirtyFunds: 100000,
      cleanFunds: 0,
      heatScore: initialHeat,
      sarCount: 0,
      terminalLogs: initialLogs,
      currentScenarioIndex: 0,
      selectedChoices: [],
    });
  },

  makeChoice: (choice) => {
    const { 
      difficulty, 
      dirtyFunds, 
      cleanFunds, 
      heatScore, 
      sarCount, 
      currentScenarioIndex, 
      selectedChoices 
    } = get();

    // 1. Update balances
    const newDirtyFunds = Math.max(0, dirtyFunds + choice.dirtyFundsDelta);
    const newCleanFunds = cleanFunds + choice.cleanFundsDelta;

    // 2. Update heat score (clamp to [0, 100])
    const newHeatScore = Math.max(0, Math.min(100, heatScore + choice.heatDelta));

    // 3. Roll for Suspicious Activity Report (SAR)
    const sarProb = difficulty === 'easy' ? choice.sarProbabilityEasy : choice.sarProbabilityHard;
    const sarTriggered = Math.random() < sarProb;
    const newSarCount = sarTriggered ? sarCount + 1 : sarCount;

    // 4. Create audit logs
    const actionLogs: LogEntry[] = [];
    
    // Primary Choice Log
    actionLogs.push({
      timestamp: getTimestamp(),
      type: 'warning',
      message: `ACTION DEPLOYED: ${choice.text}. Relocated $${Math.abs(choice.dirtyFundsDelta).toLocaleString()} to banking networks.`,
      typology: choice.typologyName,
      regulatoryRef: choice.regulatoryRef,
    });

    // Compliance Warning Log
    actionLogs.push({
      timestamp: getTimestamp(),
      type: choice.riskIndicator === 'High' ? 'critical' : choice.riskIndicator === 'Medium' ? 'warning' : 'info',
      message: `COMPLIANCE TELEMETRY: ${choice.complianceAlert}`,
    });

    // SAR Log if triggered
    if (sarTriggered) {
      actionLogs.push({
        timestamp: getTimestamp(),
        type: 'critical',
        message: `🚨 SECURITY BREACH: Financial Intelligence Unit (FIU) received Suspicious Activity Report (SAR) from intermediary bank. (SAR count: ${newSarCount}/3)`,
      });
    }

    // 5. Advance Scenario & check stage
    const nextScenarioIndex = currentScenarioIndex + 1;
    let nextStage = get().gameStage;
    let nextPhase = get().amlPhase;

    // Immediate Arrest/Seizure condition: Heat reaches 100 or SARs hit 3
    const isBusted = newHeatScore >= 100 || newSarCount >= 3;

    if (isBusted || nextScenarioIndex >= SCENARIOS.length) {
      nextStage = 'outcome';
      if (isBusted) {
        actionLogs.push({
          timestamp: getTimestamp(),
          type: 'critical',
          message: 'FATAL EXPOSURE: Multi-agency assets frozen. Arrest warrant dispatched. TERMINAL SHUTDOWN.',
        });
      } else {
        actionLogs.push({
          timestamp: getTimestamp(),
          type: 'success',
          message: 'INTEGRATION PHASE TERMINATED. Laundering cycle complete. Generating final audit ledger.',
        });
      }
    } else {
      // Determine next phase based on next scenario index
      const nextScenario = SCENARIOS[nextScenarioIndex];
      if (nextScenario.phase !== nextPhase) {
        nextPhase = nextScenario.phase;
        actionLogs.push({
          timestamp: getTimestamp(),
          type: 'info',
          message: `AML PHASE TRANSITION: Moving to ${nextPhase.toUpperCase()} phase.`,
        });
      }
    }

    set((state) => ({
      dirtyFunds: newDirtyFunds,
      cleanFunds: newCleanFunds,
      heatScore: newHeatScore,
      sarCount: newSarCount,
      terminalLogs: [...state.terminalLogs, ...actionLogs],
      currentScenarioIndex: isBusted ? currentScenarioIndex : nextScenarioIndex,
      selectedChoices: [...selectedChoices, choice.id],
      gameStage: nextStage,
      amlPhase: nextPhase,
    }));
  },

  resetGame: () => {
    set({
      gameStage: 'intro',
      amlPhase: 'placement',
      dirtyFunds: 100000,
      cleanFunds: 0,
      heatScore: 10,
      sarCount: 0,
      terminalLogs: [],
      currentScenarioIndex: 0,
      selectedChoices: [],
    });
  },

  addLog: (message, type, typology, regulatoryRef) => {
    set((state) => ({
      terminalLogs: [
        ...state.terminalLogs,
        {
          timestamp: getTimestamp(),
          type,
          message,
          typology,
          regulatoryRef,
        },
      ],
    }));
  },
}));
