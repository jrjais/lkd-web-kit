#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const source = join(scriptDir, '..', 'src', 'distributed-skills')
const target = join(process.cwd(), '.agents', 'skills')

if (!existsSync(source)) {
  throw new Error(`No se encontraron skills distribuibles en ${source}`)
}

mkdirSync(target, { recursive: true })
cpSync(source, target, { recursive: true, force: true })

console.log(`Skills instaladas en ${target}`)
