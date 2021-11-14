/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-classes-per-file */
import lodash from 'lodash'

function combineTwoArray(arr1: any[], arr2: any[]): any[] {
  // eslint-disable-next-line arrow-body-style
  return lodash.reduce(arr1, (result: any[], value1) => {
    return [
      ...result,
      ...lodash.map(arr2, (value2) => [value1, value2])]
  }, [])
}

function combineThreeArray(arr1: any[], arr2: any[], arr3: any[]) {
  return lodash.reduce(arr1, (result: any[], value1) => {
    const tmp = lodash.reduce(arr2, (tmpResult: any[], value2) => [
      ...tmpResult,
      ...lodash.map(arr3, (value3) => [value1, value2, value3]),
    ], [])
    return [
      ...result,
      ...tmp,
    ]
  }, [])
}

export default class TdxOperations {
  static orItself(firstFilter: string[]): string {
    if (firstFilter.length === 0) {
      throw Error('no filter can be generated')
    }
    const firstResultFilterStr = firstFilter[0]
    return lodash.reduce(
      firstFilter.slice(1),
      (result, value) => `${result} or ${value}`,
      firstResultFilterStr,
    )
  }

  static andTwoFilters(firstFilter: string[], secondFilter: string[]): string {
    const combinedFilters = lodash.map(
      combineTwoArray(firstFilter, secondFilter),
      (value) => `${value[0]} and ${value[1]}`,
    )
    if (combinedFilters.length === 0) {
      throw Error('no filter can be generated')
    }
    const firstResultFilterStr = combinedFilters[0]
    return lodash.reduce(
      combinedFilters.slice(1),
      (result, value) => `${result} or ${value}`,
      firstResultFilterStr,
    )
  }

  static andThreeFilters(firstFilter: string[],
    secondFilter: string[],
    thirdFilter: string[]): string {
    const combinedFilters = lodash.map(
      combineThreeArray(firstFilter, secondFilter, thirdFilter),
      (value) => `${value[0]} and ${value[1]} and ${value[2]}`,
    )
    if (combinedFilters.length === 0) {
      throw Error('no filter can be generated')
    }
    const firstResultFilterStr = combinedFilters[0]
    return lodash.reduce(
      combinedFilters.slice(1),
      (result, value) => `${result} or ${value}`,
      firstResultFilterStr,
    )
  }
}
