import TdxOperations from '@/data-fetch/tdx/operations'

describe('@/data-fetch/tourism/tdx/operations', () => {
  it('or operations', () => {
    const result = TdxOperations.orItself([
      'hello',
      'world',
    ])
    expect(result).toBe('hello or world')
  })
  it('and operations for two array', () => {
    const arr1 = ['hello', 'world']
    const arr2 = ['hello', 'hell']
    const result = TdxOperations.andTwoFilters(arr1, arr2)
    expect(result).toBe('hello and hello or hello and hell or world and hello or world and hell')
  })
})
