import './Journey.css';
import journeySwitch from './imgs/switch.svg';
import React, {memo} from 'react';

export default memo(function Journey(props: IJourneyProps) {
  const {
    from,
    to,
    exchangeFromTo,
    showCitySelector,
  } = props;

  return (
    <div className="journey">
      <div className="journey-station" onClick={() => showCitySelector(true)}>
        <input
          type="text"
          readOnly
          name="from"
          value={from}
          className="journey-input journey-from"
        />
      </div>
      <div className="journey-switch" onClick={() => exchangeFromTo()}>
        <img src={journeySwitch} width="70" height="40" alt="switch" />
      </div>
      <div className="journey-station" onClick={() => showCitySelector(false)}>
        <input
          type="text"
          readOnly
          name="to"
          value={to}
          className="journey-input journey-to"
        />
      </div>
    </div >
  );
});

interface IJourneyProps {
  from: string,
  to: string,
  exchangeFromTo: Function,
  showCitySelector: Function,
}