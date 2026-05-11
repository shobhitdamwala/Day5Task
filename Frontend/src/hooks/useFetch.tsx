import { useEffect, useState } from "react";


const useFetch = (url:string) => {
    const [data , setData] = useState(null);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if(!response){
                    throw new Error("Network response was not ok");
                }
                const res = await response.json();
                setData(res);
            }
            catch(err: any){
                setError(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
}

export default useFetch;