import React from "react";
import ReactDOM from "react-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import FetchLoader from "fetch-loader-react";
import ReactCountryFlag from "react-country-flag";
import { makeStyles } from "@material-ui/core/styles";
import { Router } from "react-router";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  center: {
    position: "absolute",
    left: "50%",
    top: "40%"
  }
}));

const fetchAirportData = fetch("https://api.qantas.com/flight/refData/airport");

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FetchLoader fetch={[fetchAirportData]} type="json">
        {({ loading, err, res }) => {
          if (loading)
            return (
              <div className="classes.center">
                <CircularProgress disableShrink />
              </div>
            );
          if (err) {
            console.error(err);
            return;
          }
          console.log("Finished loading");
          return <Master styles={classes} data={res} />;
        }}
      </FetchLoader>
    </div>
  );
}

class Master extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      data: this.props.data[0]
    };
  }
  componentDidMount() {
    this.setState({ ready: true });
  }
  handleListItemClick = item => {
    console.log(item);
    // history.push(`/${item.country.countryCode}`);
    const rootElement = document.getElementById("root");
    ReactDOM.render(
      <Detail value={item} styles={this.props.styles} />,
      rootElement
    );
  };
  renderList() {
    // console.log(this.props.data[1]);
    return (
      <div className={this.props.styles.root}>
        <List component="nav">
          {this.state.data.map(item => (
            <ListItem
              button
              key={item.airportCode}
              alignItems="flex-start"
              onClick={event => {
                return this.handleListItemClick(item);
              }}
            >
              <ListItemIcon>
                <ReactCountryFlag code={item.country.countryCode} svg />
              </ListItemIcon>
              <ListItemText
                primary={item.airportName}
                secondary={item.country.countryName}
              />
              <ListItemSecondaryAction>&rsaquo;</ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
  render() {
    if (this.state.ready && this.state.data.length > 0) {
      return <div>{this.renderList()}</div>;
    } else {
      return null;
    }
  }
}

class Detail extends React.Component {
  constructor(props) {
    super(props);
    console.log("Detail", props);
  }
  render() {
    return (
      <div>
        <Fab
          variant="extended"
          className={this.props.styles.fab}
          onClick={() => history.goBack}
        >
          <ArrowBackIosIcon className={this.props.styles.extendedIcon} />
          Back
        </Fab>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
/* ReactDOM.render(<App />, rootElement); */
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  rootElement
);
