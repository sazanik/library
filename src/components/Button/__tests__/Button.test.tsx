import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import { Button, Props } from '../Button';

const setUp = (props: Props): ReactWrapper => mount(<Button {...props} />);

describe('Button component', () => {
  let mockCallBack: jest.Mock;
  let wrapper: ReactWrapper;
  let propsData: Props;
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
    expect(wrapper.text()).toBe('Button name');
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
