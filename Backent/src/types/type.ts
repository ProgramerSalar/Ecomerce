export interface newProductProps {
  name: string;
  photo: string;
  price: string;
  stock: string;
  category: string;
}



export interface SearchProps{
  search?:string;
  category?:string;
  price?:number;
  sort?:string;
  page?:number
}


export interface baseQuery{
  name?:{
    $regex:string,
    $options:string
  },
  price?:{
    $lte:number
  },
  category?:string
}