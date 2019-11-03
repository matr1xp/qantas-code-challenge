import React, { Component } from "react";
import ReactCountryFlag from "react-country-flag";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { HashLink as Link } from "react-router-hash-link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  body: {
    top: theme.spacing(20),
    marginLeft: 30,
    marginTop: 30,
    minHeight: 400
  },
  button: {
    position: "fixed",
    textAlign: "center",
    justifyContent: "center",
    bottom: theme.spacing(1),
    width: "98%"
  }
});

class Detail extends Component {
  render() {
    console.log("Detail render props", this.props);
    const { classes } = this.props;
    const { data, idx } = this.props.location;
    if (data) {
      return (
        <Box>
          <div className={classes.body}>
            <Typography variant="overline" color="textSecondary">
              <ReactCountryFlag code={data.country.countryCode} svg />{" "}
              {data.airportCode}
            </Typography>
            <Typography variant="h5" component="h2">
              {data.airportName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Country:
            </Typography>
            <Typography variant="body1" component="li">
              {data.country.countryName} ({data.country.countryCode})
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Location:
            </Typography>
            <Typography variant="body1" component="li">
              Lat: {data.location.latitude} {data.location.latitudeDirection},{" "}
              {data.location.latitudeRadius} rad
            </Typography>
            <Typography variant="body1" component="li">
              Long: {data.location.longitude} {data.location.longitudeDirection}
              , {data.location.longitudeRadius} rad)
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Timezone:
            </Typography>
            <Typography variant="body1" component="li">
              {data.city.timeZoneName}
            </Typography>
          </div>
          <div className={classes.button}>
            <Link
              to={{
                pathname: "/master",
                hash: `#${data.airportCode}`,
                idx: idx
              }}
              style={{ textDecoration: "none" }}
            >
              <Button fullWidth={true} variant="contained">
                <ArrowBackIosIcon />
                Back
              </Button>
            </Link>
          </div>
        </Box>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(Detail);
