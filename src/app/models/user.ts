export interface User {
  uid: string;
  email: string;
  loginType: string;
  privateEmail: boolean;
  photoURL?: string;
  displayName?: string;
  about?: string;
  roles: UserRoles;
  interests: UserInterest[];
  settings: UserSettings;
}
export interface UserRoles {
  betaTester: boolean; //debug role?
  verified: boolean;
  admin: boolean;
  debug: boolean;
  vip: boolean;
}
export interface UserInterest{
  active: boolean;
  name: string;
  link: string;
  sidenavPosition: number;
  widget?: {
    data?: any[];
  }
}
export interface UserSettings {
  theme:{
    name: string;
    dark: boolean;
  }
  homepage: {
    searchbar: {
      display: boolean;
      type: string;
    }
    shortcuts: {
      display?: boolean;
      links?: UserHomepageShortcut[]
    }
    recent: {
      display?: boolean;
      links?: any[]
    }
    widgets: {
      topLeft: string;
      topRight: string;
      bottomLeft: string;
      bottomRight: string;
    }
    navbarLinks: UserNavbarLink[]
  }
}
export interface UserHomepageShortcut {
  index: number;
  name: string;
  link: string;
  icon: string;
}

export interface UserNavbarLink {
  index: number;
  display: boolean;
  name: string;
  link: string;
}



