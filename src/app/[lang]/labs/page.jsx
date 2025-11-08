// src/app/[lang]/labs/page.jsx
import Link from "next/link";
import { readProjects } from "@/lib/projects-store";

/** Fallback 50 labs si data/projects.json est vide */
function buildFallback(lang) {
  const mk = (id, title, description, tags) => ({
    id, type: "lab", lang, visible: true,
    slug: null, link: "#", image: null, fileUrl: null,
    title, description, tags,
  });

  const sc200 = [
    mk("sc200-01","Mini SOC Microsoft Sentinel","Déployer Sentinel + Log Analytics, centraliser des logs et créer un premier dashboard d’alertes.",["Sentinel","KQL","Log Analytics"]),
    mk("sc200-02","Détection brute-force RDP","Simuler une attaque RDP, créer la requête KQL et documenter l’enquête SOC.",["Sentinel","Defender XDR","KQL"]),
    mk("sc200-03","Dashboard incidents XDR","Construire un dashboard XDR temps réel (API Sentinel → Power BI).",["Sentinel API","Power BI"]),
    mk("sc200-04","Intégration Sysmon","Ingestion Sysmon, parsing et hunting rules endpoint.",["Sysmon","KQL","Endpoint"]),
    mk("sc200-05","Règle KQL personnalisée","Créer, tester et versionner une règle d’alerte KQL.",["KQL","Detection Rules"]),
    mk("sc200-06","Détection scan Nmap","Corrélation d’un scan Nmap et alerte Defender/Sentinel.",["Nmap","Sentinel","Defender"]),
    mk("sc200-07","SOAR playbook (Logic Apps)","Automatiser la réponse (isolation, tagging, notification).",["Logic Apps","SOAR"]),
    mk("sc200-08","Rapport hebdo incidents auto","Génération automatique d’un rapport incidents (Power Automate).",["Power Automate","Reporting"]),
    mk("sc200-09","Simulation phishing interne","Détection Defender for O365 → triage & remédiation.",["Defender O365","Phishing"]),
    mk("sc200-10","Livre blanc SOC Azure","Documente ton approche SOC end-to-end.",["Documentation","SOC"]),
  ];

  const az500 = [
    mk("az500-11","Tenant Azure sécurisé (de A à Z)","Mise en place d’un tenant durci selon les bonnes pratiques.",["Zero Trust","Azure Security"]),
    mk("az500-12","Pare-feu Azure + NSG + Bastion","Segmentation réseau, bastion et règles NSG.",["Azure Network","NSG","Bastion"]),
    mk("az500-13","Key Vault & gestion des secrets","Rotation de secrets, RBAC, access policies.",["Key Vault","RBAC"]),
    mk("az500-14","Activer Defender for Cloud","Recommandations & alertes, capture et remédiation.",["Defender for Cloud"]),
    mk("az500-15","Chiffrement stockage & disques","At-rest, CMK/MK, encryption scopes.",["Storage","Encryption"]),
    mk("az500-16","Web App sécurisé (HTTPS/WAF)","Front Door/WAF, HTTPS only, headers sécurité.",["Web App","Front Door","WAF"]),
    mk("az500-17","Policy RGPD / conformité","Azure Policy & Compliance, règles sur ressources.",["Azure Policy","Compliance"]),
    mk("az500-18","Lab multi-région Zero Trust","Topo multi-régions + identité centrale.",["Zero Trust","Network"]),
    mk("az500-19","Attaque VM + alerte Defender","Déclencher et analyser une alerte Defender.",["Defender","Investigation"]),
    mk("az500-20","Azure Security Baseline (visuel)","Poster/slide clair des baselines Azure.",["Baseline","Poster"]),
  ];

  const sc300 = [
    mk("sc300-21","Entra ID : rôles & groupes","Modèle d’admin, rôles, groupes, RBAC.",["Entra ID","RBAC"]),
    mk("sc300-22","MFA + Conditional Access","Politiques d’accès conditionnel Zero Trust.",["MFA","Conditional Access"]),
    mk("sc300-23","Blocage d’accès suspect","Simuler un accès anormal et prouver le blocage.",["Risky sign-in","Logs"]),
    mk("sc300-24","Diagramme Zero Trust","Synthèse visuelle (utilisateurs, devices, apps).",["Architecture","Zero Trust"]),
    mk("sc300-25","SSO SAML avec app SaaS","Intégration SSO d’une app tierce.",["SAML","SSO"]),
    mk("sc300-26","Audit rôles à privilèges (PIM)","Activation JIT, revue d’accès périodique.",["PIM","Privileged Access"]),
    mk("sc300-27","Passwordless authentication","Démo authentification sans mot de passe.",["Passwordless","Security"]),
    mk("sc300-28","Charte IAM complète","Document de gouvernance et bonnes pratiques.",["IAM","Gouvernance"]),
  ];

  const sc100 = [
    mk("sc100-29","Arch. Zero Trust complète","Modèle global identité, réseau, devices, apps, data.",["Architecture","Zero Trust"]),
    mk("sc100-30","Diagramme XDR multi-produit","Comment XDR/SIEM/SOAR interagissent.",["XDR","SIEM","SOAR"]),
    mk("sc100-31","Analyse de risque Cloud","Approche ISO 27005 / CIS Controls.",["Risk","ISO27005"]),
    mk("sc100-32","BCP/DRP Cloud","Plan de continuité et reprise (Recovery Services).",["BCP","DRP"]),
    mk("sc100-33","Architecture hybride Azure–On-prem","Azure Arc + liens hybrides sécurisés.",["Azure Arc","Hybrid"]),
    mk("sc100-34","Politique cybersécurité","Document de politique & principes.",["Policy","GRC"]),
    mk("sc100-35","Intégration XDR–SIEM–SOAR","Schéma d’architecture d’orchestration.",["Architecture","SIEM","SOAR"]),
  ];

  const ceh = [
    mk("ceh-36","Metasploit – vulnérabilités locales","Exploitation de base et rapport d’audit.",["Kali","Metasploit"]),
    mk("ceh-37","Scan réseau complet","Nmap/Zenmap et analyse de surface d’attaque.",["Nmap","Discovery"]),
    mk("ceh-38","Faille web DVWA + mitigation","Exploit Burp puis remédiation OWASP.",["DVWA","Burp","OWASP"]),
    mk("ceh-39","Script d’audit Python","Petit script d’audit (ports, versions, failles).",["Python","Audit"]),
    mk("ceh-40","Rapport d’audit CEH","Template complet et exhaustif.",["Reporting","CEH"]),
    mk("ceh-41","Handshake WPA2 + crack","Capture et démonstration aircrack-ng.",["Aircrack-ng","Wi-Fi"]),
    mk("ceh-42","MITM sur lab isolé","Ettercap + Wireshark, schéma des flux.",["MITM","Wireshark"]),
    mk("ceh-43","Guide éthique du pentest","Bonnes pratiques & cadre légal.",["Éthique","Pentest"]),
  ];

  const grc = [
    mk("grc-44","Politique de sécurité interne","Document officiel adaptable en entreprise.",["Policy","GRC"]),
    mk("grc-45","Gestion de risques ISO 27005","Matrice de risques opérationnelle.",["ISO27005","Risk"]),
    mk("grc-46","Registre des actifs + classification","Catalogue des actifs et sensibilités.",["Assets","Classification"]),
    mk("grc-47","Procédure de gestion d’incident","Rôles, seuils et processus d’escalade.",["IR","Process"]),
    mk("grc-48","Politique d’accès aux données","Principe du moindre privilège, revues.",["Data Access","IAM"]),
    mk("grc-49","Plan d’audit sécurité annuel","Roadmap d’audits et contrôles.",["Audit Plan","GRC"]),
    mk("grc-50","Maturité cybersécurité (DSI)","Présentation exécutive et KPIs.",["Roadmap","Board"]),
  ];

  return [...sc200, ...az500, ...sc300, ...sc100, ...ceh, ...grc];
}

