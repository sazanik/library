import React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from './Navigation';
// import './../../../setupTests.js';

const component = shallow(<Navigation />);

describe('check name children components', () => {
  it('should has children names "NavLink"', () => {
    component.children().forEach((el) => {
      expect(el.name()).toBe('NavLink');
    });
  });

  it('should contain 2 children', () => {
    const children = component.children();
    expect(children.length).toBe(2);
    console.log(component.debug());
  });
});
