import { useState, useEffect } from 'react';
// pass axios.post or get request  as argument to this
export default function useQuery(request) {
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});
  useEffect(() => {
    request
      .then((fetchResponse) => {
        setResponse(fetchResponse.data);
        setError(null);
      })
      .catch((e) => {
        setError(e);
        setResponse(null);
      });
  }, [request]);

  return { response, error };
}
