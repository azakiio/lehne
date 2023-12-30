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
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

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
"digitalisierung/4K-Luftaufnahmen mit Drohne/4K aerial shots with a drone.md": {
	id: "digitalisierung/4K-Luftaufnahmen mit Drohne/4K aerial shots with a drone.md";
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
"digitalisierung/Erstellung von 2D-Karten mit Drohne/Creation of 2D map with a drone c3aec6936fd047318028c06aee98fa9c.md": {
	id: "digitalisierung/Erstellung von 2D-Karten mit Drohne/Creation of 2D map with a drone c3aec6936fd047318028c06aee98fa9c.md";
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
"digitalisierung/Migration On-Premise zu Office-Cloud/Migration On-Premise zu Microsoft 365.md": {
	id: "digitalisierung/Migration On-Premise zu Office-Cloud/Migration On-Premise zu Microsoft 365.md";
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
"digitalisierung/Modernisierung Unternehmens-Website/Modernisation company website 608146c9e65e479c8753d76f8c9fae84.md": {
	id: "digitalisierung/Modernisierung Unternehmens-Website/Modernisation company website 608146c9e65e479c8753d76f8c9fae84.md";
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
"digitalisierung/Remote Office Administration/Remote office administration a8e7e01e5f534804a7b078892f088785.md": {
	id: "digitalisierung/Remote Office Administration/Remote office administration a8e7e01e5f534804a7b078892f088785.md";
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
"infrastruktur/Abwassergrundleitungen AK St Georg/Sewage pipes AK St Georg 175b5b94e8c547319cce109dde1362cf.md": {
	id: "infrastruktur/Abwassergrundleitungen AK St Georg/Sewage pipes AK St Georg 175b5b94e8c547319cce109dde1362cf.md";
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
"infrastruktur/Abwassergrundleitungen HAW Berliner Tor/Sewage pipes HAW Berliner Tor b2288cca0da84d4596f79b917cf0af1d.md": {
	id: "infrastruktur/Abwassergrundleitungen HAW Berliner Tor/Sewage pipes HAW Berliner Tor b2288cca0da84d4596f79b917cf0af1d.md";
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
"infrastruktur/Erschließung Harburger Brücken/Development of Harburg Brücken cc24681d3f0b4589b52d008bea2e4db9.md": {
	id: "infrastruktur/Erschließung Harburger Brücken/Development of Harburg Brücken cc24681d3f0b4589b52d008bea2e4db9.md";
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
"infrastruktur/Erschließung In der Schlucht/Settlement In der Schlucht f3aa216da8ca4635901540606336a1e6.md": {
	id: "infrastruktur/Erschließung In der Schlucht/Settlement In der Schlucht f3aa216da8ca4635901540606336a1e6.md";
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
"infrastruktur/Erschließung Seniorenanlage/Extension of retirement comple.md": {
	id: "infrastruktur/Erschließung Seniorenanlage/Extension of retirement comple.md";
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
"infrastruktur/Leitungen Neubau Waltershofer Brücken/New construction of Waltershofer bridges 1597c372f47c4f0c969565c3712e502b.md": {
	id: "infrastruktur/Leitungen Neubau Waltershofer Brücken/New construction of Waltershofer bridges 1597c372f47c4f0c969565c3712e502b.md";
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
"infrastruktur/Sielanlagen Neugraben-Fischbek /Settlement Neugraben-Fischbek eaf870633dec45a480bb3a2674129c22.md": {
	id: "infrastruktur/Sielanlagen Neugraben-Fischbek /Settlement Neugraben-Fischbek eaf870633dec45a480bb3a2674129c22.md";
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
"mobilitaet/Bike+Ride Kellinghusenstraße/Bike+Ride Kellinghusenstraße.md": {
	id: "mobilitaet/Bike+Ride Kellinghusenstraße/Bike+Ride Kellinghusenstraße.md";
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
"mobilitaet/Busbeschleunigung Lange Reihe /Bus acceleration lane Lange Reih.md": {
	id: "mobilitaet/Busbeschleunigung Lange Reihe /Bus acceleration lane Lange Reih.md";
  slug: "en/mobility/Bus acceleration lane Lange Reih";
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
"mobilitaet/Grundinstandsetzung Borsigstraße/Rebuildung and Overhaul Borsigstraße 768781971354429f90b03c30fe50de2e.md": {
	id: "mobilitaet/Grundinstandsetzung Borsigstraße/Rebuildung and Overhaul Borsigstraße 768781971354429f90b03c30fe50de2e.md";
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
"mobilitaet/Grundinstandsetzung Halenreie/Rebuildung and overhaul Halenrei 17fea7a41a7c4e9ab0dc1a6f5c792f90.md": {
	id: "mobilitaet/Grundinstandsetzung Halenreie/Rebuildung and overhaul Halenrei 17fea7a41a7c4e9ab0dc1a6f5c792f90.md";
  slug: "en/mobility/Rebuildung and overhaul Halenrei";
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
"mobilitaet/Grundinstandsetzung Moorfleeter Straße/Rebuilding and Overhaul Moorfleeter Straße.md": {
	id: "mobilitaet/Grundinstandsetzung Moorfleeter Straße/Rebuilding and Overhaul Moorfleeter Straße.md";
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
"mobilitaet/Modernisierung Autobahn A7/Modernisation A7-highway.md": {
	id: "mobilitaet/Modernisierung Autobahn A7/Modernisation A7-highway.md";
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
"mobilitaet/Veloroute Tornquiststraße/Veloroute Tornquiststraße.md": {
	id: "mobilitaet/Veloroute Tornquiststraße/Veloroute Tornquiststraße.md";
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
"sicherheit-gesundheitsschutz/sicherheits-und-gesundheitsschutzkoordination-landungsbruecken/SiGe coordination Landungsbrücken.md": {
	id: "sicherheit-gesundheitsschutz/sicherheits-und-gesundheitsschutzkoordination-landungsbruecken/SiGe coordination Landungsbrücken.md";
  slug: "en/sige/SiGe coordination Landungsbrücken";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"sicherheit-gesundheitsschutz/sicherheits-und-gesundheitsschutzkoordination-landungsbruecken/index.md": {
	id: "sicherheit-gesundheitsschutz/sicherheits-und-gesundheitsschutzkoordination-landungsbruecken/index.md";
  slug: "sicherheit-gesundheitsschutz/sicherheits-und-gesundheitsschutzkoordination-landungsbruecken";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"sicherheit-gesundheitsschutz/sicherheits-und-gesundheitsschutzkoordination-martkanal/SiGe coordination Marktkanal 6585d38fb3214c21bdb8f4f970140189.md": {
	id: "sicherheit-gesundheitsschutz/sicherheits-und-gesundheitsschutzkoordination-martkanal/SiGe coordination Marktkanal 6585d38fb3214c21bdb8f4f970140189.md";
  slug: "en/sige/SiGe coordination Marktkanal";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"sicherheit-gesundheitsschutz/sicherheits-und-gesundheitsschutzkoordination-martkanal/index.md": {
	id: "sicherheit-gesundheitsschutz/sicherheits-und-gesundheitsschutzkoordination-martkanal/index.md";
  slug: "sicherheit-gesundheitsschutz/sicherheits-und-gesundheitsschutzkoordination-martkanal";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"umwelt/Erneuerung Becken Hamburger Stadtpark/Renewal of pool Hamburg Stadtpark 12914399c5414a0daaccb224a4693fa8.md": {
	id: "umwelt/Erneuerung Becken Hamburger Stadtpark/Renewal of pool Hamburg Stadtpark 12914399c5414a0daaccb224a4693fa8.md";
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
"umwelt/Fettabscheideranlage HAW Berliner Tor/Fat separation facility HAW Berliner Tor.md": {
	id: "umwelt/Fettabscheideranlage HAW Berliner Tor/Fat separation facility HAW Berliner Tor.md";
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
"umwelt/Regenversickerung Kita Bundesstraße/Rainwater seepage Kindergarten Bundesstraße.md": {
	id: "umwelt/Regenversickerung Kita Bundesstraße/Rainwater seepage Kindergarten Bundesstraße.md";
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
"umwelt/Sanierung Entwässerungsanlagen/Renovation of drainage facilities.md": {
	id: "umwelt/Sanierung Entwässerungsanlagen/Renovation of drainage facilities.md";
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
"wasser/Entwässerung Curslacker Neuer Deich/Drainage Curslacker Neuer Deich 44d91306b8a34faab3739de8f899a601.md": {
	id: "wasser/Entwässerung Curslacker Neuer Deich/Drainage Curslacker Neuer Deich 44d91306b8a34faab3739de8f899a601.md";
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
"wasser/Erneuerung von Abwasserpumpwerken/Renewal of sewage pumping stations 99890ffb45574175b488d82de2688437.md": {
	id: "wasser/Erneuerung von Abwasserpumpwerken/Renewal of sewage pumping stations 99890ffb45574175b488d82de2688437.md";
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
"wasser/Hochwasserschutz Borghorster Hauptdeich/Flood protection Borghorster Hauptdeich 656d5d928c2f43d69994904366913b55.md": {
	id: "wasser/Hochwasserschutz Borghorster Hauptdeich/Flood protection Borghorster Hauptdeich 656d5d928c2f43d69994904366913b55.md";
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
"wasser/Hochwasserschutz Dradenauer Hauptdeich/Flood protection Dradenauer Hauptdeich a0637ecf3477469fb310b09131cf0266.md": {
	id: "wasser/Hochwasserschutz Dradenauer Hauptdeich/Flood protection Dradenauer Hauptdeich a0637ecf3477469fb310b09131cf0266.md";
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
"wasser/Stützmauer Bergedorfer Schlossgraben/Retaining wall Bergedorfer Schlossgraben 1b2453b329274eb986e71240b10989f5.md": {
	id: "wasser/Stützmauer Bergedorfer Schlossgraben/Retaining wall Bergedorfer Schlossgraben 1b2453b329274eb986e71240b10989f5.md";
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
"wasser/Stützwand Horster Damm/Retaining wall Horster Damm.md": {
	id: "wasser/Stützwand Horster Damm/Retaining wall Horster Damm.md";
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
"wasser/Technische Beratung Durchlass Rahlau/Passage Rahlau.md": {
	id: "wasser/Technische Beratung Durchlass Rahlau/Passage Rahlau.md";
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

	type ContentConfig = typeof import("../src/content/config");
}
