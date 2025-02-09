import React, { useMemo } from 'react'
import { useState, useEffect, useContext, createContext } from 'react'

const ContextState = createContext({
  count: 0,
  list: []
})

const ChildrenComponent = React.memo(() => {
  // 注入数据
  // !即使props没有发生变化，但是因为注入了context，依旧对memo造成了破坏!!!
  // 解决方法：父组件通过useContext获取list，然后通过props传入
  const { list } = useContext(ContextState)
  return (
    <div>
      <h1 style={{ color: 'green' }}>Flag: {Math.random()}</h1>
      {
        list.map(item => {
          return (
            <div htmlFor="" key={item.price}>{item.name}</div>
          )
        })
      }
    </div>
  )
})

const Counter = React.memo(({value, children}) => {
  return (
    <div>
      {Math.random()}
    </div>
  )
})

function App() {
  const [list] = useState([
    { name: 'JavaScript 高级程序设计', price: 17 },
    { name: 'JavaScript 权威指南', price: 18 },
    { name: '你不知道的 JavaScript', price: 34 },
    { name: 'ECMAscript 入门', price: 28 },
  ])
  const [count, setCount] = useState(0)
  const onClick = () => {
    setCount(count + 1)
  };
  const contextValue = useMemo(() => {
    return {
      list,
      count
    }
  }, [list, count]); // !原contextValue是对象，每次父组件渲染，对象引用地址改变，子组件也渲染，因此对其进行缓存，useCallback同理
  return (
    <div>
      <ContextState.Provider value={contextValue}>
        <h1 style={{
          color: 'red'
        }}>{Math.random()}</h1>
        <button onClick={onClick}>{count}</button>
        <Counter />
        <ChildrenComponent />
      </ContextState.Provider>
    </div>
  )
}

export default App