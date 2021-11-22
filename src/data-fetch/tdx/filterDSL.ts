/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-classes-per-file */
import lodash from 'lodash'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TdxOperations from './operations'

class TdxConst {
  static KEYS_FOR_CLASS = ['Class1', 'Class2', 'Class3'];
}

export class TdxStatements {
  static filterClassName(className: string): string[] {
    const buildBlock = (field: string) => `${field} eq '${className}'`
    return lodash.map(TdxConst.KEYS_FOR_CLASS, buildBlock)
  }

  static filterKeyword(keyword: string, fields: string[]): string[] {
    const buildBlock = (field: string) => `contains(${field}, '${keyword}')`
    return lodash.map(fields, buildBlock)
  }

  static filterIdSubset(subset: string[], key = 'ID'): string[] {
    const buildBlock = (id: string) => `${key} eq '${id}'`
    return lodash.map(subset, buildBlock)
  }
}

export class TdxFilter {
  private jobs: any[];

  constructor() {
    this.jobs = []
  }

  public getLength() {
    return this.jobs.length
  }

  public regist(statement: string[]) {
    this.jobs.push(statement)
  }

  public combineJobs(): string {
    switch (this.jobs.length) {
    case 0:
      throw Error('no job can be combined')
    case 1:
      // @ts-ignore
      return TdxOperations.orItself(...this.jobs)
    case 2:
      // @ts-ignore
      return TdxOperations.andTwoFilters(...this.jobs)
    case 3:
      // @ts-ignore
      return TdxOperations.andThreeFilters(...this.jobs)
    default:
      break
    }
    throw Error(`unexpected job length: ${this.jobs.length}`)
  }
}
