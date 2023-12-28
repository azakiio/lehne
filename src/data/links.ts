import Mobility from "./expertise/mobility.png";
import Infrastructure from "./expertise/infrastructure.png";
import Environment from "./expertise/environment.png";
import Water from "./expertise/water.png";
import Digitalisation from "./expertise/digitalisation.png";
import HealthAndSafety from "./expertise/health-and-safety.png";

import History from "./about/history.jpg";
import Management from "./about/management.jpg";
import Services from "./about/services.jpg";
import Team from "./about/team.jpg";

export const expertiseLinksEn = {
  label: "Expertise",
  href: "expertise",
  items: [
    { label: "Mobility", href: "/mobility", thumbnail: Mobility },
    {
      label: "Infrastructure",
      href: "/infrastructure",
      thumbnail: Infrastructure,
    },
    { label: "Environment", href: "/environment", thumbnail: Environment },
    { label: "Water", href: "/water", thumbnail: Water },
    {
      label: "Digitalisation",
      href: "/digitalisation",
      thumbnail: Digitalisation,
    },
    {
      label: "Health and safety",
      href: "/health-and-safety",
      thumbnail: HealthAndSafety,
    },
  ],
};

export const aboutUsLinksEn = {
  label: "About us",
  href: "about-us",
  items: [
    { label: "Services", href: "/services", thumbnail: Services },
    { label: "Team", href: "/team", thumbnail: Team },
    { label: "Management", href: "/management", thumbnail: Management },
    { label: "Expert-Network", href: "/expert-network" },
    { label: "History", href: "/history", thumbnail: History },
  ],
};

const careerLinksEn = {
  label: "Career",
  href: "career",
  items: [
    { label: "Working at LEHNE ing.", href: "/working-at-lehne-ing" },
    { label: "Jobs", href: "/jobs" },
    { label: "Talent Promotion", href: "/talent-promotion" },
  ],
};

export const expertiseLinksDe = {
  label: "Expertise",
  href: "/expertise",
  items: [
    { label: "Mobilität", href: "/mobilitaet", thumbnail: Mobility },
    {
      label: "Infrastruktur",
      href: "/infrastruktur",
      thumbnail: Infrastructure,
    },
    { label: "Umwelt", href: "/umwelt", thumbnail: Environment },
    { label: "Wasser", href: "/wasser", thumbnail: Water },
    {
      label: "Digitalisierung",
      href: "/digitalisierung",
      thumbnail: Digitalisation,
    },
    {
      label: "Sicherheit und Gesundheitsschutz",
      href: "/sicherheit-gesundheitsschutz",
      thumbnail: HealthAndSafety,
    },
  ],
};

export const aboutUsLinksDe = {
  label: "Unternehmen",
  href: "/unternehmen",
  items: [
    { label: "Leistungen", href: "/leistungen", thumbnail: Services },
    { label: "Team", href: "/unser-team", thumbnail: Team },
    { label: "Führungsteam", href: "/management", thumbnail: Management },
    { label: "Experten-Netzwerk", href: "/experten-netzwerk" },
    { label: "Historie", href: "/historie", thumbnail: History },
  ],
};

const careerLinksDe = {
  label: "Karriere",
  href: "/karriere",
  items: [
    { label: "Arbeiten bei LEHNE ing.", href: "/arbeiten-bei-lehne-ing" },
    { label: "Stellenangebote", href: "/stellenangebote" },
    { label: "Talentförderung", href: "/talentfoerderung" },
  ],
};

const linksEn: Links[] = [
  expertiseLinksEn,
  aboutUsLinksEn,
  careerLinksEn,
  { label: "Projects", href: "/en/projects" },
  { label: "Contact", href: "/en/contact" },
  { label: "VBI", href: "/en/expert-network" },
];

const linksDe: Links[] = [
  expertiseLinksDe,
  aboutUsLinksDe,
  careerLinksDe,
  { label: "Projekte", href: "/projekte" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "VBI", href: "/experten-netzwerk" },
];

export const links = { en: linksEn, de: linksDe };

interface Links {
  label: string;
  href: string;
  items?: { label: string; href: string }[];
}
