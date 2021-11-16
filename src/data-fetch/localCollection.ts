import { LocalStorage } from 'quasar'
import lodash from 'lodash'

const KEYS = {
  SCENIC_SPOT: 'scenic-spot-collection',
}
export default class LocalCollection {
  private getValueAsList = (value: string | null): string[] => {
    if (!value) return []
    return JSON.parse(value)
  }

  private set(key:string, value:string[]): void {
    const valueStr = JSON.stringify(value)
    return LocalStorage.set(key, valueStr)
  }

  private get(key:string):string[] {
    return this.getValueAsList(LocalStorage.getItem(key))
  }

  public removeCollectedSceneSpotId(key: string): string[] {
    const collectedIds = this.getCollectedSceneSpotIds()
    const removedIds = lodash.remove(collectedIds, (current) => current === key)
    this.set(KEYS.SCENIC_SPOT, collectedIds)
    return removedIds
  }

  public appendCollectedSceneSpotId(key: string): string[] {
    const collectedIds = this.getCollectedSceneSpotIds()
    collectedIds.push(key)
    this.set(KEYS.SCENIC_SPOT, collectedIds)
    return collectedIds
  }

  public getCollectedSceneSpotIds(): string[] {
    return this.get(KEYS.SCENIC_SPOT)
  }
}
