import './DateSelector.css';
import React from 'react';
import classnames from 'classnames';

import Header from './Header';

export default function DateSelector(props: any) {
  const {
    show,
    onSelect,
    onBack,
  } = props;

  return (
    <div className={classnames('date-selector', { hidden: !show })}>
      <Header title="日期选择" onBack={onBack} />
      <div className="date-selector-tables"></div>
    </div>
  );
}

interface IDateSelectorProps {
  show: boolean,
  onSelect: Function,
  onBack: Function,
}