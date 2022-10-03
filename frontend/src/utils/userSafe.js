import axios from "axios";

const API_URL_SAFES = "http://localhost:8080/safes";

const postSafe = async (userData, file) => {
  const formData = new FormData();
  formData.append("safe", file);
  const response = await axios.post(API_URL_SAFES, formData, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const safesService = {
  postSafe,
};

export default safesService;

// var formData = new FormData();
// var imagefile = document.querySelector('#file');
// formData.append("image", imagefile.files[0]);
// axios.post('upload_file', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
// })
