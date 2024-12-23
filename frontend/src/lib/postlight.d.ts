declare module '@postlight/parser' {
	export function parse(
		url: string,
		req: unknown
	): Promise<{
		title: string;
		content: string;
		author: string;
		date_published: string;
		lead_image_url: string | null;
		dek: string | null;
		next_page_url: string | null;
		url: string;
		domain: string;
		excerpt: string;
		word_count: number;
		direction: string;
		total_pages: number;
		rendered_pages: number;
	}>;
}
