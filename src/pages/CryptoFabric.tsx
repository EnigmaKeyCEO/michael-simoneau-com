import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { MainNav } from '../components/MainNav';

const businessOverview = [
  {
    title: 'Single orchestration plane',
    description:
      'Centralizes onboarding, guardrails, and rollout policies across dozens of profit-seeking services without bespoke scripting.',
  },
  {
    title: 'Native mobile superpowers',
    description:
      'Ships white-labeled iOS and Android binaries for Super Admins and client tenants, generated straight from Firebase Remote Config + Expo profiles.',
  },
  {
    title: 'Profitability telemetry out of the box',
    description:
      'Every module reports revenue, spend, and profit indices back to the Control Center so new strategies compete on actual margins instead of projections.',
  },
  {
    title: 'Promotion-ready workflow',
    description:
      'Operators launch the Expo-powered Super Admin, evaluate services against live Firebase data, and promote to production once profitability and guardrail checks pass.',
  },
  {
    title: 'Real-time profit telemetry',
    description:
      'Mobile dashboards surface profitability, burn, and guardrail scores so field teams can pivot strategies with current margins rather than lagging reports.',
  },
];

const differentiators = [
  {
    title: 'Designed for regulated teams',
    description:
      'Secrets stay in Google Secret Manager, IAM/IAP wrap the hosted dashboard, and manifests are policy-checked before rollout.',
  },
  {
    title: 'Profit-aware automation',
    description:
      'The orchestrator only scales when profitability indices stay positive, reducing costly experiments.',
  },
  {
    title: 'Two-speed delivery',
    description:
      'Development stays Python-only and bill-free, while production uses Cloud Run + Artifact Registry with the same manifests.',
  },
];

const operatingModes = [
  {
    title: 'No-Cost Dev',
    description:
      'Launch with DEV_NO_COST=true, swapping Google Cloud APIs for local adapters such as Secret Manager stubs, Pub/Sub emulator, and mock AI providers. Developers can run the entire wizard without installing gcloud.',
    notes: 'See DEVELOPMENT.md for the full playbook.',
  },
  {
    title: 'Production',
    description:
      'Toggle DEV_NO_COST=false and CLOUD_DEPLOY=true to deploy the curated stack to Cloud Run behind IAP. Policy gates ensure only opted-in environments spend money while native builds inherit the tenant Remote Config payload.',
  },
];

const quickStartCommands = [
  'yarn install',
  'export EXPO_PUBLIC_FIREBASE_PROJECT_ID="my-firebase-project"',
  'export EXPO_PUBLIC_FIREBASE_API_KEY="<api-key>"',
  '# ... set remaining EXPO_PUBLIC_FIREBASE_* variables or run the Firebase bootstrap script ...',
  'yarn workspace crypto-fabric-admin start --web',
];

const architectureSnapshot = [
  {
    title: 'ProfitService & registry (core/)',
    description:
      'Provides the lifecycle contract for every workload and auto-discovers manifests, environment defaults, and wizard routers for dynamic Control Center rendering.',
  },
  {
    title: 'Guardrails & telemetry (core/costs.py, core/metrics.py)',
    description:
      'Model profitability, enforce scaling budgets, and surface dashboards without bespoke wiring.',
  },
  {
    title: 'Treasury automations (core/treasury.py)',
    description:
      'Handle revenue sweeps, ETH payouts, and reinvestment policies once strategies are profitable.',
  },
  {
    title: 'GCP integration (core/gcp.py)',
    description:
      'Supplies Cloud Run and Artifact Registry clients, falling back to local adapters whenever DEV_NO_COST=true.',
  },
];

const mobileValue = [
  'White-labeled client apps deliver branded experiences generated from Firestore and Remote Config metadata without touching native code.',
  'The Super Admin mobile app mirrors the web Control Center, letting leadership approve guardrail overrides and promotions from their phones.',
  'Firebase-native distribution orchestrates over-the-air config pushes, store submissions, and instant rollbacks without expensive mobile DevOps cycles.',
  'Investor-grade analytics blend profitability indices, capital efficiency, and engagement so forecasts mirror live performance.',
  'YachtOffice + YOToken flywheel ties tenant profits to tokenized cash flows, giving investors upside from every automated deployment.',
];

