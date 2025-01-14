/* eslint-disable @typescript-eslint/no-explicit-any */
import { EPaymentMethod } from "./enum";

export type ApiResponse = {
  statusCode: number;
  message: string;
  data: any;
};

export type QueryParams = {
  [key: string]: string | number | boolean | undefined
}

export type MediaAsset = {
  _id: string;
  url: string;
  fieldname: string;
  originalname: string;
  size: number;
  mimetype: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};


export type Size = {
  _id: string;
  type: string;
  name: string;
};

export type Color = {
  _id: string;
  name: string;
  code: string;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originPrice: number;
  thumbnails: MediaAsset[];
  colors: Array<Color>;
  sizes: Array<Size>;
  inventory: number;
  isDeleted: boolean,
  createdAt: string,
  updatedAt: string
};

export type ProductInventory = {
  _id: string,
  product: string,
  color: Color,
  size: Size,
  amount: number,
  isDeleted: boolean,
  createdAt: string,
  updatedAt: string
}

export type ProductCart = {
  product: Product,
  variant: ProductInventory,
  amount: number
}

export type Order = {
  _id: string,
  orderProducts: ProductOrder[],
  totalPrice: number,
  email: string,
  phoneNumber: string,
  recipientName: string,
  province: string,
  district: string,
  wardOrCommune:string,
  address?: string,
  paymentMethod: EPaymentMethod,
  user?: string,
  shippingNote?: string
  status: EOrderStatus
}

export enum EOrderStatus {
  PROCESSING = 'PROCESSING',
  APPROVED = 'APPROVED',
  SHIPPING = 'SHIPPING',
  DELIVERING = 'DELIVERING',
  CANCEL = 'CANCEL',
  SUCCESS = 'SUCCESS',
}

export type ProductOrder = {
  _id: string,
  product: Product,
  variant: ProductInventory,
  amount: number,
  isDeleted: boolean,
  createdAt: string,
  updatedAt: string
}

export type CreateOrderForm = {
  orderProducts: {
    product: string,
    variant: string,
    amount: number,
  }[],
  totalPrice: number,
  email: string,
  phoneNumber: string,
  recipientName: string,
  province: string,
  district: string,
  wardOrCommune:string,
  address?: string,
  paymentMethod: EPaymentMethod,
  user?: string,
  shippingNote?: string
}

export type Collection = {
  _id: string,
  name: string,
  products: Product[],
  slug: string,
  thumbnail: MediaAsset,
  description: string,
  isDeleted: boolean,
  createdAt: string,
  updatedAt: string
}