import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import styles from './map.module.scss'
import { MAPS_API_KEY } from '../../../config'
import Marker from './Marker'
import MapsStyle from './mapsStyle'

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
  const [userLocation, setUserLocation] = useState<UserLocation>(
    {} as UserLocation,
  )
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
        <Marker
          type="cafe"
          lat={59.9385849}
          lng={30.3147994}
          onClick={onMarkerClick}
        />
        <Marker
          type="cafe"
          lat={59.862742}
          lng={30.318867}
          onClick={onMarkerClick}
        />
      </GoogleMapReact>
    </div>
  )
}

export default Map
