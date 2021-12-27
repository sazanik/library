import React from 'react';
import { AuthorForm, Props } from './AuthorForm';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

const dataProps: Props = {
  edit: true,
  author: null,
  setOpenModal: (b) => {
    console.log('Open modal', b);
  },
};

const setUp = (props: Props): ReactWrapper =>
  mount(
    <Provider store={store}>
      <AuthorForm {...props} />
    </Provider>
  );

describe('AuthorForm component', () => {
  it('should has 3 props', () => {
    const wrapper = setUp(dataProps);
    const component = wrapper.find('AuthorForm');
    expect(component.props()).toEqual(dataProps);
    wrapper.unmount();
  });

  it('should render form element', () => {
    const wrapper = setUp(dataProps);
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    wrapper.unmount();
  });
});
