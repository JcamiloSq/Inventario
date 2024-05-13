function useApi() {

const BASE_URL = 'http://localhost:3000/';


const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Problema de comunicacion');
  }
  return response.json();
};


const doGet = async (endpoint, data=null) => {

  const parametros = data ? new global.URLSearchParams(data) : null;
  let response = await fetch(`${BASE_URL}${endpoint}`);

  if (parametros){
     response = await fetch(`${BASE_URL}${endpoint}?${parametros.toString()}`);    
  }
  
  return handleResponse(response);
};


const doPost = async (endpoint, data) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};


const doPut = async (endpoint, data) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};


 const doDelete = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
};

return {
  doGet,
  doPost,
  doPut,
  doDelete
}
}

export default useApi;
