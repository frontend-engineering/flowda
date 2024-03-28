import { createProjectGraphAsync } from "@nrwl/devkit"
import * as fs from 'fs-extra'
import { minimatch } from 'minimatch'

export async function createWallabyConfigFromNxIgnore(nxignorePath: string) {
    const graph = await createProjectGraphAsync()
    const projectSourceRoots = Object.keys(graph.nodes)
        .filter(k => {
            if (k.indexOf('prisma') > -1) return false
            return graph.nodes[k].data.projectType === 'library'
        })
        .map(k => {
            return graph.nodes[k].data.sourceRoot
        })
    // console.log(projectSourceRoots)
    const fix = fs.readFileSync(nxignorePath, 'utf-8').split('\n').filter(f => f !== '')
    // console.log(fix)
    const notIgnore = projectSourceRoots.filter(n => {
        if (n == null) return false
        return !fix.some(f => {
            // console.log(n, f, minimatch(n, f))
            return minimatch(n, f)
        })
    })
    const config = notIgnore.reduce<{
        filesOverride: string[]
        testsOverride: string[]
    }>((acc, cur) => {
        acc.filesOverride.push(`${cur}/**/*.ts`)
        acc.filesOverride.push(`!${cur}/**/*.spec.ts`)
        acc.testsOverride.push(`${cur}/**/*.spec.ts`)
        return acc
    }, {
        filesOverride: [],
        testsOverride: []
    })
    return config
}
