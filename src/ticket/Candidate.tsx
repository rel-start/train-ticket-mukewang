import './Candidate.css';
import React, {
  memo, useState, useCallback, useMemo, useContext,
} from 'react';
import URI from 'urijs';
import dayjs from 'dayjs';

import { TrainContext } from './context.js'

/**
 * 
 */
const Channel = memo(function Channel(props: IChannelProps) {
  const {
    name,
    desc,
    type,
  } = props;

  const {
    trainNumber, departStation, arriveStation, departDate
  } = useContext(TrainContext);

  const src = useMemo(() => {
    return new URI('order.html')
      .setSearch('trainNumber', trainNumber)
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', type)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .toString();
  }, [
    trainNumber,
    departStation,
    arriveStation,
    type,
    departDate
  ]);

  return (
    <div className="channel">
      <div className="middle">
        <div className="name">{name}</div>
        <div className="desc">{desc}</div>
      </div>
      <a href={src} className="buy-wrapper">
        <div className="buy">买票</div>
      </a>
    </div>
  );
});

interface IChannelProps extends ICandidateChannels {
  type: string,
}

/**
 * 
 */
const Seat = memo(function Seat(props: ISeatProps) {
  const {
    type,
    priceMsg,
    ticketsLeft,
    channels,
    expanded,
    onToggle,
  } = props;

  return (
    <li>
      <div className="bar" onClick={() => onToggle()}>
        <span className="seat">{type}</span>
        <span className="price">
          <i>¥</i>
          {priceMsg}
        </span>
        <span className="btn">{expanded ? '收起' : '预订'}</span>
        <span className="num">{ticketsLeft}</span>
      </div>
      <div
        className="channels"
        style={{ height: expanded ? channels.length * 55 + 'px' : 0 }}
      >
        {
          channels.map((channel: any, idx: number) => {
            return (
              <Channel key={idx} {...channel} type={type} />
            );
          })
        }
      </div>
    </li>
  );
});

interface ISeatProps extends ICandidateTickets {
  expanded: boolean,
  onToggle: Function,
}

/**
 * 
 */
export default memo(function Candidate(props: ICandidateProps) {
  const {
    tickets,
  } = props;

  const [expandedIndex, setExpandedIndex] = useState(-1);

  const onToggle = useCallback((idx) => {
    setExpandedIndex(idx === expandedIndex ? -1 : idx);
  }, [expandedIndex]);

  return (
    <ul className="candidate">
      {
        tickets.map((ticket: any, idx: number) => {
          return (
            <Seat expanded={expandedIndex === idx} onToggle={() => onToggle(idx)} {...ticket} key={idx} />
          );
        })
      }
    </ul>
  );
});

interface ICandidateProps {
  [propsName: string]: any
}

interface ICandidateTickets {
  channels: ICandidateChannels,
  priceMsg: string,
  ticketsLeft: string,
  type: string,
}

interface ICandidateChannels extends Array<any> {
  name: string,
  desc: string,
}