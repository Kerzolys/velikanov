export type LayoutProps = {
  children: React.ReactNode;
  onScroll: (section: "about" | "calendar" | "media" | "gallery") => void;
};
