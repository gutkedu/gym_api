export interface Coordinate {
  latitude: number
  longitude: number
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
): number {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const degreesToRadians = (degrees: number) => (Math.PI * degrees) / 180

  const fromRadian = degreesToRadians(from.latitude)
  const toRadian = degreesToRadians(to.latitude)
  const theta = degreesToRadians(from.longitude - to.longitude)

  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(theta)

  dist = Math.min(dist, 1)

  const arcLength = Math.acos(dist)
  const distance = (arcLength * 180) / Math.PI
  const miles = distance * 60 * 1.1515
  const kilometers = miles * 1.609344

  return kilometers
}
