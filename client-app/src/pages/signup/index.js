import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/context/AuthContext';
import WithAuthRedirect from '@/hoc/withAuthRedirect';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
const textFieldStyle = {
  '& label.Mui-focused': {
    color: 'white',
  },
  '& label': {
    color: 'white',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
};
function SignupPage() {
  const { register } = useAuth();

  const initialValues = {
    firstName: '',
    lastName: '',
    userName: '', // Assuming you have a username field
    passWord: '',
    street: '',
    streetNumber: '',
    postalCode: '',
    city: '',
    province: '',
    country: '',
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    userName: Yup.string().required('User Name is required'),
    passWord: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    street: Yup.string().required('Street Address is required'),
    streetNumber: Yup.string().required('Street Number is required'),
    postalCode: Yup.string().required('Postal Code is required'),
    city: Yup.string().required('City is required'),
    province: Yup.string().required('Province is required'),
    country: Yup.string().required('Country is required'),
  });
  const onSubmit = async (values) => {
    console.log(values);
    try {
      console.log(values);
      await register(values);
      // Handle successful registration (e.g., redirect or show message)
    } catch (error) {
      // Handle registration errors
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-8 g:px-8">
      <div className="w-full max-w-4xl rounded-lg shadow-md p-6 md:p-8">
        <h1 className="mb-2 text-center text-5xl font-bold leading-9 text-white">
          Sign Up
        </h1>
        <p className="mt-2 text-center font-light text-md text-gray-100">
          Welcome to AuctionZone, please sign up below to start buying and
          selling.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur, values, touched, errors }) => (
            <Form className="mt-8 space-y-6">
              <div className="md:flex">
                {/* First Name Field */}
                <div className="w-full md:w-1/2 px-3 mb-6">
                  {/* <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="first-name"
              >
                First Name
              </label> */}
                  <TextField
                    id="firstName"
                    name="firstName"
                    required
                    fullWidth
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    sx={textFieldStyle}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <TextField
                    id="lastName"
                    name="lastName"
                    required
                    fullWidth
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={textFieldStyle}
                  />
                </div>
              </div>
              <div className="md:flex">
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <TextField
                    id="userName"
                    name="userName"
                    required
                    fullWidth
                    label="User Name"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.userName && Boolean(errors.userName)}
                    helperText={touched.userName && errors.userName}
                    sx={textFieldStyle}
                  />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6">
                  <TextField
                    id="passWord"
                    name="passWord"
                    type="password"
                    required
                    fullWidth
                    label="Password"
                    value={values.passWord}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.passWord && Boolean(errors.passWord)}
                    helperText={touched.passWord && errors.passWord}
                    sx={textFieldStyle}
                  />
                </div>
              </div>
              <div className="w-full px-3 mb-6">
                <TextField
                  id="street"
                  name="street"
                  required
                  fullWidth
                  label="Street"
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.street && Boolean(errors.street)}
                  helperText={touched.street && errors.street}
                  sx={textFieldStyle}
                />
              </div>
              <div className="md:flex">
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <TextField
                    id="streetNumber"
                    name="streetNumber"
                    required
                    fullWidth
                    label="Street Number"
                    value={values.streetNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.streetNumber && Boolean(errors.streetNumber)}
                    helperText={touched.streetNumber && errors.streetNumber}
                    sx={textFieldStyle}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <TextField
                    id="postalCode"
                    name="postalCode"
                    required
                    fullWidth
                    label="Postal Code"
                    value={values.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.postalCode && Boolean(errors.postalCode)}
                    helperText={touched.postalCode && errors.postalCode}
                    sx={textFieldStyle}
                  />
                </div>
              </div>
              <div className="md:flex">
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <TextField
                    id="city"
                    name="city"
                    required
                    fullWidth
                    label="City"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                    sx={textFieldStyle}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <TextField
                    id="province"
                    name="province"
                    required
                    fullWidth
                    label="Province"
                    value={values.province}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.province && Boolean(errors.province)}
                    helperText={touched.province && errors.province}
                    sx={textFieldStyle}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <TextField
                  id="country"
                  name="country"
                  required
                  fullWidth
                  label="Country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.country && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                  sx={textFieldStyle}
                />
              </div>

              <div className="flex w-full px-3 mt-6 justify-center">
                <button type="submit" className="btn btn-primary w-3/4">
                  Submit
                </button>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-1 sm:space-x-4 items-center justify-center my-10">
                <h3 className="text-gray-200">Already have an account?</h3>
                <Link
                  href="/signin"
                  className="btn btn-accent btn-outline btn-md"
                >
                  Sign In
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default WithAuthRedirect(SignupPage);
