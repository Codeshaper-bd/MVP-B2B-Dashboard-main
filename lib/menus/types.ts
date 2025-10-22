export type TMenuIcon =
  | React.ComponentType<React.SVGProps<SVGSVGElement>>
  | React.ElementType
  | string;
export type SubChildren = {
  href: string;
  label: string;
  searchLabel?: string;
  active: boolean;
  children?: SubChildren[];
};
export type Submenu = {
  href: string;
  label: string;
  searchLabel?: string;
  active: boolean;
  icon: TMenuIcon;
  submenus?: Submenu[];
  children?: SubChildren[];
};

export type Menu = {
  id: string;
  href: string;
  label: string;
  searchLabel?: string;
  active: boolean;
  icon: TMenuIcon;
  submenus: Submenu[];
};

export type MenusGroup = {
  menusName: string;
  menusGroup: {
    groupLabel: string;
    menus: Menu[];
    id: string;
    skip?: boolean; // skip for search menu to avoid duplicate
  }[];
};
export type FlatMenuItem = {
  id: string;
  href: string;
  label: string;
};
