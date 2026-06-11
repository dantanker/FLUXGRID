import { createPortal } from 'react-dom';

export function ElectricalGridBackground() {
  return createPortal(<div className="site-background" aria-hidden="true" />, document.body);
}
