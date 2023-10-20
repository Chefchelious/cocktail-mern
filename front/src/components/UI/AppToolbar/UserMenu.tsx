import React, { useState } from 'react';
import { Avatar, Button, Grid, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../../app/hook';
import { IUser } from '../../../types';
import { logout } from '../../../features/users/usersThunk.ts';
import { Link } from 'react-router-dom';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(logout());

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.displayName}
        <Avatar
          sx={{ ml: 1 }}
          alt={user.displayName}
          src={user.avatar ? user.avatar : '/static/images/avatar/1.jpg'}
        />
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>Profile</MenuItem>
        <MenuItem component={Link} to="/add_cocktail" onClick={handleClose}>
          add cocktail
        </MenuItem>
        <MenuItem component={Link} to="/cocktails/my_cocktails" onClick={handleClose}>
          my cocktails
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;
