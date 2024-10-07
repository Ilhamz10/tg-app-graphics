interface Config {
	backend_url: string;
}

export const config: Config = {
	backend_url: import.meta.env.VITE_API_URL,
};
