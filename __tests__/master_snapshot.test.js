// master_snapshot.test.js
import React from 'react';
import Master from '../src/Master';
import renderer from 'react-test-renderer';
import { createBrowserHistory } from "history";

test('Master snapshot test', () => {
  const airportJSON = JSON.parse('[{"airportCode": "SYD","internationalAirport": true,"domesticAirport": true,"regionalAirport": false,"onlineIndicator": true,"eticketableAirport": true,"location": {"aboveSeaLevel": 21,"latitude": 33.56,"latitudeRadius": -0.5922,"longitude": 151.1,"longitudeRadius": 2.6384,"latitudeDirection": "S","longitudeDirection": "E"},"airportName": "Sydney","city": {"cityCode": "SYD","cityName": "Sydney","timeZoneName": "Australia/Sydney"},"country": {"countryCode": "AU","countryName": "Australia"},"region": {"regionCode": "AU","regionName": "Australia"}},{"airportCode": "JFK","internationalAirport": true,"domesticAirport": false,"regionalAirport": false,"onlineIndicator": true,"eticketableAirport": true,"location": {"aboveSeaLevel": 13,"latitude": 40.38,"latitudeRadius": 0.7092,"longitude": 73.46,"longitudeRadius": -1.2875,"latitudeDirection": "N","longitudeDirection": "W"},"airportName": "New York (JFK)","city": {"cityCode": "NYC","cityName": "New York","timeZoneName": "America/New_York"},"country": {"countryCode": "US","countryName": "United States"},"region": {"regionCode": "AM","regionName": "Americas"}}]');
  const component = renderer.create(
    <Master data={airportJSON} history={createBrowserHistory()} />,
  );
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
