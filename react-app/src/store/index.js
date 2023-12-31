import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import artists from "./artists"
import albums from "./albums"
import playlists from "./playlists"
import albumReviews from "./albumReviews"
import songs from "./songs"
import audioPlayer from "./audioPlayer"
import following from "./following"

const rootReducer = combineReducers({
  session,
  artists,
  albums,
  playlists,
  albumReviews,
  songs,
  audioPlayer,
  following,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
