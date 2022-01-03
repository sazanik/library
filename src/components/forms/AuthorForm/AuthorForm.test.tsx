import React from 'react';
import { AuthorForm, ComponentProps } from './AuthorForm';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../store/store';

const mockSetOpenModal = (boolean: boolean): jest.Mock =>
  jest.fn(() => boolean);
const propsData: ComponentProps = {
  edit: true,
  author: null,
  setOpenModal: mockSetOpenModal,
};

const setUp = (props: ComponentProps): ReactWrapper =>
  mount(
    <Provider store={store}>
      <MemoryRouter>
        <AuthorForm {...props} />
      </MemoryRouter>
    </Provider>
  );

describe('AuthorForm component', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = setUp(propsData);
  });
  describe('render and props', () => {
    it('should render with props', () => {
      const component = wrapper.find('AuthorForm');
      expect(component.props()).toEqual(propsData);
      wrapper.unmount();
    });

    it('should render form element', () => {
      const form = wrapper.find('form');
      expect(form).toHaveLength(1);
      wrapper.unmount();
    });

    /*it('should call method "onSubmit"', () => {
      const form = wrapper.find('form');
      console.log(form.debug());
      const testFunc: jest.Mock = jest.fn();
      form.invoke('onSubmit')?.(testFunc);
    });*/
  });
});
