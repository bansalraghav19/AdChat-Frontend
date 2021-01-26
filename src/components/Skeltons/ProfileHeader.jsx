import React from "react";
import ContentLoader from "react-content-loader";

const ProfileHeader = (props) => {
  return (
    <ContentLoader viewBox="0 0 100% 100%" height={56} width="100%" {...props}>
      <rect x="90" y="4" rx="5" ry="5" width="321" height="15" />
      <rect x="129" y="39" rx="5" ry="5" width="220" height="12" />
      <rect x="20" y="5" rx="0" ry="0" width="50" height="45" />
      <rect x="13" y="54" rx="0" ry="0" width="0" height="0" />
      <rect x="13" y="50" rx="0" ry="0" width="0" height="0" />
    </ContentLoader>
  );
};

export default ProfileHeader;
