import React, { Component } from "react";
import PropTypes from 'prop-types';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReactCountryFlag from "react-country-flag";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const FETCH_ROWS = 100;

const styles = theme => ({
  list: {
    justifyContent: "center",
    alignItems: "center"
  },
  hidden: {
    fontSize: 8,
    color: "grey",
    padding: 10
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  }
});

class Master extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props.history;
    this.state = {
      ready: false,
      fetching: false,
      data: this.props.data,
      selected: location.hash || null,
      minIdx: location.idx || 0,
      maxIdx: location.idx + FETCH_ROWS,
      scrolled: "top"
    };
  }
  componentDidMount() {
    document.addEventListener("scroll", this.trackScrolling);
    const { minIdx } = this.state;
    let start = minIdx < FETCH_ROWS - 1 ? 0 : (minIdx - FETCH_ROWS/2);
    let end = start + FETCH_ROWS;
    this.getBatchData(start, end, "");
    this.setState({ ready: true });
  }
  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  isTop(el) {
    return el.getBoundingClientRect().top >= 0;
  }
  trackScrolling = () => {
    const wrappedElement = document.getElementById("scrollable");
    if (this.isBottom(wrappedElement)) {
      // Scrolled to bottom, we get next 100 records
      let start = this.state.maxIdx - 1;
      let end = start + FETCH_ROWS;
      this.getBatchData(start, end, "bottom");
    } else if (this.isTop(wrappedElement)) {
      // Scrolled to top, we get previous 100 records
      if (this.state.scrolled !== "bottom") {
        let start = this.state.minIdx < FETCH_ROWS ? 0 : this.state.minIdx - (FETCH_ROWS - 1);
        let end = start + FETCH_ROWS;
        this.getBatchData(start, end, "top");
      }
    } else {
      this.setState({ scrolled: "middle", fetching: false });
    }
  }
  handleListItemClick(event, hash, idx, item) {
    this.setState({ selected: hash, idx: idx });
    let {location } = this.props.history;
    location.pathname = "/detail";
    location.hash = `#${hash}`;
    location.data = item;
    location.idx = this.props.data.findIndex(
        x => x.airportCode === item.airportCode
    );
    this.props.history.push(location);
  }
  getBatchData(minIdx, maxIdx, scrolled) {
    if (Array.isArray(this.props.data) && this.props.data.length > 0) {
      let data = this.props.data.slice(minIdx, maxIdx);
      this.setState({
        data,
        minIdx,
        maxIdx,
        scrolled,
        fetching: true
      });
    }
  }
  renderList() {
    const { classes } = this.props;
    const { fetching } = this.state;
    return (
      <div className={classes.list} id="scrollable">
        <List component="nav" dense={true}>
          {this.state.data.map((item, idx) => (
            <ListItem
              button
              alignItems="flex-start"
              key={item.airportCode}
              selected={this.state.selected === `#${item.airportCode}`}
              onClick={event =>
                this.handleListItemClick(event, item.airportCode, idx, item)
              }
            >
              <div className={classes.hidden}>
                {this.props.data.findIndex(
                  x => x.airportCode === item.airportCode
                ) + 1}
              </div>
              <ListItemIcon>
                <ReactCountryFlag code={item.country.countryCode} svg />
              </ListItemIcon>
              <ListItemText
                primary={item.airportName}
                secondary={item.country.countryName}
              />
              <ListItemSecondaryAction>
                <ArrowForwardIosIcon color="action" />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          </List>
        {fetching ? (
          <div className={classes.center}>
            <CircularProgress disableShrink />
          </div>
        ) : null}
      </div>
    );
  }
  render() {
    if (this.state.ready && this.state.data.length > 0) {
      return <div>{this.renderList()}</div>;
    } else {
      return <div>No Data Found!</div>;
    }
  }
}

Master.propTypes = {
  data: PropTypes.array.isRequired,
  history: PropTypes.any.isRequired
};

export default withStyles(styles)(Master);
