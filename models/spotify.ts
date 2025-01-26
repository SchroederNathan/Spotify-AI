interface Track {
  title: string;
  artist: string;
  url: string;
  coverImage: {
    height: number;
    url: string;
    width: number;
  };
}

interface Artist {
  name: string;
  url: string;
  coverImage: {
    height: number;
    url: string;
    width: number;
  };
  followers: number;
}

interface User {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  product: string;
  type: string;
  uri: string;
}