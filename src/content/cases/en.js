export default [
  {
    slug: "soc-bruteforce-rdp",
    area: "SOC / SC-200",
    title: "RDP Brute-force Detection",
    summary:
      "KQL analytic rule + SOAR playbook, Sentinel dashboard & incident report.",
    tags: ["Sentinel", "KQL", "SOAR"],
    stack: ["Microsoft Sentinel", "Log Analytics", "Logic Apps"],
    date: "2025-01",
    difficulty: "Intermediate",
    objectives: [
      "Ingest security/auth logs",
      "Write KQL rule for RDP brute-force",
      "Automate response with a Logic App",
    ],
    steps: [
      "Configure ingestion (agents / AMA).",
      "Author KQL with thresholds, grouping, noise reduction.",
      "Create Analytics Rule + alert tuning.",
      "Deploy Logic App: IP enrichment, block, ticket.",
      "Build dashboard and export report.",
    ],
    results: [
      "Robust RDP detection with low false positives.",
      "Automated remediation playbook.",
      "SOC dashboard (incidents, hosts, source IPs).",
    ],
    artifacts: {
      repo: "https://github.com/your-account/portfolio-cases/soc-bruteforce-rdp",
      pdf: "/assets/casefiles/soc-bruteforce-rdp.pdf"
    }
  },
  {
    slug: "azure-zero-trust",
    area: "Azure / AZ-500",
    title: "Azure Zero Trust Lab",
    summary:
      "Conditional Access, Defender for Cloud, Key Vault. Policies & hardening.",
    tags: ["Zero Trust", "Defender", "Key Vault"],
    stack: ["Entra ID", "Defender for Cloud", "Azure Policy"],
    date: "2025-01",
    difficulty: "Intermediate",
    objectives: [
      "Segment access with Conditional Access (MFA, compliant device).",
      "Improve posture via Defender for Cloud.",
      "Centralize secrets/keys with Key Vault & RBAC.",
    ],
    steps: [
      "Create lab tenant, groups & roles (PIM optional).",
      "CA: risky patterns blocked, MFA requirements, session controls.",
      "Enable Defender for Cloud + fix recommendations.",
      "Deploy Key Vault + diagnostics + managed identity access.",
    ],
    results: [
      "Operational Zero Trust base architecture.",
      "Better security posture (Defender for Cloud).",
      "Secure secret management.",
    ],
    artifacts: {
      repo: "https://github.com/your-account/portfolio-cases/azure-zero-trust",
      pdf: "/assets/casefiles/azure-zero-trust.pdf"
    }
  },
  {
    slug: "ceh-dvwa-owasp",
    area: "Offensive / CEH",
    title: "DVWA Exploit & Mitigation",
    summary:
      "Burp Suite workflow + remediation and OWASP Top 10 mapping.",
    tags: ["Burp", "OWASP", "CEH"],
    stack: ["DVWA", "Burp Suite", "Kali"],
    date: "2025-01",
    difficulty: "Beginner+",
    objectives: [
      "Identify vulnerabilities (XSS, SQLi, brute).",
      "Propose app and WAF remediations.",
      "Document kill chain → fix.",
    ],
    steps: [
      "Run DVWA (Docker) and configure security level.",
      "Explore with Burp (Proxy, Repeater, Intruder).",
      "Exploit PoCs + screenshots; propose code/WAF fixes.",
    ],
    results: [
      "Documented PoCs, risks and remediations.",
      "OWASP Top 10 mapping.",
      "Highlight dev-sec best practices.",
    ],
    artifacts: {
      repo: "https://github.com/your-account/portfolio-cases/ceh-dvwa-owasp",
      pdf: "/assets/casefiles/ceh-dvwa-owasp.pdf"
    }
  }
];
