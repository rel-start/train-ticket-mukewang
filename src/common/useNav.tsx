import { useCallback } from 'react';
import { h0 } from './fp';

export default function useNav(props: IuseNavProps) {
  const { departDate, dispatch, prevDate, nextDate } = props;

  const isPrevDisabled = h0(departDate) <= h0();
  // 只能买20天以内的
  const isNextDisabled = h0(departDate) - h0() > 20 * 86400 * 1000;

  const prev = useCallback(() => {
    if (isPrevDisabled) { return; }
    dispatch(prevDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPrevDisabled]);

  const next = useCallback(() => {
    if (isNextDisabled) { return; }
    dispatch(nextDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNextDisabled]);

  return {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next,
  };
}

interface IuseNavProps {
  [propsName: string]: any
}