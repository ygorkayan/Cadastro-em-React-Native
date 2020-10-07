import React, { createContext, useReducer } from "react";
import user from "../data/user";

const initialState = user;
export const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    const fn = metodos[action.type];
    return fn ? fn(state, action) : state;
  }, initialState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
}

const metodos = {
  createUser(state, action) {
    const user = action.payload;
    user.id = Math.random();
    return [...state, user];
  },
  updateUser(state, action) {
    return state.map((user) => {
      if (user.id === action.payload.id) {
        return action.payload;
      } else {
        return user;
      }
    });
  },
  deleteUser(state, action) {
    return state.filter((user) => user.id != action.payload.id);
  },
};
