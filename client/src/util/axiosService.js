import axios from 'axios';

export const login = async (data,{onSuccess, onFailure}) => {
    try {
        const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/auth/login", 
        data
        ,{withCredentials:true});
        onSuccess(res);
    } catch (e) {
      console.log(e);
        onFailure(e);
    }
}

export const register = async (data,{onSuccess, onFailure}) => {
  try {
      const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/auth/register", 
      data
    );
      onSuccess(res);
  } catch (e) {
    console.log(e);
      onFailure(e);
  }
}


export const logout = async ({onSuccess, onFailure}) => {
  try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL+"/auth/logout",{
        withCredentials:true
      } 
    );
      onSuccess(res);
  } catch (e) {
    console.log(e);
      onFailure(e);
  }
}