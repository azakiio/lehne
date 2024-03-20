declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"people": {
"de/amelie.md": {
	id: "de/amelie.md";
  slug: "de/amelie";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"de/jakob.md": {
	id: "de/jakob.md";
  slug: "de/jakob";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"de/michael.md": {
	id: "de/michael.md";
  slug: "de/michael";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"de/stefan.md": {
	id: "de/stefan.md";
  slug: "de/stefan";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"en/amelie.md": {
	id: "en/amelie.md";
  slug: "en/amelie";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"en/jakob.md": {
	id: "en/jakob.md";
  slug: "en/jakob";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"en/michael.md": {
	id: "en/michael.md";
  slug: "en/michael";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"en/stefan.md": {
	id: "en/stefan.md";
  slug: "en/stefan";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
};
"projects": {
"digitalisierung/4K-Luftaufnahmen mit Drohne/en.md": {
	id: "digitalisierung/4K-Luftaufnahmen mit Drohne/en.md";
  slug: "en/digitalisation/4K aerial shots with a drone";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"digitalisierung/4K-Luftaufnahmen mit Drohne/index.md": {
	id: "digitalisierung/4K-Luftaufnahmen mit Drohne/index.md";
  slug: "digitalisierung/4k-luftaufnahmen-mit-drohne";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"digitalisierung/Erstellung von 2D-Karten mit Drohne/en.md": {
	id: "digitalisierung/Erstellung von 2D-Karten mit Drohne/en.md";
  slug: "en/digitalisation/Creation of 2D map with a drone";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"digitalisierung/Erstellung von 2D-Karten mit Drohne/index.md": {
	id: "digitalisierung/Erstellung von 2D-Karten mit Drohne/index.md";
  slug: "digitalisierung/erstellung-von-2d-karten-mit-drohne";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"digitalisierung/Migration On-Premise zu Office-Cloud/en.md": {
	id: "digitalisierung/Migration On-Premise zu Office-Cloud/en.md";
  slug: "en/digitalisation/Migration On-Premise zu Microsoft 365";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"digitalisierung/Migration On-Premise zu Office-Cloud/index.md": {
	id: "digitalisierung/Migration On-Premise zu Office-Cloud/index.md";
  slug: "digitalisierung/migration-on-premise-zu-office-cloud";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"digitalisierung/Modernisierung Unternehmens-Website/en.md": {
	id: "digitalisierung/Modernisierung Unternehmens-Website/en.md";
  slug: "en/digitalisation/Modernisation company website";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"digitalisierung/Modernisierung Unternehmens-Website/index.md": {
	id: "digitalisierung/Modernisierung Unternehmens-Website/index.md";
  slug: "digitalisierung/modernisierung-unternehmens-website";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"digitalisierung/Remote Office Administration/en.md": {
	id: "digitalisierung/Remote Office Administration/en.md";
  slug: "en/digitalisation/Remote Office Administration";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"digitalisierung/Remote Office Administration/index.md": {
	id: "digitalisierung/Remote Office Administration/index.md";
  slug: "digitalisierung/remote-office-administration";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Abwassergrundleitungen AK St Georg/en.md": {
	id: "infrastruktur/Abwassergrundleitungen AK St Georg/en.md";
  slug: "en/infrastructure/Sewage pipes AK St. Georg";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Abwassergrundleitungen AK St Georg/index.md": {
	id: "infrastruktur/Abwassergrundleitungen AK St Georg/index.md";
  slug: "infrastruktur/abwassergrundleitungen-ak-st-georg";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Abwassergrundleitungen HAW Berliner Tor/en.md": {
	id: "infrastruktur/Abwassergrundleitungen HAW Berliner Tor/en.md";
  slug: "en/infrastructure/Sewage pipes HAW Berliner Tor";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Abwassergrundleitungen HAW Berliner Tor/index.md": {
	id: "infrastruktur/Abwassergrundleitungen HAW Berliner Tor/index.md";
  slug: "infrastruktur/abwassergrundleitungen-haw-berliner-tor";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Erschließung Harburger Brücken/en.md": {
	id: "infrastruktur/Erschließung Harburger Brücken/en.md";
  slug: "en/infrastructure/Development of Harburg Brücken";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Erschließung Harburger Brücken/index.md": {
	id: "infrastruktur/Erschließung Harburger Brücken/index.md";
  slug: "infrastruktur/erschließung-harburger-brücken";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Erschließung In der Schlucht/en.md": {
	id: "infrastruktur/Erschließung In der Schlucht/en.md";
  slug: "en/infrastructure/Settlement In der Schlucht";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Erschließung In der Schlucht/index.md": {
	id: "infrastruktur/Erschließung In der Schlucht/index.md";
  slug: "infrastruktur/erschließung-in-der-schlucht";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Erschließung Seniorenanlage/en.md": {
	id: "infrastruktur/Erschließung Seniorenanlage/en.md";
  slug: "en/infrastructure/Extension of retirement complex";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Erschließung Seniorenanlage/index.md": {
	id: "infrastruktur/Erschließung Seniorenanlage/index.md";
  slug: "infrastruktur/erschließung-seniorenanlage";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Leitungen Neubau Waltershofer Brücken/en.md": {
	id: "infrastruktur/Leitungen Neubau Waltershofer Brücken/en.md";
  slug: "en/infrastructure/New construction of Waltershofer bridges";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Leitungen Neubau Waltershofer Brücken/index.md": {
	id: "infrastruktur/Leitungen Neubau Waltershofer Brücken/index.md";
  slug: "infrastruktur/leitungen-neubau-waltershofer-brücken";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Sielanlagen Neugraben-Fischbek /en.md": {
	id: "infrastruktur/Sielanlagen Neugraben-Fischbek /en.md";
  slug: "en/infrastructure/Settlement Neugraben-Fischbek";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"infrastruktur/Sielanlagen Neugraben-Fischbek /index.md": {
	id: "infrastruktur/Sielanlagen Neugraben-Fischbek /index.md";
  slug: "infrastruktur/sielanlagen-neugraben-fischbek-";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Bike+Ride Kellinghusenstraße/en.md": {
	id: "mobilitaet/Bike+Ride Kellinghusenstraße/en.md";
  slug: "en/mobility/Bike+Ride Kellinghusenstraße";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Bike+Ride Kellinghusenstraße/index.md": {
	id: "mobilitaet/Bike+Ride Kellinghusenstraße/index.md";
  slug: "mobilitaet/bikeride-kellinghusenstraße";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Busbeschleunigung Lange Reihe /en.md": {
	id: "mobilitaet/Busbeschleunigung Lange Reihe /en.md";
  slug: "en/mobility/Bus acceleration lane Lange Reihe";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Busbeschleunigung Lange Reihe /index.md": {
	id: "mobilitaet/Busbeschleunigung Lange Reihe /index.md";
  slug: "mobilitaet/busbeschleunigung-lange-reihe-";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Grundinstandsetzung Borsigstraße/en.md": {
	id: "mobilitaet/Grundinstandsetzung Borsigstraße/en.md";
  slug: "en/mobility/Rebuildung and Overhaul Borsigstraße";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Grundinstandsetzung Borsigstraße/index.md": {
	id: "mobilitaet/Grundinstandsetzung Borsigstraße/index.md";
  slug: "mobilitaet/grundinstandsetzung-borsigstraße";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Grundinstandsetzung Halenreie/en.md": {
	id: "mobilitaet/Grundinstandsetzung Halenreie/en.md";
  slug: "en/mobility/Rebuildung and overhaul Halenreie";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Grundinstandsetzung Halenreie/index.md": {
	id: "mobilitaet/Grundinstandsetzung Halenreie/index.md";
  slug: "mobilitaet/grundinstandsetzung-halenreie";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Grundinstandsetzung Moorfleeter Straße/en.md": {
	id: "mobilitaet/Grundinstandsetzung Moorfleeter Straße/en.md";
  slug: "en/mobility/Rebuilding and Overhaul Moorfleeter Straße";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Grundinstandsetzung Moorfleeter Straße/index.md": {
	id: "mobilitaet/Grundinstandsetzung Moorfleeter Straße/index.md";
  slug: "mobilitaet/grundinstandsetzung-moorfleeter-straße";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Modernisierung Autobahn A7/en.md": {
	id: "mobilitaet/Modernisierung Autobahn A7/en.md";
  slug: "en/mobility/Modernisation A7-highway";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Modernisierung Autobahn A7/index.md": {
	id: "mobilitaet/Modernisierung Autobahn A7/index.md";
  slug: "mobilitaet/modernisierung-autobahn-a7";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Veloroute Tornquiststraße/en.md": {
	id: "mobilitaet/Veloroute Tornquiststraße/en.md";
  slug: "en/mobility/Veloroute Tornquiststraße";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"mobilitaet/Veloroute Tornquiststraße/index.md": {
	id: "mobilitaet/Veloroute Tornquiststraße/index.md";
  slug: "mobilitaet/veloroute-tornquiststraße";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"sicherheit-gesundheit/sicherheits-und-gesundheitsschutzkoordination-landungsbruecken/en.md": {
	id: "sicherheit-gesundheit/sicherheits-und-gesundheitsschutzkoordination-landungsbruecken/en.md";
  slug: "en/sige/SiGe coordination Landungsbrücken";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"sicherheit-gesundheit/sicherheits-und-gesundheitsschutzkoordination-landungsbruecken/index.md": {
	id: "sicherheit-gesundheit/sicherheits-und-gesundheitsschutzkoordination-landungsbruecken/index.md";
  slug: "sicherheit-gesundheit/sicherheits-und-gesundheitsschutzkoordination-landungsbruecken";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"sicherheit-gesundheit/sicherheits-und-gesundheitsschutzkoordination-martkanal/en.md": {
	id: "sicherheit-gesundheit/sicherheits-und-gesundheitsschutzkoordination-martkanal/en.md";
  slug: "en/sige/SiGe coordination Marktkanal";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"sicherheit-gesundheit/sicherheits-und-gesundheitsschutzkoordination-martkanal/index.md": {
	id: "sicherheit-gesundheit/sicherheits-und-gesundheitsschutzkoordination-martkanal/index.md";
  slug: "sicherheit-gesundheit/sicherheits-und-gesundheitsschutzkoordination-martkanal";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"umwelt/Erneuerung Becken Hamburger Stadtpark/en.md": {
	id: "umwelt/Erneuerung Becken Hamburger Stadtpark/en.md";
  slug: "en/environment/Renewal of pool Hamburg Stadtpark";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"umwelt/Erneuerung Becken Hamburger Stadtpark/index.md": {
	id: "umwelt/Erneuerung Becken Hamburger Stadtpark/index.md";
  slug: "umwelt/erneuerung-becken-hamburger-stadtpark";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"umwelt/Fettabscheideranlage HAW Berliner Tor/en.md": {
	id: "umwelt/Fettabscheideranlage HAW Berliner Tor/en.md";
  slug: "en/environment/Fat separation facility HAW Berliner Tor";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"umwelt/Fettabscheideranlage HAW Berliner Tor/index.md": {
	id: "umwelt/Fettabscheideranlage HAW Berliner Tor/index.md";
  slug: "umwelt/fettabscheideranlage-haw-berliner-tor";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"umwelt/Regenversickerung Kita Bundesstraße/en.md": {
	id: "umwelt/Regenversickerung Kita Bundesstraße/en.md";
  slug: "en/environment/Rainwater seepage Kindergarten Bundesstraße";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"umwelt/Regenversickerung Kita Bundesstraße/index.md": {
	id: "umwelt/Regenversickerung Kita Bundesstraße/index.md";
  slug: "umwelt/regenversickerung-kita-bundesstraße";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"umwelt/Regenwasserbehandlung Moorfleeter Straße/en.md": {
	id: "umwelt/Regenwasserbehandlung Moorfleeter Straße/en.md";
  slug: "en/environment/Rainwater treatment Moorfleeter Straße";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"umwelt/Regenwasserbehandlung Moorfleeter Straße/index.md": {
	id: "umwelt/Regenwasserbehandlung Moorfleeter Straße/index.md";
  slug: "umwelt/regenwasserbehandlung-moorfleeter-straße";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"umwelt/Sanierung Entwässerungsanlagen/en.md": {
	id: "umwelt/Sanierung Entwässerungsanlagen/en.md";
  slug: "en/environment/Renovation of drainage facilities";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"umwelt/Sanierung Entwässerungsanlagen/index.md": {
	id: "umwelt/Sanierung Entwässerungsanlagen/index.md";
  slug: "umwelt/sanierung-entwässerungsanlagen";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Entwässerung Curslacker Neuer Deich/en.md": {
	id: "wasser/Entwässerung Curslacker Neuer Deich/en.md";
  slug: "en/water/Drainage Curslacker Neuer Deich";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Entwässerung Curslacker Neuer Deich/index.md": {
	id: "wasser/Entwässerung Curslacker Neuer Deich/index.md";
  slug: "wasser/entwässerung-curslacker-neuer-deich";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Erneuerung Trinkwasserleitung/index.md": {
	id: "wasser/Erneuerung Trinkwasserleitung/index.md";
  slug: "wasser/erneuerung-trinkwasserleitung";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Erneuerung von Abwasserpumpwerken/en.md": {
	id: "wasser/Erneuerung von Abwasserpumpwerken/en.md";
  slug: "en/water/Renewal of sewage pumping stations";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Erneuerung von Abwasserpumpwerken/index.md": {
	id: "wasser/Erneuerung von Abwasserpumpwerken/index.md";
  slug: "wasser/erneuerung-von-abwasserpumpwerken";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Hochwasserschutz Borghorster Hauptdeich/en.md": {
	id: "wasser/Hochwasserschutz Borghorster Hauptdeich/en.md";
  slug: "en/water/Flood protection Borghorster Hauptdeich";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Hochwasserschutz Borghorster Hauptdeich/index.md": {
	id: "wasser/Hochwasserschutz Borghorster Hauptdeich/index.md";
  slug: "wasser/hochwasserschutz-borghorster-hauptdeich";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Hochwasserschutz Dradenauer Hauptdeich/en.md": {
	id: "wasser/Hochwasserschutz Dradenauer Hauptdeich/en.md";
  slug: "en/water/Flood protection Dradenauer Hauptdeich";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Hochwasserschutz Dradenauer Hauptdeich/index.md": {
	id: "wasser/Hochwasserschutz Dradenauer Hauptdeich/index.md";
  slug: "wasser/hochwasserschutz-dradenauer-hauptdeich";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Stützmauer Bergedorfer Schlossgraben/en.md": {
	id: "wasser/Stützmauer Bergedorfer Schlossgraben/en.md";
  slug: "en/water/Retaining wall Bergedorfer Schlossgraben";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Stützmauer Bergedorfer Schlossgraben/index.md": {
	id: "wasser/Stützmauer Bergedorfer Schlossgraben/index.md";
  slug: "wasser/stützmauer-bergedorfer-schlossgraben";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Stützwand Horster Damm/en.md": {
	id: "wasser/Stützwand Horster Damm/en.md";
  slug: "en/water/Retaining wall Horster Damm";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Stützwand Horster Damm/index.md": {
	id: "wasser/Stützwand Horster Damm/index.md";
  slug: "wasser/stützwand-horster-damm";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Technische Beratung Durchlass Rahlau/en.md": {
	id: "wasser/Technische Beratung Durchlass Rahlau/en.md";
  slug: "en/water/Passage Rahlau";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"wasser/Technische Beratung Durchlass Rahlau/index.md": {
	id: "wasser/Technische Beratung Durchlass Rahlau/index.md";
  slug: "wasser/technische-beratung-durchlass-rahlau";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"jobs": {
"architekt": {
	id: "architekt";
  collection: "jobs";
  data: InferEntrySchema<"jobs">
};
"en/architect": {
	id: "en/architect";
  collection: "jobs";
  data: InferEntrySchema<"jobs">
};
"en/engineer": {
	id: "en/engineer";
  collection: "jobs";
  data: InferEntrySchema<"jobs">
};
"en/student1": {
	id: "en/student1";
  collection: "jobs";
  data: InferEntrySchema<"jobs">
};
"en/student2": {
	id: "en/student2";
  collection: "jobs";
  data: InferEntrySchema<"jobs">
};
"engineer": {
	id: "engineer";
  collection: "jobs";
  data: InferEntrySchema<"jobs">
};
"werkstudent": {
	id: "werkstudent";
  collection: "jobs";
  data: InferEntrySchema<"jobs">
};
"werkstudent2": {
	id: "werkstudent2";
  collection: "jobs";
  data: InferEntrySchema<"jobs">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
