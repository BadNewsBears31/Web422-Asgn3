import { getToken } from './authenticate';

function authHeaders() {
    const token = getToken();
    return {
      'content-type': 'application/json',
      'Authorization': `JWT ${token || ''}`,
    };
}

export async function addToFavorites(id) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
      });
  
      if (res.status === 200) {
        return await res.json();
      }
      return [];
    } catch (err) {
      return [];
    }
}

export async function removeFromFavorites(id) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
  
      if (res.status === 200) {
        return await res.json();
      }
      return [];
    } catch (err) {
      return [];
    }
}

export async function getFavorites() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
        method: 'GET',
        headers: authHeaders(),
      });
  
      if (res.status === 200) {
        return await res.json();
      }
      return [];
    } catch (err) {
      return [];
    }
}
  