import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import ReduxThunk from "redux-thunk";
import readingsReducer from "./store/reducers/readings";
import authReducer from "./store/reducers/auth";
import ContentLayout from "./components/ContentLayout";
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
const rootReducer = combineReducers({
  readings: readingsReducer,
  auth: authReducer,
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

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <div>
          <ContentLayout />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
