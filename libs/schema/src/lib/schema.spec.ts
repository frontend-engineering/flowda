import { sampleSchema } from './schema';

describe('schema', () => {
  it('should work', () => {
    expect(sampleSchema.safeParse({ title: 'demo', id: 0 }).success).toBe(true)
  });
});
