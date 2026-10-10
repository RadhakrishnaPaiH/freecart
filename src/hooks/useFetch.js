import { useEffect, useState } from 'react'

function useFetch(fetchFunction) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
        try{
            const result = await fetchFunction();

            setData(result);
        }catch(error){
            // setError("Fetch Not Possible!");
            setError(error.message)
        }finally{
            setLoading(false);
        }  
    }
    fetchApi();
    }, [fetchFunction])
  return {data, loading, error};
}

export default useFetch