import { React, useState } from 'react';
import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import MainStage from './MainStage';

function HomeSeats() {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    rows: Yup.number().min(5, 'Min 5').required('Rows is required'),
    seats: Yup.number().min(10, 'Min 10').required('Seats is required'),
  });

  const initialValues = { name: '', rows: 0, seats: 0 };

  const [data, setData] = useState({});
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const initialData = {
            seats: {
              sections: [
                {
                  event_id: 1,
                  name: 'Scheme',
                  color: null,
                  subsections: [
                    {
                      id: 1,
                      section_id: 1,
                      name: 'Hall',
                      seats_by_rows: {},
                    },
                  ],
                },
              ],
            },
          };

          initialData.seats.sections[0].name = values.name;

          for (let i = 1; i <= values.rows; i++) {
            initialData.seats.sections[0].subsections[0].seats_by_rows[i] = [];

            for (let j = 1; j <= values.seats; j++) {
              initialData.seats.sections[0].subsections[0].seats_by_rows[
                i
              ].push({ name: `#${i}-${j}`, status: 'free' });
            }
          }

          setData(initialData);
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit} style={{ margin: 20 }}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.touched.name && Boolean(formikProps.errors.name)
              }
              helperText={formikProps.touched.name && formikProps.errors.name}
              value={formikProps.values.name}
            />
            <TextField
              name="rows"
              label="Rows"
              variant="outlined"
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.touched.rows && Boolean(formikProps.errors.rows)
              }
              helperText={formikProps.touched.rows && formikProps.errors.rows}
              value={formikProps.values.rows}
            />
            <TextField
              name="seats"
              label="Seats"
              variant="outlined"
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.touched.seats && Boolean(formikProps.errors.seats)
              }
              helperText={formikProps.touched.seats && formikProps.errors.seats}
              value={formikProps.values.seats}
            />
            <Button variant="contained" type="submit">
              Generate Scheme
            </Button>
          </form>
        )}
      </Formik>
      {Object.keys(data).length > 0 && <MainStage data={data} />}
    </>
  );
}

export default HomeSeats;
