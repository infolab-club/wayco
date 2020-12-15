import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import styles from './map.module.scss'
import { MAPS_API_KEY } from '../../../config'
import Marker from './Marker'
import MapsStyle from './mapsStyle'
import { useDispatch, useSelector } from 'react-redux'
import { getCafes } from '../../../reducers/cafes'
import { RootState } from '../../../index'

interface Props {
  onMarkerClick: () => void
}

interface UserLocation {
  latitude: number
  longitude: number
  accuracy?: number
}

const Map = (props: Props) => {
  const { onMarkerClick } = props
  const { cafes } = useSelector((state: RootState) => state.cafes)

  const dispatch = useDispatch()

  const [userLocation, setUserLocation] = useState<UserLocation>(
    {} as UserLocation,
  )

  useEffect(() => {
    dispatch(getCafes())
  }, [dispatch])

  window.navigator.geolocation.getCurrentPosition((position) =>
    setUserLocation(position.coords),
  )

  return (
    <div className={styles.wrapper}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: MAPS_API_KEY }}
        options={{
          fullscreenControl: false,
          styles: MapsStyle,
        }}
        defaultCenter={{
          lat: userLocation.latitude || 59.9385849,
          lng: userLocation.longitude || 30.3147994,
        }}
        defaultZoom={15}
      >
        {userLocation.accuracy && (
          <Marker
            type="user"
            lat={userLocation.latitude}
            lng={userLocation.longitude}
          />
        )}
        {cafes?.map((cafe) => (
          <Marker
            key={cafe.id}
            type="cafe"
            lat={parseInt(cafe.latitude)}
            lng={parseInt(cafe.longitude)}
            onClick={onMarkerClick}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map
