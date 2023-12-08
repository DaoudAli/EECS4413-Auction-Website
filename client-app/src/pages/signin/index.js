import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/context/AuthContext'; // Adjust the import path as needed
import TextField from '@mui/material/TextField';
import withAuthRedirect from '@/hoc/withAuthRedirect';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

function SignInPage() {
  const { login } = useAuth();
  const Router = useRouter();
  const initialValues = {
    userName: '',
    passWord: '',
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    passWord: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    console.log('onSubmit values ', values);
    try {
      await login(values);
      setSubmitting(false);
      // Handle successful login, e.g., redirect or show a success message
    } catch (error) {
      setSubmitting(false);
      // Handle login error, e.g., show an error message
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-start px-6 py-32 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md lg:w-1/3">
        <h1 className="mt-6 text-center text-5xl font-bold leading-9 text-white">
          Sign In
        </h1>
        <p className="mt-2 text-center text-lg text-gray-300">
          Welcome back, please sign in.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur, values, touched, errors }) => (
            <Form className="mt-8 space-y-6">
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
              <button type="submit" className="w-full btn btn-primary">
                Sign In
              </button>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-1 sm:space-x-4 items-center justify-center my-10">
                <h3 className="text-gray-200">Don&apos;t have an account?</h3>
                <Link
                  href="/signup"
                  className="btn btn-accent btn-outline btn-sm "
                >
                  Sign Up
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default withAuthRedirect(SignInPage);
