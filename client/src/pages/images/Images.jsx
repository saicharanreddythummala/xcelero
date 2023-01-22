import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './images.scss';
import { host } from '../../utils/api';
import Loading from '../../components/loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import UserInfo from '../../components/userInfo/UserInfo';

export default function Images() {
  const [images, setImages] = useState([]);
  const [user, setUser] = useState();

  const { id } = useParams();

  async function getImages() {
    const { data } = await axios.get(`${host}users/${id}`);
    setUser(data.user);
    setImages(data.user.images);
  }

  const handleDelete = async (name) => {
    const { data } = await axios.delete(`${host}users/${id}?name=${name}`);

    if (data.success) {
      toast('Image deleted succesfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      toast('failed', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    getImages();
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      {images ? (
        <div className="grid__container">
          <div className="w-100 d-flex justify-content-end">
            <UserInfo user={user} />
          </div>
          <div className="img__grid">
            {images.map((img, i) => (
              <div className="img__card" key={i}>
                <div className="pic">
                  <img src={`http://localhost:4000/images/${img}`} alt="" />
                </div>
                <Button variant="contained" onClick={() => handleDelete(img)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}
