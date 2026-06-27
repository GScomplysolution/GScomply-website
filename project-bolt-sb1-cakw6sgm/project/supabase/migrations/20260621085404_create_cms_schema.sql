
-- User roles enum
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'viewer',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_own_profile" ON public.user_profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

CREATE POLICY "admins_read_all_profiles" ON public.user_profiles FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admins_update_profiles" ON public.user_profiles FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admins_insert_profiles" ON public.user_profiles FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admins_delete_profiles" ON public.user_profiles FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Tags table
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL DEFAULT 'industry', -- industry | service | regulation
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone_read_tags" ON public.tags FOR SELECT TO authenticated USING (true);
CREATE POLICY "editors_insert_tags" ON public.tags FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);
CREATE POLICY "admins_update_tags" ON public.tags FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "admins_delete_tags" ON public.tags FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Articles table
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image_url TEXT,
  author_name TEXT,
  author_bio TEXT,
  status TEXT NOT NULL DEFAULT 'draft', -- draft | published | archived
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  category TEXT DEFAULT 'General',
  read_time INTEGER DEFAULT 5,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) can read published articles
CREATE POLICY "anyone_read_published_articles" ON public.articles FOR SELECT
  USING (status = 'published');

-- Authenticated users with editor+ can read all articles
CREATE POLICY "editors_read_all_articles" ON public.articles FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

CREATE POLICY "editors_insert_articles" ON public.articles FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

CREATE POLICY "editors_update_articles" ON public.articles FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

CREATE POLICY "admins_delete_articles" ON public.articles FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Article tags junction table
CREATE TABLE IF NOT EXISTS public.article_tags (
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone_read_article_tags" ON public.article_tags FOR SELECT USING (true);
CREATE POLICY "editors_manage_article_tags" ON public.article_tags FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);
CREATE POLICY "admins_delete_article_tags" ON public.article_tags FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Regulations database table
CREATE TABLE IF NOT EXISTS public.regulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  acronym TEXT NOT NULL,
  description TEXT,
  full_description TEXT,
  region TEXT NOT NULL DEFAULT 'Global',
  governing_body TEXT,
  regulation_type TEXT DEFAULT 'Substance Compliance',
  status TEXT NOT NULL DEFAULT 'Active', -- Active | Upcoming | Revised
  key_requirements JSONB DEFAULT '[]',
  compliance_deadlines TEXT,
  official_url TEXT,
  related_services TEXT[] DEFAULT '{}',
  applicable_industries TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.regulations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone_read_regulations" ON public.regulations FOR SELECT USING (true);
CREATE POLICY "admins_insert_regulations" ON public.regulations FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "admins_update_regulations" ON public.regulations FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "admins_delete_regulations" ON public.regulations FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Activity log
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins_read_activity_log" ON public.activity_log FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "authenticated_insert_activity" ON public.activity_log FOR INSERT TO authenticated WITH CHECK (
  auth.uid() = user_id
);

