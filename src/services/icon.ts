export default class IconService {
  public async getLocationIcon(order: number, color: string): Promise<any> {
    const env = 'desktop'
    return (await import(`@/assets/icon/locationIcon/${env}/${color}/${order}.png`) ).default
  }
}
