import httpInstance from "../httpInstance";

export const getDetails = async (movieId: number) =>{ //Cehcar si debo de usar Int o Srting
    let res : any;
    const endpoint = `${movieId}?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`
    await httpInstance
     .get(endpoint)
     .then((response) => {
          res = response;
      });
    return res;
}