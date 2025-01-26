import React from "react";


export default function Home() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-currently-playing+user-top-read 
`;
  return (
    <div className="home">
      <a href={authUrl}>Login with Spotify</a>
    </div>
  );
}
