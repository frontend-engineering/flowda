export function getData(): any[] {
  const rowData = [
    {
      hierarchy: ['tenant_admin'],
      title: '租户管理',
      url: 'tenant_admin',
      icon: '',
    },
    {
      hierarchy: ['tenant_admin', 'tenant'],
      title: '租户和用户',
      url: 'tenant',
      icon: '',
    },
    {
      hierarchy: ['tenant_admin', 'tenant', 'tenants'],
      title: '租户列表',
      url: 'tenants',
      icon: '',
    },
  ]
  return rowData
}
