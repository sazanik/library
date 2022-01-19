import 'jest-enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { mount, render, shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      return key;
    },
  }),
}));

window.shallow = shallow;
window.render = render;
window.mount = mount;
