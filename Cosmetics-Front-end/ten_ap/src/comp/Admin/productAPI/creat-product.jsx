import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import httpService from "../../service/http.service";
import './creat-product.css'
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    httpService.get('/api/categories').then((data) => {
      setCategories(data.data)
    })
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = (data) => {
    httpService.post(`/api/products/${categoryId}`, { body: data }).then(data => console.log(data)
  )
  navigate('/Admin/product')
  }
  return (
    <>
      <div className="phudz">
      <form className="creatProducts" onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ color: 'rgb(255, 0, 170)' }}>THÊM SẢN PHẨM</h1>
        <label>TÊN SẢN PHẨM</label>
        <br />
        <input
        placeholder="Enter your name"
          type="text"
          defaultValue={""}
          {...register("name", {
            required: true,
          })}
        />
          {errors.name && <span style={{color: "red",fontSize: "12px"}}> không được để trống</span>} 
        <br />
        <label>HÌNH ẢNH:</label>
        <br />
        <input
        placeholder="Enter your img"
          type="text"
          defaultValue={""}
          {...register("img", {
            required: true,
          })}
        />
        {errors.img && <span style={{color: "red",fontSize: "12px"}}> không được để trống</span>} 
        <br />
        <label>GIỚI THIỆU:</label>
        <br />
        <input
        placeholder="Enter your img"
          type="text"
          defaultValue={""}
          {...register("status", {
            required: true,
          })}
        />
        {errors.status && <span style={{color: "red",fontSize: "12px"}}> không được để trống</span>} 
        <br />
        <label>GIÁ TIỀN:</label>
        <br />
        <input
        placeholder="Enter your price"
          type="text"
          defaultValue={""}
          {...register("price", {
            required: true,
          })}
        />
        {errors.price && <span style={{color: "red",fontSize: "12px"}}> không được để trống</span>} 
        <br />
        <label>MÔ TẢ SẢN PHẨM</label>
        <br />
        <input
        placeholder="Enter your description"
          type="text"
          defaultValue={""}
          {...register("description", {
            required: true,
          })}
        />
        {errors.description && <span style={{color: "red"}}> không được để trống</span>} 
        <br />
        <select className="Selecter" onChange={(e) => setCategoryId(e.target.value)}>
          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        <br /> <br />
        <button className="creatOK" type="submit" >Creat</button>
        <Link className="comeback" to="/Admin/product">- Come back Products -</Link>
      </form>
      </div>
    </>
  );
};
export default CreateProduct;
