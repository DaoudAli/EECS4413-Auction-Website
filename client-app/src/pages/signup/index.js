import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/context/AuthContext'; // Import the AuthContext

export default function SignupPage() {
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      className="flex flex-wrap -mx-3"
      onSubmit={onSubmit}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Sign Up
          </h2>

          <Form id="sign-up-form" className="flex flex-wrap -mx-3">
            {/* First Name Field */}
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="first-name"
              >
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                placeholder="Jane"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="user-name"
              >
                User Name
              </label>
              <Field
                name="userName"
                type="text"
                placeholder="janedoe"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="userName"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <Field
                name="lastName"
                type="text"
                placeholder="Doe"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="passWord"
              >
                Password
              </label>
              <Field
                name="passWord"
                type="password"
                placeholder="********"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="passWord"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="street"
              >
                Street Address
              </label>
              <Field
                name="street"
                type="text"
                placeholder="123 Main St"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="street"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="streetNumber"
              >
                Street Number
              </label>
              <Field
                name="streetNumber"
                type="text"
                placeholder="123"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="streetNumber"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="postalCode"
              >
                Postal Code
              </label>
              <Field
                name="postalCode"
                type="text"
                placeholder="10001"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="postalCode"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <Field
                name="city"
                type="text"
                placeholder="New York"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="province"
              >
                City
              </label>
              <Field
                name="province"
                type="text"
                placeholder="ON"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="province"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="country"
              >
                Country
              </label>
              <Field
                name="country"
                type="text"
                placeholder="USA"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="w-full px-3 mt-6">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
}
