import React from 'react';
import UserModal from '../modal/UserModal';
import { Avatar } from '@mui/material';

export default function UserInfo({ user }) {
  return (
    <div className="user__avatar w-100 d-flex justify-content-end col-2">
      <Avatar className="mt-3 me-3">
        <UserModal user={user} />
      </Avatar>
    </div>
  );
}
