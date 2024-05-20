import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import httpService from "../../service/http.service";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    httpService.get("/api/categories").then((data) => {
      setCategories(data.data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = (data) => {
    httpService
      .post(`/api/products/${categoryId}`, { body: data })
      .then((data) => console.log(data));
    navigate("/Admin/product");
  };
  return (
    <>
      <div className="create-account">
        <form className="creat__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="creat__form_item">
            <h1 style={{ color: "rgb(255, 0, 170)" }}>THÊM SẢN PHẨM</h1>
          </div>
          <div className="creat__form_item">
            <label>TÊN SẢN PHẨM</label>
          </div>
          <div className="creat__form_item">
            <input
              placeholder="Enter your name"
              type="text"
              defaultValue={""}
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {" "}
                không được để trống
              </span>
            )}
          </div>
          <div className="creat__form_item">
            <label>HÌNH ẢNH:</label>
          </div>
          <div className="creat__form_item">
            <input
              placeholder="Enter your img"
              type="text"
              defaultValue={""}
              {...register("img", {
                required: true,
              })}
            />
            {errors.img && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {" "}
                không được để trống
              </span>
            )}
          </div>
          <div className="creat__form_item">
            <label>GIỚI THIỆU:</label>
          </div>
          <div className="creat__form_item">
            <input
              placeholder="Enter your img"
              type="text"
              defaultValue={""}
              {...register("status", {
                required: true,
              })}
            />
            {errors.status && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {" "}
                không được để trống
              </span>
            )}
          </div>
          <div className="creat__form_item">
            <label>GIÁ TIỀN:</label>
          </div>
          <div className="creat__form_item">
            <input
              placeholder="Enter your price"
              type="text"
              defaultValue={""}
              {...register("price", {
                required: true,
              })}
            />
            {errors.price && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {" "}
                không được để trống
              </span>
            )}
          </div>
          <div className="creat__form_item">
            <label>MÔ TẢ SẢN PHẨM</label>
          </div>
          <div className="creat__form_item">
            <input
              placeholder="Enter your description"
              type="text"
              defaultValue={""}
              {...register("description", {
                required: true,
              })}
            />
            {errors.description && (
              <span style={{ color: "red" }}> không được để trống</span>
            )}
          </div>
          <div className="creat__form_item">
            <select
              className="Selecter"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="creat__form_item">
            <button className="creatOK" type="submit">
              Creat
            </button>
            <Link className="comeback" to="/Admin/product">
              - Come back Products -
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateProduct;
