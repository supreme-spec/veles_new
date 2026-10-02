'use client';

import * as runtime from 'react/jsx-runtime';
import React, { memo, useMemo } from 'react';

const sharedComponents: Record<string, React.ComponentType<any>> = {};

const parseMDXComponent = (code: string): React.ComponentType<any> => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType<any>>;
}

export const MDXContent: React.FC<MDXContentProps> = memo(({ code, components }) => {
  const Component = useMemo(() => parseMDXComponent(code), [code]);
  const allComponents = useMemo(
    () => ({ ...sharedComponents, ...components }),
    [components]
  );
  return React.createElement(Component, { components: allComponents });
});

MDXContent.displayName = 'MDXContent';
