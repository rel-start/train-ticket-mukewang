import './Passengers.css';
import React, {
  memo, useMemo, MouseEventHandler
} from 'react';

/**
 * 
 */
const Passenger = memo(function Passenger(props: IPassengerProps) {
  const {
    id,
    name,
    ticketType,
    birthday,
    gender,
    licenceNo,
    onRemove,
    onUpdate,
    showGenderMenu,
    showFollowAdultMenu,
    showTicketTypeMenu,
    followAdultName,
  } = props;

  const isAdult = ticketType === 'adult';

  return (
    <li className="passenger">
      <i className="delete" onClick={() => onRemove(id)}>
        —
      </i>

      <ol className="items">
        <li className="item">
          <label className="label name">
            姓名
          </label>
          <input
            type="text"
            className="input name"
            placeholder="乘客姓名"
            value={name}
            onChange={(e) => onUpdate(id, { name: e.target.value })}
          />
          <label className="ticket-type" onClick={() => showTicketTypeMenu(id)}>
            {isAdult ? '成人票' : '儿童票'}
          </label>
        </li>
        {
          isAdult && (
            <li className="item">
              <label className="label licenceNo">
                身份证
              </label>
              <input
                type="text"
                className="input licenceNo"
                placeholder="证件号码"
                value={licenceNo}
                onChange={(e) => onUpdate(id, { licenceNo: e.target.value })}
              />
            </li>
          )
        }
        {
          !isAdult && (
            <>
              <li className="item arrow">
                <label className="label gender">
                  性别
              </label>
                <input
                  type="text"
                  className="input gender"
                  placeholder="请选择"
                  onClick={() => showGenderMenu(id)}
                  value={
                    gender === 'male'
                      ? '男'
                      : gender === 'female'
                        ? '女'
                        : ''
                  }
                  readOnly
                />
              </li>
              <li className="item">
                <label className="label birthday">
                  出生日期
              </label>
                <input
                  type="text"
                  className="input birthday"
                  placeholder="如 19951011"
                  value={birthday}
                  onChange={(e) => onUpdate(id, { birthday: e.target.value })}
                />
              </li>
              <li className="item arrow">
                <label className="label followAdult">
                  同行成人
              </label>
                <input
                  type="text"
                  className="input followAdult"
                  placeholder="请选择"
                  value={followAdultName}
                  onClick={() => showFollowAdultMenu(id)}
                  readOnly
                />
              </li>
            </>
          )
        }
      </ol>
    </li>
  );
})

interface IPassengerProps {
  id: number,
  name: string,
  ticketType: string,
  birthday: string,
  gender: string,
  licenceNo: string,
  onRemove: Function,
  onUpdate: Function,
  showGenderMenu: Function,
  showFollowAdultMenu: Function,
  showTicketTypeMenu: Function,
  followAdultName: string,
  followAdult: number,
}

/**
 * 
 */
export default memo(function Passengers(props: IPassengersProps) {
  const {
    passengers,
    createAdult,
    createChild,
    removePassenger,
    updatePassenger,
    showGenderMenu,
    showFollowAdultMenu,
    showTicketTypeMenu,
  } = props;

  const nameMap = useMemo(() => {
    const ret: any = {};
    for (const passenger of passengers) {
      ret[passenger.id] = passenger.name;
    }

    return ret;
  }, [passengers]);

  return (
    <div className="passengers">
      <ul>
        {
          passengers.map((passenger, idx) => {
            return (
              <Passenger
                {...passenger}
                followAdultName={nameMap[passenger.followAdult]}
                key={idx}
                onRemove={removePassenger}
                onUpdate={updatePassenger}
                showGenderMenu={showGenderMenu}
                showFollowAdultMenu={showFollowAdultMenu}
                showTicketTypeMenu={showTicketTypeMenu}
              />
            );
          })
        }
      </ul>
      <section className="add">
        <div className="adult" onClick={createAdult}>添加成人</div>
        <div className="child" onClick={createChild}>添加儿童</div>
      </section>
    </div>
  );
})

interface IPassengersProps {
  passengers: IAdultPassenger | IChildPassenger,
  createAdult: MouseEventHandler,
  createChild: MouseEventHandler,
  removePassenger: Function,
  updatePassenger: Function,
  showGenderMenu: Function,
  showFollowAdultMenu: Function,
  showTicketTypeMenu: Function,
}

interface IAdultPassenger extends Array<any> {
  id: number,
  licenceNo: string,
  name: string,
  seat: string,
  ticketType: string,
}

interface IChildPassenger extends Array<any> {
  id: number,
  name: string,
  seat: string,
  ticketType: string,
  birthday: string,
  gender: string,
  followAdult: number,
}