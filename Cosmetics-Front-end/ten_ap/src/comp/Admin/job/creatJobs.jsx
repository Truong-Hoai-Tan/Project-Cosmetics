import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import httpService from "../../service/http.service";
import { useNavigate } from "react-router-dom";
import './creatJob.css' 
import { Link } from 'react-router-dom';


const CreateJobs = () => {
  const [accounts, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null)
  const navagite = useNavigate();

  useEffect(() => {
    httpService.get('/api/accounts').then((data) => {
      setCategories(data.data)
    })
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = (data) => {
    httpService
    .post(`/api/jobs/${categoryId}`, { body: data })
    .then(data => setCategoryId(data))
    navagite('/Admin/job')

  }
  return (
    <>
      <div className="phudz">
      <form className="creatJob" onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ color: 'rgb(255, 0, 170)' }}>THÊM NHIỆM VỤ </h1>
        <br></br>
        <label>NHIỆM VỤ</label>
        <br />
        <input
        placeholder="Enter your nhiệm vụ"
          type="text"
          defaultValue={""}
          {...register("name", {
            required: true,
          })}
        />
        {errors.name && <span style={{color: "red"}}> không được để trống</span>}

        <br />
        <label>MÔ TẢ</label>
        <br />
        <input
        placeholder="Enter your nội dung"
          type="text"
          defaultValue={""}
          {...register("detail", {
            required: true,
          })}
        />
        {errors.detail && <span style={{color: "red"}}> không được để trống</span>}
        <br />
        <label>THỜI GIAN</label>
        <br />
        
        <input
        placeholder="Enter your mô tả"
          type="text"
          defaultValue={""}
          {...register("status", {
            required: true,
          })}
        /> <br />
        {errors.status && <span style={{color: "red"}}> không được để trống</span>} 
        <select className="Selecter" onChange={(e) => setCategoryId(e.target.value)}>
          {accounts.map((item) => (
            <option key={item._id} value={item._id}>
              {item.username}
            </option>
          ))}
        </select>
        <br /> <br />
        <button className="creatOK" type="submit" >Creat</button>
          <Link className="comeback" to="/Admin/job">- Come back Jobs -</Link>
      </form>
      </div>
    </>
  );
};
export default CreateJobs;