export function setItemWithExpiry(key: string, value: string, ttl: number) {
	const now = new Date();

	// `ttl` is time-to-live in milliseconds
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	};

	localStorage.setItem(key, JSON.stringify(item));
}

export function getItemWithExpiry(key: string) {
	const itemStr = localStorage.getItem(key);

	// If the item doesn't exist, return null
	if (!itemStr) {
		return null;
	}

	const item = JSON?.parse(itemStr) as { value: string; expiry: number };
	const now = new Date();

	// Compare the expiry time of the item with the current time
	if (now.getTime() > item?.expiry) {
		// If the item is expired, remove it from storage and return null
		localStorage.removeItem(key);
		return null;
	}

	return item?.value;
}
