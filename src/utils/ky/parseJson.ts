import { KyResponse } from "ky";

// si el servidor responde vacio (no un json), entonces devuelve un objeto vacio, sino devuelve el json parseado
export const parseJSON = async (response: KyResponse) => {
  return response.text().then(function (text) {
    return text ? JSON.parse(text) : {};
  });
};
