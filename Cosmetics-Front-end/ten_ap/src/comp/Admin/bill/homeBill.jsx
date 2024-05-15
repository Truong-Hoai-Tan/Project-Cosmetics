import React, { useEffect, useState } from "react";
import httpService from "../../service/http.service";
import { set } from "react-hook-form";
import './oder.css'
import Sweetpagination from "sweetpagination";
import { useNavigate } from "react-router-dom";

const HomeBill = () => {

  const [statistical, setStatistical] = useState("")
  const [currentPageData, setCurrentPageData] = useState([]); //1
  const [isReload, setIsReload] = useState(false)
  const navigate = useNavigate();
  const handleUpdateStatusBill = (e, item) => {
    console.log(e.target.value)
    httpService.patch(`/api/oders/${item._id}`,{
      body: {
        is_payment: e.target.value
      }
    }).then(data => { 
      setIsReload(!isReload)
    })
  }
  const deleteData = async (id) => {
    const response = await httpService.delete(
      `/api/oders/${id}`
    );
  };
  const handledeleteData = (id) => {
    deleteData(id);
    setIsReload(!isReload);
  };
  const handleClickProduct = (id_product) =>{
    navigate (`/Admin/oders/${id_product}`)
}
  useEffect(() => {
    httpService.get("/api/oders").then(data => {
      console.log(data.data)
      setStatistical(data.data)
    })
  }, [isReload])
  return (
    <>
      <div className="menu_oder2">
        <h4>TÊN KHÁCH HÀNG</h4>
        <h4>CHI TIẾT ĐƠN HÀNG</h4>
        <h4>ĐỊA CHỈ</h4>
        <h4>TÌNH TRẠNG</h4>
        <h4>TRẠNG THÁI</h4> 
      </div>
      {currentPageData && currentPageData.length > 0 && (
        <div className="itemOder_get">
          {currentPageData.map((item) => (
            <div className="TableOder" key={item._id}>
            <div className="oder_item">
            <h4>{item.customer_name}</h4>
            </div>
            <div className="oder_item">
            <h4 onClick={() => handleClickProduct(item._id)}>Chi Tiết Đơn Hàng</h4>
            </div>
            <div className="oder_item">
            <h4>{item.address}</h4>
            </div>
            <div className="oder_item">
            <h4>{item.is_payment}</h4>
            </div>
            <div className="oder_item">
            <h4>
                <select className="select_oder" value={item.is_payment} onChange={(e) => { handleUpdateStatusBill(e, item) }}>
                  <option className="item_select" value={"Browsing"}>Đang Duyệt</option>
                  <option value={"Confirm"}>Xác Nhận</option>
                  <option value={"Success"}>Thành Công</option>
                </select>
                {/* <button
                  className="del"
                    onClick={() => {
                      handledeleteData(item._id);
                    }}
                  >XÓA
                  </button> */}
              </h4>
            </div>
            </div>
          ))}
        </div>
      )}
      <Sweetpagination
            currentPageData={setCurrentPageData}
            getData={statistical}
            dataPerPage={5}
            navigation={true}
            getStyle={"style-1"}
          />
    </>
  )

}
export default HomeBill