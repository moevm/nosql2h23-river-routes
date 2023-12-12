import { GET_ALL_SIGHTS, GetAllSights } from "@src/store/route/routeTypes";

export const getAllSights = () => {
    return async (dispatch: any) => {
        console.log("hello!");
        const result: GetAllSights = {
            type: GET_ALL_SIGHTS,
            payload: [],
        };
        const response = await fetch("http://localhost:8081/sights")
            .then((res) => res.json())
            .then((_result) => {
                console.log(_result);
                result.payload = _result;
            })
            .catch((e) => console.log(e));

        return dispatch(result);
    };
};
