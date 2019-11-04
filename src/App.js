import React from "react";
import FetchLoader from "fetch-loader-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { makeStyles } from "@material-ui/core/styles";
import MyAppBar from "./MyAppBar";
import Master from "./Master";
import Detail from "./Detail";

const API_URL = "https://api.qantas.com/flight/refData/airport";

const history = createBrowserHistory();

const useStyles = makeStyles(theme => ({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  topbar: {
    position: "fixed",
    top: theme.spacing(1),
    width: "100%"
  },
  content: {
    position: "relative",
    top: theme.spacing(8)
  }
}));

export default function App(props)  {
  const classes = useStyles();
  const fetchAirportData = fetch(API_URL);
  return (
    <div>
      <div className={classes.topbar}>
        <MyAppBar />
      </div>
      <div className={classes.content}>
        <FetchLoader fetch={[fetchAirportData]} type="json">
          {({ loading, err, res }) => {
            if (loading)
              return (
                <div className={classes.center}>
                  <CircularProgress disableShrink />
                </div>
              );
            if (err) {
              console.error(err);
              return;
            }
            return (
              <Router history={history}>
                <div>
                  <Route path="/master">
                    <Master data={res[0]} history={history} />
                  </Route>
                  <Route path="/detail" component={Detail} {...props} />
                </div>
              </Router>
            );
          }}
        </FetchLoader>
      </div>
    </div>
  );
  
}

history.push("/master");