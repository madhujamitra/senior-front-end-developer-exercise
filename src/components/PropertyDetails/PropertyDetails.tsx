import React from 'react';
import { Property } from '../../types/Property';
import { UI_TEXT } from '../../constants';

interface PropertyDetail {
  key: string;
  label: string;
  value: string | number;
  className?: string;
}

interface PropertyDetailsProps {
  property: Property;
  className?: string;
  variant?: 'inline' | 'stacked';
  showLabels?: boolean;
  customDetails?: PropertyDetail[];
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  className = '',
  variant = 'inline',
  showLabels = true,
  customDetails
}) => {
  const defaultDetails: PropertyDetail[] = [
    {
      key: 'bedrooms',
      label: UI_TEXT.propertyLabels.bed,
      value: property.bedrooms,
      className: 'bedrooms'
    },
    {
      key: 'bathrooms', 
      label: UI_TEXT.propertyLabels.bath,
      value: property.bathrooms,
      className: 'bathrooms'
    },
    {
      key: 'propertyType',
      label: '',
      value: property.propertyType,
      className: 'propertyType'
    }
  ];

  const details = customDetails || defaultDetails;

  return (
    <div className={`property-details ${variant} ${className}`}>
      {details.map((detail) => (
        <span key={detail.key} className={detail.className || detail.key}>
          {detail.value}
          {showLabels && detail.label && ` ${detail.label}`}
        </span>
      ))}
    </div>
  );
};

export default PropertyDetails; 