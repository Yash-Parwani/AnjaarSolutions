import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    propertyType: string,
    location: string,
    price: number | undefined,
}

export interface CompanyCardProps {
  id?: BaseKey | undefined,
  name: string,
  address: string,
  phone: string,
  email: string,
  logo:string
}