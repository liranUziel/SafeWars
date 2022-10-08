import '../../styles/Default.css'
const Defult = () => {
  return (
    <div className="defult_container">
      <div className="defult__content">
        <div className="defult__content__text">
          <span className="defult__content__text__bold">Hello there,</span>
          Welcome to SafeZone here you will test you RE skills, by break some safe.<br/>
          Once you are ready you can upload your own safe and key and take part of SafeZone tournament.
          {/* <button className="Defult__CTA">CTA button</button> */}
        </div>
        <img src={require('../../Images/safe_box_hello.png')} className="defult__content__text__img"/>
      </div>
    </div>
  )
}

export default Defult