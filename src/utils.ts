import { save, remove, load } from 'react-cookies';

export function getLocalStorageValue(key: string) {
    const value = localStorage.getItem(key);
    if (!value) {
        return null;
    }
    try {
        return JSON.parse(value);
    } catch (error) {
        return null;
    }
}

export function setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function replaceLocalStorage(key: string, value: string) {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
}

export function getCookieValue(key: string) {
    return load(key);
}

export function setCookie(key: string, value: string) {
    save(key, value, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    });
}

export function removeCookie(key: string) {
    remove(key);
}

export function replaceCookie(key: string, value: string) {
    remove(key);
    save(key, value, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    });
}
