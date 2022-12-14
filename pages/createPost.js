import Head from 'next/head'
import Link from 'next/link'
import React,{useState,useEffect} from 'react'
import Script from 'next/script'
import { createPost, sendNotification } from '../helper/fetchData'
import { useRouter } from 'next/router';
import { isAuthincated } from '../helper/auth'

export default function createNews() {
  const [data, setData] = useState('')
  const router = useRouter();

  const handleChang = (name) => event =>{
    setData({...data, [name]: event.target.value})
  }

  useEffect(() => { 
    setData({...data, ["catagory"]: "General News & Current Affair"})
    if (!isAuthincated()) {
         router.push('/login')
    }
  }, [])

  function handleSubmit(e) {
    console.log(data)
    createPost({data})
    .then(res => {
      console.log(res);
      sendNotification(res.post)
      if(res.success){
        return router.push({
          pathname: '/',
      });
      }
    })
  }

  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Lora:ital,wght@1,500&family=Pacifico&family=Zilla+Slab:wght@300&display=swap" rel="stylesheet"/>
      </Head>
      <main >
      <div style={{backgroundColor : "#e4d6c6", height : "100vh", textAlign : "center",alignItems : "center"}}>
       <div style={{marginLeft : "50px",paddingTop : "70px",}}>
       <p style={{marginTop : 0,color : "#121613",fontFamily : "'Pacifico', cursive", fontSize : 30}}>{`Create News`}</p>

       <div>
         <input 
           style={{backgroundColor : "#121613",
           border : "none",
           outline : "none",
           color : "white",
           width : "40%",
           padding : "10px",
           marginBottom : "10px",
           borderRadius : "5px",
         }}
         placeholder={"Title of the news"} 
         onChange={handleChang('title')}
         value={data.title}
         />
       </div>
       <div>
         <select
          value={data.category}
          onChange={handleChang('catagory')}
          style={{backgroundColor : "#121613",
           border : "none",
           outline : "none",
           color : "white",
           width : "40%",
           padding : "10px",
           marginBottom : "10px",
           borderRadius : "5px",
         }}
         >
          <option value="Weather">Weather</option>
          <option value="Entertainment">Entertainments</option>
          <option value="Education">Education</option>
          <option value="Technology">Technology</option>
          <option value="Sports">Sports</option>
          <option value="Politics">Politics</option>
          <option value="Business">Business</option>
         </select>
       </div>
       <textarea 
         style={{backgroundColor : "#121613",
         border : "none",
         outline : "none",
         color : "white",
         width : "40%",
         padding : "10px",
         marginBottom : "10px",
         borderRadius : "5px",
         color : "#fff"
       }}
       rows={10}
       placeholder={"Write the news here"} 
       onChange={handleChang('news')}
       value={data.news}
       />
      <div>
        <button style={{padding :"10px 40px", backgroundColor : "black",border : "none",borderRadius : 5,cursor : "pointer"}} onClick={() => handleSubmit()} ><span style={{color : "white"}}>Send</span></button>
      </div>
     </div>
     </div>
    </main>
    </div>
  )
}
