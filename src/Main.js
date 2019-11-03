import React, { Component } from "react";
import PropTypes from "prop-types";
import FetchLoader from "fetch-loader-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { withStyles } from "@material-ui/core/styles";
import MyAppBar from "./MyAppBar";
import Master from "./Master";
import Detail from "./Detail";

const fetchAirportData = fetch("https://api.qantas.com/flight/refData/airport");
const history = createBrowserHistory();
const styles = theme => ({
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
});

class Main extends Component {
  componentDidMount() {
    history.push("/master");
  }
  render() {
    const { classes } = this.props;
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
                      <Master data={res} history={history} />
                    </Route>
                    <Route path="/detail" component={Detail} {...this.props} />
                  </div>
                </Router>
              );
            }}
          </FetchLoader>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
