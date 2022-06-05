import React from 'react'
import styles from '../styles/Home.module.css'

function MainPost({title,date, news, image, id}) {
  return (
    <div style={{margin : 10}}>
     
        <p style={{fontFamily : "'Lora', serif", fontSize : 32,lineHeight: 0.9, textAlign : "left"}} >{title}</p>
        <p style={{fontFamily : "'Lora', serif", fontSize : 14,lineHeight: 0, textAlign : "left", marginTop : -10, paddingBottom : 5}}>{date}</p>
                <img className={styles.postImages} src={image} height={400} width={800}  />
                <p style={{textAlign : "justify", fontFamily : "'Lora', serif"}}>{news}</p>
                <hr style={{ backgroundColor : "#29251f", height : "3px"}} color="#29251f"/>
    </div>
  )
}

export default MainPost