import React from 'react';
import { Navigation } from './Navigation';
import { shallow } from 'enzyme';

it('Navigation component should render 2 children', () => {
  const component = shallow(<Navigation />);
  const children = component.children();
  expect(children.length).toBe(2);
  console.log(component.debug());
});
