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
