import { z } from 'zod'

// https://github.com/colinhacks/zod/discussions/2245
export const baseMenuItemSchema = z.object({
    name: z.string(),
    slug: z.string(),
    id: z.string(),
    icon: z.string().optional()
})

export type MenuItem = z.infer<typeof baseMenuItemSchema> & {
    children?: MenuItem[]
    parent?: MenuItem
}

export const menuItemSchema: z.ZodType<MenuItem> = baseMenuItemSchema.extend({
    children: z.lazy(() => menuItemSchema.array().optional()),
    parent: z.lazy(() => menuItemSchema.optional()),
})

export const agMenuItemSchema = baseMenuItemSchema.extend({
    hierarchy: z.array(z.string())
})