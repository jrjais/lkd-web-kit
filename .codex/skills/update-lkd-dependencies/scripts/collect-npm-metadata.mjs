#!/usr/bin/env node
import { execFile } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const packageJsonPath = new URL('../../../../package.json', import.meta.url)
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

function parseMaybeJson(value) {
  try {
    return JSON.parse(value)
  } catch {
    return value.trim()
  }
}

async function npmView(packageName) {
  const { stdout } = await execFileAsync(
    npmCommand,
    ['view', packageName, 'version', 'peerDependencies', 'dependencies', 'engines', '--json'],
    { shell: process.platform === 'win32', windowsHide: true },
  )

  return parseMaybeJson(stdout)
}

async function main() {
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'))
  const names = Object.keys(packageJson.peerDependencies ?? {}).sort()
  const results = []

  for (const name of names) {
    const currentRange = packageJson.peerDependencies?.[name] ?? null

    try {
      results.push({
        name,
        section: 'peerDependencies',
        currentRange,
        npm: await npmView(name),
      })
    } catch (error) {
      results.push({
        name,
        section: 'peerDependencies',
        currentRange,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  console.log(
    JSON.stringify(
      {
        package: {
          name: packageJson.name,
          version: packageJson.version,
          engines: packageJson.engines ?? {},
        },
        generatedAt: new Date().toISOString(),
        dependencies: results,
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})
