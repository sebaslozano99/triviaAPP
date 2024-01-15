
// .container .btn-next{
//   width: 5em;
//   padding: 5px 10px;
//   border-radius: 15px;
//   outline-style: none;
//   border-style: none;
//   font-size: 1em;
//   background-color: #fff;
//   color: #343a40;
//   /* position: absolute;
//   bottom: 5%;
//   left: 980px; */
// }

// .container .btn-next:hover{
//   background-color: #fff;
// }



const ReUsableBtn = ({
  width = 0,
  className = "",
  borderRadius = 15,
  dispatchType = "nextQuestion",
  text = "Next",
  dispatch
}) => {


  const buttonStyle = {
    width: `${width}em`,
    padding: "5px 10px",
    borderRadius: `${borderRadius}px`,
  }

  return (
    <button className={className} style={buttonStyle} onClick={() => dispatch({type: dispatchType})} >{text}</button>
  )
}

export default ReUsableBtn