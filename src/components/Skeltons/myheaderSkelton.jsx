import React from "react";
import ContentLoader from "react-content-loader";

const MyHeader = (props) => (
  <ContentLoader
    height={49}
    width="100%"
    viewBox="0 0 430 54"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="30" cy="27" r="25" />
    <rect x="65" y="5" rx="3" ry="3" width="310" height="13" />
    <rect x="65" y="24" rx="3" ry="3" width="300" height="10" />
    <rect x="65" y="40" rx="3" ry="3" width="290" height="10" />
    <circle cx="400" cy="27" r="13" />
  </ContentLoader>
);

export default MyHeader;
