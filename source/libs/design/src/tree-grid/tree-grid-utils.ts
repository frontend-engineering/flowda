import { agMenuItemSchema, menuItemSchema } from '@flowda/types'
import { z } from 'zod'

export function convertMenuDataToAgTreeData(menuData: z.infer<typeof menuItemSchema>[]): z.infer<typeof agMenuItemSchema>[] {
    const ret: z.infer<typeof agMenuItemSchema>[] = []
    menuData.forEach(tree => {
        traverse(tree, item => {
            const { parent, children, ...rest } = item
            const hierarchy = traverseUp(item, node => node.id)
            ret.push({
                hierarchy: hierarchy,
                ...rest,
            })
        })
    })
    return ret
}

export function traverse(tree: z.infer<typeof menuItemSchema>, visit: (node: z.infer<typeof menuItemSchema>) => void) {
    visit(tree)
    if (tree.children && Array.isArray(tree.children) && tree.children.length > 0) {
        tree.children?.forEach(child => {
            child.parent = tree
            traverse(child, visit)
        })
    }
}

export function traverseUp(tree: z.infer<typeof menuItemSchema>, visit: (node: z.infer<typeof menuItemSchema>) => any) {
    const ret: any[] = []
    ret.push(visit(tree))
    let parent = tree.parent
    while (parent) {
        ret.unshift(visit(parent))
        parent = parent.parent
    }
    return ret
}
