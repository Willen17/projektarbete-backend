import { useEffect, useState } from "react";

export function useLocalStorageState<S>(defaultState: S, key: string) {
  const preparedState = localStorage[key]
    ? (JSON.parse(localStorage[key]) as S)
    : defaultState;
  const [state, setState] = useState(preparedState);

  // saves the state to LS
  useEffect(() => {
    localStorage[key] = JSON.stringify(state);
  }, [state, key]);

  return [state, setState] as const;
}
