
import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import { IndicatorWrapper } from './style'

const Indicator = memo((props) => {
  const { selectIndex = 0 } = props
  const contentRef = useRef()

  useEffect(() => {
    //获取selectIndex对应的item 2.offsetLeft + 2.width * 0.5 - indidator.width * 0.5
    const selectItemEl = contentRef.current.children[selectIndex]
    const itemLeft = selectItemEl.offsetLeft
    const itemWidth = selectItemEl.clientWidth

    //2.content的宽度
    const contentWidth = contentRef.current.clientWidth
    const contentScroll = contentRef.current.scrollWidth

    //3.获取selectIndex要滚动的距离 //往右边移动是负值
    let distance = itemLeft + itemWidth * 0.5 - contentWidth * 0.5
    
    //4.特殊情况的处理
    if(distance < 0) distance = 0 //左边的特殊处理
    const totalDistance = contentScroll - contentWidth
    if(distance > totalDistance) distance = totalDistance //右边的特殊处理

    //改变位置即可
    contentRef.current.style.transform = `translate(${-distance}px)`
  }, [selectIndex])
  return ( 
    <IndicatorWrapper>
      <div className="i-content" ref={contentRef}>
        {
          props.children
        }
      </div>
    </IndicatorWrapper>
  )
})

Indicator.propTypes = {
  selectIndex: PropTypes.number
}

export default Indicator