# Spotify AI Stats

![Spotify AI Stats Preview](https://i.imgur.com/CtlZrZi.jpeg)

A web application that provides personalized Spotify music recommendations using AI, along with detailed statistics about your listening habits. The app integrates with Spotify's API and OpenAI's assistant API to deliver intelligent music suggestions based on your preferences and listening history.

## Features

- **AI-Powered Music Recommendations**: Get personalized song and playlist suggestions using OpenAI's assistant
- **Listening Statistics**: View your top tracks, albums, and artists across different time ranges
- **Recently Played**: Track your latest listening activity
- **Playlist Creation**: Create Spotify playlists directly from AI recommendations
- **Time-Based Analysis**: Switch between short-term (4 weeks), medium-term (6 months), and long-term (all time) statistics

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS 4
- **Authentication**: NextAuth.js with Spotify OAuth
- **AI Integration**: OpenAI Assistant API
- **Styling**: Headless UI, Tabler Icons
- **API**: Spotify Web API

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following variables:

```bash
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
OPENAI_API_KEY=your_openai_api_key
OPENAI_ASSISTANT_ID=your_openai_assistant_id
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Run the development server:  

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Required Spotify Permissions

The application requires the following Spotify scopes:
- user-read-email
- playlist-read-private
- playlist-modify-private
- playlist-modify-public
- user-top-read
- user-read-recently-played

## Project Structure

- `/src/app`: Main application components and pages
- `/src/pages/api`: API routes for Spotify and OpenAI integration
- `/lib`: Utility functions for API calls
- `/models`: TypeScript interfaces and types
- `/public`: Static assets and images

## Features in Detail

### AI Chat Interface
- Natural language interaction for music recommendations
- Context-aware suggestions based on your music taste
- Direct playlist creation from recommendations

### Statistics Dashboard
- Visual representation of listening habits
- Detailed analysis of favorite genres
- Time-based filtering of statistics

### Authentication
- Secure Spotify OAuth integration
- Automatic token refresh
- Protected routes and API endpoints

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Spotify Web API
- OpenAI Assistant API
- Next.js 
- TailwindCSS 