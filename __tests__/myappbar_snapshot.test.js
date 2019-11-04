// myappbar_snapshot.test.js
import React from 'react';
import MyAppBar from '../src/MyAppBar';
import renderer from 'react-test-renderer';

test('MyAppBar snapshot test', () => {
  const component = renderer.create(
    <MyAppBar />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});