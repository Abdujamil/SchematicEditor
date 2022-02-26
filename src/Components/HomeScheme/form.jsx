import React from 'react';
import TextField from '@mui/material/TextField';

import { Button, Link } from '@mui/material';

const Style = {
  alignItems: 'center',
  textAlign: 'center',
  marginTop: '30px',
};

const btnStyle = {
  margin: '50px 0px 50px 0xp',
};

const createScheme = () => {};

function Form() {
  return (
    <>
      <div style={Style}>
        <TextField label="Write rows" id="outlined-size-small" size="small" />
      </div>
      <div style={Style}>
        <TextField
          label="Write number of seats"
          id="outlined-size-small"
          size="small"
        />
      </div>
      <div style={Style}>
        <Link to="/scheme">
          <Button variant="outlined">Create Scheme</Button>
        </Link>
      </div>
    </>
  );
}

export default Form;
