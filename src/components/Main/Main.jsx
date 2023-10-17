import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../../redux/auth/authOperations";

import { useRouter } from "../../router/router";

export default function Main() {
  const stateChange = useSelector((state) => state.auth.stateChange);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRouter(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
