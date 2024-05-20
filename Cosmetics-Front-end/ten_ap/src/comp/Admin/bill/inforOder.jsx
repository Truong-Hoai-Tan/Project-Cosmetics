import React, { useEffect, useState } from "react";
import { set } from 'react-hook-form';
import { useParams } from "react-router";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { useNavigate } from "react-router";
import httpService from "../../service/http.service";
import storageService from "../../service/storage.service";
import './oder.css'
import { dark } from "@mui/material/styles/createPalette";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)", 
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const InforOder = () => {
    const [products, setProducts] = useState([]);
    const [oders,setOders] = useState({});
    const [cart , setCart] = useState({});
    const [isReload, setIsReload] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams()
    useEffect(() => {
        httpService.get(`/api/oders/detailOder/${id}`).then(data => {
            setOders(data.data)
            console.log(data.data)
        })
    }, [])
    useEffect(() => {
        httpService.get("/api/oders", {})
            .then(data => { 
             setProducts(data?.data)
            })
    }, [isReload])
    // useEffect((id)=>{
    //     httpService.get(`/api/accounts/information/${id}`).then(data =>{
    //         console.log(data.data)
    //     })
    // },[])
    return (
        <>
             <div className="detail" key={oders?.id}>
             <h1>Chi Tiết Đơn Hàng</h1>
                <div className="detail_Oder_items" >
                            <h4>Tên Khách Hàng: {oders?.customer_name}</h4>
                            <h4>Số Điện Thoại: {oders?.phone}</h4>
                            <h4>Địa Chỉ Nhận Hàng: {oders?.address}</h4>
                            <h4>Ngày Đặt Hàng: {oders?.createdAt}</h4>
                <div >
                {oders?.cart?.items?.map(item=> {
                    return <div className="itemsOder_Product" key={item?.id}>
                    <h3>Sản Phẩm: </h3>
                        <p>{item.product?.name}</p>
                        <img className="imgOder" src={item.product?.img}/>
                        <h4 className="soluong">Số Lượng: {item.quantity}</h4>
                    </div>
                })} 
                </div>
                 </div>
            </div>
                    
        </>
    )
}
export default InforOder;