const profitFlywheel = [
  'Realtime profitability receipts land in Firestore and Cloud Monitoring, offering day-to-day telemetry without custom dashboards.',
  'Treasury-backed tokenization extends cash flows to YOToken, positioning it as a crypto instrument with verifiable intrinsic value.',
  'A compounding services catalog lets Super Admins bundle new profit engines into white-labeled mobile experiences while keeping operating costs flat.',
];

const modularServiceCatalog = [
  {
    directory: 'services/opportunistic/aave-liquidator/',
    manifest: 'aave-liquidator',
    tier: 'tier-c',
    focus: 'Opportunistic liquidations with on-chain guardrails.',
  },
  {
    directory: 'services/akash/akash/',
    manifest: 'akash-provider',
    tier: 'tier-b',
    focus: 'Leasing compute capacity on Akash with region-aware scaling.',
  },
  {
    directory: 'services/eigen/eigen/',
    manifest: 'eigen-operator',
    tier: 'tier-a',
    focus: 'EigenLayer restaking operator orchestration.',
  },
  {
    directory: 'services/forta/forta-node/',
    manifest: 'forta-node',
    tier: 'tier-b',
    focus: 'Forta threat detection node with allowlist management.',
  },
  {
    directory: 'services/trading/freqtrade/',
    manifest: 'freqtrade',
    tier: 'tier-b',
    focus: 'Freqtrade trading cluster with exchange rotation.',
  },
  {
    directory: 'services/hopr/hopr/',
    manifest: 'hopr-node',
    tier: 'tier-b',
    focus: 'HOPR privacy node with bandwidth controls.',
  },
  {
    directory: 'services/trading/hummingbot/',
    manifest: 'hummingbot',
    tier: 'tier-b',
    focus: 'Market making automation sourcing configs from Cloud Storage.',
  },
  {
    directory: 'services/opportunistic/stat-arb-l2/',
    manifest: 'stat-arb-l2',
    tier: 'tier-b',
    focus: 'Cross-chain arbitrage router tuned for gas ceilings.',
  },
  {
    directory: 'services/lava/provider-base/',
    manifest: 'provider-base',
    tier: 'tier-b',
    focus: 'Lava RPC provider footprint focused on Base.',
  },
  {
    directory: 'services/opportunistic/mev-share/',
    manifest: 'mev-share',
    tier: 'tier-b',
    focus: 'Builder-compatible MEV-Share strategies with bundle caps.',
  },
  {
    directory: 'services/nym/nym/',
    manifest: 'nym-gateway',
    tier: 'tier-b',
    focus: 'NYM gateway bandwidth scheduling and mixnet layering.',
  },
  {
    directory: 'services/pocket/pocket/',
    manifest: 'pocket-node',
    tier: 'tier-b',
    focus: 'Pocket Network validator relays and payout automation.',
  },
  {
    directory: 'services/saturn/saturn-node/',
    manifest: 'saturn-node',
    tier: 'tier-b',
    focus: 'Saturn CDN cache nodes with regional peering.',
  },
  {
    directory: 'services/ssv/operator/',
    manifest: 'operator',
    tier: 'tier-b',
    focus: 'SSV distributed validators with DKG support.',
  },
  {
    directory: 'services/storj/storj/',
    manifest: 'storj',
    tier: 'tier-b',
    focus: 'Storj storage nodes with ingress/egress accounting.',
  },
  {
    directory: 'services/core/treasury/reinvestor/',
    manifest: 'reinvestor',
    tier: 'tier-a',
    focus: 'Capital allocation engine for profitable reinvestment.',
  },
];

