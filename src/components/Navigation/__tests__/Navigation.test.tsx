import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Navigation } from '../Navigation';

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

  afterEach(() => wrapper.unmount());

  it('should has 2 children elements "NavLink"', () => {
    const nav = wrapper.find('nav');
    nav.children().forEach((el) => {
      expect(el.name()).toBe('NavLink');
    });
  });
});
