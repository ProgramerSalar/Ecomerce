import express from "express"
import { NewOrder } from "../controllers/Order.js";
import { upload } from "../middleware/multer.js";


const router = express()

// 65dad3c4ac26787886bbd792
// 65dad3dbac26787886bbd793
// {
//     "shippingInfo":{
//         "address":"sanjay colony, secter-23, fridabad",
//         "secter":"secter-23",
//         "colony":"sanjay colony",
//         "distic":"fridabad",
//         "state":"haryana",
//         "country":"india"
//     },
//     "amount":500,
//     "tax":10,
//     "shippingCharges":100,
//     "disCount":10,
//     "subtotal":620,
//     "orderInfo":{
//         "productId":"65dad3dbac26787886bbd793",
//         "photo":"",
//         "name":"nokia",
//         "price":500,
//         "quantity":2
//     }
// }
router.post('/newOrder',upload, NewOrder)







export default router;