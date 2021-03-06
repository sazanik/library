import { ReactWrapper, ShallowWrapper } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { BookSelect } from '../BookSelect';

const authorProps = {
  id: 'string',
  firstName: 'string',
  lastName: 'string',
  birthDate: 'string',
  country: 'string',
};

const shallowSetUp = (): ShallowWrapper =>
  shallow(
    <MemoryRouter>
      <BookSelect author={authorProps} />
    </MemoryRouter>
  );

const mountSetUp = (): ReactWrapper =>
  mount(
    <MemoryRouter>
      <BookSelect author={authorProps} />
    </MemoryRouter>
  );

describe('BookSelect component', () => {
  let shallowWrapper: ShallowWrapper;
  let mountWrapper: ReactWrapper;
  beforeEach(() => {
    shallowWrapper = shallowSetUp();
    mountWrapper = mountSetUp();
  });
  afterEach(() => {
    shallowWrapper.unmount();
    mountWrapper.unmount();
  });

  it('render', () => {
    const button = mountWrapper.find('button#basic-button');
    button.simulate('click');
  });
});
