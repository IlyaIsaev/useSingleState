import { useState, useRef } from "react";

const isFunction = (value) => typeof value === "function";

export const useSingleState = (initialState) => {
  const [state, setState] = useState(initialState);

  const keys = Object.keys(initialState);

  const actions = useRef(
    keys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: (value) =>
          setState((prevState) => ({
            ...prevState,
            [key]: isFunction(value) ? value(prevState[key]) : value,
          })),
      }),
      {}
    )
  );

  return keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        get: (getter) =>
          isFunction(getter) ? getter(state[key]) : state[key],
        set: actions.current[key],
      },
    }),
    {}
  );
};

