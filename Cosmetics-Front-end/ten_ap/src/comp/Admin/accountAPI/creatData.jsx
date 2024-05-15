import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./accountcre.css"
import { useLocation } from "react-router";
import httpService from "../../service/http.service";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
// function useQuery() {
//   const { search } = useLocation();
//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

const CreateData = (props) => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" }); 

  const onSubmit = (data) => {
    props.onSubmit(data);
    navigate('/Admin/accounts')
  };

  return (
    <>
      <div className="phudz">
        <form className="creat__form" onSubmit={handleSubmit(onSubmit)}>
          <h1>THÊM TÀI KHOẢN</h1>
          <label>TÊN TÀI KHOẢN:</label>
          <br />
          <input
            placeholder="Enter your username"
            type="text"
            defaultValue={props.data?.username}
            {...register("username", {
              required: true,
            })}
          />
          {errors.username && <span>Username không được để trống</span>}

          <br />
          <label>MẬT KHẨU:</label>
          <br />
          <input
            placeholder="Enter your password"
            type="password"
            defaultValue={props.data?.password}
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && <span>Password không được để trống</span>}

          <br />
          <label>HỌ VÀ TÊN:</label>
          <br />
          <input
            placeholder="Enter your fullname" 
            type="text"
            defaultValue={props.data?.fullname}
            {...register("fullname", {
              required: true,
            })}
          />
          {errors.fullname && <span>Fullname không được để trống</span>}

          <br />
          <label>NGÀY SINH:</label>
          <br />
          <input
            placeholder="Enter your dob"
            type="text"
            defaultValue={props.data?.dob}
            {...register("dob", {
              required: true,
            })}
          />
          {errors.password && <span>Dob không được để trống</span>}

          <br />
          <label>SỐ ĐIỆN THOẠI:</label>
          <br />
          <input
            placeholder="Enter your phone"
            type="text"
            defaultValue={props.data?.phone}
            {...register("phone", {
              required: true,
            })}
          />
          {errors.password && <span style={{color: 'red'}}>Phone không được để trống</span>}

          <br />
          <br />
          <button className="creatOK" type="submit">
            Creat
          </button>
          <Link className="comeback" to="/Admin/accounts">- Come back Accounts -</Link>
        </form>
      </div>
    </>
  );
};

export default CreateData;
