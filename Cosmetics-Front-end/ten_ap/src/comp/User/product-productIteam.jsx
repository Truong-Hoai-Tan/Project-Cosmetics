import React, { useEffect, useState } from "react";
import httpService from "../service/http.service";
import './product.css'
import { toast } from 'react-toastify';


const UseProducts = () => {
    const [product, setProduct] = useState([])
    
    const handleAddToCart = (item) => {
        // console.log(item)
        // console.log({
        //     "id_product": item._id,
        //     "quantity": 1
        // })
        httpService.post("/api/carts", {
            body: {
                "id_product": item._id,
                "quantity": 1
            }
        }).then(data => {
            toast.success("Add Thành Công")
        }).catch(error => {
            toast.error(error.message)
        })
    }
    useEffect(() => {
        httpService.get("/api/products/product-hot", {})
            .then((data) => {
                setProduct(data.data)
            })
    }, [])
    return (<>

        <div className="Sumproducts">
            {product && product.length > 0 && (
                <div className="item_product">
                    {product.map((item) => (
                        <div className="iteam" key={item._id}>
                            <h3>{item.name}</h3>
                            <h1> <img className="productimg" src={item.img} alt=""
                            /></h1>
                            <h1>{item.price}</h1>
                        </div>
                        
                    ))}
                </div>
            )}
        </div>

    </>)
}
export default UseProducts;