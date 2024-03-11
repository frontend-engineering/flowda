import { sampleSchema } from './schema';

describe('schema', () => {
  it('should work', () => {
    expect(sampleSchema.safeParse({ title: 'demo' }).success).toBe(true)
  });
});
