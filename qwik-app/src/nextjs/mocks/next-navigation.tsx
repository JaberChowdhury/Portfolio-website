/** @jsxImportSource react */
import { useContext } from 'react';
import { LocaleContext } from './next-intl';

export function usePathname() {
  return typeof window !== 'undefined' ? window.location.pathname : '/';
}

export function useRouter() {
  const context = useContext(LocaleContext);
  
  return {
    push: (path: string) => {
      window.location.href = path;
    },
    replace: (path: string, options?: any) => {
      if (options?.locale && context) {
        context.setLocale(options.locale);
      } else {
        window.location.replace(path);
      }
    }
  };
}

export function Link({ href, children, ...props }: any) {
  return <a href={href} {...props}>{children}</a>;
}
