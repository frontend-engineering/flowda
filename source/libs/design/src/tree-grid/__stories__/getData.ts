export function getData(): any[] {
  const rowData = [
    {
      hierarchy: ['1'],
      id: 1,
      title: '租户管理',
      url: 'tenant_admin',
      icon: '',
    },
    {
      hierarchy: ['1', '2'],
      id: 2,
      title: '租户和用户',
      url: 'tenant',
      icon: '',
    },
    {
      hierarchy: ['1', '2', '3'],
      id: 3,
      title: '租户列表',
      url: 'tenants',
      icon: '',
    },
  ]
  return rowData
}
