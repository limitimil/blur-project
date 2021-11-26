/* eslint-disable no-shadow */
enum ServiceType {
  // eslint-disable-next-line camelcase
  Youbike1_0 = 1,
  // eslint-disable-next-line camelcase
  Youbike2_0 = 2,
}
enum ServiceStatus {
  StopService = 0,
  Available = 1,
  PauseService = 2,
}
interface TdxPosition {
  PositionLon: number,
  PositionLat: number,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default interface BikeStation {
  stationPosition: TdxPosition,
  stationName: string,
  stationAddress: string,
  stationUid: string,
  availableRentBikes: number,
  availableReturnBikes: number,
  serviceType: ServiceType,
  serviceStatus: ServiceStatus,
}
