const KEY = 'loginEmail';

export const sendLoginEmail = (email: string) =>
	localStorage.setItem(KEY, email);

export const getLoginEmail = () => localStorage.getItem(KEY);

export const clearLoginEmail = () => localStorage.removeItem(KEY);
