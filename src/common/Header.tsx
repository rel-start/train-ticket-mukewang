import React, {
  MouseEventHandler,
  memo,
} from 'react';
import './Header.css';

export default memo(function Header(props: IHeaderProps) {
  const {
    onBack,
    title
  } = props;

  return (
    <div className="header">
      <div className="header-back" onClick={onBack}>
        <svg width="42" height="42">
          <polyline
            points="25,13 16,21 25,29"
            stroke="#fff"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div className="header-title">{title}</div>
    </div>
  );
});

interface IHeaderProps {
  onBack: MouseEventHandler,
  title: string
}