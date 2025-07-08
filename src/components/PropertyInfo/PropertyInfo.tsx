import React from 'react';
import { Property } from '../../types/Property';
import PropertyInfoList from '../PropertyInfoList/PropertyInfoList';

interface PropertyInfoProps {
  property: Property;
  className?: string;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property, className = '' }) => {
  return <PropertyInfoList property={property} className={className} />;
};

export default PropertyInfo; 