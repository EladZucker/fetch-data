/* 
Tasks :
1. Create Register section
   For register show inputs for email/username/password/firstname/lastname. 
   on click return success or error.

2. Login secition :
   Allow typing in username and password and login with these credintials.
   Save username to local storage and show "Hello {username} for then given logged in user."

3. Create item section :
    Create an input to provide name for the new item.

4. Support Delete. (https://abra-course-server.herokuapp.com/items/<id>/ with DELETE method)

5. Support rename (https://abra-course-server.herokuapp.com/items/<id>/ with PATCH method and
   { name : <name>})

6. Logout. should erase local storage.

7. BONUS : learn about AXIOS, try to change fetch to axios.

*/

import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const Items = (props) => {
  const [userData, setUserData] = useState(() =>
    JSON.parse(localStorage.getItem("UserData"))
  );

  useEffect(() => {
    if (userData !== undefined) {
      console.log(userData);
      localStorage.setItem("UserData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("UserData");
    }
  }, [userData]);

  return (
    <div>
      <nav>
        <Link to="/items/register">Register</Link> |{" "}
        <Link to="/items/login">Login</Link> |{" "}
        <Link to="/items/items">Items</Link>
      </nav>

      {userData && <p>Welcome {userData.userName} !</p>}
      <Outlet context={[userData, setUserData]} />
    </div>
  );
};

export default Items;
