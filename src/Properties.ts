import { Logger } from '@hmcts/nodejs-logging'
import * as fs from 'fs'

const logger = Logger.getLogger('applicationRunner')

export function addTo (config: any, mountPoint: fs.PathLike = '/mnt/secrets/', propertiesPrefix: string = 'keyVault') {
  logger.info(`Reading properties from volume: '${mountPoint}'`)
  config[propertiesPrefix] = fs.readdirSync(mountPoint, null)
    .reduce((obj, dir) => addDir(dir, obj, mountPoint), {})
}

function addDir (dir: string, obj: any, mountPoint: fs.PathLike): any {
  obj[dir] = readDirectories(mountPoint, dir).reduce((values, file) => addFile(values, file, mountPoint, dir), {})
  return obj
}

function addFile (values: any, file: string, mountPoint: fs.PathLike, dir: string) {
  values[file] = readFile(mountPoint, dir, file).trim()
  return values
}

function readFile (mountPoint: fs.PathLike, dir: string, file: string) {
  return fs.readFileSync(mountPoint + '/' + dir + '/' + file, 'utf8')
}

function readDirectories (mountPoint: fs.PathLike, dir: string) {
  return fs.readdirSync(mountPoint + '/' + dir)
}