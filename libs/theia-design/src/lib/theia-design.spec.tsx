import { render } from '@testing-library/react';

import TheiaDesign from './theia-design';

describe('TheiaDesign', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TheiaDesign />);
    expect(baseElement).toBeTruthy();
  });
});
