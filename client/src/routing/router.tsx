import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SongsPage from "../pages/SongsPage";
import SongPage from "../pages/SongPage";
import PlaylistsPage from "../pages/PlaylistsPage";
import PlaylistPage from "../pages/PlaylistPage";
import UpdatePlaylistPage from "../pages/UpdatePlaylistPage";
import ProfilePage from "../pages/ProfilePage";
import AuthPage from "../pages/AuthPage";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,

        children: [
            {
                path: "/",
                element: <HomePage />,
                errorElement: "404 - Not found"
            },
        
            {
                path: "/songs",
                element: <SongsPage />
            },
        
            {
                path: "/songs/:id",
                element: <SongPage />
            },
        
            {
                path: "/playlists",
                element: <PlaylistsPage show="ALL_PLAYLISTS" />
            },

            {
                path: "/playlists/:id",
                element: <PlaylistPage />
            },
        
            {
                path: "/playlists/:id/update",
                element: <UpdatePlaylistPage />
            },

            {
                path: "/my-playlists",
                element: <PlaylistPage />
            },
        
            {
                path: "/playlists/:id/update",
                element: <UpdatePlaylistPage />
            },
        
            {
                path: "/profile",
                element: <ProfilePage />
            },
        
            {
                path: "/auth",
                element: <AuthPage />
            }
       ]
    }
]);

export default router;