const coreServiceStack = [
  {
    service: 'orchestrator',
    description:
      'Plans and schedules profitability-aware workloads on a Tier-A GKE Autopilot cluster with guardrails sourced from core/costs.py.',
  },
  {
    service: 'command-center',
    description:
      'IAM-aware Cloud Run portal exposing registry state, guardrail status, and documentation links via the FastAPI app in services/core/command-center/command-center.py.',
  },
  {
    service: 'cost-exporter',
    description:
      'Normalises Cloud Billing data into unit-cost metrics via services/core/cost-exporter/cost-exporter.py.',
  },
  {
    service: 'telemetry',
    description:
      'Bridges exporter data into Cloud Monitoring dashboards and alerting policies via TelemetryAggregator + MetricsPublisher.',
  },
];

const googleCloudAlignment = [
  'All compute lands on GKE Autopilot or Cloud Run via helpers in core/gcp.py with no alternative execution paths.',
  'Secrets are referenced via projects/<project>/secrets/<name>/versions/latest placeholders so rotations stay in Secret Manager.',
  'Services emit profitability metrics through the shared ProfitTelemetry structure, bridging into Cloud Monitoring dashboards.',
  'Manifests expose per-service revenue and spend assumptions so the orchestrator can enforce revenue_per_hour >= spend_per_hour.',
];

const contributingSteps = [
  'Create services/<stack>/<service-name>/.',
  'Add <service-name>.yml or .yaml with a service.entrypoint pointing at a ProfitService subclass.',
  'Document configuration with <service-name>.env and <service-name>.secrets.example.',
  'Implement <service-name>.py extending ProfitService and using GCPEnvironment helpers.',
  'Implement wizard.py subclassing core.ServiceWizard so onboarding flows stay consistent.',
  'Update the stack manifest (e.g., services/<stack>/<stack>.yml) to list the new service and validate discovery from the Control Center.',
];

const pricingContext = [
  {
    title: 'Cloud Run compute',
    description:
      'In us-central1, active CPU is billed at $0.000024 per vCPU-second and memory at $0.000002 per GiB-second after the free tier (240,000 vCPU-seconds and 450,000 GiB-seconds each month). Idle min-instances remain disabled in dev mode.',
  },
  {
    title: 'Scenario',
    description:
      'Two 1 vCPU / 2 GiB services running eight hours per day for a month consume 1,728,000 vCPU-seconds and 3,456,000 GiB-seconds. After subtracting the free tier, the monthly spend is roughly $41.72 (≈$35.71 CPU + $6.01 memory) before network egress.',
  },
  {
    title: 'Messaging',
    description:
      'Cloud Run includes 2 million requests per month at no additional cost, covering most Control Center internal traffic.',
  },
];

