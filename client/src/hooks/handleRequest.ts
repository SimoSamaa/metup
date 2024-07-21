
const handleRequest = async <T, P = object>(
  path: string,
  method: string,
  payload: P | null = null,
  token: string | null = null
): Promise<T> => {

  const fetchOptions: RequestInit = {
    method: method,
    headers: { 'Authorization': `Bearer ${token}` },
  };

  if (payload !== null && method !== 'GET') {
    if (payload instanceof FormData) {
      fetchOptions.body = payload;
    } else {
      fetchOptions.body = JSON.stringify(payload);
      (fetchOptions.headers as Record<string, string>)['Content-Type'] = 'application/json';
    }
  } else if (payload !== null) {
    fetchOptions.body = payload as BodyInit;
  }

  const req = await fetch(`${import.meta.env.VITE_SERVER_URL}/${path}`, fetchOptions);
  const res = await req.json();

  if (!req.ok) {
    throw new Error(res.message || 'Something went wrong');
  }

  return res;
};

export default handleRequest;