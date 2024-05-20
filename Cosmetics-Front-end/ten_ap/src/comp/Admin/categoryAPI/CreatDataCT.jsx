import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { dark } from "@mui/material/styles/createPalette";
import httpService from "../../service/http.service";

const CreateCT = (props) => {
  const [cateBig, setCateBig] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = (data) => {
    httpService
      .post("/api/categories/", { body: data })
      .then((data) => setCateBig(data));
    navigate("/Admin/Categories");
  };

  return (
    <>
      <div className="create-account">
        <form className="creat__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="creat__form_item">
            <h1>THÊM DANH MỤC</h1>
          </div>
          <div className="creat__form_item">
            <label>TÊN DANH MỤC:</label>
          </div>
          <div className="creat__form_item">
            <input
              placeholder="Enter your name"
              type="text"
              defaultValue={props.data?.name}
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && <span>Name không được để trống</span>}
          </div>
          <div className="creat__form_item">
            <label>HÌNH ẢNH:</label>
          </div>
          <div className="creat__form_item">
            <input
              placeholder="Enter your img"
              type="text"
              defaultValue={props.data?.img}
              {...register("img", {
                required: true,
              })}
            />
            {errors.img && <span>img không được để trống</span>}
          </div>
          <div className="creat__form_item">
            <button className="creatOK" type="submit">
              THÊM
            </button>
            <Link className="comeback" to="/Admin/accounts">
            - Come back Category -
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCT;
