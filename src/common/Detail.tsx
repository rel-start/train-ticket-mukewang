import './Detail.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import React, {
  memo,
  useMemo,
  MouseEventHandler
} from 'react';

function format(d: number) {
  const date = dayjs(d);

  return date.format('MM-DD') + ' ' + date.locale('zh-cn').format('ddd');
}


export default memo(function Detail(props: IDetailProps) {
  const {
    departDate,
    arriveDate,
    arriveTimeStr,
    departTimeStr,
    durationStr,
    departStation,
    arriveStation,
    trainNumber,
    toggleIsScheduleVisible,
    children,
  } = props;


  const departDateStr = useMemo(() => format(departDate), [departDate]);
  const arriveDateStr = useMemo(() => format(arriveDate), [arriveDate]);

  return (
    <div className="detail">
      <div className="content">
        <div className="left">
          <p className="city">{arriveStation}</p>
          <p className="time">{arriveTimeStr}</p>
          <p className="date">{arriveDateStr}</p>
        </div>
        <div className="middle">
          <p className="train-num">{trainNumber}</p>
          <p className="train-mid" onClick={toggleIsScheduleVisible}>
            {children}
          </p>
          <p className="train-time">耗时{durationStr}</p>
        </div>
        <div className="right">
          <p className="city">{departStation}</p>
          <p className="time">{departTimeStr}</p>
          <p className="date">{departDateStr}</p>
        </div>
      </div>
    </div>
  );
});

interface IDetailProps {
  departDate: number,
  arriveDate: number,
  arriveTimeStr: string,
  departTimeStr: string,
  durationStr: string,
  departStation: string,
  arriveStation: string,
  trainNumber: string,
  toggleIsScheduleVisible?: MouseEventHandler,
  children?: any,
}