-- Function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'viewer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed regulations data
INSERT INTO public.regulations (name, acronym, description, region, governing_body, regulation_type, status, applicable_industries, key_requirements, official_url) VALUES
('Registration, Evaluation, Authorisation and Restriction of Chemicals', 'REACH', 'The EU regulation addressing the production and use of chemical substances and their potential impacts on human health and the environment.', 'European Union', 'ECHA (European Chemicals Agency)', 'Substance Compliance', 'Active', ARRAY['Automotive', 'Electronics', 'Consumer Products', 'Chemicals', 'Manufacturing'], '["Register substances manufactured or imported in quantities ≥1 tonne/year", "Communicate SVHC presence above 0.1% w/w in articles", "Submit to SCIP database for articles containing SVHCs", "Obtain authorisation for Substances of Very High Concern (SVHC)", "Comply with substance restrictions in Annex XVII"]', 'https://echa.europa.eu/regulations/reach'),
('Restriction of Hazardous Substances', 'RoHS', 'EU Directive 2011/65/EU restricting the use of specific hazardous materials in electrical and electronic equipment.', 'European Union', 'European Commission', 'Substance Compliance', 'Active', ARRAY['Electronics', 'Electrical', 'Automotive', 'Medical Devices'], '["Restrict 10 hazardous substances including Pb, Hg, Cd, Cr(VI)", "Maximum concentration values: 0.1% w/w for most substances, 0.01% for Cd", "Prepare technical documentation and Declaration of Conformity", "Apply CE marking", "Maintain compliance records for 10 years"]', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011L0065'),
('Per- and Polyfluoroalkyl Substances Restrictions', 'PFAS', 'Broad restrictions on per- and polyfluoroalkyl substances under REACH and various national regulations due to persistence and toxicity concerns.', 'Global (EU, US, others)', 'ECHA, EPA', 'Substance Compliance', 'Upcoming', ARRAY['Automotive', 'Electronics', 'Consumer Products', 'Textiles', 'HVAC'], '["Universal PFAS restriction proposed under REACH (up to 10,000 substances affected)", "PFOA and PFOS already restricted; additional substances being added", "Reporting obligations under various national programs", "Phase-out timelines vary by application and substance group", "Substitution plans required for derogated uses"]', 'https://echa.europa.eu/hot-topics/perfluoroalkyl-chemicals-pfas'),
('California Safe Drinking Water and Toxic Enforcement Act', 'Prop 65', 'California regulation requiring businesses to provide warnings about significant exposures to chemicals that cause cancer, birth defects, or reproductive harm.', 'United States (California)', 'California OEHHA', 'Substance Disclosure', 'Active', ARRAY['Consumer Products', 'Food & Beverage', 'Automotive', 'Construction'], '["Warn consumers before exposing them to listed chemicals", "800+ chemicals on the Prop 65 list", "Warning must be clear and reasonable", "Businesses with fewer than 10 employees are exempt", "Annual updates to the chemical list by OEHHA"]', 'https://oehha.ca.gov/proposition-65'),
('Global Automotive Declarable Substance List', 'GADSL', 'An industry-wide list of substances that automotive manufacturers and suppliers are required to declare or that are prohibited in automotive products.', 'Global', 'GADSL Working Group', 'Substance Declaration', 'Active', ARRAY['Automotive'], '["Declare all substances on the GADSL list present in materials", "Distinguish between prohibited (P), declarable (D), and dual-category (D/P) substances", "Submit declarations through IMDS or equivalent systems", "Annual updates to the GADSL substance list", "Covers >1,400 chemical substances relevant to automotive parts"]', 'https://www.gadsl.org'),
('End-of-Life Vehicles Directive', 'ELV', 'EU Directive 2000/53/EC setting rules for the treatment and recycling of end-of-life vehicles, and restricting hazardous substances in new vehicles.', 'European Union', 'European Commission', 'Substance Compliance', 'Active', ARRAY['Automotive'], '["Prohibit lead, mercury, cadmium, and hexavalent chromium in vehicles", "Achieve 85% reuse/recycling and 95% reuse/recovery rates", "OEMs must document material composition via IMDS", "Report on recyclability and recoverability", "Free take-back of end-of-life vehicles by manufacturers"]', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32000L0053'),
('Stockholm Convention on Persistent Organic Pollutants', 'POPs', 'International treaty requiring elimination, restriction, or management of persistent organic pollutants due to their long-range environmental transport and serious health effects.', 'Global', 'UNEP (United Nations Environment Programme)', 'Substance Compliance', 'Active', ARRAY['Chemicals', 'Manufacturing', 'Automotive', 'Electronics', 'Consumer Products'], '["Prohibit production and use of listed POPs (Annex A)", "Restrict production and use of listed POPs (Annex B)", "Minimize unintentional releases of listed POPs (Annex C)", "Manage stockpiles and wastes containing POPs", "Report national implementation plans to the Conference of Parties"]', 'https://www.pops.int'),
('Toxic Substances Control Act', 'TSCA', 'US federal law regulating the introduction of new or existing chemical substances into commerce, administered by the EPA.', 'United States', 'US EPA', 'Chemical Registration', 'Active', ARRAY['Chemicals', 'Manufacturing', 'Consumer Products', 'Electronics'], '["Pre-manufacture notice (PMN) for new chemical substances", "Chemical Data Reporting (CDR) for manufacturers and importers", "Risk evaluation and management for existing chemicals", "Section 6 restrictions on unreasonable risks", "Import certification requirements for chemical substances"]', 'https://www.epa.gov/tsca'),
('Classification, Labelling and Packaging', 'CLP', 'EU Regulation EC 1272/2008 on the classification, labelling and packaging of substances and mixtures, implementing the UN GHS.', 'European Union', 'ECHA', 'Chemical Classification', 'Active', ARRAY['Chemicals', 'Manufacturing', 'Consumer Products', 'Automotive', 'Electronics'], '["Classify substances and mixtures according to hazard criteria", "Label products with standardized hazard pictograms", "Provide Safety Data Sheets (SDS) for hazardous substances", "Notify ECHA of classified substances via C&L Inventory", "Apply harmonized classifications from Annex VI"]', 'https://echa.europa.eu/regulations/clp/understanding-clp'),
('Waste Electrical and Electronic Equipment Directive', 'WEEE', 'EU Directive 2012/19/EU setting collection, recycling and recovery targets for electrical and electronic equipment.', 'European Union', 'European Commission', 'Waste Management', 'Active', ARRAY['Electronics', 'Electrical', 'Automotive', 'Consumer Products'], '["Register with national WEEE register in each EU Member State", "Achieve collection targets (45% of average EEE placed on market)", "Meet recovery and recycling rates for collected WEEE", "Finance collection and treatment for household WEEE", "Provide treatment information for new EEE products"]', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32012L0019'),
('International Material Data System', 'IMDS', 'The automotive industry material data system used for declaration of materials in automotive components, mandated by OEMs worldwide.', 'Global', 'Hewlett-Packard / BMW Group', 'Data Platform', 'Active', ARRAY['Automotive'], '["Submit Material Data Sheets (MDS) for all components", "Comply with ELV, REACH SVHC, and GADSL requirements", "Respond to customer requests within agreed timelines", "Maintain data accuracy and update when formulations change", "Follow IMDS recommendation rules for data quality"]', 'https://www.mdsystem.com'),
('Chemical Data Exchange', 'CDX', 'EPA electronic reporting portal for TSCA submissions and chemical data reporting obligations.', 'United States', 'US EPA', 'Data Platform', 'Active', ARRAY['Chemicals', 'Manufacturing'], '["Register and maintain CDX account for TSCA submissions", "Submit Pre-Manufacture Notices (PMN) via CDX", "Complete Chemical Data Reporting (CDR) submissions", "File TSCA Section 8(a) and 8(e) reports", "Submit TSCA import certifications"]', 'https://cdx.epa.gov'),
('Substances of Concern In articles, as such or in complex objects (Products)', 'SCIP', 'ECHA database for articles containing Substances of Very High Concern (SVHCs) above 0.1% w/w, required under the EU Waste Framework Directive.', 'European Union', 'ECHA', 'Data Platform', 'Active', ARRAY['Automotive', 'Electronics', 'Consumer Products', 'Manufacturing'], '["Notify ECHA of articles containing SVHC above 0.1% w/w", "Submit article characterization, SVHC identity, and safe use information", "Update notifications when Candidate List is updated", "Applies to suppliers placing articles on the EU market", "Use ECHA Substance ID (EC or CAS number) for SVHC identification"]', 'https://echa.europa.eu/scip-database'),
('EU Battery Regulation', 'Battery Reg', 'Regulation EU 2023/1542 establishing sustainability and safety requirements for batteries placed on the EU market.', 'European Union', 'European Commission', 'Substance & Sustainability', 'Upcoming', ARRAY['Electronics', 'Automotive', 'Consumer Products'], '["Carbon footprint declaration for EV and industrial batteries", "Minimum recycled content requirements (phased in from 2030)", "Battery passport for EV and industrial batteries", "Due diligence requirements for raw materials sourcing", "Collection and recycling targets for all battery categories"]', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1542'),
('F-Gas Regulation', 'F-Gas', 'EU Regulation 2024/573 on fluorinated greenhouse gases, setting phase-down schedules and sector-specific restrictions.', 'European Union', 'European Commission', 'Environmental', 'Active', ARRAY['HVAC', 'Refrigeration', 'Automotive'], '["Phase down HFCs according to CO2-equivalent quotas", "Training and certification requirements for technicians", "Leak checking requirements for systems with high GWP refrigerants", "Reporting and record-keeping obligations", "Restrictions on high-GWP F-gases in specific applications"]', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R0573'),
('General Product Safety Directive', 'GPSD', 'EU Directive 2001/95/EC (replaced by GPSR in 2024) requiring all consumer products placed on the EU market to be safe.', 'European Union', 'European Commission', 'Product Safety', 'Revised', ARRAY['Consumer Products', 'Household', 'Toys', 'Electronics'], '["Ensure products are safe before placing on market", "Implement effective market surveillance systems", "Notify authorities of unsafe products via RAPEX/Safety Gate", "Maintain technical documentation to demonstrate safety", "Apply GPSR obligations from December 2024"]', 'https://ec.europa.eu/safety-gate'),
('Corporate Sustainability Reporting Directive', 'CSRD', 'EU Directive 2022/2464 requiring large companies to report on environmental, social and governance (ESG) matters according to European Sustainability Reporting Standards.', 'European Union', 'European Commission', 'Sustainability Reporting', 'Active', ARRAY['All Industries'], '["Report according to ESRS standards (environmental, social, governance)", "Double materiality assessment required", "External assurance of sustainability information", "Disclose Scope 1, 2, and 3 GHG emissions", "Report on climate transition plans and targets"]', 'https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en'),
('Packaging and Packaging Waste Regulation', 'PPWR', 'EU Regulation (proposed, replacing Directive 94/62/EC) setting requirements for packaging sustainability, recyclability, and recycled content.', 'European Union', 'European Commission', 'Waste Management', 'Upcoming', ARRAY['Packaging', 'Consumer Products', 'Food & Beverage', 'Retail'], '["Minimum recycled content targets by packaging category", "Recyclability requirements (all packaging must be recyclable by 2030)", "Restrictions on certain single-use plastic packaging formats", "Reuse and refill targets for specific applications", "Packaging minimization requirements"]', 'https://environment.ec.europa.eu/topics/waste-and-recycling/packaging-and-packaging-waste_en');