export default async function LabsPage({ params }) {
  const { lang } = await params; // Next 16: params est une Promise

  const data = (await readProjects()).filter(
    (i) => i.type === "lab" && i.lang === lang && i.visible !== false
  );
  const items = data.length ? data : buildFallback(lang);

  return (
    <section className="pt-28 px-6 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-zinc-100">
          Labs / Dossiers
        </h1>
        <p className="text-zinc-300/90 mb-8">
          Extraits concrets — cliquez sur une carte pour ouvrir le Case File ou
          télécharger le livrable.
        </p>

        {data.length === 0 && (
          <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-4 text-zinc-300/90">
            <strong>Astuce :</strong> copie une carte du fallback dans
            <code className="mx-1">data/projects.json</code> (type <code>"lab"</code>,
            <code className="mx-1">lang</code>: “{lang}”, <code>visible</code>: true,
            ajoute idéalement un <code>slug</code> et une <code>image</code>).
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((it) => {
            const href = it?.slug ? `/${lang}/labs/${it.slug}` : it?.link || null;

            return (
              <article
                key={it.id || it.slug || it.title}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition text-base md:text-[18px] leading-relaxed tracking-[0.01em]"
              >
                {/* Image cliquable si dispo (sans imbriquer de <a>) */}
                {it.image && href ? (
                  <Link href={href}>
                    <img
                      src={it.image}
                      alt=""
                      className="rounded-xl mb-4 aspect-video object-cover"
                    />
                  </Link>
                ) : (
                  it.image && (
                    <img
                      src={it.image}
                      alt=""
                      className="rounded-xl mb-4 aspect-video object-cover"
                    />
                  )
                )}

                {/* Titre cliquable si href */}
                {href ? (
                  <h3 className="text-xl font-semibold mb-2 text-zinc-100">
                    <Link
                      href={href}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      {it.title}
                    </Link>
                  </h3>
                ) : (
                  <h3 className="text-xl font-semibold mb-2 text-zinc-100">
                    {it.title}
                  </h3>
                )}

                {it.subtitle && (
                  <p className="text-zinc-300/90 mb-1">{it.subtitle}</p>
                )}
                <p className="text-zinc-300/90 mb-4">
                  {it.description || it.summary}
                </p>

                {/* Tags */}
                {Array.isArray(it.tags) && it.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {it.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA (pas de lien imbriqué) */}
                <div className="flex gap-3">
                  {href && (
                    <Link
                      href={href}
                      className="h-10 px-4 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      Voir
                    </Link>
                  )}
                  {it.fileUrl && (
                    <a
                      href={it.fileUrl}
                      className="h-10 px-4 rounded-xl border border-white/15 grid place-items-center text-zinc-100 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      Télécharger
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
