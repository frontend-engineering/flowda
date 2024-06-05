import { TenantWithRelationsSchema } from './playgroud'

describe('playground', () => {
  it('', () => {
    const ret = TenantWithRelationsSchema.parse({
      id: 0,
      name: 'tenant',
      users: [
        {
          id: 0,
          email: '@example.com',
        },
      ],
    })
  })
})
