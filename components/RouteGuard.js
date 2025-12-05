
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { getFavourites } from '@/lib/userData';
import { isAuthenticated, getToken } from '@/lib/authenticate';

const PUBLIC_PATHS = ['/login', '/register', '/about']; 

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    const token = getToken();
    if (!token) return;
    const data = await getFavourites();
    setFavouritesList(data);
  }

  useEffect(() => {
    authCheck(router.asPath);
    updateAtom(); 

    const handleRouteChangeStart = (url) => {
      setAuthorized(false);
    };

    const handleRouteChangeComplete = (url) => {
      authCheck(url);
      updateAtom(); 
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  function authCheck(url) {
    const path = url.split('?')[0];
    if (PUBLIC_PATHS.includes(path)) {
      setAuthorized(true);
      return;
    }

    if (isAuthenticated()) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
      router.push('/login');
    }
  }

  return authorized ? children : null;
}



