import React from 'react';
import { BookSelect } from '../BookSelect';
import { ReactWrapper, ShallowWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

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
    // console.log(shallowWrapper.debug());
    // console.log(mountWrapper.debug());
    const button = mountWrapper.find('button#basic-button');
    button.simulate('click');

    // mountWrapper.find('CustomButton#basic-button').simulate('onClick');
  });
});
