export interface LcaService {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  applicableIndustries: string[];
  deliverables: string[];
  standards: string[];
}

const lcaServices: LcaService[] = [
  {
    id: 'full-lca',
    title: 'Full Life Cycle Assessment (LCA)',
    shortDescription: 'Cradle-to-grave and cradle-to-gate LCAs for products across all industries, conducted in accordance with ISO 14040/14044.',
    fullDescription: 'A full Life Cycle Assessment quantifies the environmental impacts of a product or process across its entire life cycle — from raw material extraction, through manufacturing, use, and end-of-life treatment. GS Comply Solutions conducts LCAs aligned with ISO 14040/14044, producing defensible, auditable results for regulatory, EPD, and strategic decision-making purposes.',
    icon: 'RefreshCw',
    applicableIndustries: ['Automotive', 'Electronics', 'Consumer Products', 'Construction', 'Packaging', 'HVAC', 'Textiles'],
    deliverables: ['LCA Report (ISO 14040/44 compliant)', 'Environmental Impact Profile', 'Hotspot Analysis', 'Improvement Recommendations'],
    standards: ['ISO 14040', 'ISO 14044', 'EN 15804 (construction)', 'PCR-specific standards'],
  },
  {
    id: 'pcf',
    title: 'Product Carbon Footprint (PCF)',
    shortDescription: 'GHG Protocol-aligned PCF calculations covering Scope 1, 2, and 3 emissions for products across the value chain.',
    fullDescription: 'Product Carbon Footprint quantifies the greenhouse gas emissions associated with a product across its life cycle, expressed in CO2 equivalents. Our PCF service follows the GHG Protocol Product Standard and ISO 14067, producing results that satisfy OEM carbon questionnaires, CSRD Scope 3 reporting requirements, and customer sustainability commitments.',
    icon: 'BarChart',
    applicableIndustries: ['Automotive', 'Electronics', 'Consumer Products', 'HVAC', 'Non-Automotive', 'Packaging'],
    deliverables: ['PCF Calculation Report', 'Emission Hotspot Analysis', 'Data Collection Guidance', 'Carbon Reduction Roadmap'],
    standards: ['ISO 14067', 'GHG Protocol Product Standard', 'PACT Framework', 'Catena-X PCF Rulebook (Automotive)'],
  },
  {
    id: 'epd',
    title: 'Environmental Product Declaration (EPD)',
    shortDescription: 'ISO 14025-compliant EPDs for products, supporting green building certification, public procurement, and B2B sustainability requirements.',
    fullDescription: 'Environmental Product Declarations are third-party verified documents that communicate the quantified environmental impact of a product based on Life Cycle Assessment data. EPDs are increasingly required for construction products, building materials, and manufactured goods seeking LEED, BREEAM, or DGNB certification, as well as public procurement contracts.',
    icon: 'FileText',
    applicableIndustries: ['Construction', 'HVAC', 'Electronics', 'Consumer Products', 'Automotive', 'Textiles'],
    deliverables: ['EPD Document (ISO 14025)', 'Underlying LCA Report', 'Third-party Verification Support', 'EPD Program Registration'],
    standards: ['ISO 14025', 'EN 15804 (construction products)', 'PCR documents per product category'],
  },
  {
    id: 'carbon-reduction',
    title: 'Carbon Reduction Strategy',
    shortDescription: 'Science-based decarbonization roadmaps identifying priority emission hotspots and cost-effective reduction measures across products and supply chains.',
    fullDescription: 'Understanding where carbon emissions occur is just the first step — translating that knowledge into concrete reduction actions requires strategic analysis and stakeholder engagement. Our carbon reduction strategy service moves clients from measurement to action, developing prioritized decarbonization roadmaps aligned with science-based targets.',
    icon: 'TrendingDown',
    applicableIndustries: ['All industries'],
    deliverables: ['Emission Hotspot Report', 'Reduction Opportunity Assessment', 'Carbon Reduction Roadmap', 'SBTi Alignment Analysis'],
    standards: ['GHG Protocol', 'Science Based Targets initiative (SBTi)', 'TCFD Recommendations'],
  },
  {
    id: 'scope3',
    title: 'Scope 3 Emissions Reporting',
    shortDescription: 'Value chain GHG emissions quantification covering purchased goods, downstream use, logistics, waste, and other Scope 3 categories.',
    fullDescription: 'Scope 3 emissions — those occurring in the upstream and downstream value chain — typically account for 70–90% of a company\'s total GHG footprint. As CSRD and voluntary reporting frameworks increasingly require Scope 3 disclosure, companies need structured approaches to data collection, calculation, and reporting. We manage the full Scope 3 assessment process from category screening to final GHG inventory.',
    icon: 'Globe',
    applicableIndustries: ['All industries'],
    deliverables: ['Scope 3 Category Screening', 'GHG Inventory Report', 'Supplier Engagement Program', 'CSRD-ready Reporting Package'],
    standards: ['GHG Protocol Corporate Value Chain Standard', 'ISO 14064', 'CSRD / ESRS E1'],
  },
  {
    id: 'pcf-data-collection',
    title: 'PCF Supply Chain Data Collection',
    shortDescription: 'Structured programs to collect primary PCF data from supply chain partners, replacing emission factor estimates with actual supplier data.',
    fullDescription: 'The quality of a Product Carbon Footprint depends heavily on the quality of upstream data. Primary data from suppliers — actual energy consumption, material quantities, and process emissions — produces far more accurate and credible PCFs than database emission factors. We design and manage supplier PCF data collection programs that systematically gather primary activity data across your supply chain.',
    icon: 'Database',
    applicableIndustries: ['Automotive', 'Electronics', 'Consumer Products', 'Non-Automotive'],
    deliverables: ['Supplier Data Collection Template', 'Supplier Engagement & Training', 'Data Quality Assessment', 'Consolidated PCF Dataset'],
    standards: ['PACT Framework', 'Catena-X Standards', 'GHG Protocol Guidance'],
  },
  {
    id: 'lca-training',
    title: 'LCA Software Support & Training',
    shortDescription: 'Hands-on training and support for LCA software tools including SimaPro, OpenLCA, and GaBi, enabling your team to conduct internal LCAs.',
    fullDescription: 'Building internal LCA capability reduces long-term reliance on external consultants and accelerates the integration of environmental thinking into product development. Our LCA training and software support program covers LCA methodology fundamentals, tool-specific training (SimaPro, OpenLCA, GaBi), data interpretation, and peer review of internally conducted LCAs.',
    icon: 'BookOpen',
    applicableIndustries: ['All industries'],
    deliverables: ['LCA Methodology Training', 'Software-specific Workshops', 'Guided Practice LCA', 'Peer Review of Internal LCAs'],
    standards: ['ISO 14040/14044', 'ILCD Handbook'],
  },
  {
    id: 'csrd-reporting',
    title: 'Sustainability Reporting (GRI, CDP, CSRD)',
    shortDescription: 'Structured sustainability disclosure support covering CSRD/ESRS requirements, GRI Standards reporting, and CDP questionnaire responses.',
    fullDescription: 'Corporate sustainability reporting is rapidly becoming mandatory for large companies under CSRD, while GRI Standards and CDP remain the benchmarks for voluntary disclosure. Our sustainability reporting service integrates environmental data from our LCA and PCF work into disclosure-ready narratives, quantitative metrics, and ESRS-aligned reporting frameworks.',
    icon: 'ClipboardList',
    applicableIndustries: ['All industries'],
    deliverables: ['CSRD/ESRS Double Materiality Assessment', 'GRI Standards Report', 'CDP Response', 'Annual Sustainability Report Support'],
    standards: ['CSRD / ESRS Standards', 'GRI Standards 2021', 'CDP Questionnaire', 'ISSB IFRS S2'],
  },
];

export default lcaServices;
