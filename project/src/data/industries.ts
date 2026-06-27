export interface IndustryService {
  title: string;
  description: string;
}

export interface Industry {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  keyRegulations: string[];
  keyRegulationSlugs: string[];
  specificServices: IndustryService[];
  platforms: string[];
  lcaPcfServices: string[];
  challenges: string[];
  icon: string;
}

const industries: Industry[] = [
  {
    name: 'Automotive',
    slug: 'automotive',
    shortDescription: 'Vehicle and component manufacturers navigating ELV, REACH, RoHS, and GADSL compliance with IMDS submissions.',
    fullDescription: 'The automotive industry faces one of the most demanding compliance landscapes in global manufacturing. From the EU ELV Directive and GADSL substance declarations to REACH SVHC obligations and China CAMDS requirements, automotive suppliers must maintain rigorous material data systems and demonstrate compliance across multiple jurisdictions. IMDS (International Material Data System) is the universal platform for automotive material compliance, and GS Comply Solutions provides comprehensive support for IMDS data creation, GADSL screening, ELV homologation support, and multi-regulation substance management across the automotive supply chain.',
    keyRegulations: ['REACH (Mandatory)', 'RoHS', 'GADSL (Automotive Declarable Substance List)', 'ELV Directive', 'PFAS', 'POPs', 'TSCA'],
    keyRegulationSlugs: ['reach', 'rohs', 'gadsl', 'elv', 'pfas', 'pops', 'tsca'],
    specificServices: [
      { title: 'IMDS Material Data Sheet Creation', description: 'Complete MDS creation, validation, and submission to OEMs with accurate substance declarations and GADSL compliance.' },
      { title: 'GADSL Substance Screening', description: 'Full screening against the Global Automotive Declarable Substance List with declaration support.' },
      { title: 'ELV Compliance Support', description: 'Substance restriction assessment, exemption documentation, and recyclability calculations for vehicle components.' },
      { title: 'CAMDS Submissions', description: 'China market compliance through the China Automotive Material Data System.' },
      { title: 'SVHC & SCIP Management', description: 'REACH Candidate List screening and SCIP database notification services.' },
    ],
    platforms: ['IMDS', 'CAMDS', 'SCIP'],
    lcaPcfServices: ['Full LCA for vehicle components', 'Product Carbon Footprint calculation', 'EPD preparation', 'Scope 3 supplier emissions mapping'],
    challenges: ['Complex multi-tier supply chains with thousands of components', 'OEM-specific compliance requirements varying by customer', 'Rapidly evolving regulations (PFAS restrictions, ELV revision)', 'Tight development timelines with compliance gates'],
    icon: 'Car',
  },
  {
    name: 'Non-Automotive Manufacturing',
    slug: 'non-automotive',
    shortDescription: 'General manufacturing and industrial suppliers managing substance compliance across diverse product portfolios.',
    fullDescription: 'Non-automotive manufacturing encompasses a broad range of mechanical, structural, and industrial product manufacturers who must demonstrate compliance with REACH, RoHS, and other substance regulations without the structured platform ecosystem of the automotive industry. GS Comply Solutions helps non-automotive manufacturers build compliance programs tailored to their specific product types and customer requirements, from machinery and equipment manufacturers to general industrial suppliers.',
    keyRegulations: ['REACH (Mandatory)', 'RoHS (Mandatory)', 'PFAS', 'Prop 65', 'TSCA', 'POPs', 'WEEE'],
    keyRegulationSlugs: ['reach', 'rohs', 'pfas', 'prop65', 'tsca', 'pops', 'weee'],
    specificServices: [
      { title: 'REACH SVHC Screening', description: 'Systematic screening against the REACH Candidate List with customer-ready declarations.' },
      { title: 'RoHS Compliance Support', description: 'Technical documentation and DoC preparation for EEE components.' },
      { title: 'CDX Material Data Management', description: 'Non-automotive supply chain data collection and platform submissions via CDX.' },
      { title: 'Prop 65 Assessments', description: 'Exposure assessments and warning program implementation for California market.' },
      { title: 'SDS Authoring', description: 'CLP-compliant Safety Data Sheet authoring and review services.' },
    ],
    platforms: ['CDX', 'SCIP'],
    lcaPcfServices: ['Life Cycle Assessment', 'Carbon footprint quantification', 'CSRD Scope 3 reporting'],
    challenges: ['Diverse product portfolios with varied regulatory applicability', 'Less standardized compliance platforms than automotive', 'Customer-specific declaration formats', 'Managing compliance across multiple product lines'],
    icon: 'Factory',
  },
  {
    name: 'HVAC & Refrigeration',
    slug: 'hvac',
    shortDescription: 'Heating, ventilation, and air conditioning manufacturers managing refrigerant regulations and material compliance.',
    fullDescription: 'HVAC and refrigeration equipment manufacturers face a unique combination of substance compliance obligations from F-gas regulations governing refrigerants to REACH and RoHS requirements for electrical and mechanical components. The industry must navigate both chemical-specific regulations (refrigerant phase-downs, F-gas quotas) and general product compliance requirements. GS Comply Solutions provides specialized support for HVAC manufacturers, including refrigerant compliance tracking, substance declarations for mechanical components, and environmental product declarations.',
    keyRegulations: ['REACH (Mandatory)', 'RoHS (Mandatory)', 'F-Gas Regulation', 'PFAS', 'WEEE', 'Ecodesign Directive'],
    keyRegulationSlugs: ['reach', 'rohs', 'pfas', 'weee'],
    specificServices: [
      { title: 'F-Gas Compliance', description: 'Quota management, refrigerant tracking, and phase-down compliance support.' },
      { title: 'REACH SVHC Screening', description: 'Substance screening for HVAC mechanical and electrical components.' },
      { title: 'RoHS Compliance', description: 'Technical documentation for HVAC control systems and electronics.' },
      { title: 'CDX Data Submissions', description: 'Material data management through CDX platform.' },
      { title: 'Ecodesign Support', description: 'Energy efficiency documentation and ecodesign compliance.' },
    ],
    platforms: ['CDX', 'SCIP'],
    lcaPcfServices: ['Product LCA for HVAC equipment', 'Carbon footprint analysis', 'Energy efficiency documentation', 'EPD preparation'],
    challenges: ['F-gas phase-down creating refrigerant transition challenges', 'PFAS restrictions impacting refrigerant landscape', 'Ecodesign requirements driving efficiency improvements', 'Complex assemblies combining mechanical, electrical, and refrigerant systems'],
    icon: 'Wind',
  },
  {
    name: 'Electrical & Electronics',
    slug: 'electrical-electronics',
    shortDescription: 'Electrical equipment and electronics manufacturers managing RoHS, REACH, WEEE, and global substance restrictions.',
    fullDescription: 'The electrical and electronics industry operates under the most developed substance restriction frameworks globally. RoHS, REACH, WEEE, and their international equivalents (China RoHS, India RoHS, Korea RoHS, etc.) create multi-jurisdictional obligations. Electronics manufacturers face particular scrutiny on restricted substances, conflict minerals, and emerging PFAS restrictions. GS Comply Solutions provides full-spectrum electronics compliance support from substance screening through technical documentation and platform submissions.',
    keyRegulations: ['REACH (Mandatory)', 'RoHS (Mandatory)', 'WEEE', 'PFAS', 'Conflict Minerals (CMRT)', 'Prop 65', 'TSCA', 'CLP'],
    keyRegulationSlugs: ['reach', 'rohs', 'weee', 'pfas', 'prop65', 'tsca', 'clp'],
    specificServices: [
      { title: 'RoHS Technical Documentation', description: 'Complete technical files and Declarations of Conformity for CE marking.' },
      { title: 'REACH & SCIP Services', description: 'SVHC screening and SCIP database notifications for EEE products.' },
      { title: 'WEEE Registration', description: 'Producer registration and compliance scheme management across EU Member States.' },
      { title: 'Conflict Minerals Due Diligence', description: 'CMRT completion and supply chain due diligence programs.' },
      { title: 'PFAS Assessments', description: 'Supply chain screening for PFAS in electronics manufacturing.' },
    ],
    platforms: ['CDX', 'SCIP', 'CMRT'],
    lcaPcfServices: ['Product carbon footprint', 'EPD for electronics', 'Scope 3 emissions mapping', 'CSRD reporting support'],
    challenges: ['Rapid product cycles with short compliance windows', 'Complex global supply chains for electronic components', 'Multiple overlapping RoHS-type regulations globally', 'PFAS restrictions impacting electronics manufacturing'],
    icon: 'Cpu',
  },
  {
    name: 'Household & Consumer Products',
    slug: 'household-consumer',
    shortDescription: 'Consumer product manufacturers navigating Prop 65, REACH, and product safety regulations across global markets.',
    fullDescription: 'Household and consumer product manufacturers serve the most regulated end-consumer market, with strict requirements for chemical safety, labeling, and consumer protection. From furniture and appliances to toys and consumer goods, manufacturers must comply with REACH, Prop 65, general product safety regulations, and emerging requirements like PFAS restrictions. GS Comply Solutions supports consumer product companies with comprehensive substance assessments, labeling compliance, and documentation for product safety compliance.',
    keyRegulations: ['REACH (Mandatory)', 'RoHS (Mandatory)', 'Prop 65', 'PFAS', 'General Product Safety', 'WEEE', 'POPs'],
    keyRegulationSlugs: ['reach', 'rohs', 'prop65', 'pfas', 'weee', 'pops'],
    specificServices: [
      { title: 'Prop 65 Warning Programs', description: 'Exposure assessments and compliant warning label implementation.' },
      { title: 'REACH SVHC Screening', description: 'Substance screening for consumer articles with customer declarations.' },
      { title: 'PFAS Screening', description: 'Supply chain assessment for PFAS in consumer products.' },
      { title: 'Product Safety Documentation', description: 'Technical files and safety assessments for consumer goods.' },
      { title: 'SCIP Submissions', description: 'Database notifications for SVHC-containing consumer articles.' },
    ],
    platforms: ['CDX', 'SCIP'],
    lcaPcfServices: ['Product LCA', 'Carbon footprint labeling', 'Environmental claims substantiation', 'EPD for consumer goods'],
    challenges: ['Consumer-facing compliance with litigation risk', 'Prop 65 enforcement environment', 'Multiple jurisdiction product safety rules', 'Rapid PFAS regulatory developments'],
    icon: 'ShoppingBag',
  },
  {
    name: 'Aerospace',
    slug: 'aerospace',
    shortDescription: 'Aircraft and aerospace component manufacturers managing specialized compliance for aviation applications.',
    fullDescription: 'The aerospace industry operates under specialized regulatory frameworks that differ significantly from general manufacturing. REACH and other substance regulations apply, but aerospace-specific exclusions, deferrals, and specialty material considerations create a unique compliance landscape. Aerospace manufacturers must balance substance restrictions with performance requirements for critical applications. GS Comply Solutions provides aerospace-specific compliance support, including specialty material assessments, REACH aviation sector guidance, and documentation for aerospace customers.',
    keyRegulations: ['REACH (Mandatory)', 'RoHS (Mandatory)', 'ADSL (Aerospace Declarable Substance List)', 'PFAS', 'TSCA', 'POPs', 'Export controls'],
    keyRegulationSlugs: ['reach', 'rohs', 'pfas', 'tsca', 'pops'],
    specificServices: [
      { title: 'REACH Aerospace Compliance', description: 'Sector-specific guidance on REACH exclusions and deferrals for aviation applications.' },
      { title: 'RoHS Compliance for Aerospace Electronics', description: 'RoHS documentation and substance management for electronic systems in aircraft and aerospace components.' },
      { title: 'ADSL Substance Screening', description: 'Full screening against the Aerospace Declarable Substance List (ADSL) for aviation materials and assemblies.' },
      { title: 'Specialty Material Assessments', description: 'Substance evaluation for performance-critical aerospace materials with limited substitution options.' },
      { title: 'Export Compliance Documentation', description: 'Screening and documentation for export control and aerospace customer compliance requirements.' },
    ],
    platforms: ['CDX', 'SCIP'],
    lcaPcfServices: ['Aircraft component LCA', 'Sustainable aviation fuel documentation', 'Scope 3 emissions tracking', 'CSRD reporting'],
    challenges: ['Performance-critical materials with limited substitutes', 'Long product lifecycles with legacy materials', 'Specialized aerospace exclusions and deferrals', 'Export control interplay with substance regulations'],
    icon: 'Plane',
  },
  {
    name: 'Construction & Building Materials',
    slug: 'construction',
    shortDescription: 'Building material suppliers managing substance regulations, environmental declarations, and green building requirements.',
    fullDescription: 'Construction and building materials manufacturers face increasing regulatory focus on both substance content and environmental performance. REACH obligations apply to construction materials, while green building certifications (LEED, BREEAM) and environmental product declarations (EPD) have become market requirements. GS Comply Solutions supports construction product manufacturers with REACH compliance, EPD preparation, and documentation for green building certifications.',
    keyRegulations: ['REACH (Mandatory)', 'RoHS (for electrical building components)', 'Construction Products Regulation', 'PFAS', 'TSCA', 'Prop 65', 'POPs'],
    keyRegulationSlugs: ['reach', 'rohs', 'pfas', 'tsca', 'prop65', 'pops'],
    specificServices: [
      { title: 'REACH Compliance', description: 'Substance screening and declarations for construction materials.' },
      { title: 'EPD Preparation', description: 'Environmental Product Declaration development and verification support.' },
      { title: 'Product Declarations', description: 'Construction product documentation for CPR compliance.' },
      { title: 'Green Building Support', description: 'Documentation for LEED, BREEAM, and other certification systems.' },
      { title: 'PFAS Screening', description: 'Assessment for PFAS in building materials and coatings.' },
    ],
    platforms: ['CDX', 'SCIP'],
    lcaPcfServices: ['Full LCA for construction materials', 'EPD preparation', 'Embodied carbon calculation', 'CSRD/ESRS reporting'],
    challenges: ['EPD becoming market requirement', 'Green building certification demands', 'Long product lifetimes with legacy materials', 'PFAS in building materials under scrutiny'],
    icon: 'Building2',
  },
  {
    name: 'Packaging & Plastics',
    slug: 'packaging-plastics',
    shortDescription: 'Packaging and plastics manufacturers managing material compliance, recyclability, and emerging restrictions.',
    fullDescription: 'Packaging and plastics manufacturers are at the center of the circular economy transformation. New regulations on packaging recyclability, recycled content requirements, and substance restrictions (particularly PFAS in packaging) are reshaping the industry. GS Comply Solutions helps packaging companies navigate REACH substance requirements, prepare for PPWR (Packaging and Packaging Waste Regulation), manage recyclability declarations, and assess PFAS exposure in packaging materials.',
    keyRegulations: ['REACH (Mandatory)', 'RoHS (for packaging with electronics)', 'PPWR (Packaging and Packaging Waste Regulation)', 'PFAS', 'Food contact regulations', 'Prop 65', 'POPs'],
    keyRegulationSlugs: ['reach', 'rohs', 'pfas', 'prop65', 'pops'],
    specificServices: [
      { title: 'REACH Compliance', description: 'Substance screening for packaging materials and plastics.' },
      { title: 'PFAS Screening', description: 'Assessment for PFAS in food contact and consumer packaging.' },
      { title: 'Recyclability Assessments', description: 'Documentation for PPWR recyclability requirements.' },
      { title: 'Food Contact Compliance', description: 'FCM regulation compliance support for food packaging.' },
      { title: 'Recycled Content Documentation', description: 'Verification and documentation for recycled content claims.' },
    ],
    platforms: ['CDX', 'SCIP'],
    lcaPcfServices: ['Packaging LCA', 'Carbon footprint analysis', 'Recyclability documentation', 'EPD for packaging'],
    challenges: ['PFAS restrictions impacting packaging materials', 'New PPWR recyclability and content requirements', 'Food contact material regulations', 'Consumer and brand sustainability demands'],
    icon: 'Box',
  },
  {
    name: 'Heavy Equipment Manufacturing',
    slug: 'heavy-equipment',
    shortDescription: 'Heavy machinery and industrial equipment manufacturers managing multi-regulation compliance across global markets.',
    fullDescription: 'Heavy equipment manufacturing encompasses construction machinery, agricultural equipment, mining equipment, industrial machinery, and other large capital equipment. These products combine mechanical, hydraulic, electrical, and electronic systems, creating complex compliance requirements across multiple regulatory frameworks. GS Comply Solutions supports heavy equipment manufacturers with comprehensive substance compliance programs, platform submissions, and environmental documentation for both regulatory and customer requirements.',
    keyRegulations: ['REACH (Mandatory)', 'RoHS (Mandatory)', 'HEDSL (Heavy Equipment Declarable Substance List — AEM)', 'ELV (optional for certain equipment)', 'PFAS', 'TSCA', 'Prop 65', 'WEEE', 'Machine Directive'],
    keyRegulationSlugs: ['reach', 'rohs', 'pfas', 'tsca', 'prop65', 'weee'],
    specificServices: [
      { title: 'REACH SVHC Screening', description: 'Substance screening across mechanical, hydraulic, and electrical systems.' },
      { title: 'HEDSL Screening (AEM)', description: 'Screening against the Heavy Equipment Declarable Substance List per AEM guidelines.' },
      { title: 'ELV Assessment (where applicable)', description: 'Evaluation of ELV applicability for specific heavy equipment categories.' },
      { title: 'CDX Data Management', description: 'Material data collection and submission through CDX.' },
      { title: 'Machine Safety Compliance', description: 'Documentation supporting Machine Directive requirements.' },
    ],
    platforms: ['CDX', 'SCIP'],
    lcaPcfServices: ['Full LCA for heavy equipment', 'Product Carbon Footprint', 'EPD preparation', 'Scope 3 emissions mapping', 'CSRD reporting support'],
    challenges: ['Complex systems with multiple material types', 'Long product lifecycles and spare parts compliance', 'Global market requirements varying by region', 'Customer sustainability data requests increasing'],
    icon: 'Factory',
  },
];

export default industries;
