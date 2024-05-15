import React from "react";
import { Zoom } from "react-slideshow-image";
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
  height: "150px",
};
const fadeImages = [
  {
    url: "https://tronhouse.com/assets/data/editor/source/bi-quyet-chup-hinh-my-pham-gay-an-tuong-voi-nguoi-xem/chup-hinh-my-pham-8.jpg",
    caption: "First Slide",
  },
  {
    url: "https://ressmedia.com/wp-content/uploads/2021/07/ANH-1-25.jpg",
    caption: "Second Slide",
  },
  {
    url: "https://ressmedia.com/wp-content/uploads/2021/07/ANH-2-22.jpg",
    caption: "Third Slide",
  },
];

const ZoomSlideshow = () => {
  return (
    <div className="slide-container">
      <Zoom scale={0.4}>
        {fadeImages.map((each, index) => (
          <img
            key={index}
            style={{ width: "100%", }}
            src={each.url}
          />
        ))}
      </Zoom>
    </div>
  );
};

export default ZoomSlideshow;
