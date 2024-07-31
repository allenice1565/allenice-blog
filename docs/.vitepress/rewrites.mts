/**
 * 获取配置rewrites
 *
 *
 */
import fs from 'node:fs'
import path from 'node:path'

export default function getRewrites(
    dirPath = '../',
    ignorePathList = ['.vitepress']
) {
    const dirs = getDirs(dirPath, ignorePathList)
}
function getDirs(dirPath, ignorePathList) {
    const dirs: string[] = []
    const children = fs.readdirSync(dirPath)
    children.forEach((child: string) => {
        const childPath = path.resolve(dirPath, child)
        const isExcept = ignorePathList.find(
            (ignorePath) => childPath === ignorePath
        )
        if (isExcept) return
        if (fs.lstatSync(childPath).isDirectory()) {
            dirs.push(childPath)
        }
    })
    return dirs
}
