import * as fs from 'fs'

export interface Options {
  mountPoint?: fs.PathLike
  failOnError?: boolean
}

export { addTo } from './Properties'
