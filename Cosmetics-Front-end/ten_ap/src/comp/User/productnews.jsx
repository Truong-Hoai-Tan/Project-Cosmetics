import React, { useEffect, useState } from "react";
import httpService from "../service/http.service";
import './product.css'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const UserProductsNew = () => {
    const [product, setProduct] = useState([])
    const navigate = useNavigate();
    //navigate to Detail product
    const handleClickProduct = (id_product) =>{
        navigate (`/products/${id_product}`)
    }

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
      const handleToCart = (item) => {
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
            navigate('/cart')
        }).catch(error => {
            toast.error(error.message)
        })
    }
    useEffect(() => {
        httpService.get("/api/products/product-news", {})
            .then((data) => {
                setProduct(data.data)
            })
    }, [])
    return (<>

        <div className="Sumproducts"> 
            {product && product.length > 0 && (
                <div className="item_product">
                    {product.map((item) => (
                        <div className="item" key={item._id}>
                            <h4> <img onClick={() => handleClickProduct(item._id)} className="productimg2" src={item.img} alt=""
                            /></h4>
                            <h3>{item.name}</h3>
                            <h2>{item.price}.đ</h2>
                            <div className="new">NEW</div>
                            <button className="add_cart" onClick={() => handleAddToCart(item)}>Thêm Giỏ Hàng</button>
                            <button className="add_cart2" onClick={() => handleToCart(item)}>Mua Hàng</button>
                        </div>
                    ))}
                </div>
            )}
        </div>

    </>)
}
export default UserProductsNew;