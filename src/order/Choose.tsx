import './Choose.css';
import classnames from 'classnames';
import React, {
  memo, useCallback,
} from 'react';

export default memo(function Choose(props: IChooseProps) {
  const {
    passengers,
    updatePassenger,
  } = props;

  const createSeat = useCallback(function createSeat(seatType: string) {
    return (
      <div>
        {
          passengers.map((passenger: any, idx: number) => {
            return (
              <p
                key={idx}
                className={classnames('seat', {
                  active: passenger.seat === seatType
                })}
                data-text={seatType}
                onClick={() => updatePassenger(passenger.id, {
                  seat: seatType
                })}
              >
                &#xe02d;
              </p>
            );
          })
        }
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passengers]);

  return (
    <div className="choose">
      <p className="tip">在线选座</p>
      <div className="container">
        <div className="seats">
          <div>窗</div>
          {createSeat('A')}
          {createSeat('B')}
          {createSeat('C')}
          <div>过道</div>
          {createSeat('D')}
          {createSeat('F')}
          <div>窗</div>
        </div>
      </div>
    </div>
  );
})

interface IChooseProps {
  [propsName: string]: any
}