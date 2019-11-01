import React from "react";
import ReactDOM from "react-dom";
import Loader from "react-loader-spinner";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ReactCountryFlag from "react-country-flag";

import "./styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div class="center">
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={2000} //3 secs
        />
      </div>
      <Master styles={classes} />
    </div>
  );
}

class Master extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    fetch("https://api.qantas.com/flight/refData/airport")
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      });
  }
  handleListItemClick = event => {};
  renderList() {
    console.log(this.state.data[1]);
    return (
      <div className={this.props.styles.root}>
        <List component="nav">
          {this.state.data.map(item => (
            <ListItem
              button
              key={item.airportCode}
              alignItems="flex-start"
              onClick={event => this.handleListItemClick(event)}
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
    if (this.state.data.length > 0) {
      return <div>{this.renderList()}</div>;
    } else {
      return null;
    }
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
