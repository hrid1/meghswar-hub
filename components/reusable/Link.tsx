import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function Link({ href, children, className, ...props }: LinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', href);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };
  
  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}