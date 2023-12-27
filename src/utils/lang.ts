const langs = { en: "English", de: "Deutsch" };

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in langs) return lang as keyof typeof langs;
  return "de";
}
