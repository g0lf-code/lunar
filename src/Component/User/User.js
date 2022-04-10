import { TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function User(props) {
  const { id } = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const data = await axios({
        method: 'get',
        url: `http://localhost:4000/user/${id}`,
      });
      setUser(data?.data?.payload);
    }
    getUser();
  });

  return (
    <div class="userBox">
      <h1>User Details</h1>
      {/* {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>} */}
      <div className="userFields">
        <h3>Username :</h3>
        <TextField
          class="userBoxInput"
          name="username"
          disabled
          floatingLabelText="user name"
          value={user?.name}
        />
      </div>
      <div className="userFields">
        <h3>Email :</h3>
        <TextField
          disabled
          value={user?.email}
          class="userBoxInput"
          name="email"
          floatingLabelText="email"
        />
      </div>

      <div className="userFields">
        <h3>Address :</h3>
        <TextField class="userBoxInput" disabled value={user?.address} />
      </div>

      <div className="userFields">
        <h3>Bio :</h3>
        <TextField
          disabled
          value={user?.bio}
          class="userBoxInput"
          name="pwconfirm"
          floatingLabelText="confirm password"
        />
      </div>
      <br />
    </div>
  );
}
