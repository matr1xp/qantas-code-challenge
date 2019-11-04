import React from "react";
import PropTypes from 'prop-types';
import ReactCountryFlag from "react-country-flag";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  body: {
    flex: 1,
    top: theme.spacing(20),
    marginLeft: 30,
    marginTop: 30,
    minHeight: 350
  },
  button: {
    position: "fixed",
    textAlign: "center",
    justifyContent: "center",
    bottom: theme.spacing(1),
    width: "98%"
  }
}));

function backButtonClick(e, history, hash, idx) {
  let {location } = history;
  location.pathname = "/master";
  location.hash = `${hash}`;
  location.idx = idx;
  history.push(location);
}

export default function Detail(props)  {
  const classes = useStyles();
  const { data, idx } = props.location;
  const hash = `#${data.airportCode}`;
  return (
    <Paper>
      <div className={classes.body}>
        <Typography variant="overline" color="textSecondary">
          <ReactCountryFlag code={data.country.countryCode} svg />{" "}
          {data.country.countryName} ({data.country.countryCode})
        </Typography>
        <Typography variant="h5" component="h2" color="primary">
          {data.airportName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Airport code
        </Typography>
        <Typography variant="body1" component="em">
          <span>&nbsp;&nbsp;&nbsp;</span>{data.airportCode}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Location
        </Typography>
        <Typography variant="body1" component="em">
          <span>&nbsp;&nbsp;&nbsp;</span>Latitude: {data.location.latitude} {data.location.latitudeDirection}, {data.location.latitudeRadius} rad
        </Typography>
        <br/>
        <Typography variant="body1" component="em">
          <span>&nbsp;&nbsp;&nbsp;</span>Longitude: {data.location.longitude} {data.location.longitudeDirection}, {data.location.longitudeRadius} rad
        </Typography>
        <br/>
        <Typography variant="body1" component="em">
          <span>&nbsp;&nbsp;&nbsp;</span>Above sea level: {data.location.aboveSeaLevel} m
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Timezone
        </Typography>
        <Typography variant="body1" component="em">
          <span>&nbsp;&nbsp;&nbsp;</span>{data.city.timeZoneName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Region
        </Typography>
        <Typography variant="body1" component="em">
          <span>&nbsp;&nbsp;&nbsp;</span>{data.region.regionName} ({data.region.regionCode})
        </Typography>
        {data.internationalAirport ? (
        <div>
          <Typography variant="subtitle1" color="textSecondary">
            International
          </Typography>
          <Typography variant="body1" color="em">
            <span>&nbsp;&nbsp;&nbsp;</span>Yes
          </Typography>
        </div>
        ) : null }
        {data.domesticAirport ? (
          <div>
            <Typography variant="subtitle1" color="textSecondary">
              Domestic
            </Typography>
            <Typography variant="body1" color="em">
              <span>&nbsp;&nbsp;&nbsp;</span>Yes
            </Typography>
          </div>
          ) : null }
        {data.regionalAirport ? (
            <div>
              <Typography variant="subtitle1" color="textSecondary">
                Regional
              </Typography>
              <Typography variant="body1" color="em">
                <span>&nbsp;&nbsp;&nbsp;</span>Yes
              </Typography>
            </div>
        ) : null }
        {data.eticketableAirport ? (
          <div>
            <Typography variant="subtitle1" color="textSecondary">
              e-Ticket?
            </Typography>
            <Typography variant="body1" color="em">
              <span>&nbsp;&nbsp;&nbsp;</span>Yes
            </Typography>
          </div>
      ) : null }
      </div>
      <div className={classes.button}>
          <Button fullWidth={true} variant="contained"
            onClick={e =>
            backButtonClick(e, props.history, hash, idx)}
          >
            <ArrowBackIosIcon />
            Back
          </Button>
      </div>
    </Paper>
  );
}

Detail.propTypes = {
  location: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired
}
