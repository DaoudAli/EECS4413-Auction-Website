import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/context/AuthContext'; // Adjust the import path as needed

export default function SignInPage() {
  const { login } = useAuth();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values.username, values.password);
      setSubmitting(false);
      // Handle successful login, e.g., redirect or show a success message
    } catch (error) {
      setSubmitting(false);
      // Handle login error, e.g., show an error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Auction App</h1>
          <p className="mt-2 text-lg text-gray-900">
            Welcome back, please sign in.
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-gray-200 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 bg-gray-200 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="********"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign In
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
