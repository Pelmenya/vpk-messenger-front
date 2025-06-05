// Логика поиска самой точной локации с таймаутом
export function getBestLocation(
  onSuccess: (pos: GeolocationPosition) => void,
  onError: (err: GeolocationPositionError) => void,
  desiredAccuracy = 40,
  maxWait = 8000,
  onUpdate?: (accuracy: number | null) => void,
) {
  let bestPosition: GeolocationPosition | null = null
  let timer: number
  const watchId = navigator.geolocation.watchPosition(
    pos => {
      if (!bestPosition || pos.coords.accuracy < bestPosition.coords.accuracy) {
        bestPosition = pos
        onUpdate?.(pos.coords.accuracy)
      }
      if (bestPosition.coords.accuracy <= desiredAccuracy) {
        clearTimeout(timer)
        navigator.geolocation.clearWatch(watchId)
        onSuccess(bestPosition)
      }
    },
    err => {
      clearTimeout(timer)
      navigator.geolocation.clearWatch(watchId)
      onError(err)
    },
    {
      enableHighAccuracy: true,
      timeout: maxWait,
      maximumAge: 0,
    },
  )
  timer = window.setTimeout(() => {
    navigator.geolocation.clearWatch(watchId)
    if (bestPosition) {
      onSuccess(bestPosition)
    } else {
      onError({
        code: 1,
        message: "Не удалось получить локацию",
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationPositionError)
    }
  }, maxWait)
  return () => {
    clearTimeout(timer)
    navigator.geolocation.clearWatch(watchId)
  }
}
