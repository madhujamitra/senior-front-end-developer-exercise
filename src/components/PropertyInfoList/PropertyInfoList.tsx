import React from 'react';
import { Property } from '../../types/Property';
import { UI_TEXT } from '../../constants';

interface PropertyInfoItem {
  key: string;
  label: string;
  value: string | number;
  formatter?: (value: string | number) => string;
}

interface PropertyInfoListProps {
  property: Property;
  className?: string;
  variant?: 'detailed' | 'compact';
  customItems?: PropertyInfoItem[];
}

const PropertyInfoList: React.FC<PropertyInfoListProps> = ({
  property,
  className = '',
  variant = 'detailed',
  customItems
}) => {
  const defaultItems: PropertyInfoItem[] = [
    {
      key: 'location',
      label: UI_TEXT.propertyLabels.location,
      value: property.location
    },
    {
      key: 'propertyType',
      label: UI_TEXT.propertyLabels.type,
      value: property.propertyType
    },
    {
      key: 'rooms',
      label: UI_TEXT.propertyLabels.bedrooms,
      value: UI_TEXT.formatting.bedroomsBathrooms(property.bedrooms, property.bathrooms)
    },
    {
      key: 'price',
      label: UI_TEXT.propertyLabels.price,
      value: property.price,
      formatter: (value) => `$${Number(value).toLocaleString()}`
    }
  ];

  const items = customItems || defaultItems;

  return (
    <div className={`property-info-list ${variant} ${className}`}>
      {items.map((item) => (
        <p key={item.key}>
          <strong>{item.label}:</strong> {item.formatter ? item.formatter(item.value) : item.value}
        </p>
      ))}
    </div>
  );
};

export default PropertyInfoList; 