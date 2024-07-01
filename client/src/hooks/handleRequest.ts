
const handleRequest = async <T, P = object>(
  path: string,
  method: string,
  payload: P | null = null,
  token: string | null = null
): Promise<T> => {

  const fetchOptions: RequestInit = {
    method: method,
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  };

  if (payload !== null && method !== 'GET') {
    fetchOptions.body = JSON.stringify(payload);
  }

  const req = await fetch(`${import.meta.env.VITE_SERVER_URL}/${path}`, fetchOptions);
  const res = await req.json();

  if (!req.ok) {
    throw new Error(res.message || 'Something went wrong');
  }

  return res;
};

export default handleRequest;