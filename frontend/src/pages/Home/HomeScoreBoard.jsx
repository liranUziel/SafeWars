const HomeScoreBoard = () => {
  const reader = new FileReader();
  const thereIsChange = (e) =>{
    e.preventDefault();
    const file  = e.target.files[0];
    reader.readAsText(file,'UTF-8');
    reader.onload = (e) =>{
      const placeholder = document.getElementById('text');
      placeholder.innerHTML = e.target.result;
      console.log(e.target);
    }
  }

  return (
    <div>
        <div className="score">You Score is: <span>1124</span></div>
        <button>show leader board</button>
        <input type="file" onChange={thereIsChange}/>
        <div id="text"></div>
    </div>
  )
}

export default HomeScoreBoard