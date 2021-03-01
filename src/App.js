import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import ReduxThunk from "redux-thunk";
import readingsReducer from "./store/reducers/readings";
import userReducer from "./store/reducers/user";
import ContentLayout from "./components/ContentLayout";

const rootReducer = combineReducers({
  readings: readingsReducer,
  user: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const logger = store => {
  return next => {
    return action => {
      console.log("[Middlware] dispatching ", JSON.stringify(action.type));
      const result = next(action);
      // console.log("[Middleware] next state ", store.getState());
      return result;
    };
  };
};

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk, logger)));

function App() {
  return (
    <Provider store={store}>
      <div>
        <ContentLayout />
      </div>
    </Provider>
  );
}

export default App;
