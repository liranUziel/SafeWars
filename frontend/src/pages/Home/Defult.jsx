import '../../styles/Default.css'
const Defult = () => {
  return (
    <div className="Defult_container">
        hello to add landing page here<br/>
        With welcome user.name and quick help screen
        and maybe <button className="Defult__CTA">CTA button</button>
        
        <img src={require('../../Images/safe_box_hello.png')} className="welcome_page_img"/>
        
    </div>
  )
}

export default Defult