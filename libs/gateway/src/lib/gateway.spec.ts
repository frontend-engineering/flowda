import { gateway } from './gateway';

describe('gateway', () => {
  it('should work', () => {
    expect(gateway().length).toEqual(4);
  });
});
