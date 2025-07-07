import { useState } from 'react'
import { LatLng, Point, LatLngTuple, divIcon } from 'leaflet';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import PropertyMarker from './PropertyMarker'
import { MAP_CONFIG, EXTERNAL_URLS, MOCK_DATA } from '../constants';
import './styles.css'

function MapEvents() {
    const map = useMapEvents({
        click: () => {
            map.locate()
        },
        locationfound: (location) => {
            // Location found - could show user notification here
        },
        contextmenu: (event) => {
            // Right-click context menu - could add marker functionality here
        },
        moveend: () => {
            // Map moved - could trigger search update here
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

    const [properties] = useState<Property[]>([
        {
            position: [49.28634216910997, -123.11940420180999],
            price: '2,996',
            description: "Vancouver Furnished Condo Rental – Amazing 1 Bed, 1 Bath plus Large Private Patio and Fireplace in Excellent Gastown Location",
            imgUrl: new URL("https://rentitfurnished.com/vancouver/wp-content/uploads/sites/2/2020/07/7-13-350x245.jpg"),
            url: new URL("https://rentitfurnished.com/vancouver/property/vancouver-furnished-condo-rental-3vc/")
        },         {
            position: [49.28034216910997, -123.11940420180999],
            price: MOCK_DATA.samplePrice,
            description: "Vancouver Furnished Condo Rental – Amazing 1 Bed, 1 Bath plus Large Private Patio and Fireplace in Excellent Gastown Location",
            imgUrl: new URL(EXTERNAL_URLS.rentItFurnished.sampleImage),
            url: new URL(EXTERNAL_URLS.rentItFurnished.sampleProperty)
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
            {/* <div className="filters">

                here comes the filters

            </div> */}
            <div className="map">
                <MapContainer center={position} zoom={MAP_CONFIG.defaultZoom} scrollWheelZoom={true}>
                    <TileLayer
                        attribution={MAP_CONFIG.attribution}
                        url={MAP_CONFIG.tileUrl}
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

