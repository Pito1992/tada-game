import React from 'react';
import { createPortal } from 'react-dom';

interface IPortalCompProps extends React.HTMLAttributes<HTMLDivElement> {
  elementId?: string;
}

function PortalComp({ children, elementId = 'root' }: IPortalCompProps): JSX.Element {
  const elRoot = document.getElementById(elementId) as HTMLElement;
  const ref = React.useRef<HTMLDivElement>(document.createElement('div'));

  React.useEffect(() => {
    elRoot.appendChild(ref.current);

    return () => {
      ref.current.remove();
    };
  }, [elRoot]);

  return createPortal(children, ref.current);
}

export default PortalComp;
