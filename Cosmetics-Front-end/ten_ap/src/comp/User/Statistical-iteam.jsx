import React, { useEffect, useState } from "react";
import httpService from "../service/http.service";
import './Statistical.css'

const Statistical = ()=>{
const  [statistical , setStatistical] = useState ("")

    useEffect(()=>{
        httpService.get("/api/oders").then(data =>{
            console.log(data.data)
            setStatistical(data.data)
        })
    },[])
    return(
        <>  
        <div className="menu_oder">
          <h4>CUSTOMER_NAME</h4>
          <h4>PHONE</h4>
          <h4>ADDRESS</h4>
          <h4>PAY_MENT</h4>
          <h4>CREATEDAT</h4>
          <h4>STATUS</h4>
        </div>
            {statistical && statistical.length > 0 && (
            <div className="itemOder_get">
              {statistical.map((item) => (
                <div className="item_oder" key={item._id}>
                  <h4>{item.customer_name}</h4>
                  <h4>{item.phone}</h4>
                  <h4>{item.address}</h4>
                  <h4>{item.pay_ment}</h4>
                  <h4>{item.createdAt}</h4>
                  <h4>{item.is_payment}</h4>
                </div> 
              ))}
            </div>
          )}
        </>
    )
}
export default Statistical;