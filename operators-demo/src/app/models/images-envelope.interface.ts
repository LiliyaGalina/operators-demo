export interface IImagesEnvelope {
  collection: {
    href: string;
    items: Array<{
      data: Array<{
        center: string;
        date_created: Date;
        description: string;
        keywords: string[];
        media_type: string;
        nasa_id: string;
        title: string;
      }>;
      href: string;
      links: Array<{
        href: string;
        rel: string;
        render: string;
      }>;
    }>;
    links: Array<{
      href: string;
      prompt: string;
      next: string;
    }>;
    metadata: {
      total_hits: number;
    };
    version: string;
  };
}
