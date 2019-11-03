import React, { Component } from "react";
import PropTypes from "prop-types";
import FetchLoader from "fetch-loader-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { withStyles } from "@material-ui/core/styles";
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
  }
});

class Main extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
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
            console.log("Finished loading");
            history.push("/master");
            return (
              <Router history={history}>
                <div>
                  <div className="content">
                    <Route path="/master">
                      <Master data={res} history={history} />
                    </Route>
                    <Route path="/detail" component={Detail} {...this.props} />
                  </div>
                </div>
              </Router>
            );
            /*<Master styles={classes} data={res} />;*/
          }}
        </FetchLoader>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
