export type NavbarProps = {
  onScroll: (section: "about" | "calendar" | "media" | "gallery") => void;
  onToggleMenu: () => void;
  isOpen: boolean;
  isMobile: boolean;
};
