import { Input } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { AddWatch } from './wornWord.jsx';

const warnWordList = [{ word: '质量保证金', desc: '质量保证金是敏感词' }, { word: '哇咔咔', desc: '哇咔咔是敏感词' }];
const WarnWord = () => {
  const addWatchFn = useRef();
  useEffect(() => {
    addWatchFn.current = new AddWatch('testDiv', warnWordList);
    return () => {
      addWatchFn.current = null;
    }
  }, []);
  const [list, setList] = useState('质量保证金哇咔咔label0质量保证金');
  useEffect(() => {
    addWatchFn.current.run();
  }, [list]);
  return (
    <div id="testDiv">
      <Input value={list} onChange={e => setList(e.target.value)}></Input>
      <div>
        { list }
      </div>
    </div>
  )
};
export default WarnWord;
