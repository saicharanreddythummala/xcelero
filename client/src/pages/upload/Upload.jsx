import React from 'react';
import { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import axios from 'axios';
import { host } from '../../utils/api';
import {useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import UserInfo from '../../components/userInfo/UserInfo';
import './upload.scss'

export default function Upload() {
  const [user, setUser] = useState();
  const [fileList, setFileList] = useState([]);

  const { id } = useParams();

  const handleDelete = (name, index) => {
    if (fileList[index].name === name) {
      fileList.splice(index, 1);
      setFileList([...fileList]);
    }
  };

  const handleSubmit = async () => {
    const form = new FormData();

    form.append('username', user.username);

    for (const x in fileList) {
      form.append('image', fileList[x]);
    }

    const { data } = await axios.post(`${host}users/${user._id}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (data.success) {
      toast('Image uploaded succesfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }else {
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

    setFileList([]);
  };

  async function getUser() {
    const { data } = await axios.get(`${host}users/${id}`);
    setUser(data.user);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user ? (
        <>
          <UserInfo user={user} />
          <div className="user__container" id='upload'>
            <div className="user__card col">
              <div className="crd">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="username"
                      variant="filled"
                      value={user.username}
                      disabled
                    />
                  </Grid>
                  {fileList.length > 0 ? (
                    <>
                      <Grid item xs={12}>
                        <div className="imgs__container">
                          {fileList.map((item, i) => (
                            <div className="img__card" key={i}>
                              <img
                                width={150}
                                height={200}
                                src={item ? URL.createObjectURL(item) : null}
                                alt=""
                              />
                              <div className="abs">
                                <RemoveCircleIcon
                                  onClick={() => handleDelete(item.name, i)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </Grid>
                    </>
                  ) : null}
                  <Grid item xs={12}>
                    <label htmlFor="upload_n" id="file__upload_n">
                      Choose images
                    </label>
                    <input
                      type={'file'}
                      name="multi-file"
                      id="upload_n"
                      multiple
                      onChange={(e) =>
                        setFileList([...fileList, ...e.target.files])
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </>
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
