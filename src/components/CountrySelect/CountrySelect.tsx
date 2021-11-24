import React from 'react';
import { countries } from './countriesData';
import { useForm } from 'react-hook-form';

export default function CountrySelect() {
  const { register } = useForm();
  return (
    <select {...register('category')}>
      {countries.map(item => <option value={item.code}>{item.label}</option>)}
    </select>
  );
}
