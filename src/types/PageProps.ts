interface PageParams extends Record<string, string | string[] | undefined> {
  // shared params
}

export default interface PageProps {
  params: Promise<PageParams>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface LayoutProps {
  children: React.ReactNode;
  params: Promise<PageParams>;
}
