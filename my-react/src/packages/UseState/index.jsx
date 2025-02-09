import React, { useState, useCallback, useRef, memo } from 'react';
import { Button } from 'antd';
import usePersistFn from './util.js';

const Child = (props) => {
  return <>
    { Math.random() }
    <Button onClick={() => { props.handleClick(props.count, props.setCount) }}></Button>
    <div>{ props.count }</div>
  </>
};
const MemoChild = memo(Child);
const UseState = (props) => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const handleClick = usePersistFn(() => {
    setCount(count + 1);
  }, [count]);
  const handleClick2 = usePersistFn(() => {
    setCount2(count2 + 1);
  }, [count2]);
  const handleClick3 = usePersistFn(() => {
    setCount3(count3 + 1);
  }, [count3]);
  return (
    <div>
      <MemoChild handleClick={handleClick} count={count}></MemoChild>
      <MemoChild handleClick={handleClick2} count={count2}></MemoChild>
      <MemoChild handleClick={handleClick3} count={count3}></MemoChild>
    </div>
  )
}

export default UseState;