const CryptoFabric: React.FC = () => {
  const keywords = useMemo(
    () => [
      'Crypto Fabric',
      'GCP crypto automation platform',
      'digital asset profitability control center',
      'Cloud Run profitability guardrails',
      'Firebase Expo Super Admin automation',
      'Michael Simoneau Crypto Fabric',
    ],
    [],
  );

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Crypto Fabric — Modular GCP Architecture & Control Center',
      description:
        'Crypto Fabric is a profitability-first automation platform pairing a guided Control Center with compliant service templates for staking, trading, and infrastructure workloads.',
      brand: {
        '@type': 'Organization',
        name: 'Enigma Key Industries, LLC',
      },
      audience: {
        '@type': 'Audience',
        audienceType: 'Digital-asset operators, regulated finance teams, and Web3 infrastructure leaders',
      },
      url: 'https://www.michaelsimoneau.com/crypto-fabric',
      keywords,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/PreOrder',
        description: 'Zero-cost developer mode with upgrade path to production Cloud Run workloads.',
      },
    }),
    [keywords],
  );

  return (
    <>
      <Seo
        title="Crypto Fabric — Modular GCP Architecture & Control Center"
        description="Explore Crypto Fabric, a profitability-first automation platform for digital-asset operators with guardrail-enforced Cloud Run deployments and mobile-first telemetry."
        canonicalUrl="https://www.michaelsimoneau.com/crypto-fabric"
        keywords={keywords}
        structuredData={structuredData}
      />
      <AnimatedBackground />
      <MainNav />
      <main className="relative z-10 pt-24 md:pt-32 pb-24 text-white">
        <div className="container mx-auto px-4">
          <motion.section
            className="bg-black/60 border border-cyan-400/40 rounded-3xl p-8 md:p-12 shadow-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">GCP Crypto Operating Fabric</span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Crypto Fabric — Modular GCP Architecture &amp; Control Center
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl">
              Crypto Fabric is a profitability-first automation platform for digital-asset operators. The system pairs a guided Control Center with service templates that keep staking, trading, and infrastructure workloads compliant with the same guardrails. Start in a zero-cost developer mode, test locally, and promote to Cloud Run once you are ready to generate yield.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#business-overview"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cyan-500 text-black font-semibold hover:bg-cyan-300 transition"
              >
                Dive into the capabilities
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-cyan-400 text-cyan-200 hover:text-black hover:bg-cyan-200 transition"
              >
                Return to homepage
              </Link>
            </div>
          </motion.section>

          <motion.section
            id="business-overview"
            className="mt-16 grid gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-4">Business overview</h2>
              <p className="text-gray-300">
                A single orchestration fabric keeps every revenue-seeking workload aligned to profitability guardrails and consistent governance.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {businessOverview.map(item => (
                <div key={item.title} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-cyan-300 mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-900/60 border border-cyan-400/30 rounded-3xl p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">What makes Crypto Fabric different</h2>
              <ol className="list-decimal list-inside space-y-4 text-gray-200">
                {differentiators.map(item => (
                  <li key={item.title}>
                    <span className="font-semibold text-cyan-200">{item.title}:</span> {item.description}
                  </li>
                ))}
              </ol>
            </div>
          </motion.section>

          <motion.section
            id="operating-modes"
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">Operating modes</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {operatingModes.map(mode => (
                <div key={mode.title} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-2xl font-semibold text-cyan-300 mb-3">{mode.title}</h3>
                  <p className="text-gray-300 mb-3">{mode.description}</p>
                  {mode.notes ? (
                    <p className="text-sm text-gray-400">{mode.notes}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="quick-start"
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black/70 border border-gray-800 rounded-3xl p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-4">Quick start — launch the Control Center</h2>
              <p className="text-gray-300 mb-6 max-w-3xl">
                Provision Firebase credentials, honour the zero-cost defaults, and explore the Control Center locally before committing to Cloud Run spend.
              </p>
              <pre className="bg-gray-950/80 border border-gray-800 rounded-2xl p-6 overflow-x-auto text-sm">
                <code>
                  {quickStartCommands.join('\n')}
                </code>
              </pre>
              <p className="mt-6 text-sm text-gray-400">
                Zero-cost defaults ensure DEV_NO_COST=true until profitability gates clear. Install Google Cloud SDKs only when you intentionally promote to production.
              </p>
              <div className="mt-6 space-y-3 text-gray-200">
                <p>
                  The Expo development server authenticates with Google IAM and opens the web Control Center so you can bootstrap core infrastructure, run service wizards, and launch guardrail-enforced workloads.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Bootstrap the core footprint — provision Artifact Registry, Secret Manager scaffolding, and the telemetry bus.</li>
                  <li>Run service wizards — collect credentials, verify guardrails, and publish Secret Manager entries before deploys proceed.</li>
                  <li>Launch workloads — apply Cloud Run manifests and stream profitability metrics to dashboards.</li>
                </ol>
              </div>
            </div>
          </motion.section>

          <motion.section
            id="firebase-bootstrap"
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">Bootstrap the Super Admin Firebase API key</h2>
              <p className="text-gray-300 mb-6">
                Every tenant receives a dedicated Firebase Web API key stored alongside the client record. A background Firebase Function issues keys for new clients and the Expo build pipeline writes them into admin/.env.local automatically.
              </p>
              <ol className="list-decimal list-inside space-y-3 text-gray-200">
                <li>Authenticate with a service account that can write to the staging Firestore project (set GOOGLE_APPLICATION_CREDENTIALS).</li>
                <li>Run <code className="bg-gray-800/80 px-2 py-1 rounded">node ./scripts/create-default-client.mjs</code> to create or refresh the default client record.</li>
                <li>Run <code className="bg-gray-800/80 px-2 py-1 rounded">yarn build</code> or <code className="bg-gray-800/80 px-2 py-1 rounded">yarn start</code> to generate admin/.env.local using Firestore values.</li>
              </ol>
              <p className="text-sm text-gray-400 mt-4">
                Optional flags like --client, --name, and --owner-email seed alternative tenants while falling back to EXPO_PUBLIC_FIREBASE_* variables for unspecified fields.
              </p>
            </div>
          </motion.section>

          <motion.section
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">Static hosting artifacts</h2>
              <p className="text-gray-300 mb-4">
                Firebase Hosting serves three entry points: the public client portal (/app), the Super Admin interface (/admin), and a root document forwarding to the portal.
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-200">
                <li><span className="font-semibold text-cyan-200">dist/index.html</span> — branded landing page redirecting the bare domain to /app/.</li>
                <li><span className="font-semibold text-cyan-200">dist/sitemap.xml</span> — exposes /app/ and /admin/ to crawlers so Super Admin URLs remain discoverable.</li>
                <li><span className="font-semibold text-cyan-200">dist/robots.txt</span> — points search engines at the sitemap.</li>
              </ul>
              <p className="text-sm text-gray-400 mt-4">
                Set CF_HOSTING_BASE_URL to your production domain during builds to embed correct absolute URLs. When unset, tooling defaults to https://localhost for hermetic emulator runs.
              </p>
            </div>
          </motion.section>

          <motion.section
            id="architecture"
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">Architecture snapshot</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {architectureSnapshot.map(item => (
                <div key={item.title} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-cyan-300 mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="core-services"
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Core service stack</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-gray-200">
                <thead className="uppercase text-xs text-gray-400 border-b border-gray-700">
                  <tr>
                    <th className="py-3 pr-6">Service</th>
                    <th className="py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {coreServiceStack.map(item => (
                    <tr key={item.service} className="border-b border-gray-800/60">
                      <td className="py-4 pr-6 font-semibold text-cyan-200">{item.service}</td>
                      <td className="py-4 text-gray-300">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          <motion.section
            id="mobile-first"
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black/70 border border-cyan-400/30 rounded-3xl p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">Mobile-first value creation</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-200">
                {mobileValue.map(point => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.section>

          <motion.section
            id="profit-flywheel"
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">Profit flywheel &amp; YachtOffice alignment</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-200">
                {profitFlywheel.map(point => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.section>

          <motion.section
            id="service-catalog"
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Modular service catalog</h2>
            <p className="text-gray-300 mb-6 max-w-4xl">
              Legacy workloads from the monolithic orchestrator now live in dedicated service directories so teams can compose new stacks without reintroducing tight coupling. The registry auto-discovers the modules below.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-gray-200">
                <thead className="uppercase text-xs text-gray-400 border-b border-gray-700">
                  <tr>
                    <th className="py-3 pr-6">Directory</th>
                    <th className="py-3 pr-6">Manifest</th>
                    <th className="py-3 pr-6">Default tier</th>
                    <th className="py-3">Primary focus</th>
                  </tr>
                </thead>
                <tbody>
                  {modularServiceCatalog.map(item => (
                    <tr key={item.directory} className="border-b border-gray-800/60">
                      <td className="py-4 pr-6 font-mono text-xs text-cyan-200">{item.directory}</td>
                      <td className="py-4 pr-6">{item.manifest}</td>
                      <td className="py-4 pr-6 text-gray-400">{item.tier}</td>
                      <td className="py-4 text-gray-300">{item.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          <motion.section
            id="pricing"
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black/70 border border-cyan-400/30 rounded-3xl p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">Cost outlook &amp; pricing context</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {pricingContext.map(item => (
                  <div key={item.title} className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
                    <h3 className="text-lg font-semibold text-cyan-200 mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-6">
                Because the orchestrator only scales services when profitability indices stay above zero, teams can evaluate rollouts against concrete budgets before flipping the production toggle.
              </p>
            </div>
          </motion.section>

          <motion.section
            id="google-cloud-alignment"
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Google Cloud alignment</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-200">
              {googleCloudAlignment.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            id="contributing"
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">Contributing new services</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-200">
                {contributingSteps.map(step => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className="text-sm text-gray-400 mt-6">
                From the Super Admin workspace, open the stack catalog to confirm discovery and run profitability planning before promoting services.
              </p>
            </div>
          </motion.section>

          <motion.section
            id="license"
            className="mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black/70 border border-red-400/40 rounded-3xl p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">Crypto Fabric GCP Private License (Root Repository)</h2>
              <p className="text-sm text-gray-300 mb-6">
                Version 1.0 — Effective on execution by Holder
              </p>
              <div className="space-y-5 text-gray-200 text-sm leading-relaxed">
                <section>
                  <h3 className="text-lg font-semibold text-red-300 mb-2">1. Ownership</h3>
                  <p>Enigma Key Industries, LLC exclusively owns all source code, documentation, configurations, and artifacts contained in the root crypto-fabric-gcp repository. All rights not expressly granted are reserved.</p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-red-300 mb-2">2. Limited Viewing Grant</h3>
                  <p>Licensees may view the Root Assets solely for internal security review and due diligence. No build, execution, distribution, adaptation, or derivative use is authorized without a separate commercial agreement covering the intended use.</p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-red-300 mb-2">3. Prohibited Uses</h3>
                  <p>Copying, distributing, hosting, modifying, reverse engineering, or removing proprietary notices from the Root Assets is prohibited without prior written authorization. Any attempt beyond viewing voids this license and triggers enforcement.</p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-red-300 mb-2">4. Payment &amp; Commercial Access</h3>
                  <p>Production, staging, testing, or proof-of-concept usage requires an executed agreement and payment of all fees, including success-based profit shares. Unauthorized use triggers suspension, back-billing plus 35% penalty, and disgorgement of gains.</p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-red-300 mb-2">5. Confidentiality</h3>
                  <p>The Root Assets are confidential trade secrets. Licensees must protect them with commercially reasonable safeguards and may disclose them only to bound employees or advisors for the permitted purpose.</p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-red-300 mb-2">6. Audit &amp; Verification</h3>
                  <p>Licensor may request written certification of compliance and audit systems used to access the Root Assets. Licensees bear the costs of any audit revealing a breach.</p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-red-300 mb-2">7. Termination</h3>
                  <p>Licensor may terminate the license upon breach. Licensees must delete all copies of the Root Assets and certify destruction within five business days.</p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-red-300 mb-2">8. Governing Law &amp; Venue</h3>
                  <p>The license is governed by Delaware law with exclusive jurisdiction in Wilmington courts.</p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-red-300 mb-2">9. Remedies</h3>
                  <p>Unauthorized use causes irreparable harm. Licensor is entitled to equitable relief, damages, and recovery of attorneys' fees, and Licensees must indemnify the Licensor against claims arising from breach.</p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-red-300 mb-2">10. Entire Agreement</h3>
                  <p>The document constitutes the entire agreement for viewing rights to the Root Assets and supersedes prior discussions. No modifications are valid without a signed writing from the Licensor.</p>
                </section>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="mt-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-cyan-500/10 border border-cyan-400/40 rounded-3xl p-8 md:p-10 text-center">
              <h2 className="text-3xl font-bold text-cyan-200 mb-4">Ready to operationalize profitability guardrails?</h2>
              <p className="text-gray-200 mb-6 max-w-3xl mx-auto">
                Connect with Michael Simoneau to plan your Crypto Fabric rollout, align stakeholders, and fast-track compliant digital-asset operations on Google Cloud.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:bg-white transition"
              >
                Explore advisory services
              </Link>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
};

export default CryptoFabric;
export { CryptoFabric };
