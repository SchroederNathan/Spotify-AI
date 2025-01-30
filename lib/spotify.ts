import { getToken } from "next-auth/jwt";

const getAccessToken = async (req: any) => {
  const token = await getToken({ req });
  
  if (!token) {
    throw new Error("Not authenticated");
  }
  
  if (!token.accessToken) {
    throw new Error("No access token found");
  }
  
  return { access_token: token.accessToken };
};

export const getUser = async (req: any) => {
  const { access_token } = await getAccessToken(req);

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  return response;
};

export const topTracks = async ({ time_range }: { time_range: string }, req: any) => {
  const { access_token } = await getAccessToken(req);

  return fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${
      time_range || "short_term"
    }`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const topArtists = async (time_range: string, req: any) => {
  const { access_token } = await getAccessToken(req);

  console.log(time_range);

  return fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${
      time_range || "short_term"
    }`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const topAlbums = async (req: any, time_range: string) => {
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

export const topGenres = async (req: any, time_range: string) => {
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

export const userPlaylists = async (req: any) => {
  const { access_token } = await getAccessToken(req);

  return fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const currentlyPlayingSong = async (req: any) => {
  const { access_token } = await getAccessToken(req);

  return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const searchSong = async (query: any, req: any) => {
  const { access_token } = await getAccessToken(req);

  // Parse the query string
  const params = new URLSearchParams(query);
  const trackName = params.get("track");
  const artistName = params.get("artist");

  // Construct the Spotify query format
  const spotifyQuery = `track:${trackName}${
    artistName ? ` artist:${artistName}` : ""
  }`;

  // Encode the query
  const encodedQuery = encodeURIComponent(spotifyQuery);
  const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=1`;

  console.log("Final URL:", url);

  return fetch(url, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const createPlaylist = async (name: any, uris: any, req: any) => {
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
  await fetch(
    `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris,
        position: 0,
      }),
    }
  );

  return playlist;
};
