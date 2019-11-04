// detail_snapshot.test.js
import React from 'react';
import Detail from '../src/Detail';
import renderer from 'react-test-renderer';
import { createBrowserHistory } from "history";

test('Detail snapshot test', () => {
  const locationJSON = JSON.parse('{"pathname":"/detail","search":"","hash":"#AAB","key":"0dk07a","data":{"airportCode":"AAB","internationalAirport":false,"domesticAirport":false,"regionalAirport":false,"onlineIndicator":false,"eticketableAirport":false,"location":{"aboveSeaLevel":-99999,"latitude":26.45,"latitudeRadius":-0.4669,"longitude":141,"longitudeRadius":2.4609,"latitudeDirection":"S","longitudeDirection":"E"},"airportName":"Arrabury","city":{"cityCode":"AAB","cityName":"Arrabury","timeZoneName":"Australia/Brisbane"},"country":{"countryCode":"AU","countryName":"Australia"},"region":{"regionCode":"AU","regionName":"Australia"}},"idx":1}');
  const component = renderer.create(
    <Detail location={locationJSON} history={createBrowserHistory()} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
