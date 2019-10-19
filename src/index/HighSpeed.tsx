import React, { memo } from 'react';
import './HighSpeed.css';
import classnames from 'classnames';

export default memo(function HighSpeed(props: IHighSpeedProps) {
  const {
    highSpeed,
    toggle,
  } = props;

  return (
    <div className="high-speed">
      <div className="high-speed-label">只看高铁/动车</div>
      <div className="high-speed-switch" onClick={() => toggle()}>
        <input type="hidden" name="highSpeed" value={String(highSpeed)} />
        <div
          className={classnames('high-speed-track', {
            checked: highSpeed,
          })}
        >
          <span
            className={classnames('high-speed-handle', {
              checked: highSpeed,
            })}
          ></span>
        </div>
      </div>
    </div>
  );
});

interface IHighSpeedProps {
  toggle: Function,
  highSpeed: boolean,
}