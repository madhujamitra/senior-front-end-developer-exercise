import { Property } from './BaseMap'
import { divIcon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'

const PropertyMarker = (property: Property) => {

    const getPropertyIcon = (property: Property) => {
        return divIcon({
            className: 'my-div-icon',
            html: `<span class="property-price">$${property.price}<div class="arrow"></div></span>`
        });
    };

    return (
        <>
            <Marker {...property} icon={getPropertyIcon(property)}>
                <Popup>
                    <div className="gm-style-iw gm-style-iw-c">
                        <div className="gm-style-iw-d">
                            <div>
                                <div className="infowindow-content">
                                    <p className="infowindow-title">
                                        <Link to="/property/123123123">{property.description}</Link>
                                        {/* <a href={property.url?.toString()} title={property.description}>${property.description}</a> */}
                                    </p>
                                    <div className="infowindow-image"><img alt="prop" src={property.imgUrl?.toString()} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
            </Marker>
        </>
    )
}

export default PropertyMarker
