import Axios from 'axios';

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

export const userServiceApi = Axios.create({
  baseURL: isProduction
    ? process.env.NEXT_PUBLIC_USER_API_URL
    : 'http://localhost:3100/users',
});
export const auctionServiceApi = Axios.create({
  baseURL: isProduction
    ? process.env.NEXT_PUBLIC_AUCTION_API_URL
    : 'http://localhost:3200/auctions',
});
export const catalogueServiceApi = Axios.create({
  baseURL: isProduction
    ? process.env.NEXT_PUBLIC_CATALOGUE_API_URL
    : 'http://localhost:3300/catalogue',
});
export const paymentServiceApi = Axios.create({
  baseURL: isProduction
    ? process.env.NEXT_PUBLIC_PAYMENT_API_URL
    : 'http://localhost:3400/payment',
});

let authInterceptorID;
export const authenticateUserAPI = (token) => {
  authInterceptorID = userServiceApi.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  });
};

export const unauthenticateUserAPI = () => {
  userServiceApi.interceptors.request.eject(authInterceptorID);
};
