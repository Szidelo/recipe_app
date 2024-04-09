export async function fetchFood(keyWord) {
	const YOUR_APP_KEY = "f88aee9a10d63e6f1998deb521543f24";
	const YOUR_APP_ID = "cb684875";
	const response = await fetch(
		`https://api.edamam.com/api/recipes/v2?type=public&q=${keyWord}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
	);
	const data = await response.json();

	if (!response.ok) {
		throw new Error("Failed to fetch food");
	}

	return data.hits;
}

export async function fetchRecipe(id) {
	const YOUR_APP_KEY = "f88aee9a10d63e6f1998deb521543f24";
	const YOUR_APP_ID = "cb684875";
	const url = `https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23${id}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

	const response = await fetch(url);

	const data = await response.json();

	return data[0];
}
