import { RuleTester } from 'eslint';
import plugin from '../../rules/require-describe'


const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
  },
})

ruleTester.run('require-describe', plugin, {
  invalid: [
    {
      code: 'z.string()',
      errors: [
        {
          messageId: 'requires',
        },
      ],
    },
    {
      code: 'z.string().min(1)',
      errors: [
        {
          messageId: 'requires',
        },
      ],
    },
    {
      code: 'z.string().describe(\'test\').min(1)',
      errors: [
        {
          messageId: 'requires',
        },
      ],
    },
    {
      code: `const hi = z.object({
  hi: z.string(),
}).describe('test')`,
      errors: [
        {
          messageId: 'requires',
        },
      ],
    },
  ],
  valid: [
    {
      code: `foo()`,
    },
    {
      // Not a Zod schema
      code: 'b.object()',
    },
    {
      code: 'z.object()',
    },
    {
      code: 'z.object().describe(\'test\')',
    },
    {
      code: 'z.string().describe(\'test\')',
    },
    {
      code: 'z.string().min(1).describe(\'test\')',
    },
    {
      code: 'z.array()',
    },
  ],
})
