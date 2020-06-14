import React, { Component, ReactNode } from 'react';
import { matchPath } from 'react-router-dom';
import NavItem, { NavItemProps } from './NavItem';
import RenderNavItems from './RenderNavItems';

interface reduceChildRoutesParams {
  acc: NavItemProps;
  pathname: string;
  item: {
    title: string;
    href: string;
    icon: typeof Component;
    info: typeof Component;
    items: {
      title: string;
      icon: ReactNode;
      href: string;
    }[];
  };

  depth?: number;
  [x: string]: any;
}

function ReduceChildRoutes({
  acc,
  pathname,
  item,
  depth = 0
}: reduceChildRoutesParams) {
  const key: string = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname!, { path: item.href, exact: false });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        Info={item.info}
        isOpen={Boolean(open)}
        title={item.title}
      >
        {RenderNavItems({ depth: depth + 1, pathname, items: item.items })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        Icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

export default ReduceChildRoutes;
