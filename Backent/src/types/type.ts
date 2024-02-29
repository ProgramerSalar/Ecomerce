export interface newProductProps {
  name: string;
  photo: string;
  price: string;
  stock: string;
  category: string;
}

export interface SearchProps {
  search?: string;
  category?: string;
  price?: number;
  sort?: string;
  page?: number;
}

export interface baseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: {
    $lte: number;
  };
  category?: string;
}


export interface shippingInfoRequestProps{

  address:string;
  city:string;
  state:string;
  country:string;
  pinCode:number;
}


export interface orderItemsRequestProps{
  name:string;
  photo:string;
  price:number;
  quantity:number;
  productId:string
}

export interface NewOrderRequestProps{

  shippingInfo: shippingInfoRequestProps;
  subtotal:number;
  tax:number;
  shippingCharges:number;
  discount:number;
  total:number;
  orderItems:orderItemsRequestProps[]

}

export interface NewUserProps{
  name:string;
  email:string;
  gender:string;
  dob:Date;
  photo:string;
  createdAt:Date;
  
}