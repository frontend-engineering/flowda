import { ColumnUISchema } from './ui-schema-spec'

describe('ui schema spec', function () {
  it('ColumnUISchema has_one visibile', () => {
    const input = {
      nullable: true,
      display_name: 'User Profile',
      model_name: 'UserProfile',
      foreign_key: 'userId',
      primary_key: 'id',
      reference_type: 'has_one',
      visible: true,
    }
    const ret = ColumnUISchema.parse({
      column_type: 'reference',
      display_name: input.display_name,
      //            ^?
      validators: [],
      name: 'userProfile',
      visible: input.visible,
      reference: input,
    })
    // console.log(ret)
    expect(ret).toMatchInlineSnapshot(`
      {
        "access_type": "read_write",
        "column_type": "reference",
        "display_name": "User Profile",
        "name": "userProfile",
        "reference": {
          "display_name": "User Profile",
          "foreign_key": "userId",
          "model_name": "UserProfile",
          "primary_key": "id",
          "reference_type": "has_one",
          "visible": true,
        },
        "validators": [],
        "visible": true,
      }
    `)
  })
})
