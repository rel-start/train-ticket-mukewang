import './CitySelector.css';
import React, {
  useState,
  useMemo,
  useEffect,
  MouseEventHandler,
  memo,
  useCallback,
} from 'react';
import classnames from 'classnames';

// ------
const SuggestItem = memo(function SuggestItem(props: ISuggestItemProps) {
  const {
    onClick,
    name,
  } = props;

  return (
    <li className="city-suggest-li" onClick={() => onClick(name)}>
      {name}
    </li>
  );
});
interface ISuggestItemProps {
  onClick: Function,
  name: string,
}

// ------
const Suggest = memo(function Suggest(props: any) {
  const {
    sKey,
    onSelect,
  } = props;

  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch('/rest/search?key=' + encodeURIComponent(sKey))
      .then(res => res.json())
      .then(data => {
        const { result, searchKey } = data;

        if (sKey === searchKey) {
          setResult(result);
        }
      });
  }, [sKey]);

  // const fallBackResult = result.length ? result : [{display: sKey}];
  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [{ display: sKey }];
    }

    return result;
  }, [result, sKey]);

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {
          fallBackResult.map((item, idx) => {
            return (
              <SuggestItem
                key={idx}
                name={item.display}
                onClick={onSelect}
              />
            )
          })
        }
      </ul>
    </div>
  );
});
interface ISuggestProps {
  searchKey: string,
  onSelect: Function
}

// ------
const CityItem = memo(function CityItem(props: ICityItemProps) {
  const {
    name,
    onSelect,
  } = props;

  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      {name}
    </li>
  );
});
interface ICityItemProps {
  name: string,
  onSelect: Function
}

// -------
const CitySection = memo(function CitySection(props: ICitySectionProps) {
  const {
    title,
    cities = [],
    onSelect,
  } = props;

  return (
    <ul className="city-ul">
      <li className="city-li" key="title" data-cate={title}>
        {title}
      </li>
      {
        cities.map((city: any, idx: number) => {
          return (
            <CityItem
              key={city.name}
              name={city.name}
              onSelect={onSelect}
            />
          );
        })
      }
    </ul>
  );
});
interface ICitySectionProps {
  title: string,
  cities: any[],
  onSelect: Function
}

// -------
// 26个字母组件
const AlphaIndex = memo(function AlphaIndex(props: IAlphaIndexProps) {
  const {
    alpha,
    onClick,
  } = props;

  return (
    <div
      className="city-index-item"
      onClick={() => onClick(alpha)}
    >
      {alpha}
    </div>
  );
});
interface IAlphaIndexProps {
  alpha: string,
  onClick: Function,
}

const alphabet = Array.from(new Array(26), (ele, index) => {
  return String.fromCharCode(65 + index);
});

// -------
const CityList = memo(function CityList(props: ICityListProps) {
  const {
    sections,
    onSelect,
    toAlpha,
  } = props;

  return (
    <div className="city-list">
      <div className="city-case">
        {
          sections.map((section: any) => {
            return (
              <CitySection
                key={section.title}
                title={section.title}
                cities={section.citys}
                onSelect={onSelect}
              />
            );
          })
        }
      </div>
      <div className="city-index">
        {
          alphabet.map(alpha => {
            return <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha} />
          })
        }
      </div>
    </div>
  );
});
interface ICityListProps {
  sections: any[],
  onSelect: Function,
  toAlpha: Function,
}

// -------
export default function CitySelector(props: ICitySelectorProps) {
  const {
    show,
    cityData,
    isLoading,
    onBack,
    fetchCityData,
    onSelect,
  } = props;

  // 存储搜索框的文本并过滤掉前后空格
  const [serachKey, setSearchKey] = useState('');
  const key = useMemo(() => serachKey.trim(), [serachKey]);

  // 请求城市列表数据
  useEffect(() => {
    if (!show || cityData || isLoading) {
      return;
    }
    fetchCityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, cityData, isLoading]);

  const toAlpha = useCallback(alpha => {
    document.querySelector(`[data-cate='${alpha}']`)!.scrollIntoView();
  }, []);


  // 1.在请求cityData数据时显示 'loading...'
  // 2.有cityData时，显示<CityList />列表
  // 3.其他情况显示 'error'
  const outputCitySections = () => {
    if (isLoading) {
      return <div>loading...</div>;
    }

    if (cityData) {
      return (
        <CityList
          sections={cityData.cityList}
          onSelect={onSelect}
          toAlpha={toAlpha}
        />
      )
    }

    return <div>error</div>
  };

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
      {Boolean(key) && (
        <Suggest sKey={key} onSelect={(key: any) => onSelect(key)} />
      )}
      {outputCitySections()}
    </div>
  );
}

interface ICitySelectorProps {
  show: boolean,
  cityData: any/* Array<any> */,
  isLoading: boolean,
  onBack: MouseEventHandler,
  fetchCityData: Function,
  onSelect: Function
}