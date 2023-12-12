import { GET_ALL_SIGHTS, GetAllSights } from "@src/store/route/routeTypes";

export const getAllSights = () => (dispatch: any) => {
  const result: GetAllSights = {
    type: GET_ALL_SIGHTS,
    payload: [],
  };
  fetch("http://localhost:8080/sights", { method: "GET" })
    .then((res) => res.json())
    .then((_result) => {
      console.log(_result);
      result.payload = _result;
    })
    .catch((e) => console.log(e));

  return dispatch(result);
};
