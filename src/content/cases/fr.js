export default [
  {
    slug: "soc-bruteforce-rdp",
    area: "SOC / SC-200",
    title: "Détection brute-force RDP",
    summary:
      "Règle KQL + playbook SOAR, dashboard Sentinel & rapport d'incident.",
    tags: ["Sentinel", "KQL", "SOAR"],
    stack: ["Microsoft Sentinel", "Log Analytics", "Logic Apps"],
    date: "2025-01",
    difficulty: "Intermédiaire",
    objectives: [
      "Ingestion des logs de sécurité Windows & Authentications",
      "Rédaction d’une règle KQL pour détecter bruteforce RDP",
      "Playbook SOAR pour auto-quarantaine + ticket",
    ],
    steps: [
      "Configurer la collecte (agents / AMA) et tables SecurityEvent/SigninLogs.",
      "Écrire la requête KQL (seuils, regroupements, suppression de faux positifs).",
      "Créer l’Analytics Rule + suppression / suppression du bruit.",
      "Déployer un Logic App : enrichissement IP, blocage, création ticket.",
      "Dashboard d’investigation + export du rapport.",
    ],
    results: [
      "Détection robuste des attaques RDP avec peu de faux positifs.",
      "Playbook de remédiation automatique documenté.",
      "Tableau de bord SOC (incidents, hôtes touchés, IP source).",
    ],
    artifacts: {
      repo: "https://github.com/ton-compte/portfolio-cases/soc-bruteforce-rdp",
      pdf: "/assets/casefiles/soc-bruteforce-rdp.pdf"
    }
  },
  {
    slug: "azure-zero-trust",
    area: "Azure / AZ-500",
    title: "Azure Zero Trust Lab",
    summary:
      "Conditional Access, Defender for Cloud, Key Vault. Politiques & durcissement.",
    tags: ["Zero Trust", "Defender", "Key Vault"],
    stack: ["Entra ID", "Defender for Cloud", "Azure Policy"],
    date: "2025-01",
    difficulty: "Intermédiaire",
    objectives: [
      "Segmenter les accès avec Conditional Access (MFA, device compliant).",
      "Durcir la surface d’attaque avec Defender for Cloud.",
      "Gérer secrets & clés via Key Vault avec RBAC.",
    ],
    steps: [
      "Créer un tenant de lab, groupes & rôles (PIM facultatif).",
      "CA : blocage de patterns risqués, exigences MFA, session controls.",
      "Activer Defender for Cloud + remediation des recommandations.",
      "Déployer Key Vault + diagnostics + accès par identités managées.",
    ],
    results: [
      "Architecture Zero Trust basique opérationnelle.",
      "Conformité & posture améliorées (Defender for Cloud).",
      "Gestion sécurisée des secrets centralisée.",
    ],
    artifacts: {
      repo: "https://github.com/ton-compte/portfolio-cases/azure-zero-trust",
      pdf: "/assets/casefiles/azure-zero-trust.pdf"
    }
  },
  {
    slug: "ceh-dvwa-owasp",
    area: "Offensive / CEH",
    title: "DVWA Exploit & Mitigation",
    summary:
      "Workflow Burp Suite + remédiation et mapping OWASP Top 10.",
    tags: ["Burp", "OWASP", "CEH"],
    stack: ["DVWA", "Burp Suite", "Kali"],
    date: "2025-01",
    difficulty: "Débutant+",
    objectives: [
      "Identifier vulnérabilités (XSS, SQLi, Auth brute).",
      "Proposer remédiations applicatives et WAF.",
      "Documenter le cycle kill-chain → fix.",
    ],
    steps: [
      "Installer DVWA (Docker) + config sécurité basse → moyenne.",
      "Fouiller avec Burp (Proxy, Repeater, Intruder).",
      "Exploit PoC + captures; proposer remédiations côté code / WAF.",
    ],
    results: [
      "PoC documentés, risques et remédiations tracées.",
      "Corrélations avec OWASP Top 10.",
      "Bonnes pratiques dev-sec mise en avant.",
    ],
    artifacts: {
      repo: "https://github.com/ton-compte/portfolio-cases/ceh-dvwa-owasp",
      pdf: "/assets/casefiles/ceh-dvwa-owasp.pdf"
    }
  }
];
