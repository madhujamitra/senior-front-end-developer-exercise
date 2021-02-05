import { useState, useEffect } from 'react'
import { LatLng, Point, LatLngTuple, divIcon } from 'leaflet';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import PropertyMarker from './PropertyMarker'

function MapEvents() {
    const map = useMapEvents({
        click: () => {
            map.locate()
        },
        locationfound: (location) => {
            console.log('location found:', location)
        },
        contextmenu: (event) => {
            console.log("Coordinates: " + event.latlng.toString());
            //L.marker(event.latlng).addTo(map);
        },
        moveend: () => {
            console.log("Coordinates of the center: " + map.getCenter().toString());
            console.log("Coordinates from NorthEast: " + map.getBounds().getNorthEast());
            console.log("Coordinates from southWest: " + map.getBounds().getSouthWest());
        }
    })
    return null
}

export interface Property {
    position: LatLngTuple,
    price: string,
    description?: string,
    imgUrl?: URL,
    url?: URL,
}


const BaseMap = () => {

    const [properties, setProperties] = useState<Property[]>([
        {
            position: [49.28634216910997, -123.11940420180999],
            price: '2,996',
            description: "Vancouver Furnished Condo Rental – Amazing 1 Bed, 1 Bath plus Large Private Patio and Fireplace in Excellent Gastown Location",
            imgUrl: new URL("https://rentitfurnished.com/vancouver/wp-content/uploads/sites/2/2020/07/7-13-350x245.jpg"),
            url: new URL("https://rentitfurnished.com/vancouver/property/vancouver-furnished-condo-rental-3vc/")
        }, {
            position: [49.28034216910997, -123.11940420180999],
            price: '3,400',
            description: "Vancouver Furnished Condo Rental – Amazing 1 Bed, 1 Bath plus Large Private Patio and Fireplace in Excellent Gastown Location",
            imgUrl: new URL("https://rentitfurnished.com/vancouver/wp-content/uploads/sites/2/2020/07/7-13-350x245.jpg"),
            url: new URL("https://rentitfurnished.com/vancouver/property/vancouver-furnished-condo-rental-3vc/")
        }, {
            position: [49.28634216910997, -123.128],
            price: '3,195',
            description: "Vancouver Furnished Condo Rental – Amazing 1 Bed, 1 Bath plus Large Private Patio and Fireplace in Excellent Gastown Location",
            imgUrl: new URL("https://rentitfurnished.com/vancouver/wp-content/uploads/sites/2/2020/07/7-13-350x245.jpg"),
            url: new URL("https://rentitfurnished.com/vancouver/property/vancouver-furnished-condo-rental-3vc/")
        }, {
            position: [49.27634216910997, -123.11940420180999],
            price: '4,050',
            description: "Vancouver Furnished Condo Rental – Amazing 1 Bed, 1 Bath plus Large Private Patio and Fireplace in Excellent Gastown Location",
            imgUrl: new URL("https://rentitfurnished.com/vancouver/wp-content/uploads/sites/2/2020/07/7-13-350x245.jpg"),
            url: new URL("https://rentitfurnished.com/vancouver/property/vancouver-furnished-condo-rental-3vc/")
        }, {
            position: [49.27034216910997, -123.11940420180999],
            price: '4,160',
            description: "Vancouver Furnished Condo Rental – Amazing 1 Bed, 1 Bath plus Large Private Patio and Fireplace in Excellent Gastown Location",
            imgUrl: new URL("https://rentitfurnished.com/vancouver/wp-content/uploads/sites/2/2020/07/7-13-350x245.jpg"),
            url: new URL("https://rentitfurnished.com/vancouver/property/vancouver-furnished-condo-rental-3vc/")
        }, {
            position: [49.27634216910997, -123.128],
            price: '3,295',
            description: "Vancouver Furnished Condo Rental – Amazing 1 Bed, 1 Bath plus Large Private Patio and Fireplace in Excellent Gastown Location",
            imgUrl: new URL("https://rentitfurnished.com/vancouver/wp-content/uploads/sites/2/2020/07/7-13-350x245.jpg"),
            url: new URL("https://rentitfurnished.com/vancouver/property/vancouver-furnished-condo-rental-3vc/")
        }, {
            position: [49.26634216910997, -123.10940420180999],
            price: '2,995',
            description: "Vancouver Furnished Condo Rental – Amazing 1 Bed, 1 Bath plus Large Private Patio and Fireplace in Excellent Gastown Location",
            imgUrl: new URL("https://rentitfurnished.com/vancouver/wp-content/uploads/sites/2/2020/07/7-13-350x245.jpg"),
            url: new URL("https://rentitfurnished.com/vancouver/property/vancouver-furnished-condo-rental-3vc/")
        }, {
            position: [49.26034216910997, -123.10940420180999],
            price: '3,595',
            description: "Vancouver Furnished Condo Rental – Amazing 1 Bed, 1 Bath plus Large Private Patio and Fireplace in Excellent Gastown Location",
            imgUrl: new URL("https://rentitfurnished.com/vancouver/wp-content/uploads/sites/2/2020/07/7-13-350x245.jpg"),
            url: new URL("https://rentitfurnished.com/vancouver/property/vancouver-furnished-condo-rental-3vc/")
        }, {
            position: [49.26634216910997, -123.118],
            price: '2,995',
            description: "Vancouver Furnished Condo Rental – Amazing 1 Bed, 1 Bath plus Large Private Patio and Fireplace in Excellent Gastown Location",
            imgUrl: new URL("https://rentitfurnished.com/vancouver/wp-content/uploads/sites/2/2020/07/7-13-350x245.jpg"),
            url: new URL("https://rentitfurnished.com/vancouver/property/vancouver-furnished-condo-rental-3vc/")
        }
    ]);

    const position: LatLng = new LatLng(49.27634216910997, -123.11940420180999)
    const markerClusterProps = {
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: true,
        zoomToBoundsOnClick: true,
        removeOutsideVisibleBounds: true,
        animateAddingMarkers: true,
        iconCreateFunction: function (cluster: any) {
            const n = cluster.getChildCount();
            return divIcon({ html: n, className: 'mycluster', iconSize: new Point(40, 40) });
        },
        spiderfyShapePositions: function (count: number, centerPt: any) {
            var distanceFromCenter = 35,
                markerDistance = 45,
                lineLength = markerDistance * (count - 1),
                lineStart = centerPt.y - lineLength / 2,
                res = [],
                i;

            res.length = count;

            for (i = count - 1; i >= 0; i--) {
                res[i] = new Point(centerPt.x + distanceFromCenter, lineStart + markerDistance * i);
            }

            return res;
        }
    }


    return (
        <div className="map-container">
            <div className="filters">

                here comes the filters

            </div>
            <div className="map">
                <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapEvents />
                    <MarkerClusterGroup {...markerClusterProps}>
                        {properties.map((property, index) => (
                            <PropertyMarker key={index} {...property} />
                        ))}
                    </MarkerClusterGroup>;
                </MapContainer>
                <div id="search-on-map-move"><input type="checkbox" />Search on map move</div>

            </div>
        </div>

    );
}

export default BaseMap

