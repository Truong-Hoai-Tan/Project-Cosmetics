import React, { useEffect, useState } from "react";
import storageService from "../Call API/ser/storage";
const Demo23 = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
   setKey("123")
   setValue(storageService.get("abc"))
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // storageService.setObject(key, {
    //   key: "demoabc",
    //   value: "abc",
    //   name: "123",
    //   items: [1, 2, 3, 4, 5],
    // });
    storageService.set(key,value)
  };

  const handleDeleteOnSubmit = () => {
    storageService.remove(key);
  };

  return (
    <>
      <form onSubmit={handleOnSubmit} >
        <input

          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">sumbmit</button>
      </form>
      <button type="botton" onClick={()=> handleDeleteOnSubmit()} >
        delete
      </button>
    </>
  );
};

export default Demo23;
