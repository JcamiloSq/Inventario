import { useCallback } from "react";

function useApi() {

const BASE_URL = 'http://localhost:3000/';


const handleResponse = useCallback(async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Problema de comunicacion');
  }
  return response.json();
}, []);


const doGet = useCallback(async (endpoint, data = null) => {
  const parametros = data ? new global.URLSearchParams(data) : null;
  let url = `${BASE_URL}${endpoint}`;

  if (parametros){
     url = `${BASE_URL}${endpoint}?${parametros.toString()}`;
  }

  const response = await fetch(url);
  return handleResponse(response);
}, [handleResponse]);


const doPost = useCallback(async (endpoint, data) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
}, [handleResponse]);


const doPut = useCallback(async (endpoint, data) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
}, [handleResponse]);


 const doDelete = useCallback(async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
}, [handleResponse]);

return {
  doGet,
  doPost,
  doPut,
  doDelete
}
}

export default useApi;
