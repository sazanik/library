import 'jest-enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      return key;
    },
  }),
}));
