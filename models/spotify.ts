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

interface Album {
  title: string;
  artist: string;
  url: string;
  coverImage: {
    height: number;
    url: string;
    width: number;
  };
}

interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}
