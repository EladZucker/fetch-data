import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { loginUser } from "../../Services/Api";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [userData, setUserData] = useOutletContext();

  const logOut = () => {
    setUserData(undefined);
  };
  const loginClicked = async (data) => {
    try {
      const accessToken = await loginUser(data.username, data.password);

      const userData = {
        accessToken: accessToken,
        userName: data.username,
      };

      setUserData(userData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {!userData ? (
        <>
          <form>
            <label className="labels">Username :</label>
            <input
              {...register("username", { required: "username is required." })}
              type="text"
            ></input>
            {errors.username && <p>{errors.username.message}</p>}
            <br></br>
            <label className="labels">Password :</label>
            <input
              {...register("password", {
                required: "password is required.",
                minLength: {
                  value: 2,
                  message: "password must be more then 2 characters",
                },
              })}
              type="password"
            ></input>
            {errors.password && <p>{errors.password.message}</p>}

            <br></br>
            <button disabled={!isValid} onClick={handleSubmit(loginClicked)}>
              Login
            </button>
          </form>
        </>
      ) : (
        <p>
          You are already Loggin. first{" "}
          <a href="#" onClick={logOut}>
            Logout
          </a>
          .
        </p>
      )}
    </>
  );
};

export default Login;
