import React from 'react'

export default React.memo(function Tile(props) {

  console.log(props.value);

  return (
    <td className={props.className}>
      {props.value !== '-' ? props.value : ''}
    </td>
  )
})
