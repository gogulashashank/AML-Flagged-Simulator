export interface Choice {
  id: string;
  text: string;
  description: string;
  dirtyFundsDelta: number;     // e.g. -20000 (taking $20,000 from dirty funds)
  cleanFundsDelta: number;     // e.g. +17000 (after a 15% laundering fee)
  heatDelta: number;           // change in heat score (can be negative on safe actions)
  sarProbabilityEasy: number;  // probability of triggering a SAR on Easy mode
  sarProbabilityHard: number;  // probability of triggering a SAR on Hard mode
  complianceAlert: string;     // live message printed to the compliance terminal
  typologyName: string;        // Name of the financial crime typology
  regulatoryRef: string;       // Real-world compliance reference (FATF, FinCEN, EU Directives)
  riskIndicator: 'Low' | 'Medium' | 'High';
}

export interface Scenario {
  id: string;
  phase: 'placement' | 'layering' | 'integration';
  title: string;
  narrative: string;
  choices: Choice[];
}

export const SCENARIOS: Scenario[] = [
  // ==========================================
  // PLACEMENT STAGE
  // ==========================================
  {
    id: 'placement_1',
    phase: 'placement',
    title: 'Placement Phase: Breaking the Cash Pile',
    narrative: 'You have $100,000 in illicit physical cash stacked in duffel bags. To use it, you must place it into the formal banking system. How do you deposit the first $30,000?',
    choices: [
      {
        id: 'p1_choice_smurf',
        text: 'Deploy Money Mules (Structuring/Smurfing)',
        description: 'Hire five local runners to deposit $6,000 each into separate bank accounts. This keeps each transaction below the $10,000 cash transaction report (CTR) threshold.',
        dirtyFundsDelta: -30000,
        cleanFundsDelta: 25500, // 15% fee for runner cuts and expenses
        heatDelta: 5,
        sarProbabilityEasy: 0.10,
        sarProbabilityHard: 0.20,
        complianceAlert: 'ALERT: Multiple structured cash deposits detected within a 48-hour window across distinct branches (Smurfing pattern). Triggering AML monitoring flags.',
        typologyName: 'Structuring / Smurfing (FATF Typology 1.2)',
        regulatoryRef: 'Bank Secrecy Act (BSA) 31 U.S.C. § 5324 - Prohibitions on Structuring.',
        riskIndicator: 'Low'
      },
      {
        id: 'p1_choice_commingle',
        text: 'Commingle with Cash-Heavy Business (Car Wash)',
        description: 'Funnel the cash through a friendly car wash business. Mix the dirty cash into the daily register receipts as fake customer transactions over two weeks.',
        dirtyFundsDelta: -30000,
        cleanFundsDelta: 27000, // 10% tax/business expense
        heatDelta: 15,
        sarProbabilityEasy: 0.25,
        sarProbabilityHard: 0.40,
        complianceAlert: 'WARNING: Cash deposits at Business Account #4092 deviate by 240% from seasonal averages. Auditing software flagged variance in cash-to-card ratio.',
        typologyName: 'Commingling of Legitimate and Illicit Cash (FATF Typology 3.4)',
        regulatoryRef: 'FinCEN Advisory FIN-2014-A005 - Commingling and Front Company Activities.',
        riskIndicator: 'Medium'
      },
      {
        id: 'p1_choice_smuggle',
        text: 'Bulk Cash Smuggling (Cross-Border)',
        description: 'Pack the $30,000 into vacuum-sealed packages and hire an accomplice to drive it across the border into a neighbouring tax haven with loose banking KYC rules.',
        dirtyFundsDelta: -30000,
        cleanFundsDelta: 28500, // 5% transportation cost
        heatDelta: 30,
        sarProbabilityEasy: 0.40,
        sarProbabilityHard: 0.65,
        complianceAlert: 'CRITICAL: Border enforcement logs reveal undeclared currency transportation query. Local foreign exchange bureau filed a suspicious transfer notification.',
        typologyName: 'Bulk Cash Smuggling (FATF Recommendation 32)',
        regulatoryRef: 'EU AML Directive 2018/1673 - Criminalization of cross-border illicit flows.',
        riskIndicator: 'High'
      }
    ]
  },
  {
    id: 'placement_2',
    phase: 'placement',
    title: 'Placement Phase: Bypassing KYC Controls',
    narrative: 'With your initial funds deposited, you need to place another $30,000. Banks are tightening KYC (Know Your Customer) requirements. Choose your placement channel:',
    choices: [
      {
        id: 'p2_choice_prepaid',
        text: 'Prepaid Reloadable Cards',
        description: 'Purchase 60 pre-paid visa cards from retail stores. Load each card with $500 cash to avoid identity checks entirely.',
        dirtyFundsDelta: -30000,
        cleanFundsDelta: 26000, // 13.3% retail fees and card overhead
        heatDelta: 10,
        sarProbabilityEasy: 0.15,
        sarProbabilityHard: 0.30,
        complianceAlert: 'NOTICE: Retailer POS reports show rapid consecutive card activations paid in cash. Merchant services flagged IP and device IDs.',
        typologyName: 'Exploitation of Prepaid Cards (FATF Typology 2.8)',
        regulatoryRef: 'FCA Guidance on Electronic Money Regulations 2011 (EMRs).',
        riskIndicator: 'Low'
      },
      {
        id: 'p2_choice_synthetic',
        text: 'Synthetic Identity Fraud on Neo-Bank',
        description: 'Purchase a stolen database ID on the dark web. Use it to pass the fully automated KYC flow of a fast-growing digital-only challenger bank.',
        dirtyFundsDelta: -30000,
        cleanFundsDelta: 28000, // Minimal fees, only dark web ID cost
        heatDelta: 35,
        sarProbabilityEasy: 0.45,
        sarProbabilityHard: 0.70,
        complianceAlert: 'CRITICAL: Neo-bank biometric verification flagged discrepancies in document portrait metadata. Synthetic identity alert dispatched to Fraud Ops.',
        typologyName: 'Synthetic Identity Creation (FinCEN Typology 2021)',
        regulatoryRef: 'FATF Recommendation 10 - Customer Due Diligence (CDD) on Digital Onboarding.',
        riskIndicator: 'High'
      },
      {
        id: 'p2_choice_creditunion',
        text: 'Local Co-operative Credit Union',
        description: 'Open a business account at a rural credit union. They use manual compliance systems and lack sophisticated AML transaction monitoring tools.',
        dirtyFundsDelta: -30000,
        cleanFundsDelta: 27500, // 8.3% membership dues and setup
        heatDelta: 15,
        sarProbabilityEasy: 0.20,
        sarProbabilityHard: 0.35,
        complianceAlert: 'WARNING: Credit Union automated batch scanning reported an unexpected out-of-state business registration doing cash-intensive transactions.',
        typologyName: 'Exploitation of Smaller Financial Institutions (FATF Typology 4.2)',
        regulatoryRef: 'BSA Rule 31 CFR Chapter X - AML Compliance Programs for Mutual & Credit Unions.',
        riskIndicator: 'Medium'
      }
    ]
  },

  // ==========================================
  // LAYERING STAGE
  // ==========================================
  {
    id: 'layering_1',
    phase: 'layering',
    title: 'Layering Phase: Splitting the Trail',
    narrative: 'Your funds are inside the banking system, but the audit trail directly connects back to you. You must layer the funds to break the link. You have $40,000 in your placement accounts. How do you disperse it?',
    choices: [
      {
        id: 'l1_choice_crypto',
        text: 'Virtual Asset Mixer (Tumbling)',
        description: 'Convert $20,000 to crypto and funnel it through a non-custodial privacy pool protocol (mixer). Re-emerge with fresh tokens in a new, unlinked wallet.',
        dirtyFundsDelta: -20000,
        cleanFundsDelta: 17500, // 12.5% network fee & gas charges
        heatDelta: 25,
        sarProbabilityEasy: 0.30,
        sarProbabilityHard: 0.50,
        complianceAlert: 'WARNING: Centralized exchange flagged incoming funds originating from a sanctioned smart contract mixer (e.g., Tornado Cash). Account freeze risk imminent.',
        typologyName: 'Crypto Mixing and Tumbling (FATF Virtual Assets Red Flags)',
        regulatoryRef: 'OFAC Sanctions Compliance Guidance for Virtual Currencies (2021).',
        riskIndicator: 'High'
      },
      {
        id: 'l1_choice_consulting',
        text: 'Fake Offshore Consulting Invoices',
        description: 'Incorporate an offshore shell company in Belize. Issue dummy invoices for "IT Consulting Services" from the shell company to your placed business account, wiring $20,000.',
        dirtyFundsDelta: -20000,
        cleanFundsDelta: 18000, // 10% corporate setup & transfer fees
        heatDelta: 15,
        sarProbabilityEasy: 0.15,
        sarProbabilityHard: 0.35,
        complianceAlert: 'ALERT: International wire transfer from local business account sent to high-risk jurisdiction (Belize) with zero tangible trade or economic substance.',
        typologyName: 'Shell Company Invoicing Schemes (FATF Typology 8.1)',
        regulatoryRef: 'EU 5th Anti-Money Laundering Directive (5AMLD) - Corporate Transparency & UBO Registries.',
        riskIndicator: 'Medium'
      },
      {
        id: 'l1_choice_p2p',
        text: 'Peer-to-Peer Mobile Transactions',
        description: 'Execute a series of 40 small transfers ($500 each) to various retail accounts via mobile payment apps, slowly converging the funds into a secondary account.',
        dirtyFundsDelta: -20000,
        cleanFundsDelta: 18500, // 7.5% transaction fees & runner payments
        heatDelta: 10,
        sarProbabilityEasy: 0.10,
        sarProbabilityHard: 0.25,
        complianceAlert: 'NOTICE: Peer-to-peer network analysis detects a circular flow of funds. Multiple users sending money to a single node within a short timeframe.',
        typologyName: 'Rapid Peer-to-Peer Structuring (FATF Guidance on Digital Payments)',
        regulatoryRef: 'FinCEN Rules for Money Services Businesses (MSBs) under 31 CFR § 1022.320.',
        riskIndicator: 'Low'
      }
    ]
  },
  {
    id: 'layering_2',
    phase: 'layering',
    title: 'Layering Phase: The Shell Game',
    narrative: 'You have another $20,000 to layer. The compliance officers are monitoring sudden transactions. What is your next move to mask the origin of this money?',
    choices: [
      {
        id: 'l2_choice_casino',
        text: 'Online Casino Chip Laundering',
        description: 'Deposit the $20,000 into online gambling accounts. Bet on red and black simultaneously on roulette, then withdraw the remaining cash as "legitimate winnings".',
        dirtyFundsDelta: -20000,
        cleanFundsDelta: 15000, // 25% expected mathematical loss & withdrawal fee
        heatDelta: 30,
        sarProbabilityEasy: 0.40,
        sarProbabilityHard: 0.60,
        complianceAlert: 'WARNING: Gaming operator AML system flagged rapid deposit-to-withdrawal ratio with minimal play-through. Account flagged for review.',
        typologyName: 'Online Gambling and Micro-structuring (FATF Typology 9.3)',
        regulatoryRef: 'UK Gambling Commission AML Guidance & Regulations (LCCP Key Event 15).',
        riskIndicator: 'High'
      },
      {
        id: 'l2_choice_trade',
        text: 'Over-Invoiced Trade Goods',
        description: 'Set up an import/export deal for consumer electronics. Purchase dummy inventory from an overseas partner at an inflated price of $20,000, sending the money abroad.',
        dirtyFundsDelta: -20000,
        cleanFundsDelta: 17000, // 15% shipping, duties, and accomplice cut
        heatDelta: 15,
        sarProbabilityEasy: 0.20,
        sarProbabilityHard: 0.35,
        complianceAlert: 'ALERT: Custom declarations and invoice valuation for imported goods do not align with market price indices. Potential trade-based laundering scheme.',
        typologyName: 'Trade-Based Money Laundering - Over-invoicing (FATF TBML Guide)',
        regulatoryRef: 'WCO (World Customs Organization) Framework of Standards to Secure and Facilitate Trade.',
        riskIndicator: 'Medium'
      },
      {
        id: 'l2_choice_chain',
        text: 'Inter-Account Wires Chain',
        description: 'Transfer the $20,000 rapidly across four accounts in three different banks, changing the entity names slightly at each hop (e.g., John Smith to J. Smith Corp).',
        dirtyFundsDelta: -20000,
        cleanFundsDelta: 19000, // 5% transfer and wire charges
        heatDelta: 20,
        sarProbabilityEasy: 0.25,
        sarProbabilityHard: 0.45,
        complianceAlert: 'NOTICE: Interbank clearing system flagged multiple pass-through transactions with zero holding time. Entity names have high fuzzy-matching score.',
        typologyName: 'Rapid Movement of Funds / Pass-Through Accounts (FATF Typology 2.1)',
        regulatoryRef: 'MAS (Monetary Authority of Singapore) Guidelines on Prevention of Money Laundering.',
        riskIndicator: 'Low'
      }
    ]
  },

  // ==========================================
  // INTEGRATION STAGE
  // ==========================================
  {
    id: 'integration_1',
    phase: 'integration',
    title: 'Integration Phase: Purchasing Legitimacy',
    narrative: 'You have successfully layered your funds through offshore accounts and crypto wallets. Now, you need to integrate the clean funds back into your daily life. You have $20,000 in clean funds to integrate. What is your choice?',
    choices: [
      {
        id: 'i1_choice_luxury',
        text: 'Purchase Luxury Art/Watches',
        description: 'Buy a luxury watch from a boutique art dealer. Resell the watch to a private buyer a week later, receiving a bank draft marked "proceeds of sale".',
        dirtyFundsDelta: -20000,
        cleanFundsDelta: 16000, // 20% depreciation & transaction fees
        heatDelta: 15,
        sarProbabilityEasy: 0.15,
        sarProbabilityHard: 0.30,
        complianceAlert: 'ALERT: Luxury retail surveillance report. High-value transaction settled with cash/third-party bank draft without typical customer profile justification.',
        typologyName: 'Use of High-Value Assets and Dealers (FATF Guidance on Art Markets)',
        regulatoryRef: 'EU 5AMLD Art Market Participant compliance regulations.',
        riskIndicator: 'Medium'
      },
      {
        id: 'i1_choice_realestate',
        text: 'Commercial Real Estate Integration',
        description: 'Use the $20,000 as a small equity co-investment in a commercial office building purchase syndicate led by a real estate broker.',
        dirtyFundsDelta: -20000,
        cleanFundsDelta: 18500, // 7.5% syndication legal fees
        heatDelta: 10,
        sarProbabilityEasy: 0.10,
        sarProbabilityHard: 0.25,
        complianceAlert: 'NOTICE: Real estate compliance check. Escrow funds source verified through Cayman intermediary account. Origin verified but notes complex corporate chain.',
        typologyName: 'Real Estate Laundering (FATF Guidance for Real Estate Sector)',
        regulatoryRef: 'FinCEN Geographic Targeting Orders (GTO) on Residential/Commercial Real Estate.',
        riskIndicator: 'Low'
      },
      {
        id: 'i1_choice_venture',
        text: 'Silent Angel Seed Investment',
        description: 'Inject $20,000 as an angel seed investment into a struggling early-stage technology startup in exchange for convertible notes.',
        dirtyFundsDelta: -20000,
        cleanFundsDelta: 19000, // 5% legal advisory fees
        heatDelta: 20,
        sarProbabilityEasy: 0.20,
        sarProbabilityHard: 0.40,
        complianceAlert: 'WARNING: Startup corporate registry audit. Unexplained cash injection from offshore consulting firm. Corporate secretary requests source of wealth validation.',
        typologyName: 'Investment in Unregulated or Early-Stage Businesses (FATF Typology 7.4)',
        regulatoryRef: 'OECD Guidelines for Multinational Enterprises - Transparency on Corporate Finance.',
        riskIndicator: 'High'
      }
    ]
  },
  {
    id: 'integration_2',
    phase: 'integration',
    title: 'Integration Phase: The Final Extract',
    narrative: 'You have one final $20,000 batch. Once integrated, you can complete the cycle. Which method will you use to withdraw the clean money to your personal accounts?',
    choices: [
      {
        id: 'i2_choice_loan',
        text: 'Director\'s Loan Repayment Scheme',
        description: 'Provide an interest-free personal loan to your own clean business entity. Repay the loan back to yourself over time, booking it as a tax-free director repayment.',
        dirtyFundsDelta: -20000,
        cleanFundsDelta: 19000, // 5% accounting book overhead
        heatDelta: 5,
        sarProbabilityEasy: 0.05,
        sarProbabilityHard: 0.20,
        complianceAlert: 'NOTICE: Corporate auditor flagged director loan terms. Transaction recorded correctly in corporate general ledger. Normal status assigned.',
        typologyName: 'Loan-Back Scheme (FATF Typology 6.3)',
        regulatoryRef: 'HMRC Guidance on Director Loans and Corporation Tax (UK).',
        riskIndicator: 'Low'
      },
      {
        id: 'i2_choice_refund',
        text: 'Cancelled Service Contract Refund',
        description: 'Sign a $20,000 contract with an accomplice\'s supply firm. Cancel the contract immediately, requesting a reimbursement check to your personal bank account.',
        dirtyFundsDelta: -20000,
        cleanFundsDelta: 17500, // 12.5% cancellation fee & accomplice cut
        heatDelta: 15,
        sarProbabilityEasy: 0.20,
        sarProbabilityHard: 0.35,
        complianceAlert: 'WARNING: Internal audit flagged commercial transaction cancellation with manual refund request. Pattern matches fake supply chain typologies.',
        typologyName: 'Integration via Fictitious Claims and Settlements (FATF Typology 11.2)',
        regulatoryRef: 'ICC (International Chamber of Commerce) Rules on Combating Commercial Crime.',
        riskIndicator: 'Medium'
      },
      {
        id: 'i2_choice_securities',
        text: 'Securities Portfolio Integration',
        description: 'Deposit the money into a premium brokerage account, purchase stable low-risk index funds, and liquidate the portfolio three days later to draw funds.',
        dirtyFundsDelta: -20000,
        cleanFundsDelta: 18000, // 10% brokerage commission & quick liquidation loss
        heatDelta: 25,
        sarProbabilityEasy: 0.25,
        sarProbabilityHard: 0.45,
        complianceAlert: 'ALERT: Brokerage surveillance system triggered alert for rapid liquidation of assets with zero market fluctuation holding period.',
        typologyName: 'Securities Market Money Laundering (FATF Securities Report)',
        regulatoryRef: 'SEC Rule 17a-8 - Financial Recordkeeping and Reporting (US Stock Markets).',
        riskIndicator: 'High'
      }
    ]
  }
];
