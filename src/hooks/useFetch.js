import { useEffect, useState } from "react";

export function useFetch( fetchFn, initialValue, keyWord ) {
	const [isFetching, setIsFetching] = useState();
	const [error, setError] = useState();
	const [fetchData, setFetchData] = useState(initialValue);

	useEffect(() => {
        async function handleFetch() {
            setIsFetching(true);
			try {
				const data = await fetchFn(keyWord || 'best');
				setFetchData(data);
				setIsFetching(false);
                // console.log(data)
			} catch (error) {
				setError({ message: error.message || "Failed to fetch data" });
			}
			setIsFetching(false);
		}
		handleFetch();
	}, [fetchFn, keyWord]);

	return { isFetching, error, fetchData, setFetchData };
}
