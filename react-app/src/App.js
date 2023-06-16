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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="main-container">
      <div className="side-landing-container">
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
            </Switch>
          )}

        </div>

      </div>

      <Footer />
    </div>
  );
}

export default App;
