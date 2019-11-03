import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReactCountryFlag from "react-country-flag";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { HashLink as Link } from "react-router-hash-link";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  list: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  hidden: {
    fontSize: 8,
    color: "grey",
    padding: 10
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

class Master extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      fetching: false,
      data: this.props.data[0],
      selected: this.props.history.location.hash || null,
      minIdx: this.props.history.location.idx || 0,
      maxIdx: this.props.history.location.idx + 100 || 100,
      scrolled: "top"
    };
  }
  componentDidMount() {
    document.addEventListener("scroll", this.trackScrolling);
    const { minIdx } = this.state;
    let start = minIdx < 99 ? 0 : minIdx - 50;
    let end = start + 100;
    let subset = this.props.data[0].slice(start, end);
    this.setState({ ready: true });
    this.setState({ data: subset, minIdx: start, maxIdx: end });
    document.addEventListener("scroll", this.trackScrolling);
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
      let start = this.state.maxIdx - 1;
      let end = start + 100;
      let subset = this.props.data[0].slice(start, end);
      this.setState({
        data: subset,
        minIdx: start,
        maxIdx: end,
        scrolled: "bottom",
        fetching: true
      });
      // document.removeEventListener("scroll", this.trackScrolling);
    } else if (this.isTop(wrappedElement)) {
      // Scrolled to top, we get previous 100 records
      if (this.state.scrolled !== "bottom") {
        let start = this.state.minIdx < 100 ? 0 : this.state.minIdx - 99;
        let end = start + 100;
        let subset = this.props.data[0].slice(start, end);
        this.setState({
          data: subset,
          minIdx: start,
          maxIdx: end,
          scrolled: "top",
          fetching: true
        });
      }
      // document.removeEventListener("scroll", this.trackScrolling);
    } else {
      this.setState({ scrolled: "middle", fetching: false });
    }
  };
  handleListItemClick(event, hash, idx) {
    this.setState({ selected: hash, idx: idx });
  }

  renderList() {
    const { classes } = this.props;
    const { fetching } = this.state;

    return (
      <div className={classes.list} id="scrollable">
        <div>
          <List component="nav">
            {this.state.data.map((item, idx) => (
              <Link
                to={{
                  pathname: "/detail",
                  hash: `#${item.airportCode}`,
                  data: item,
                  idx: this.props.data[0].findIndex(
                    x => x.airportCode === item.airportCode
                  )
                }}
                key={item.airportCode}
                id={item.airportCode}
                style={{ textDecoration: "none" }}
                onClick={event =>
                  this.handleListItemClick(event, item.airportCode, idx)
                }
              >
                <ListItem
                  button
                  alignItems="flex-start"
                  selected={this.state.selected === `#${item.airportCode}`}
                >
                  <div className={classes.hidden}>
                    {this.props.data[0].findIndex(
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
              </Link>
            ))}
          </List>
          {fetching ? (
            <div className={classes.center}>
              <CircularProgress disableShrink />
            </div>
          ) : null}
        </div>
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

export default withStyles(styles)(Master);
