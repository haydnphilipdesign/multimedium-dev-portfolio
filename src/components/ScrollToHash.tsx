import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function scrollToHash(hash: string) {
  const id = hash.replace('#', '');
  if (!id) return;

  let tries = 0;
  const tryScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    tries += 1;
    if (tries < 10) {
      requestAnimationFrame(tryScroll);
    }
  };

  tryScroll();
}

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    scrollToHash(location.hash);
  }, [location.hash, location.pathname]);

  return null;
};

export default ScrollToHash;
