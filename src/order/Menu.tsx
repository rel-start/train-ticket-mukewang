import './Menu.css';
import classnames from 'classnames';
import React, {
  memo,
} from 'react';
/**
 * 
 */
const MenuItem = memo(function MenuItem(props: IMenuItemProps) {
  const {
    onPress,
    title,
    value,
    active,
  } = props;

  return (
    <li className={classnames({ active })} onClick={() => onPress(value)}>
      {title}
    </li>
  );
})

interface IMenuItemProps {
  [propsName: string]: any
}

/**
 * 
 */
export default memo(function Menu(props: IMenuProps) {
  const {
    show,
    options,
    onPress,
    hideMenu,
  } = props;

  // if (!show) { return null; }

  return (
    <div className="menu-wrapper">
      {show && <div className="menu-mask" onClick={hideMenu}></div>}
      <div className={classnames('menu', { show })}>
        <div className="menu-title"></div>
        <ul>
          {
            options && options.map((option: any, idx: number) => {
              return (
                <MenuItem key={idx} {...option} onPress={onPress} />
              );
            })
          }
        </ul>
      </div>
    </div>
  );
})

interface IMenuProps {
  [propsName: string]: any
}