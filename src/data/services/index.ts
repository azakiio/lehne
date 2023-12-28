import strassenImage from "./strassen.jpg";
import verkehrImage from "./verkehr.jpg";
import infrastrukturImage from "./infrastruktur.jpg";
import umweltImage from "./umwelt.jpg";
import erschliessungImage from "./erschliessung.jpg";
import entwaesserungImage from "./entwaesserung.jpg";

import beratungExpertiseImage from "./beratung.jpg";
import digitalisierungImage from "./digitalisierung.jpg";
import sigeKoImage from "./sigeko.jpg";

import vorbereitungImage from "./vorbereitung.jpg";
import koordinierungImage from "./koordinierung.jpg";
import bauueberwachungImage from "./bauueberwachung.jpg";

export const planung = [
  {
    label: "Straßen",
    href: "/mobilitaet",
    thumbnail: strassenImage,
  },
  {
    label: "Verkehr",
    href: "/mobilitaet",
    thumbnail: verkehrImage,
  },
  {
    label: "Infrastruktur",
    href: "/infrastruktur",
    thumbnail: infrastrukturImage,
  },
  { label: "Umwelt", href: "/umwelt", thumbnail: umweltImage },
  {
    label: "Erschließung",
    href: "/infrastruktur",
    thumbnail: erschliessungImage,
  },
  {
    label: "Entwässerung",
    href: "/wasser",
    thumbnail: entwaesserungImage,
  },
];

export const beratung = [
  {
    label: "Beratung und Expertise",
    href: "/expertise",
    thumbnail: beratungExpertiseImage,
  },
  {
    label: "Digitalisierung und IT-Administration",
    href: "/digitalisierung",
    thumbnail: digitalisierungImage,
  },
  {
    label: "SiGeKo",
    href: "/sicherheit-gesundheitsschutz",
    thumbnail: sigeKoImage,
  },
];

export const bauleitung = [
  {
    label: "Vorbereitung",
    href: "/infrastruktur",
    thumbnail: vorbereitungImage,
  },
  {
    label: "Koordinierung",
    href: "/infrastruktur",
    thumbnail: koordinierungImage,
  },
  {
    label: "Örtliche Bauüberwachung",
    href: "/expertise",
    thumbnail: bauueberwachungImage,
  },
];

export const planning = [
  {
    label: "Roads",
    href: "/en/mobility",
    thumbnail: strassenImage,
  },
  {
    label: "Traffic",
    href: "/en/mobility",
    thumbnail: verkehrImage,
  },
  {
    label: "Infrastructure",
    href: "/en/infrastructure/",
    thumbnail: infrastrukturImage,
  },
  { label: "Environment", href: "/en/environment", thumbnail: umweltImage },
  {
    label: "Development",
    href: "/en/infrastructure",
    thumbnail: erschliessungImage,
  },
  {
    label: "Drainage",
    href: "/en/water",
    thumbnail: entwaesserungImage,
  },
];

export const consulting = [
  {
    label: "Consultation and expertise",
    href: "/en/expertise",
    thumbnail: beratungExpertiseImage,
  },
  {
    label: "Digitization and IT administration",
    href: "/en/digitalisation",
    thumbnail: digitalisierungImage,
  },
  {
    label: "Safety and health protection",
    href: "/en/health-and-safety/",
    thumbnail: sigeKoImage,
  },
];

export const construction = [
  {
    label: "Preparation",
    href: "/en/expertise",
    thumbnail: vorbereitungImage,
  },
  {
    label: "Coordination",
    href: "/en/expertise",
    thumbnail: koordinierungImage,
  },
  {
    label: "Local Monitoring",
    href: "/en/expertise",
    thumbnail: bauueberwachungImage,
  },
];
