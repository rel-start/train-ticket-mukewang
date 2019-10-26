import './Bottom.css';
import React, {
  memo,
  useState,
  useReducer,
  // useCallback,
  useMemo,
  MouseEventHandler,
} from 'react';
import classnames from 'classnames';

import { ORDER_DEPART } from './constant.js';
import Slider from './Slider';

function checkedReducer(state: any, action: any) {
  const { type, payload } = action;
  switch (type) {
    case 'toggle':
      const newState = { ...state };
      if (payload in newState) {
        delete newState[payload];
      } else {
        newState[payload] = true;
      }
      return newState;
    case 'reset':
      return {};
    default:
      return state;
  }
}

/**
 * 
 */
const Filter = memo(function Filter(props: IFilterProps) {
  const {
    name,
    checked,
    // toggle,
    value,
    dispatch,
  } = props;



  return (
    <li
      className={classnames({ checked })}
      // onClick={() => toggle(value)}
      onClick={() => dispatch({ payload: value, type: 'toggle' })}
    >
      {name}
    </li>
  );
});

interface IFilterProps {
  name: string,
  checked: boolean,
  value: string,
  dispatch: Function,
}


/**
 * 
 */
const Option = memo(function Option(props: IOptionProps) {
  const {
    title,
    options,
    checkedMap,
    // update,
    dispatch,
  } = props;

  // const toggle = useCallback((value: any) => {
  //   const newCheckedMap = { ...checkedMap };

  //   if (value in checkedMap) {
  //     delete newCheckedMap[value];
  //   } else {
  //     newCheckedMap[value] = true;
  //   }

  //   update(newCheckedMap);
  // }, [update, checkedMap]);

  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {
          options.map((option, idx) => {
            return (
              <Filter
                // toggle={toggle}
                dispatch={dispatch}
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
  title: string,
  options: IasTicketTypes,
  checkedMap: IasCheckedTicketTypes,
  dispatch: Function,
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
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
    toggleIsFiltersVisible,
    setCheckedDepartStations,
    setCheckedArriveStations,
  } = props;


  console.log('🍎', ticketTypes)

  const [localCheckedTicketTypes, localCheckedTicketTypesDispatch]: any = useReducer(checkedReducer, checkedTicketTypes, (checkedTicketTypes) => ({
    ...checkedTicketTypes,
  }));
  const [localCheckedTrainTypes, localCheckedTrainTypesDispatch]: any = useReducer(checkedReducer, checkedTrainTypes, (checkedTrainTypes) => ({
    ...checkedTrainTypes,
  }));
  const [localCheckedDepartStations, localCheckedDepartStationsDispatch]: any = useReducer(checkedReducer, checkedDepartStations, (checkedDepartStations) => ({
    ...checkedDepartStations,
  }));
  const [localCheckedArriveStations, localCheckedArriveStationsDispatch]: any = useReducer(checkedReducer, checkedArriveStations, (checkedArriveStations) => ({
    ...checkedArriveStations,
  }));
  // useState 传入函数的话 只有组件第一次初始化的时候才会被调用。优化!!!
  // const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(() => ({
  //   ...checkedTicketTypes,
  // }));
  // const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => ({
  //   ...checkedTrainTypes,
  // }));
  // const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(() => ({
  //   ...checkedDepartStations,
  // }));
  // const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(() => ({
  //   ...checkedArriveStations,
  // }));
  const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart);
  const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
  const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart);
  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

  const optionGroup = [
    {
      title: '坐席类型',
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      // update: setLocalCheckedTicketTypes,
      dispatch: localCheckedTicketTypesDispatch,
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      // update: setLocalCheckedTrainTypes,
      dispatch: localCheckedTrainTypesDispatch,
    },
    {
      title: '出发车站',
      options: departStations,
      checkedMap: localCheckedDepartStations,
      // update: setLocalCheckedDepartStations,
      dispatch: localCheckedDepartStationsDispatch,
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      // update: setLocalCheckedArriveStations,
      dispatch: localCheckedArriveStationsDispatch,
    }
  ];

  function sure() {
    setCheckedTicketTypes(localCheckedTicketTypes);
    setCheckedTrainTypes(localCheckedTrainTypes)
    setCheckedDepartStations(localCheckedDepartStations);
    setCheckedArriveStations(localCheckedArriveStations);

    setDepartTimeStart(localDepartTimeStart);
    setDepartTimeEnd(localDepartTimeEnd);

    setArriveTimeStart(localArriveTimeStart);
    setArriveTimeEnd(localArriveTimeEnd);

    toggleIsFiltersVisible();
  }
  const isResetDisabled = useMemo(() => {
    return Object.keys(localCheckedTicketTypes).length === 0
      && Object.keys(localCheckedTrainTypes).length === 0
      && Object.keys(localCheckedDepartStations).length === 0
      && Object.keys(localCheckedArriveStations).length === 0
      && localDepartTimeStart === 0
      && localDepartTimeEnd === 24
      && localArriveTimeStart === 0
      && localArriveTimeEnd === 24;
  }, [
    localCheckedTicketTypes,
    localCheckedTrainTypes,
    localCheckedDepartStations,
    localCheckedArriveStations,
    localDepartTimeStart,
    localDepartTimeEnd,
    localArriveTimeStart,
    localArriveTimeEnd
  ]);

  function reset() {
    if (isResetDisabled) { return; }
    localCheckedTicketTypesDispatch({ type: 'reset' });
    localCheckedTrainTypesDispatch({ type: 'reset' })
    localCheckedDepartStationsDispatch({ type: 'reset' });
    localCheckedArriveStationsDispatch({ type: 'reset' });

    setLocalDepartTimeStart(0);
    setLocalDepartTimeEnd(24);

    setLocalArriveTimeStart(0);
    setLocalArriveTimeEnd(24);
  }



  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span className={classnames('reset', { disabled: isResetDisabled })} onClick={reset}>重置</span>
            <span className="ok" onClick={sure}>确定</span>
          </div>
          <div className="options">
            {
              optionGroup.map((group, idx) => <Option {...group} key={idx} />)
            }
          </div>
          <Slider
            title="出发时间"
            currentStartHours={localDepartTimeStart}
            currentEndHours={localDepartTimeEnd}
            onStartChanged={setLocalDepartTimeStart}
            onEndChanged={setLocalDepartTimeEnd}
          />
          <Slider
            title="到达时间"
            currentStartHours={localArriveTimeStart}
            currentEndHours={localArriveTimeEnd}
            onStartChanged={setLocalArriveTimeStart}
            onEndChanged={setLocalArriveTimeEnd}
          />
        </div>
      </div>
    </div>
  );
});

