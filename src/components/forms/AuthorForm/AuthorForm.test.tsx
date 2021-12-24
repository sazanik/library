import React from 'react';
import { AuthorForm, Props } from './AuthorForm';
import { shallow, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

const dataProps: Props = {
  edit: true,
  author: null,
  setOpenModal: (b) => console.log(b),
};

const setUp = (props: Props): ShallowWrapper =>
  shallow(
    <Provider store={store}>
      <AuthorForm {...props} />
    </Provider>
  );

describe('AuthorForm component', () => {
  describe('has props', () => {
    const wrapper = setUp(dataProps);
    const component = wrapper.find('AuthorForm');

    it('should render form element', () => {
      expect(component).toHaveLength(1);
    });

    it('should has 3 props', () => {
      expect(component.props()).toEqual(dataProps);
    });
  });
});
