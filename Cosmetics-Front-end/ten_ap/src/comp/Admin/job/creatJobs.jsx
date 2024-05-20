import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import httpService from "../../service/http.service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateJobs = () => {
  const [accounts, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const navagite = useNavigate();

  useEffect(() => {
    httpService.get("/api/accounts").then((data) => {
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
      .post(`/api/jobs/${categoryId}`, { body: data })
      .then((data) => setCategoryId(data));
    navagite("/Admin/job");
  };
  return (
    <>
      <div className="create-account">
        <form className="creat__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="creat__form_item">
            <h1 style={{ color: "rgb(255, 0, 170)" }}>THÊM NHIỆM VỤ </h1>
          </div>
          <div className="creat__form_item">
            <label>NHIỆM VỤ</label>
          </div>
          <div className="creat__form_item">
            <input
              placeholder="Enter your nhiệm vụ"
              type="text"
              defaultValue={""}
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && (
              <span style={{ color: "red" }}> không được để trống</span>
            )}
          </div>
          <div className="creat__form_item">
            <label>MÔ TẢ</label>
          </div>
          <div className="creat__form_item">
            <input
              placeholder="Enter your nội dung"
              type="text"
              defaultValue={""}
              {...register("detail", {
                required: true,
              })}
            />
            {errors.detail && (
              <span style={{ color: "red" }}> không được để trống</span>
            )}
          </div>
          <div className="creat__form_item">
            <label>THỜI GIAN</label>
          </div>
          <div className="creat__form_item">
            <input
              placeholder="Enter your mô tả"
              type="text"
              defaultValue={""}
              {...register("status", {
                required: true,
              })}
            />{" "}
            <br />
            {errors.status && (
              <span style={{ color: "red" }}> không được để trống</span>
            )}
          </div>
          <div className="creat__form_item">
            <select
              className="Selecter"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {accounts.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.username}
                </option>
              ))}
            </select>
          </div>
          <div className="creat__form_item">
            <button className="creatOK" type="submit">
              Creat
            </button>
            <Link className="comeback" to="/Admin/job">
              - Come back Jobs -
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateJobs;
