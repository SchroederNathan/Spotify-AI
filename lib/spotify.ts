import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface SpotifyToken {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  error?: string;
}

/**
 * Gets an access token for Spotify API requests
 * Handles both App Router (NextRequest) and Pages Router (NextApiRequest)
 */
export const getAccessToken = async (req: NextApiRequest | NextRequest) => {
  try {
    // For App Router API routes
    if (req instanceof NextRequest) {
      const session = await getServerSession(authOptions);
      
      if (!session) {
        throw new Error("Not authenticated");
      }
      
      if (!session.accessToken) {
        throw new Error("No access token found");
      }
      
      if (session.error === "RefreshAccessTokenError") {
        throw new Error("Failed to refresh access token");
      }
      
      return { access_token: session.accessToken };
    }
    
    // For Pages Router API routes
    const token = (await getToken({ req })) as SpotifyToken | null;

    if (!token) {
      throw new Error("Not authenticated");
    }

    if (!token.accessToken) {
      throw new Error("No access token found");
    }
    
    if (token.error === "RefreshAccessTokenError") {
      throw new Error("Failed to refresh access token");
    }

    // Check if token is expired
    if (token.accessTokenExpires && Date.now() > token.accessTokenExpires) {
      throw new Error("Access token expired");
    }

    return { access_token: token.accessToken };
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};

export const getUser = async (req: NextApiRequest | NextRequest) => {
  try {
    const { access_token } = await getAccessToken(req);
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: { 
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Spotify API error: ${error.error?.message || response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const recentlyPlayed = async (
  req: NextApiRequest | NextRequest,
  limit: number = 30
) => {
  try {
    const { access_token } = await getAccessToken(req);
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
      {
        headers: { 
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Spotify API error: ${error.error?.message || response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error("Error fetching recently played:", error);
    throw error;
  }
};

export const topTracks = async (
  { time_range }: { time_range?: string },
  req: NextApiRequest | NextRequest
) => {
  try {
    const { access_token } = await getAccessToken(req);
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${
        time_range || "short_term"
      }&limit=50`,
      { 
        headers: { 
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        } 
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Spotify API error: ${error.error?.message || response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    throw error;
  }
};

export const topArtists = async (
  time_range: string | undefined,
  req: NextApiRequest | NextRequest
) => {
  try {
    const { access_token } = await getAccessToken(req);
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${
        time_range || "short_term"
      }&limit=50`,
      { 
        headers: { 
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        } 
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Spotify API error: ${error.error?.message || response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error("Error fetching top artists:", error);
    throw error;
  }
};

export const topAlbums = async (req: NextApiRequest | NextRequest, time_range: string) => {
  try {
    const { access_token } = await getAccessToken(req);
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${
        time_range || "short_term"
      }&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Spotify API error: ${error.error?.message || response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error("Error fetching top albums:", error);
    throw error;
  }
};

export const topGenres = async (req: NextApiRequest | NextRequest, time_range: string) => {
  try {
    const { access_token } = await getAccessToken(req);
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${
        time_range || "short_term"
      }&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Spotify API error: ${error.error?.message || response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error("Error fetching top genres:", error);
    throw error;
  }
};

export const userPlaylists = async (req: NextApiRequest | NextRequest) => {
  try {
    const { access_token } = await getAccessToken(req);
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Spotify API error: ${error.error?.message || response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    throw error;
  }
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
