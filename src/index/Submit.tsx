import React, { memo } from 'react';
import './Submit.css';

export default memo(function Submit(props: any) {
  return (
    <div className="submit">
      <button type="submit" className="submit-button">提交</button>
    </div>
  );
});