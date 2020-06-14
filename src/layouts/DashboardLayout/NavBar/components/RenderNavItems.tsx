import React from 'react';
import List from '@material-ui/core/List';
import ReduceChildRoutes from './ReduceChildRoutes';

interface renderNavItemsProps {
  items: any[];
  pathname: string;
  [x: string]: any;
}

function RenderNavItems({ items, ...rest }: renderNavItemsProps) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => ReduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

export default RenderNavItems;
