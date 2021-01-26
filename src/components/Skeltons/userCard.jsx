import React from "react";
import ContentLoader from "react-content-loader";

const UserCard = (props) => (
  <ContentLoader viewBox="0 0 500 650" height="100%" width="100%" {...props}>
    <circle cx="70.2" cy="73.2" r="41.3" />
    <rect x="129.9" y="29.5" width="125.5" height="17" />
    <rect x="129.9" y="64.7" width="296" height="17" />
    <rect x="129.9" y="97.8" width="253.5" height="17" />

    <circle cx="70.7" cy="243.5" r="41.3" />
    <rect x="130.4" y="199.9" width="125.5" height="17" />
    <rect x="130.4" y="235" width="296" height="17" />
    <rect x="130.4" y="268.2" width="253.5" height="17" />

    <circle cx="70.7" cy="412.7" r="41.3" />
    <rect x="130.4" y="369" width="125.5" height="17" />
    <rect x="130.4" y="404.2" width="296" height="17" />
    <rect x="130.4" y="437.3" width="253.5" height="17" />

    <circle cx="70.7" cy="581.9" r="41.3" />
    <rect x="130.4" y="538" width="125.5" height="17" />
    <rect x="130.4" y="571" width="296" height="17" />
    <rect x="130.4" y="605" width="253.5" height="17" />
  </ContentLoader>
);

export default UserCard;
