import React from 'react';
import { ButtonProps, CustomButton } from './CustomButton';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

const setUp = (props: ButtonProps): ReactWrapper =>
  mount(<CustomButton {...props} />);

describe('CustomButton component', () => {
  let mockCallBack: jest.Mock;
  let wrapper: ReactWrapper;
  let propsData: ButtonProps;
  beforeEach(() => {
    mockCallBack = jest.fn();
    propsData = {
      disabled: false,
      children: 'Button name',
      variant: 'text',
      size: 'large',
      color: 'secondary',
      onClick: mockCallBack,
    };
    wrapper = setUp({});
  });

  it('should call onClick method', () => {
    wrapper = setUp({
      onClick: mockCallBack,
    });
    expect(mockCallBack.mock.calls.length).toBe(0);
    wrapper.simulate('click');
    wrapper.simulate('click');
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it('default render without props', () => {
    expect(wrapper.text()).toBe('Button name');
  });

  it('render with props', () => {
    wrapper = setUp(propsData);
    expect(wrapper.props()).toEqual(propsData);
  });

  it('should event', () => {
    wrapper = setUp(propsData);
    const button = wrapper.find('button');
  });
});
