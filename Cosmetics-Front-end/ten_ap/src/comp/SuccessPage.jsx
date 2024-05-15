import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import httpService from "./service/http.service";
import moment from "moment";
import { Link } from "react-router-dom";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

function SuccessPage() {
  const { search } = useLocation();
  const [data, setData] = useState(null);

  console.log(search);

  useEffect(() => {
    if (!search) return;

    (async () => {
      try {
        const response = await httpService.get(`/api/oders/zaloPay${search}`);

        if (response.data) {
          console.log(response);
          setData(response.data);
        }
      } catch (error) {
        console.log(`error`, error);
      }
    })();
  }, [search]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="center-success">
      <div>
        <h3>{`${data.description} Thành công`}</h3>
        <h3>{`Khách hàng: ${data?.order?.customer_name}`}</h3>
        <h3>{`Số điện thoại: ${data?.order?.phone}`}</h3>
        <h3>{`Địa chỉ: ${data?.order?.address}`}</h3>
        <h3>{`Ngày đặt: ${moment(data?.order?.createdAt).format("DD/MM/YYYY HH:mm:ss")}`}</h3>
        <h3>{`Tổng tiền: ${formatPrice(data.amount)}`}</h3>

        <Link to={"/"}>Quay về trang chủ</Link>

        <div className="item_cart response-success">
          <div className="Sum">
            <h1>Chi tiết sản phẩm</h1>
          </div>
          <div className="Name_Cart">
            <h4>Tên Sản Phẩm</h4>
            <span>Hình Ảnh</span>
            <h4>Giá Tiền</h4>
            <h4>Số Lượng</h4>
          </div>

          {data?.order?.cart?.items?.map((item) => (
            <div className="product_cart " key={item._id}>
              <h4>{item?.product?.name}</h4>
              <span>
                {" "}
                <img className="img_cart" src={item?.product?.img} alt="" />
              </span>
              <h4>{formatPrice(item?.product?.price)}</h4>
              <h4>{item?.quantity}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
