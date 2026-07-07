export interface Platform {
  name: string;
  acronym: string;
  slug: string;
  description: string;
  industry: string;
  regulatoryBasis: string;
  whoMustSubmit: string;
  dataType: string;
  whatItDoes: string;
  managedBy: string;
  icon: string;
  howWeHelp: Array<{ title: string; description: string }>;
}

const platforms: Platform[] = [
  {
    name: 'International Material Data System',
    acronym: 'IMDS',
    slug: 'imds',
    description: 'The global automotive industry system for collecting, storing, and managing material data across the automotive supply chain. Used by OEMs worldwide to document vehicle substance compliance.',
    industry: 'Automotive',
    regulatoryBasis: 'ELV Directive, GADSL, REACH, RoHS (automotive)',
    whoMustSubmit: 'Automotive manufacturers, Tier 1/2/3 suppliers',
    dataType: 'Material composition, substance declarations, recycling data',
    managedBy: 'Hewlett-Packard / BMW Group (joint management)',
    icon: 'Car',
    whatItDoes: `The International Material Data System (IMDS) is the automotive industry's global material data system, developed and jointly managed by Hewlett-Packard and BMW Group. It serves as the central database where automotive suppliers document the material composition of every component they supply, and OEMs aggregate this data to demonstrate vehicle-level compliance with the ELV Directive, GADSL, and REACH SVHC requirements.

IMDS works through a hierarchical supply chain structure: sub-component suppliers create Material Data Sheets (MDS) at the lowest level, Tier 2 suppliers aggregate these into module MDS, and Tier 1 suppliers combine module MDS into system MDS before forwarding to the OEM. Each MDS captures the material classification, substance content, weight, and recycling data for each component.

All major automotive OEMs including BMW, Daimler, Ford, General Motors, Honda, PSA (Stellantis), Renault, Toyota, Volkswagen, and many others — mandate IMDS submissions as a condition of supply. IMDS is effectively the universal language of automotive material compliance.`,
    howWeHelp: [
      {
        title: 'IMDS Account Setup & Management',
        description: 'We set up your IMDS organization account, configure user permissions, and establish your company\'s position in the IMDS supply chain hierarchy. For companies new to IMDS, we provide comprehensive onboarding training and system configuration.',
      },
      {
        title: 'Material Data Sheet Creation',
        description: 'Creating accurate, validated IMDS MDS requires deep knowledge of material classification systems, substance thresholds, and IMDS recommendation rules. We create MDS for your components from scratch using your material data, ensuring all substances are correctly identified, all mandatory data fields are complete, and the MDS passes IMDS validation checks.',
      },
      {
        title: 'Supplier Data Collection',
        description: 'Many IMDS compliance challenges stem from incomplete or incorrect data from sub-suppliers. We design and manage supplier data collection programs, issue targeted IMDS requests to your suppliers, follow up on overdue submissions, review received MDS for quality and accuracy, and consolidate the data into your component MDS.',
      },
      {
        title: 'OEM Submission & Error Resolution',
        description: 'We manage the submission of your MDS to OEM recipients and handle all rejection and error queries. Common issues include substance threshold violations, incorrect recycling data, and category mapping errors — we resolve these efficiently, maintaining your OEM relationship and delivery timelines.',
      },
    ],
  },
  {
    name: 'Compliance Data Exchange',
    acronym: 'CDX',
    slug: 'cdx',
    description: 'Non-automotive industry supply chain platform for exchanging material composition and substance compliance data — developed by DXC Technology, the same company behind IMDS.',
    industry: 'Non-Automotive (Electronics, Consumer, Industrial, Heavy Equipment)',
    regulatoryBasis: 'REACH, RoHS, WEEE, EU Product Regulations, Customer-specific requirements',
    whoMustSubmit: 'Suppliers and manufacturers in non-automotive industries responding to customer substance data requests',
    dataType: 'Material composition, substance declarations, REACH SVHC status, RoHS compliance data',
    managedBy: 'DXC Technology (same developer as IMDS)',
    icon: 'Package',
    whatItDoes: `Compliance Data Exchange (CDX) is the non-automotive industry's counterpart to IMDS developed by DXC Technology, the same company that developed and operates the International Material Data System (IMDS) for the automotive industry. CDX serves as a supply chain data exchange platform that enables companies outside the automotive sector to collect, manage, and communicate material composition and substance compliance data across their supply chains.

While IMDS is mandated by automotive OEMs for vehicle-related components, CDX serves the equivalent function in non-automotive sectors such as electronics, consumer goods, industrial equipment, heavy machinery, and general manufacturing. Companies in these industries use CDX to request and receive structured substance declaration data from their suppliers, demonstrating compliance with regulations such as REACH (SVHC declarations), RoHS, WEEE, and other applicable product regulations.

CDX allows non-automotive companies to create and manage Bills of Materials (BOM) with substance-level data, collect supplier declarations in a structured format, screen materials against multiple regulatory lists simultaneously, and generate compliance documentation for customer audits and regulatory submissions. The platform bridges the gap between raw material suppliers and brand owners, enabling systematic substance data flow through complex non-automotive supply chains.

For electronics and consumer goods manufacturers, CDX facilitates RoHS and REACH compliance data collection at scale. Heavy equipment and industrial machinery manufacturers use CDX to manage multi-tier supply chain substance data.`,
    howWeHelp: [
      {
        title: 'CDX Account Setup & Onboarding',
        description: 'We set up your CDX organization account, configure material hierarchies, and establish supplier communication workflows. Our team ensures your CDX instance is aligned with your product structure and the specific regulatory requirements of your industry and customer base.',
      },
      {
        title: 'Supplier Data Collection & Management',
        description: 'Collecting accurate substance data from non-automotive supply chains presents unique challenges — many suppliers are unfamiliar with structured data exchange platforms. We design and manage supplier engagement programs, train suppliers on CDX data entry, follow up on overdue responses, and quality-review all incoming declarations before they enter your compliance database.',
      },
      {
        title: 'BOM Substance Screening',
        description: 'Using CDX data, we conduct systematic substance screening of your full product Bill of Materials against REACH Candidate List (SVHCs), RoHS restricted substances, WEEE-relevant materials, and any customer-specific restricted substance lists. Results are consolidated into compliance assessments and customer-ready declarations.',
      },
      {
        title: 'Customer Submission Management',
        description: 'We manage the submission of your CDX data to your customers, handle query resolution, and maintain data quality across product revisions. Our team ensures your compliance data meets customer-specific requirements and supports your ongoing supplier relationships.',
      },
    ],
  },
  {
    name: 'China Automotive Material Data System',
    acronym: 'CAMDS',
    slug: 'camds',
    description: 'China\'s automotive material data system for documenting vehicle material composition and substance compliance in line with Chinese ELV regulations and GB standards.',
    industry: 'Automotive (China market)',
    regulatoryBasis: 'China ELV Regulation (GB/T 30512), China REACH (MEE Order No. 12)',
    whoMustSubmit: 'Automotive suppliers selling components for vehicles sold in the Chinese market',
    dataType: 'Material composition, hazardous substance declarations per Chinese standards',
    managedBy: 'China Automotive Technology and Research Center (CATARC)',
    icon: 'Globe',
    whatItDoes: `CAMDS (China Automotive Material Data System) is the Chinese counterpart to IMDS, developed by the China Automotive Technology and Research Center (CATARC) in alignment with China's vehicle end-of-life regulations and GB standards. As Chinese automotive OEMs have globalized and Chinese regulations have tightened, CAMDS has become a mandatory compliance platform for suppliers serving the Chinese automotive market.

CAMDS is aligned with the Chinese ELV regulation (GB/T 30512-2016) which restricts lead, mercury, cadmium, hexavalent chromium, PBB, and PBDE in vehicles mirroring EU ELV restricted substances. Like IMDS, CAMDS uses a hierarchical Material Data Sheet structure, but applies Chinese substance classification standards and threshold values which can differ from their EU equivalents.

Chinese automotive OEMs including SAIC, FAW, BAIC, Geely, BYD, and the Chinese joint ventures of international OEMs (Volkswagen-FAW, BMW Brilliance, GM-SAIC) are increasingly mandating CAMDS submissions. Global suppliers entering the Chinese market or expanding Chinese sales must be prepared for CAMDS requirements.`,
    howWeHelp: [
      {
        title: 'CAMDS Registration & Account Setup',
        description: 'We manage CAMDS registration for international companies, navigating the Chinese-language interface and CATARC administrative requirements. Our bilingual compliance team ensures your organization profile is correctly configured and your company is set up to receive and submit CAMDS requests.',
      },
      {
        title: 'CAMDS Material Data Sheet Preparation',
        description: 'We prepare CAMDS Material Data Sheets aligned with Chinese GB standards and OEM-specific requirements. We map your existing IMDS data to CAMDS format where applicable, identify gaps requiring additional data collection, and ensure all Chinese-specific substance thresholds and classification rules are correctly applied.',
      },
      {
        title: 'Chinese Regulatory Alignment',
        description: 'We assess your material compliance against Chinese GB standards, MEE Order No. 12 substance restrictions, and OEM-specific CAMDS requirements. Where Chinese requirements differ from EU requirements, we identify the additional compliance actions needed and help you build a China-specific compliance program.',
      },
      {
        title: 'Ongoing CAMDS Updates',
        description: 'Chinese automotive regulations are evolving rapidly. We monitor updates to Chinese ELV regulations, GB standards, and OEM CAMDS requirements, and proactively update your CAMDS submissions when regulations or your product formulations change.',
      },
    ],
  },
  {
    name: 'Substances of Concern In articles, as such or in complex objects (Products)',
    acronym: 'SCIP',
    slug: 'scip',
    description: 'ECHA\'s database for articles containing SVHCs above 0.1% w/w, required under Article 9(1)(i) of the EU Waste Framework Directive. Mandatory for all EU article suppliers.',
    industry: 'All (EU article suppliers)',
    regulatoryBasis: 'EU Waste Framework Directive (2008/98/EC, Article 9(1)(i))',
    whoMustSubmit: 'Suppliers placing articles containing SVHCs >0.1% w/w on the EU market',
    dataType: 'Article characterization, SVHC identity, safe use information, supply chain',
    managedBy: 'European Chemicals Agency (ECHA)',
    icon: 'Database',
    whatItDoes: `The SCIP database (Substances of Concern In articles, as such or in complex objects — Products) is a database established by the European Chemicals Agency (ECHA) under the EU Waste Framework Directive. Its purpose is to ensure that waste operators and consumers have access to information about hazardous substances in products, enabling better waste management decisions at end of life.

Since January 5, 2021, all suppliers (manufacturers, importers, distributors) placing articles on the EU market that contain Substances of Very High Concern (SVHCs) from the REACH Candidate List above 0.1% w/w must submit a notification to the SCIP database. This obligation applies to every article in your product portfolio that meets the threshold, and must be updated every time the REACH Candidate List is expanded.

SCIP notifications are submitted through IUCLID (International Uniform ChemicaL Information Database) using the IUCLID Cloud or local installation. Each notification requires an article characterization (including primary article category), SVHC substance identification (using official EC or CAS numbers), and safe use information. Failures in any of these elements will result in submission rejection or compliance gaps.`,
    howWeHelp: [
      {
        title: 'Article Characterization & SVHC Screening',
        description: 'The first step in SCIP compliance is determining which of your articles contain SVHCs above 0.1% w/w. We conduct systematic SVHC screening against the complete REACH Candidate List, characterize each article in IUCLID format, and document the basis for your compliance conclusions — providing a defensible compliance record.',
      },
      {
        title: 'IUCLID Dossier Preparation',
        description: 'SCIP notifications require submission through IUCLID in a specific format. We prepare complete IUCLID dossiers for each notifiable article, including article characterization data (product category using ECHA\'s Article Category taxonomy), SVHC identity information, and safe use information requirements.',
      },
      {
        title: 'SCIP Submission Management',
        description: 'We manage the full SCIP submission process — preparing, validating, and submitting your notifications to ECHA, managing submission IDs, and resolving any technical issues with ECHA\'s submission portal. We maintain a submission register tracking all your active SCIP notifications.',
      },
      {
        title: 'Candidate List Update Management',
        description: 'ECHA adds new SVHCs to the Candidate List approximately twice per year. Each addition potentially creates new SCIP notification obligations. We monitor Candidate List updates in real time, assess the impact on your article portfolio, and initiate the notification process for newly triggered articles — ensuring you never miss a SCIP deadline.',
      },
    ],
  },
];

export default platforms;
