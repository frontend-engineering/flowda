import { agMenuItemSchema, MenuItem, menuItemSchema } from '@flowda/types'
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

export function convertAgTreeDataToTreeData(input: (z.infer<typeof agMenuItemSchema> & { children?: [] })[]) {
    const rootNodes: z.infer<typeof menuItemSchema>[] = []
    const nodeMap: Record<string, (z.infer<typeof menuItemSchema>)> = {}

    input.forEach((node) => {
        node.children = []
        nodeMap[node.id] = node
    })

    input.forEach((node) => {
        const { hierarchy, ...rest } = node
        const parentNode = hierarchy.length > 1 ? nodeMap[hierarchy[hierarchy.length - 2]] : null
        if (parentNode) {
            if (parentNode.children == null) parentNode.children = []
            parentNode.children.push(node)
        } else {
            rootNodes.push(node)
        }
    })
    return JSON.parse(stringifyMenuData(rootNodes))
}

export function stringifyMenuData(input: MenuItem[]) {
    return JSON.stringify(input, (k, value) => {
        if (value.hierarchy) delete value.hierarchy
        if (value.children && value.children.length === 0) delete value.children
        return value
    })
}
