import React from 'react'

export default React.memo(function Tile(props) {

  // console.log(props.value);

  return (
    <td className={props.className} onClick={() => props.playOnBoard(props.index)}>
      {props.value !== '-' ? props.value : ''}
    </td>
  )
})
