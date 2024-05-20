import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import httpService from "../../service/http.service";
// function useQuery() {
//   const { search } = useLocation();
//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

const CreateBig = (props) => {
  const [cateBig, setCateBig] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = (data) => {
    httpService
      .post("api/categoryBig", { body: data })
      .then((data) => setCateBig(data));
    navigate("/Admin/CategoryBig");
  };

  return (
    <>
      <div className="create-account">
        <form className="creat__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="creat__form_item">
            <h1>THÊM DANH MỤC LỚN</h1>
          </div>
          <div className="creat__form_item">
            <label>TÊN DANH MỤC</label>
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
            <label>ĐƯỜNG DẪN</label>
          </div>
          <div className="creat__form_item">
            <input
              placeholder="Enter your password"
              type="text"
              defaultValue={props.data?.link}
              {...register("link", {
                required: true,
              })}
            />
            {errors.link && <span>Link</span>}
          </div>
          <div className="creat__form_item">
            <button className="creatOK" type="submit">
              THÊM
            </button>
            <Link className="comeback" to="/Admin/accounts">
              - Come back Category Big -
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBig;