interface IBottomModelProps {
  ticketTypes: IasTicketTypes,
  checkedTicketTypes: IasCheckedTicketTypes,
  trainTypes: IasTicketTypes,
  checkedTrainTypes: IasCheckedTicketTypes,
  departStations: IasTicketTypes,
  checkedDepartStations: IasCheckedTicketTypes,
  arriveStations: IasTicketTypes,
  checkedArriveStations: IasCheckedTicketTypes,
  departTimeStart: number,
  departTimeEnd: number,
  arriveTimeStart: number,
  arriveTimeEnd: number,
  setTicketTypes: Function,
  setCheckedTicketTypes: Function,
  setTrainTypes: Function,
  setCheckedTrainTypes: Function,
  setDepartTimeStart: Function,
  setDepartTimeEnd: Function,
  setArriveTimeStart: Function,
  setArriveTimeEnd: Function,
  setCheckedDepartStations: Function,
  setCheckedArriveStations: Function,

  toggleIsFiltersVisible: Function,
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
    setCheckedDepartStations,
    setCheckedArriveStations,
  } = props;

  const noChecked = useMemo(() => {
    return Object.keys(checkedTicketTypes).length === 0
      && Object.keys(checkedTrainTypes).length === 0
      && Object.keys(checkedDepartStations).length === 0
      && Object.keys(checkedArriveStations).length === 0
      && departTimeStart === 0
      && departTimeEnd === 24
      && arriveTimeStart === 0
      && arriveTimeEnd === 24;
  }, [
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  ]);

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
          className={classnames('item', { 'item-on': isFiltersVisible || !noChecked })}
          onClick={toggleIsFiltersVisible}
        >
          <i className="icon">{noChecked ? '\uf0f7' : '\uf446'}</i>
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
            setCheckedDepartStations={setCheckedDepartStations}
            setCheckedArriveStations={setCheckedArriveStations}
          />
        )
      }
    </div>
  );
}

interface IBottomProps {
  highSpeed: boolean,
  orderType: number,
  onlyTickets: boolean,
  isFiltersVisible: boolean,
  toggleHightSpeed: MouseEventHandler,
  toggleOnlyTickets: MouseEventHandler,
  toggleOrderType: MouseEventHandler,
  toggleIsFiltersVisible: MouseEventHandler,

  ticketTypes: IasTicketTypes,
  checkedTicketTypes: IasCheckedTicketTypes,
  trainTypes: IasTicketTypes,
  checkedTrainTypes: IasCheckedTicketTypes,
  departStations: IasTicketTypes,
  checkedDepartStations: IasCheckedTicketTypes,
  arriveStations: IasTicketTypes,
  checkedArriveStations: IasCheckedTicketTypes,
  departTimeStart: number,
  departTimeEnd: number,
  arriveTimeStart: number,
  arriveTimeEnd: number,
  setTicketTypes: Function,
  setCheckedTicketTypes: Function,
  setTrainTypes: Function,
  setCheckedTrainTypes: Function,
  setDepartTimeStart: Function,
  setDepartTimeEnd: Function,
  setArriveTimeStart: Function,
  setArriveTimeEnd: Function,
  setCheckedDepartStations: Function,
  setCheckedArriveStations: Function,
}

interface IasTicketTypes extends Array<any> {
  [sequence: number]: IasTicketTypesValue,
}

interface IasTicketTypesValue {
  value: string,
  name: string,
}

interface IasCheckedTicketTypes {
  string: boolean,
}