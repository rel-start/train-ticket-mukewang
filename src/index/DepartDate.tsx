import './DepartDate.css';
import React, {
  useMemo,
  MouseEventHandler,
} from 'react';
import dayjs from 'dayjs';

import { h0 } from '../common/fp.js';

export default function DepartDate(props: IDepartDateProps) {
  const {
    time,
    onClick,
  } = props;

  const h0OfDepart = h0(time);
  const departDate = new Date(h0OfDepart);

  const departDateString = useMemo(() => {
    return dayjs(h0OfDepart).format('YYYY-MM-DD');
  }, [h0OfDepart]);

  const isToday = h0OfDepart === h0();

  const weekString = '周'
    + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()]
    + (isToday ? '(今天)' : '');

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={departDateString}/>
      {departDateString} <span className="depart-week">{weekString}</span>
    </div>
  );
}

interface IDepartDateProps {
  time: number,
  onClick: MouseEventHandler
}