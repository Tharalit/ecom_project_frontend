import React, { useEffect, useState } from "react";
import useEcomStore from "../store/ecom-store";
import { currentUser } from "../APIs/auth";
import LoadingToReDirect from "../routes/LoadingToRedirect";

export default function ProtectRouteUser({ element }) {
  const [ok, setOk] = useState(false);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    if (user && token) {
      currentUser(token)
        .then((res) => setOk(true))
        .catch((err) => setOk(false));
    }
  }, []);

  return ok ? element : <LoadingToReDirect />;
}
