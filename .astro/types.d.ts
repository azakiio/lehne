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
		"en": {
"digitalisation/4K aerial shots with a drone ba41661154f04347ba7148003300cff4.md": {
	id: "digitalisation/4K aerial shots with a drone ba41661154f04347ba7148003300cff4.md";
  slug: "digitalisation/4k-aerial-shots-with-a-drone-ba41661154f04347ba7148003300cff4";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"digitalisation/Creation of 2D map with a drone c3aec6936fd047318028c06aee98fa9c.md": {
	id: "digitalisation/Creation of 2D map with a drone c3aec6936fd047318028c06aee98fa9c.md";
  slug: "digitalisation/creation-of-2d-map-with-a-drone-c3aec6936fd047318028c06aee98fa9c";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"digitalisation/Migration On-Premise zu Microsoft 365 d0d5d396d3bc4710b66f42b35b9f2d6e.md": {
	id: "digitalisation/Migration On-Premise zu Microsoft 365 d0d5d396d3bc4710b66f42b35b9f2d6e.md";
  slug: "digitalisation/migration-on-premise-zu-microsoft-365-d0d5d396d3bc4710b66f42b35b9f2d6e";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"digitalisation/Modernisation company website 608146c9e65e479c8753d76f8c9fae84.md": {
	id: "digitalisation/Modernisation company website 608146c9e65e479c8753d76f8c9fae84.md";
  slug: "digitalisation/modernisation-company-website-608146c9e65e479c8753d76f8c9fae84";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"digitalisation/Remote office administration a8e7e01e5f534804a7b078892f088785.md": {
	id: "digitalisation/Remote office administration a8e7e01e5f534804a7b078892f088785.md";
  slug: "digitalisation/remote-office-administration-a8e7e01e5f534804a7b078892f088785";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"environment/Fat separation facility HAW Berliner Tor 0888440286db40fca9699bb034395e36.md": {
	id: "environment/Fat separation facility HAW Berliner Tor 0888440286db40fca9699bb034395e36.md";
  slug: "environment/fat-separation-facility-haw-berliner-tor-0888440286db40fca9699bb034395e36";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"environment/Rainwater seepage Kindergarten Bundesstraße 5c4f630d57da490cbebe196f2f0c61cc.md": {
	id: "environment/Rainwater seepage Kindergarten Bundesstraße 5c4f630d57da490cbebe196f2f0c61cc.md";
  slug: "environment/rainwater-seepage-kindergarten-bundesstraße-5c4f630d57da490cbebe196f2f0c61cc";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"environment/Renewal of pool Hamburg Stadtpark 12914399c5414a0daaccb224a4693fa8.md": {
	id: "environment/Renewal of pool Hamburg Stadtpark 12914399c5414a0daaccb224a4693fa8.md";
  slug: "environment/renewal-of-pool-hamburg-stadtpark-12914399c5414a0daaccb224a4693fa8";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"environment/Renovation of drainage facilities babb6340a6bf493c89a547f62d6c3f23.md": {
	id: "environment/Renovation of drainage facilities babb6340a6bf493c89a547f62d6c3f23.md";
  slug: "environment/renovation-of-drainage-facilities-babb6340a6bf493c89a547f62d6c3f23";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"health and safety/SiGe coordination Landungsbrücken d5c512357bab464a97d01817c905622a.md": {
	id: "health and safety/SiGe coordination Landungsbrücken d5c512357bab464a97d01817c905622a.md";
  slug: "health-and-safety/sige-coordination-landungsbrücken-d5c512357bab464a97d01817c905622a";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"health and safety/SiGe coordination Marktkanal 6585d38fb3214c21bdb8f4f970140189.md": {
	id: "health and safety/SiGe coordination Marktkanal 6585d38fb3214c21bdb8f4f970140189.md";
  slug: "health-and-safety/sige-coordination-marktkanal-6585d38fb3214c21bdb8f4f970140189";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"infrastructure/Development of Harburg Brücken cc24681d3f0b4589b52d008bea2e4db9.md": {
	id: "infrastructure/Development of Harburg Brücken cc24681d3f0b4589b52d008bea2e4db9.md";
  slug: "infrastructure/development-of-harburg-brücken-cc24681d3f0b4589b52d008bea2e4db9";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"infrastructure/Extension of retirement comple f4863319602040c7b8e62b00a63ef352.md": {
	id: "infrastructure/Extension of retirement comple f4863319602040c7b8e62b00a63ef352.md";
  slug: "infrastructure/extension-of-retirement-comple-f4863319602040c7b8e62b00a63ef352";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"infrastructure/New construction of Waltershofer bridges 1597c372f47c4f0c969565c3712e502b.md": {
	id: "infrastructure/New construction of Waltershofer bridges 1597c372f47c4f0c969565c3712e502b.md";
  slug: "infrastructure/new-construction-of-waltershofer-bridges-1597c372f47c4f0c969565c3712e502b";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"infrastructure/Settlement In der Schlucht f3aa216da8ca4635901540606336a1e6.md": {
	id: "infrastructure/Settlement In der Schlucht f3aa216da8ca4635901540606336a1e6.md";
  slug: "infrastructure/settlement-in-der-schlucht-f3aa216da8ca4635901540606336a1e6";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"infrastructure/Settlement Neugraben-Fischbek eaf870633dec45a480bb3a2674129c22.md": {
	id: "infrastructure/Settlement Neugraben-Fischbek eaf870633dec45a480bb3a2674129c22.md";
  slug: "infrastructure/settlement-neugraben-fischbek-eaf870633dec45a480bb3a2674129c22";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"infrastructure/Sewage pipes AK St Georg 175b5b94e8c547319cce109dde1362cf.md": {
	id: "infrastructure/Sewage pipes AK St Georg 175b5b94e8c547319cce109dde1362cf.md";
  slug: "infrastructure/sewage-pipes-ak-st-georg-175b5b94e8c547319cce109dde1362cf";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"infrastructure/Sewage pipes HAW Berliner Tor b2288cca0da84d4596f79b917cf0af1d.md": {
	id: "infrastructure/Sewage pipes HAW Berliner Tor b2288cca0da84d4596f79b917cf0af1d.md";
  slug: "infrastructure/sewage-pipes-haw-berliner-tor-b2288cca0da84d4596f79b917cf0af1d";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"mobility/Bike+Ride Kellinghusenstraße 73d1e50bcc444608988512dda549f011.md": {
	id: "mobility/Bike+Ride Kellinghusenstraße 73d1e50bcc444608988512dda549f011.md";
  slug: "mobility/bikeride-kellinghusenstraße-73d1e50bcc444608988512dda549f011";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"mobility/Bus acceleration lane Lange Reih d48d323457714dd2b0bcd36de7d83a7b.md": {
	id: "mobility/Bus acceleration lane Lange Reih d48d323457714dd2b0bcd36de7d83a7b.md";
  slug: "mobility/bus-acceleration-lane-lange-reih-d48d323457714dd2b0bcd36de7d83a7b";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"mobility/Modernisation A7-highway 3d731fc2c79541c6a304670bf8936d7e.md": {
	id: "mobility/Modernisation A7-highway 3d731fc2c79541c6a304670bf8936d7e.md";
  slug: "mobility/modernisation-a7-highway-3d731fc2c79541c6a304670bf8936d7e";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"mobility/Rebuilding and Overhaul Moorfleeter Straße 21406433820d4b51b00c9fa2edd5f9a7.md": {
	id: "mobility/Rebuilding and Overhaul Moorfleeter Straße 21406433820d4b51b00c9fa2edd5f9a7.md";
  slug: "mobility/rebuilding-and-overhaul-moorfleeter-straße-21406433820d4b51b00c9fa2edd5f9a7";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"mobility/Rebuildung and Overhaul Borsigstraße 768781971354429f90b03c30fe50de2e.md": {
	id: "mobility/Rebuildung and Overhaul Borsigstraße 768781971354429f90b03c30fe50de2e.md";
  slug: "mobility/rebuildung-and-overhaul-borsigstraße-768781971354429f90b03c30fe50de2e";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"mobility/Rebuildung and overhaul Halenrei 17fea7a41a7c4e9ab0dc1a6f5c792f90.md": {
	id: "mobility/Rebuildung and overhaul Halenrei 17fea7a41a7c4e9ab0dc1a6f5c792f90.md";
  slug: "mobility/rebuildung-and-overhaul-halenrei-17fea7a41a7c4e9ab0dc1a6f5c792f90";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"mobility/Veloroute Tornquiststraße d658552d89284e8eb693be0178429c34.md": {
	id: "mobility/Veloroute Tornquiststraße d658552d89284e8eb693be0178429c34.md";
  slug: "mobility/veloroute-tornquiststraße-d658552d89284e8eb693be0178429c34";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"water/Drainage Curslacker Neuer Deich 44d91306b8a34faab3739de8f899a601.md": {
	id: "water/Drainage Curslacker Neuer Deich 44d91306b8a34faab3739de8f899a601.md";
  slug: "water/drainage-curslacker-neuer-deich-44d91306b8a34faab3739de8f899a601";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"water/Flood protection Borghorster Hauptdeich 656d5d928c2f43d69994904366913b55.md": {
	id: "water/Flood protection Borghorster Hauptdeich 656d5d928c2f43d69994904366913b55.md";
  slug: "water/flood-protection-borghorster-hauptdeich-656d5d928c2f43d69994904366913b55";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"water/Flood protection Dradenauer Hauptdeich a0637ecf3477469fb310b09131cf0266.md": {
	id: "water/Flood protection Dradenauer Hauptdeich a0637ecf3477469fb310b09131cf0266.md";
  slug: "water/flood-protection-dradenauer-hauptdeich-a0637ecf3477469fb310b09131cf0266";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"water/Passage Rahlau 8a44a754b9c84da483ec36fd17429c04.md": {
	id: "water/Passage Rahlau 8a44a754b9c84da483ec36fd17429c04.md";
  slug: "water/passage-rahlau-8a44a754b9c84da483ec36fd17429c04";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"water/Rainwater treatment Moorfleeter Straße 5df24b1cb09549f2aa0a945285748865.md": {
	id: "water/Rainwater treatment Moorfleeter Straße 5df24b1cb09549f2aa0a945285748865.md";
  slug: "water/rainwater-treatment-moorfleeter-straße-5df24b1cb09549f2aa0a945285748865";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"water/Renewal of sewage pumping stations 99890ffb45574175b488d82de2688437.md": {
	id: "water/Renewal of sewage pumping stations 99890ffb45574175b488d82de2688437.md";
  slug: "water/renewal-of-sewage-pumping-stations-99890ffb45574175b488d82de2688437";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"water/Retaining wall Bergedorfer Schlossgraben 1b2453b329274eb986e71240b10989f5.md": {
	id: "water/Retaining wall Bergedorfer Schlossgraben 1b2453b329274eb986e71240b10989f5.md";
  slug: "water/retaining-wall-bergedorfer-schlossgraben-1b2453b329274eb986e71240b10989f5";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
"water/Retaining wall Horster Damm c6584b30dbc44e14b6c3bc85aa6de5ad.md": {
	id: "water/Retaining wall Horster Damm c6584b30dbc44e14b6c3bc85aa6de5ad.md";
  slug: "water/retaining-wall-horster-damm-c6584b30dbc44e14b6c3bc85aa6de5ad";
  body: string;
  collection: "en";
  data: any
} & { render(): Render[".md"] };
};
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
"Sicherheit und Gesundheit/Sicherheits- und Gesundheitsschutzkoordination  Marktkanal/index.md": {
	id: "Sicherheit und Gesundheit/Sicherheits- und Gesundheitsschutzkoordination  Marktkanal/index.md";
  slug: "sicherheit-und-gesundheit/sicherheits--und-gesundheitsschutzkoordination--marktkanal";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"Sicherheit und Gesundheit/Sicherheits- und Gesundheitsschutzkoordination  – Landungsbrücken/index.md": {
	id: "Sicherheit und Gesundheit/Sicherheits- und Gesundheitsschutzkoordination  – Landungsbrücken/index.md";
  slug: "sicherheit-und-gesundheit/sicherheits--und-gesundheitsschutzkoordination---landungsbrücken";
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
"digitalisierung/Erstellung von 2D-Karten mit Drohne/index.md": {
	id: "digitalisierung/Erstellung von 2D-Karten mit Drohne/index.md";
  slug: "digitalisierung/erstellung-von-2d-karten-mit-drohne";
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
"digitalisierung/Modernisierung Unternehmens-Website/index.md": {
	id: "digitalisierung/Modernisierung Unternehmens-Website/index.md";
  slug: "digitalisierung/modernisierung-unternehmens-website";
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
"infrastruktur/Abwassergrundleitungen AK St Georg/index.md": {
	id: "infrastruktur/Abwassergrundleitungen AK St Georg/index.md";
  slug: "infrastruktur/abwassergrundleitungen-ak-st-georg";
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
"infrastruktur/Erschließung Harburger Brücken/index.md": {
	id: "infrastruktur/Erschließung Harburger Brücken/index.md";
  slug: "infrastruktur/erschließung-harburger-brücken";
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
"infrastruktur/Erschließung Seniorenanlage/index.md": {
	id: "infrastruktur/Erschließung Seniorenanlage/index.md";
  slug: "infrastruktur/erschließung-seniorenanlage";
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
"infrastruktur/Sielanlagen Neugraben-Fischbek /index.md": {
	id: "infrastruktur/Sielanlagen Neugraben-Fischbek /index.md";
  slug: "infrastruktur/sielanlagen-neugraben-fischbek-";
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
"mobilitaet/Busbeschleunigung Lange Reihe /index.md": {
	id: "mobilitaet/Busbeschleunigung Lange Reihe /index.md";
  slug: "mobilitaet/busbeschleunigung-lange-reihe-";
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
"mobilitaet/Grundinstandsetzung Halenreie/index.md": {
	id: "mobilitaet/Grundinstandsetzung Halenreie/index.md";
  slug: "mobilitaet/grundinstandsetzung-halenreie";
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
"mobilitaet/Modernisierung Autobahn A7/index.md": {
	id: "mobilitaet/Modernisierung Autobahn A7/index.md";
  slug: "mobilitaet/modernisierung-autobahn-a7";
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
"umwelt/Erneuerung Becken Hamburger Stadtpark/index.md": {
	id: "umwelt/Erneuerung Becken Hamburger Stadtpark/index.md";
  slug: "umwelt/erneuerung-becken-hamburger-stadtpark";
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
"umwelt/Regenversickerung Kita Bundesstraße/index.md": {
	id: "umwelt/Regenversickerung Kita Bundesstraße/index.md";
  slug: "umwelt/regenversickerung-kita-bundesstraße";
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
"umwelt/Sanierung Entwässerungsanlagen/Sanierung Entwässerungsanlagen .md": {
	id: "umwelt/Sanierung Entwässerungsanlagen/Sanierung Entwässerungsanlagen .md";
  slug: "umwelt/sanierung-entwässerungsanlagen/sanierung-entwässerungsanlagen-";
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
"wasser/Erneuerung von Abwasserpumpwerken/index.md": {
	id: "wasser/Erneuerung von Abwasserpumpwerken/index.md";
  slug: "wasser/erneuerung-von-abwasserpumpwerken";
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
"wasser/Hochwasserschutz Dradenauer Hauptdeich/index.md": {
	id: "wasser/Hochwasserschutz Dradenauer Hauptdeich/index.md";
  slug: "wasser/hochwasserschutz-dradenauer-hauptdeich";
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
"wasser/Stützwand Horster Damm/index.md": {
	id: "wasser/Stützwand Horster Damm/index.md";
  slug: "wasser/stützwand-horster-damm";
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
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
