import React from 'react';
import { ButtonProps, CustomButton } from '../CustomButton';
import { mount, ReactWrapper } from 'enzyme';

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
      children: 'CustomButton name',
      variant: 'text',
      size: 'large',
      color: 'secondary',
      onClick: mockCallBack,
    };
    wrapper = setUp({});
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it('should call onClick method', () => {
    wrapper = setUp({
      onClick: mockCallBack,
    });
    wrapper.simulate('click');
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('default render without props', () => {
    expect(wrapper.text()).toBe('CustomButton name');
  });

  it('render with props', () => {
    wrapper = setUp(propsData);
    expect(wrapper.props()).toEqual(propsData);
  });

  it('should event', () => {
    wrapper = setUp(propsData);
    const button = wrapper.find('button');
    console.log(button.debug());
  });
});
