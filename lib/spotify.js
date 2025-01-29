const getAccessToken = async () => {
  const refresh_token = process.env.REFRESH_TOKEN;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getUser = async () => {
  const { access_token } = await getAccessToken();

  return fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const topTracks = async ({ time_range }) => {
  const { access_token } = await getAccessToken();

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

export const topArtists = async ({ time_range }) => {
  const { access_token } = await getAccessToken();

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

export const topAlbums = async ({ time_range }) => {
  const { access_token } = await getAccessToken();

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

export const topGenres = async ({ time_range }) => {
  const { access_token } = await getAccessToken();

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

export const userPlaylists = async () => {
  const { access_token } = await getAccessToken();

  return fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const currentlyPlayingSong = async () => {
  const { access_token } = await getAccessToken();

  return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const searchSong = async (query) => {
  const { access_token } = await getAccessToken();

  // Parse the query string
  const params = new URLSearchParams(query);
  const trackName = params.get('track');
  const artistName = params.get('artist');

  // Construct the Spotify query format
  const spotifyQuery = `track:${trackName}${artistName ? ` artist:${artistName}` : ''}`;
  
  // Encode the query
  const encodedQuery = encodeURIComponent(spotifyQuery);
  const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=1`;

  console.log('Final URL:', url);

  return fetch(url, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
//https://api.spotify.com/v1/search?q=track%253ACan%2527t%2520Hold%2520Us%2520artist%253AMacklemore%2520%2526%2520Ryan%2520Lewis&type=album&limit=1
//https://api.spotify.com/v1/search?q=track%3ACan't%20Hold%20Us%20artist%3AMacklemore%20%26%20Ryan%20Lewis&type=track&limit=1