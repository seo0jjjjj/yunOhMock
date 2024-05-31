import axios from 'axios';

const sendRequest = async (method, url, data, { onSuccess, onFailure }, withCredentials = false) => {
  try {
    const res = await axios({
      method,
      url: `${process.env.REACT_APP_SERVER_URL}${url}`,
      data,
      withCredentials
    });
    onSuccess?.(res);
  } catch (e) {
    console.log(e);
    onFailure?.(e);
  }
};

export const login = async (data, handlers) => {
  await sendRequest('post', 'api/auth/login', data, handlers, true);
};

export const register = async (data, handlers) => {
  await sendRequest('post', 'api/auth/register', data, handlers);
};

export const logout = async (handlers) => {
  await sendRequest('get', 'api/auth/logout', null, handlers, true);
};

export const getSession = async (handlers) => {
  await sendRequest('get', 'api/auth/session', null, handlers, true);
}

export const googleAuth = async (data, handlers) => {
  await sendRequest('post', 'api/auth/login-via-google', data, handlers);
}