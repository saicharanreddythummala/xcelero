import React from 'react';
import './user.scss';
import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { host } from '../../utils/api';
import Loading from '../../components/loading/Loading';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function User() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(Number);
  const [fileList, setFileList] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  //remove unwanted files
  const handleDelete = (name, index) => {
    if (fileList[index].name === name) {
      fileList.splice(index, 1);
      setFileList([...fileList]);
    }
  };

  //submit user data
  const handleSubmit = async () => {
    if (username && email && phone) {
      try {
        const form = new FormData();

        form.append('username', username);
        form.append('email', email);
        form.append('phone', phone);

        for (const x in fileList) {
          form.append('image', fileList[x]);
        }
        const { data } = await axios.post(`${host}users/`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (data.success) {
          toast('User created succesfully', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      } catch (err) {
        toast(`${err.response.data.error}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else {
      toast(`Enter all fields`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    getUsers();

    setUsername('');
    setEmail('');
    setPhone(0);
    setFileList([]);
  };

  //get users
  async function getUsers() {
    const { data } = await axios.get(`${host}users/`);

    setUsers(data.users);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {users ? (
        <>
          <div className="user__container">
            <div className="user__card col-md-6">
              <div className="crd">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="username"
                      variant="filled"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="email"
                      variant="filled"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="phone"
                      type={'number'}
                      variant="filled"
                      value={phone}
                      placeholder=""
                      onChange={(e) => setPhone(e.target.value)}
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
                                // onClick={() => handleDelete(item.name)}
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
                  {username && email && phone ? (
                    <Grid item xs={12}>
                      <label htmlFor="upload" id="file__upload">
                        Choose images
                      </label>
                      <input
                        type={'file'}
                        name="multi-file"
                        id="upload"
                        multiple
                        onChange={(e) =>
                          setFileList([...fileList, ...e.target.files])
                        }
                      />
                    </Grid>
                  ) : (
                    <div className="d-flex justify-content-end  w-100 text-center">
                      <span>all fileds are required</span>
                    </div>
                  )}
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
            <div className="users__info col-md-6">
              <table className="table table-striped table-light">
                <thead>
                  <tr>
                    <th scope="col">S.no</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Button
                          variant="contained"
                          onClick={() => navigate(`/images/${user._id}`)}
                        >
                          view
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
