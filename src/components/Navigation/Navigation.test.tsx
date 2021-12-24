import React from 'react';
import { Navigation } from './Navigation';
import { shallow } from 'enzyme';

const wrapper = shallow(<Navigation />);

describe('Check name children components', () => {
  it('should has children names "NavLink"', () => {
    wrapper.children().forEach((el) => {
      expect(el.name()).toBe('NavLink');
    });
  });

  it('should contain 2 children', () => {
    const children = wrapper.children();
    expect(children.length).toBe(2);
    console.log(wrapper.debug());
  });

  it('should make snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
