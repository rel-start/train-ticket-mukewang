import './CitySelector.css';
import React, {
  useState,
  useMemo,
  MouseEventHandler
} from 'react';
import classnames from 'classnames';

export default function CitySelector(props: ICitySelectorProps) {
  const {
    show,
    cityData,
    isLoading,
    onBack
  } = props;

  // 存储搜索框的文本并过滤掉前后空格
  const [serachKey, setSearchKey] = useState('');
  const key = useMemo(() => serachKey.trim(), [serachKey]);

  return (
    <div
      className={classnames('city-selector', { hidden: !show })}
    /*className={['city-selector', (!show && 'hidden')].filter(Boolean).join(' ')}*/
    >
      <div className="city-search">
        <div className="search-back" onClick={onBack}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={key}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={e => setSearchKey(e.target.value)}
          />
        </div>
        <i
          onClick={() => setSearchKey('')}
          className={classnames('search-clean', {
            hidden: serachKey.length === 0
          })}
        >
          &#xf063;
      </i>
      </div>

    </div>
  );
}

interface ICitySelectorProps {
  show: boolean
  cityData: any[]
  isLoading: boolean
  onBack: MouseEventHandler
}