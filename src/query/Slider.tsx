import './Slider.css';
import React, {
  memo,
  useState,
  useMemo,
  useRef,
  useEffect,
  TouchEvent,
} from 'react';
import leftPad from 'left-pad';

import useWinSize from '../common/useWinSize';

export default memo(function Slider(props: ISliderProps) {
  const {
    title,
    currentStartHours,
    currentEndHours,
    onStartChanged,
    onEndChanged,
  } = props;

  const winSize = useWinSize();

  const startHandle = useRef<any>();
  const endHandle = useRef<any>();

  const lastStartX = useRef<any>();
  const lastEndX = useRef<any>();

  const range = useRef<any>();
  const rangeWidth = useRef<any>();

  const prevCurrentStartHours = useRef(currentStartHours);
  const prevCurrentEndHours = useRef(currentEndHours);

  const [start, setStart] = useState(() => currentStartHours / 24 * 100);
  const [end, setEnd] = useState(() => currentEndHours / 24 * 100);

  if (prevCurrentStartHours.current !== currentStartHours) {
    setStart((currentStartHours / 24) * 100);
    prevCurrentStartHours.current = currentStartHours;
  }

  if (prevCurrentEndHours.current !== currentEndHours) {
    setEnd((currentEndHours / 24) * 100);
    prevCurrentEndHours.current = currentEndHours;
  }

  const startPercent = useMemo(() => {
    if (start > 100) { return 100; }
    if (start < 0) { return 0; }

    return start;
  }, [start]);

  const endPercent = useMemo(() => {
    if (end > 100) { return 100; }
    if (end < 0) { return 0; }

    return end;
  }, [end]);

  const startHours = useMemo(() => {
    return Math.round(startPercent * 24 / 100)
  }, [startPercent]);

  const endHours = useMemo(() => {
    return Math.round(endPercent * 24 / 100)
  }, [endPercent]);

  const startText = useMemo(() => {
    return leftPad(startHours, 2, '0') + ':00';
  }, [startHours]);

  const endText = useMemo(() => {
    return leftPad(endHours, 2, '0') + ':00';
  }, [endHours]);

  function onStartTouchBegin(e: TouchEvent) {
    const touch = e.targetTouches[0];
    lastStartX.current = touch.pageX;
  }

  function onEndTouchBegin(e: TouchEvent) {
    const touch = e.targetTouches[0];
    lastEndX.current = touch.pageX;
  }

  function onStartTouchMove(e: TouchEvent) {
    const touch = e.targetTouches[0];
    // if (touch.pageX + (rangeWidth.current / 24) < lastEndX.current) {
    const distance = touch.pageX - lastStartX.current;
    lastStartX.current = touch.pageX;

    setStart(start => start + (distance / rangeWidth.current) * 100);
    // }
  }

  function onEndTouchMove(e: TouchEvent) {
    const touch = e.targetTouches[0];
    // if (touch.pageX - (rangeWidth.current / 24) > lastStartX.current) {
    const distance = touch.pageX - lastEndX.current;
    lastEndX.current = touch.pageX;

    setEnd(end => end + (distance / rangeWidth.current) * 100);
    // }
  }

  useEffect(() => {
    rangeWidth.current = parseFloat(
      String(window.getComputedStyle(range.current).width)
    );
  }, [winSize.width]);

  useEffect(() => {
    const startDom = startHandle.current;
    const endDom = endHandle.current;
    startDom.addEventListener('touchstart', onStartTouchBegin, false);
    startDom.addEventListener('touchmove', onStartTouchMove, false);
    endDom.addEventListener('touchstart', onEndTouchBegin, false);
    endDom.addEventListener('touchmove', onEndTouchMove, false);

    return () => {
      startDom.removeEventListener('touchstart', onStartTouchBegin, false);
      startDom.removeEventListener('touchmove', onStartTouchMove, false);
      endDom.removeEventListener('touchstart', onEndTouchBegin, false);
      endDom.removeEventListener('touchmove', onEndTouchMove, false);
    }
  });

  useEffect(() => {
    onStartChanged(startHours);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startHours]);
  useEffect(() => {
    onEndChanged(endHours);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endHours]);

  return (
    <div className="option">
      <h3>{title}</h3>
      <div className="range-slider">
        <div className="slider" ref={range}>
          <div className="slider-range" style={{
            left: startPercent + '%',
            width: endPercent - startPercent + '%'
          }}></div>
          <i ref={startHandle} className="slider-handle" style={{
            left: startPercent + '%'
          }}>
            <span>{startText}</span>
          </i>
          <i ref={endHandle} className="slider-handle" style={{
            left: endPercent + '%'
          }}>
            <span>{endText}</span>
          </i>
        </div>
      </div>
    </div>
  );
});

interface ISliderProps {
  [propsName: string]: any
}