import React, { forwardRef, useEffect, useCallback, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface Props {
  title?: string;
  children?: JSX.Element;
  [x: string]: any;
}

const Page: React.FC<Props> = forwardRef(
  ({ title, children, ...rest }, ref: React.Ref<any>) => {
    const location = useLocation();

    return (
      <div ref={ref} {...rest}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </div>
    );
  }
);

export default Page;
