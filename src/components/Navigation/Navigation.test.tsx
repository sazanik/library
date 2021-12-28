import React from 'react';
import { Navigation } from './Navigation';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

const setUp = (): ReactWrapper =>
  mount(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );

describe('Navigation component', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it('should has 2 children elements "NavLink"', () => {
    const nav = wrapper.find('nav');
    nav.children().forEach((el) => {
      expect(el.name()).toBe('NavLink');
    });
    wrapper.unmount();
  });
});
