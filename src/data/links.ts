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

import VBI from "~/assets/vbi.jpg";

export const expertiseLinksEn = {
  label: "Expertise",
  href: "/en/expertise",
  items: [
    { label: "Mobility", href: "/en/mobility", thumbnail: Mobility },
    {
      label: "Infrastructure",
      href: "/en/infrastructure",
      thumbnail: Infrastructure,
    },
    { label: "Environment", href: "/en/environment", thumbnail: Environment },
    { label: "Water", href: "/en/water", thumbnail: Water },
    {
      label: "Digitalisation",
      href: "/en/digitalisation",
      thumbnail: Digitalisation,
    },
    {
      label: "Health and safety",
      href: "/en/health-and-safety",
      thumbnail: HealthAndSafety,
    },
  ],
};

export const aboutUsLinksEn = {
  label: "About us",
  href: "/en/about-us",
  items: [
    { label: "Services", href: "/en/services", thumbnail: Services },
    { label: "Team", href: "/en/team", thumbnail: Team },
    { label: "Management", href: "/en/management", thumbnail: Management },
    { label: "Expert-Network", href: "/en/expert-network" },
    { label: "History", href: "/en//history", thumbnail: History },
  ],
};

const careerLinksEn = {
  label: "Career",
  href: "/en/career",
  items: [
    { label: "Working at LEHNE ing.", href: "/en/working-at-lehne-ing" },
    { label: "Jobs", href: "/en/jobs" },
    { label: "Talent Promotion", href: "/en/talent-promotion" },
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
  { label: "VBI", href: "/en/expert-network", thumbnail: VBI },
];

const linksDe: Links[] = [
  expertiseLinksDe,
  aboutUsLinksDe,
  careerLinksDe,
  { label: "Projekte", href: "/projekte" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "VBI", href: "/experten-netzwerk", thumbnail: VBI },
];

export const links = { en: linksEn, de: linksDe };

interface Links {
  label: string;
  href: string;
  thumbnail?: ImageMetadata;
  items?: { label: string; href: string }[];
}
