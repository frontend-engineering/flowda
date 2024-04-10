import { agMenuItemSchema } from '@flowda/types'
import { z } from 'zod'

export function getData(): z.infer<typeof agMenuItemSchema>[] {
  return [
    {
      hierarchy: ['1'],
      id: '1',
      name: '租户管理',
      slug: 'tenant_admin',
      icon: '',
    },
    {
      hierarchy: ['1', '2'],
      id: '2',
      name: '租户和用户',
      slug: 'tenant',
      icon: '',
    },
    {
      hierarchy: ['1', '2', '3'],
      id: '2',
      name: '租户列表',
      slug: 'tenants',
      icon: '',
    },
  ]
}
