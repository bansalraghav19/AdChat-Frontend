const options = () => {
  const Authorization = localStorage.getItem('id_token');
  return Authorization ? {
    headers: {
      Authorization
    }
  } : {
    headers: {}
  };
};
export default options;
