import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar"
import LandingPage from "./components/LandingPage"
import Footer from "./components/Footer"
import ArtistPage from "./components/ArtistPage"
import LoginFormModal from "./components/LoginFormModal";
import SignupFormModal from "./components/SignupFormModal";
import PlaylistPage from "./components/PlaylistPage"
import AlbumPage from "./components/AlbumPage";
import SongPage from "./components/SongPage"
import AllSongsPage from "./components/AllSongsPage";
import AllAlbumsPage from "./components/AllAlbumsPage";
import AllArtistsPage from "./components/AllArtistsPage";
import ProfilePage from "./components/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="main-container">
      {/* <div className="side-landing-container"> */}
        <Sidebar />
        <div className="nav-landing-container">
          <Navigation isLoaded={isLoaded} />
          {isLoaded && (
            <Switch>
              <Route exact path="/login" >
                <LoginFormModal />
              </Route>
              <Route exact path="/signup">
                <SignupFormModal />
              </Route>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route exact path="/artists/:id">
                <ArtistPage />
              </Route>
              <Route exact path="/playlists/:id">
                <PlaylistPage />
              </Route>
              <Route exact path="/albums/:id">
                <AlbumPage />
              </Route>
              <Route exact path="/songs/:id">
                <SongPage />
              </Route>
              <Route exact path="/songs">
                <AllSongsPage />
              </Route>
              <Route exact path="/albums">
                <AllAlbumsPage />
              </Route>
              <Route exact path="/artists">
                <AllArtistsPage />
              </Route>
              <Route>
                <ProfilePage exact path="/profile"/>
              </Route>
            </Switch>
          )}

        </div>

      {/* </div> */}

      <Footer />
    </div>
  );
}

export default App;
