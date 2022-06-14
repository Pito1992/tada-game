import React from 'react';

interface IHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

function HeadingComp({
  tag = 'h4',
  children,
  ...restProps
}: IHeadingProps): JSX.Element {
  return React.createElement(tag, restProps, children)
}

export default HeadingComp