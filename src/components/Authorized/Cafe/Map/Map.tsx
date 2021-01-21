import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import styles from './map.module.scss'
import { MAPS_API_KEY } from 'config'
import Marker from './Marker'
import MapsStyle from './mapsStyle'
import { useDispatch, useSelector } from 'react-redux'
import { getCafes } from 'reducers/cafes'
import { RootState } from 'index'
import { useHistory } from 'react-router-dom'

interface UserLocation {
  latitude: number
  longitude: number
  accuracy?: number
}

const Map = () => {
  const { cafes } = useSelector((state: RootState) => state.cafes)

  const dispatch = useDispatch()
  const history = useHistory()

  const [userLocation, setUserLocation] = useState<UserLocation>(
    {} as UserLocation,
  )

  useEffect(() => {
    dispatch(getCafes())
  }, [dispatch])

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((position) =>
      setUserLocation(position.coords),
    )
  }, [])

  return (
    <div className={styles.wrapper}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: MAPS_API_KEY as string }}
        options={{
          fullscreenControl: false,
          styles: MapsStyle,
        }}
        center={{
          lat: userLocation.latitude || 59.9385849,
          lng: userLocation.longitude || 30.3147994,
        }}
        defaultZoom={12}
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
            lat={parseFloat(cafe.latitude)}
            lng={parseFloat(cafe.longitude)}
            onClick={() => history.push(`/cafes/${cafe.id}`)}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map
