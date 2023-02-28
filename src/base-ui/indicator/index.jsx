
import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import { IndicatorWrapper } from './style'

const Indicator = memo((props) => {
  const { selectIndex } = props
  const contentRef = useRef()

  useEffect(() => {
    //获取selectIndex对应的item 2.offsetLeft + 2.width * 0.5 - indidator.width * 0.5
    const selectItemEl = contentRef.current.children[selectIndex]
    const itemLeft = selectItemEl.offsetLeft
    const itemWidth = selectItemEl.clientWidth

    //2.content的宽度
    const contentWidth = contentRef.current.clientWidth

    //3.获取selectIndex要滚动的距离
    const distance = itemLeft + itemWidth * 0.5 - contentWidth * 0.5
    
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