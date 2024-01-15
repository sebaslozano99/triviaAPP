import React from 'react'

const errorStyle = {
  width: "100%",
  height: "70vh",
  display: "grid",
  placeItems: "center",
  fontSize: "3vw",
}


const Error = () => {
  return (
    <div style={errorStyle}>❌Something went wrong fetching the data❌</div>
  )
}

export default Error