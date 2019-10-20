import './Bottom.css';
import React, {
  memo,
  useState,
  useReducer,
  useCallback,
} from 'react';
import classnames from 'classnames';

import { ORDER_DEPART } from './constant.js';

/**
 * 
 */
const Filter = memo(function Filter(props: IFilterProps) {
  const {
    name,
    checked,
    toggle,
    value,
  } = props;

  return (
    <li className={classnames({ checked })} onClick={() => toggle(value)}>
      {name}
    </li>
  );
});

interface IFilterProps {
  [propsName: string]: any
}


/**
 * 
 */
const Option = memo(function Option(props: IOptionProps) {
  const {
    title,
    options,
    checkedMap,
    update,
  } = props;

  const toggle = useCallback((value: any) => {
    const newCheckedMap = { ...checkedMap };

    if (value in checkedMap) {
      delete newCheckedMap[value];
    } else {
      newCheckedMap[value] = true;
    }

    update(newCheckedMap);
  }, [update, checkedMap]);

  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {
          options.map((option: any, idx: number) => {
            return (
              <Filter
                toggle={toggle}
                {...option}
                key={idx}
                checked={option.value in checkedMap}
              />
            );
          })
        }
      </ul>
    </div>
  );
});

interface IOptionProps {
  [propsName: string]: any
}

/**
 * 
 */
const BottomModel = memo(function BottomModel(props: IBottomModelProps) {
  const {
    ticketTypes,
    checkedTicketTypes,
    trainTypes,
    checkedTrainTypes,
    departStations,
    checkedDepartStations,
    arriveStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setTicketTypes,
    setCheckedTicketTypes,
    setTrainTypes,
    setCheckedTrainTypes,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
    toggleIsFiltersVisible,
  } = props;

  // useState 传入函数的话 只有组件第一次初始化的时候才会被调用。优化!!!
  const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(() => {
    return {
      ...checkedTicketTypes,
    }
  });
  const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => {
    return {
      ...checkedTrainTypes,
    }
  });
  const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(() => {
    return {
      ...checkedDepartStations,
    }
  });
  const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(() => {
    return {
      ...checkedArriveStations,
    }
  });

  const optionGroup = [
    {
      title: '坐席类型',
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      update: setLocalCheckedTicketTypes,
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      update: setLocalCheckedTrainTypes,
    },
    {
      title: '出发车站',
      options: departStations,
      checkedMap: localCheckedDepartStations,
      update: setLocalCheckedDepartStations,
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      update: setLocalCheckedArriveStations,
    }
  ];

  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span className="reset">重置</span>
            <span className="ok">确定</span>
          </div>
          <div className="options">
            {
              optionGroup.map((group, idx) => <Option {...group} key={idx} />)
            }
          </div>
        </div>

      </div>
    </div>
  );
});

interface IBottomModelProps {
  [propsName: string]: any
}

/**
 * 
 */
export default function Bottom(props: IBottomProps) {
  const {
    highSpeed,
    orderType,
    onlyTickets,
    isFiltersVisible,
    toggleHightSpeed,
    toggleOnlyTickets,
    toggleOrderType,
    toggleIsFiltersVisible,

    ticketTypes,
    checkedTicketTypes,
    trainTypes,
    checkedTrainTypes,
    departStations,
    checkedDepartStations,
    arriveStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setTicketTypes,
    setCheckedTicketTypes,
    setTrainTypes,
    setCheckedTrainTypes,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
  } = props;

  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span
          className="item"
          onClick={toggleOrderType}
        >
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_DEPART ? '出发 早→晚' : '耗时 短→长'}
        </span>
        <span
          className={classnames('item', { 'item-on': highSpeed })}
          onClick={toggleHightSpeed}
        >
          <i className="icon">{highSpeed ? '\uf43f' : '\uf43e'}</i>
          只看高铁动车
        </span>
        <span
          className={classnames('item', { 'item-on': onlyTickets })}
          onClick={toggleOnlyTickets}
        >
          <i className="icon">{onlyTickets ? '\uf43d' : '\uf43c'}</i>
          只看有票
        </span>
        <span
          className={classnames('item', { 'item-on': isFiltersVisible })}
          onClick={toggleIsFiltersVisible}
        >
          <i className="icon">{'\uf0f7'}</i>
          综合筛选
        </span>
      </div>
      {
        isFiltersVisible && (
          <BottomModel
            ticketTypes={ticketTypes}
            checkedTicketTypes={checkedTicketTypes}
            trainTypes={trainTypes}
            checkedTrainTypes={checkedTrainTypes}
            departStations={departStations}
            checkedDepartStations={checkedDepartStations}
            arriveStations={arriveStations}
            checkedArriveStations={checkedArriveStations}
            departTimeStart={departTimeStart}
            departTimeEnd={departTimeEnd}
            arriveTimeStart={arriveTimeStart}
            arriveTimeEnd={arriveTimeEnd}
            setTicketTypes={setTicketTypes}
            setCheckedTicketTypes={setCheckedTicketTypes}
            setTrainTypes={setTrainTypes}
            setCheckedTrainTypes={setCheckedTrainTypes}
            setDepartTimeStart={setDepartTimeStart}
            setDepartTimeEnd={setDepartTimeEnd}
            setArriveTimeStart={setArriveTimeStart}
            setArriveTimeEnd={setArriveTimeEnd}
            toggleIsFiltersVisible={toggleIsFiltersVisible}
          />
        )
      }
    </div>
  );
}

interface IBottomProps {
  [propsName: string]: any
}