import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "500px",
};
const fadeImages = [
  {
    url: "https://treobangron.com.vn/wp-content/uploads/2022/09/banner-my-pham-35.jpg" ,
    caption: "First Slide",
  },
  {
    url: "https://ktpdesign.vn/wp-content/uploads/2020/09/5404a970584061.5d04b74a08a02.jpg",
    caption: "Second Slide",
  },
  {
    url: "https://intphcm.com/data/upload/banner-my-pham-uu-dai.jpg",
    caption: "Third Slide",
  },
];

const FadeSlideshow = () => {
  return (
    <div className="slide-container">
      <Fade duration={2000}>
        {fadeImages.map((fadeImage, index) => (
          <div key={index} style={{ ...divStyle }}>
            <img style={{ width: "100%" }} src={fadeImage.url} />
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default FadeSlideshow;
