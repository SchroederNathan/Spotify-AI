import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

interface SpotifyToken {
  accessToken: string;
  sub: string;
}

const getAccessToken = async (req: NextApiRequest) => {
  const token = (await getToken({ req })) as SpotifyToken | null;

  if (!token) {
    throw new Error("Not authenticated");
  }

  if (!token.accessToken) {
    throw new Error("No access token found");
  }

  // Verify the user ID matches
  const userId = token.sub;
  if (!userId) {
    throw new Error("No user ID found");
  }

  return { 
    access_token: token.accessToken,
    user_id: userId
  };
};

export const getUser = async (req: NextApiRequest) => {
  const { access_token } = await getAccessToken(req);
  return fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const recentlyPlayed = async (
  req: NextApiRequest,
  limit: number = 30
) => {
  const { access_token } = await getAccessToken(req);
  return fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

export const topTracks = async (
  { time_range }: { time_range?: string },
  req: NextApiRequest
) => {
    const { access_token } = await getAccessToken(req);
  return fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${
        time_range || "short_term"
    }`,
    { headers: { Authorization: `Bearer ${access_token}` } }
    );
};

export const topArtists = async (
  time_range: string | undefined,
  req: NextApiRequest
) => {
  const { access_token } = await getAccessToken(req);
  return fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${
      time_range || "short_term"
    }`,
    { headers: { Authorization: `Bearer ${access_token}` } }
  );
};

export const topAlbums = async (req: NextApiRequest, time_range: string) => {
  const { access_token } = await getAccessToken(req);

  return fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${
      time_range || "short_term"
    }&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const topGenres = async (req: NextApiRequest, time_range: string) => {
  const { access_token } = await getAccessToken(req);

  return fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${
      time_range || "short_term"
    }&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const userPlaylists = async (req: NextApiRequest) => {
  const { access_token } = await getAccessToken(req);

  return fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const currentlyPlayingSong = async (req: NextApiRequest) => {
  const { access_token } = await getAccessToken(req);

  return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const searchSong = async (
  query: URLSearchParams,
  req: NextApiRequest
) => {
  const { access_token } = await getAccessToken(req);
  const trackName = query.get("track");
  const artistName = query.get("artist");

  const spotifyQuery = `track:${trackName}${
    artistName ? ` artist:${artistName}` : ""
  }`;
  const encodedQuery = encodeURIComponent(spotifyQuery);

  return fetch(
    `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=1`,
    { headers: { Authorization: `Bearer ${access_token}` } }
  );
};

export const createPlaylist = async (
  name: string,
  uris: string[],
  req: NextApiRequest
) => {
  const { access_token } = await getAccessToken(req);

  // First get the user's ID
  const userResponse = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const userData = await userResponse.json();

  // Create an empty playlist
  const createResponse = await fetch(
    `https://api.spotify.com/v1/users/${userData.id}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description: "Created with Spotify AI Stats",
        public: false,
      }),
    }
  );

  const playlist = await createResponse.json();

  // Add tracks to the playlist
  await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris,
      position: 0,
    }),
  });

  return playlist;
};
