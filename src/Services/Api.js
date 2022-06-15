const SERVER_URL = "https://abra-course-server.herokuapp.com/";

const apiCall = async (
  url,
  payload = undefined,
  method = "GET",
  accessToken = undefined
) => {
  console.log(payload);
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    method: method,
    body: payload ? JSON.stringify(payload) : undefined,
  });

  let data = undefined;
  if ( method !== "DELETE") {
    data = await response.json();
  }

  if (response.status >= 200 && response.status < 300) {
    return data;
  }

  throw new Error(
    JSON.stringify({
      data: data,
      status: response.status,
    })
  );
};
export const registerUser = async (
  username,
  password,
  email,
  firstName,
  lastName
) => {
  const payload = {
    username: username,
    password: password,
    password2: password,
    email: email,
    first_name: firstName,
    last_name: lastName,
  };

  const data = await apiCall(SERVER_URL + "register/", payload, "POST");

  return data;
};

export const loginUser = async (username, password) => {
  const payload = {
    username,
    password,
  };

  const data = await apiCall(SERVER_URL + "api/token/", payload, "POST");

  return data.access;
};

export const GetItems = async (accessToken) => {
  const data = await apiCall(
    SERVER_URL + "items/",
    undefined,
    "GET",
    accessToken
  );

  return data;
};

export const createItem = async (accessToken, name) => {
    const payload = {
        name
    };
    const data = await apiCall(
        SERVER_URL + "items/",
        payload,
        "POST",
        accessToken);

    return data;
}

export const DeleteItem = async ( accessToken, id) => {
    await apiCall(
        SERVER_URL + "items/" + id + "/",
        undefined,
        "DELETE",
        accessToken);
}

export const renameItem = async (accessToken, id, newName) => {
    const payload = {
        name: newName
    };
    const data = await apiCall(
        SERVER_URL + "items/" +id + "/",
        payload,
        "PATCH",
        accessToken);

    return data;
}
