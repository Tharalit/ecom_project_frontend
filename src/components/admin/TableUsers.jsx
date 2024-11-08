import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { changeUserRole, changeUserStatus, getListAllUser } from "../../APIs/admin";

function TableUsers() {
  const token = useEcomStore((state) => state.token);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUser(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangUserStatus = (userId, userStatus) => {
    // console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
      })
      .catch((err) => {
        console.log(err);
      });

    // let enabled = enabledi.toLocaleLowerCase() === "true";
    // changeUserStatus(token, { id, enabled })
    //   .then((res) => {
    //     console.log(res);
    //     handleGetUsers(token);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const handleChangeUserRole = (userId, role) => {
    console.log(userId, role);
    const value = {
      id: userId,
      role: role,
    };
    changeUserRole(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <table className="w-full table-fixed ">
        <thead>
          <tr>
            <th>UserId</th>
            <th>Email</th>
            {/* <th>Last modified date</th> */}
            <th>Permission</th>
            <th>Status</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.email}</td>
              {/* <td>วันที่</td> */}

              <td>
                <select
                  value={item.role}
                  onChange={(e) => handleChangeUserRole(item.id, e.target.value)}
                >
                  <option>admin</option>
                  <option>user</option>
                </select>
              </td>

              <td>
                {item.enabled ? (
                  <p className="bg-green-200 px-2 py-1 rounded-full text-center">Active</p>
                ) : (
                  <p className="bg-red-200 px-2 py-1 rounded-full text-center">Inactive</p>
                )}
              </td>
              <td className="text-center">
                <button
                  className="bg-yellow-500 text-white p-1 rounded-md"
                  onClick={() => handleChangUserStatus(item.id, item.enabled)}
                >
                  {item.enabled ? "Disable" : "Enable"}
                </button>
                {/* <select
                  value={item.enabled}
                  onChange={(e) => handleChangUserStatus(token, item.id, e.target.value)}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableUsers;
