import React from 'react'

export default React.memo(function Tile(props) {
  return (
    <td>
      {props.value}
    </td>
  )
})
