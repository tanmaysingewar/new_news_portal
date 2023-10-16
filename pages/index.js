import { GetAllPost, getMarquee,getAdvertisement,getHeadNews, getPostByCategory } from '../helper/fetchData'
import { isAuthincated } from '../helper/auth'
import { useRouter } from 'next/router';
import React,{useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Marquee from "react-fast-marquee";
import SidePost from '../components/SidePost';
import MainPost from '../components/MainPost';
import dateFormat, { masks } from "dateformat";
import {io} from 'socket.io-client'
import Push from 'push.js';
import Notiflix from 'notiflix';

export default function Home() {

  const [DATA, setDATA] = useState([])
  const [DATAHead, setDATAHead] = useState([])
  const [DATAWeather, setDATAWeather] = useState([])
  const [DATABusiness, setDATABusiness] = useState([])
  const [DATAPolitics, setDATAPolitics] = useState([])
  const [DATATechnology, setDATATechnology] = useState([])
  const [DATAEntertainment, setDATAEntertainment] = useState([])
  const [DATASports, setDATASports] = useState([])
  const [DATAEducation, setDATAEducation] = useState([])

  const [time, setTime] = React.useState('fetching')

  const [marquee, setmarquee] = useState("")
  const [advertisement, setAdvertisement] = useState("")
  const [username, setUsername] = useState('')
  const router = useRouter();
  const now = new Date();

  const [dateNow, setSateNow] = useState(dateFormat(now, "dddd, mmmm dS yyyy"))

  useEffect(() => {
    if (!isAuthincated()) {
      router.push('/login')
    }
    const socket = io('http://localhost:8000', { transports: ['websocket']} )
    socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),8000)
    })
  //  socket.on('time', (data)=>console.log(data))

   socket.on('time', (data)=>Push.create(`New Post Posted`,{
     body: `${data}`,
   }))



   socket.on('disconnect',()=>setTime('server disconnected'))

    setUsername(`${isAuthincated()?.user?.firstName} ${isAuthincated()?.user?.lastName}`)

    getMarquee().then(res => {
      console.log(res)
      setmarquee(res?.marquees[0]?.title)
    })

    getAdvertisement().then(res => {
      console.log(res)
      setAdvertisement({title : res.advertisements[0].title, date : res.advertisements[0].date})
    })
    GetAllPost()
    .then(res => {
      // console.log(res);
      setDATA(res.post)
    })

    getHeadNews()
    .then(res => {
      console.log(res)
      setDATAHead(res.headNews)
    })

    getPostByCategory('Business')
    .then(res => {
      console.log(res.post, "business")
      setDATABusiness(res.post)
    })

    getPostByCategory('Politics')
    .then(res => {
      console.log(res.post, "politics")
      setDATAPolitics(res.post)
    }
    )

    getPostByCategory('Technology')
    .then(res => {
      console.log(res.post, "technology")
      setDATATechnology(res.post)
    }
    )

    getPostByCategory('Entertainment')
    .then(res => {
      console.log(res.post, "entertainment")
      setDATAEntertainment(res.post)
    }
    )

    getPostByCategory('Sports')
    .then(res => {
      console.log(res.post, "sports")
      setDATASports(res.post)
    }
    )

    getPostByCategory('Education')
    .then(res => {
      console.log(res.post, "education")
      setDATAEducation(res.post)
    }
    )

    getPostByCategory('Weather')
    .then(res => {
      console.log(res.post, "weather")
      setDATAEducation(res.post)
    }
    )



  }, [])

  
  return (
    <div>
   <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Lora:ital,wght@1,500&family=Pacifico&family=Zilla+Slab:wght@300&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="dist/notiflix-3.2.5.min.css" />
    <script src="dist/notiflix-3.2.5.min.js"></script>
  </Head>
    <div className={styles.container} >
      <table style={{width : "100vw"}}>
        <tbody>
          <tr>
            <td className={styles.header}>
            <p style={{fontFamily : "'Lora', serif", fontSize : 22,lineHeight: 0.9, textAlign : "center"}}>{advertisement.title}</p>
            <p style={{fontFamily : "'Pacifico', cursive", fontSize : 12,lineHeight: 0.9, textAlign : "center"}}>{`on ${advertisement.date}`}</p>
            </td>
            <td className={styles.header}>
              <div style={{textAlign : "center"}}>
                <table style={{textAlign : "center", margin : "auto"}}>
                  <tbody>
                    <tr style={{margin : "auto"}}>
                      <td style={{margin : "auto"}}>  
                      <Image
                        src={require('../assets/images/boat-logo-removebg-preview.png')}
                        alt="Picture of the author"
                        width={100}
                        height={100}
                      />
                      </td>
                      <td>
                      <p style={{fontFamily : "'Pacifico', cursive", fontSize : 52, lineHeight : 0}}>NewsBoat</p>
                      <p style={{fontFamily : "'Pacifico', cursive", fontSize : 16,lineHeight: 0, textAlign : "center"}}>{`modern news in old style`}</p>
                      <p style={{fontFamily : "'Pacifico', cursive", fontSize : 12,lineHeight: 0, textAlign : "center"}}>{`Since Today`}</p>
                      </td>
                      </tr>
                  </tbody>
                </table>
              
                </div>
            
            </td>
            <td colSpan="4" className={styles.header}>
                <p style={{fontFamily : "'Lora', serif", fontSize : 16,lineHeight: 0.9, textAlign : "center"}}>{`Hey! ${username}`}</p>
              <p style={{fontFamily : "'Lora', serif", fontSize : 12,lineHeight: 0.9, textAlign : "center", margin : 5}}>{`Creating and publishing news are completely free`}</p>
              <div className={styles.button} onClick={() => router.push('/createPost')}>
                <p>Create Post</p>
              </div>
              <div className={styles.button} style={{backgroundColor : "#fff", color : "#121613"}} onClick={() => router.push('/login')}>
                <p>Log Out</p>
              </div>
             
            </td>
          </tr>
          <tr>
            <td colSpan="4" >
              <hr style={{width : "100vw", backgroundColor : "#29251f"}} color="#29251f"/>
              <hr style={{width : "100vw", backgroundColor : "#29251f",marginTop : -6}} color="#29251f"/>
              <p style={{fontFamily : "'Lora', serif", fontSize : 16,lineHeight: 0.5, textAlign : "center"}}>{dateNow}</p>
              <hr style={{width : "100vw", backgroundColor : "#363129e8",height : "0.5px"}} color="#29251f"/>
                <Marquee style={{ height : 32, backgroundColor : '#29251f'}} gradient={false}>
                  <p style={{color : "#fff", fontFamily : "'Zilla Slab', serif"}} >{marquee}</p>
                </Marquee>
             
                <p style={{fontFamily : "'Lora', serif", fontSize : 12,lineHeight: 0.9, textAlign : "center"}}><span style={{fontSize : "14px"}}>Copyright notice: </span> UCC copyright notice; ownership of rights in website.Copyright notice is a statement placed on copies or phonore- cords of a work to inform the public that a copyright owner. is claiming ownership of it</p>
            </td>
          </tr>
          <tr>
          <td className={styles.sidePost} >
          <p  style={{fontFamily : "'Lora', serif", fontSize : 22,lineHeight: 0.9, textAlign : "left",marginTop : -10}}>Recent Post ~</p>
            <div style={{height : "78vh",overflow : "scroll"}}>
            {
                  DATA.map((data) => {
                    return (
                      <SidePost 
                        key={data._id}
                        title={data.title}
                        date={data.date}
                        news={data.news}
                        name={data.name}
                        id = {data._id}
                        catagory = {data.catagory}
                      />
                    )
                  })
                }
            </div>
            </td>
            <td className={styles.mainPost}>
            <p  style={{fontFamily : "'Lora', serif", fontSize : 22,lineHeight: 0.9, textAlign : "center",marginTop : -10}}>Todays Headlines and Most Important News</p>
            <div style={{height : "78vh",overflow : "scroll"}}>
              {
                DATAHead.map((data) => {
                  return (
                    <MainPost 
                      key={data._id}
                      title={data.title}
                      date={data.date}
                      news={data.news}
                      id = {data._id}
                      image = {data.image}
                    />
                  )
                }
                )
              }
             </div>   
            </td>
            <td className={styles.sidePost}>
            <p  style={{fontFamily : "'Lora', serif", fontSize : 22,lineHeight: 0.9, textAlign : "left", marginTop : -10}}>Post By Catagorys ~</p>
            <div style={{height : "78vh",overflow : "scroll"}}>
              <p style={{fontFamily : "'Lora', serif", fontSize : 22,lineHeight: 0.9, textAlign : "left"}}>Business</p>
              {
                  DATABusiness.map((data) => {
                    return (
                      <SidePost 
                        key={data._id}
                        title={data.title}
                        date={data.date}
                        news={data.news}
                        name={data.name}
                        id = {data._id}
                        catagory = {data.catagory}
                      />
                    )
                  })
                }
              <hr style={{ backgroundColor : "#29251f", height : "3px"}} color="#29251f"/>
              <p style={{fontFamily : "'Lora', serif", fontSize : 22,lineHeight: 0.9, textAlign : "left"}}>Politics</p>
              {
                  DATAPolitics.map((data) => {
                    return (
                      <SidePost 
                        key={data._id}
                        title={data.title}
                        date={data.date}
                        news={data.news}
                        name={data.name}
                        id = {data._id}
                        category = {data.category}
                      />
                    )
                  })
                }
              <hr style={{ backgroundColor : "#29251f", height : "3px"}} color="#29251f"/>
              <p style={{fontFamily : "'Lora', serif", fontSize : 22,lineHeight: 0.9, textAlign : "left"}}>Technology</p>
              {
                  DATATechnology.map((data) => {
                    return (
                      <SidePost 
                        key={data._id}
                        title={data.title}
                        date={data.date}
                        news={data.news}
                        name={data.name}
                        id = {data._id}
                        category = {data.category}
                      />
                    )
                  })
                }
              <hr style={{ backgroundColor : "#29251f", height : "3px"}} color="#29251f"/>
              <p style={{fontFamily : "'Lora', serif", fontSize : 22,lineHeight: 0.9, textAlign : "left"}}>Entertainment</p>
              {
                  DATAEntertainment.map((data) => {
                    return (
                      <SidePost 
                        key={data._id}
                        title={data.title}
                        date={data.date}
                        news={data.news}
                        name={data.name}
                        id = {data._id}
                        category = {data.category}
                      />
                    )
                  })
                }
              <hr style={{ backgroundColor : "#29251f", height : "3px"}} color="#29251f"/>
              <p style={{fontFamily : "'Lora', serif", fontSize : 22,lineHeight: 0.9, textAlign : "left"}}>Sports</p>
              {
                  DATASports.map((data) => {
                    return (
                      <SidePost 
                        key={data._id}
                        title={data.title}
                        date={data.date}
                        news={data.news}
                        name={data.name}
                        id = {data._id}
                        category = {data.category}
                      />
                    )
                  })
                }
              <hr style={{ backgroundColor : "#29251f", height : "3px"}} color="#29251f"/>
              <p style={{fontFamily : "'Lora', serif", fontSize : 22,lineHeight: 0.9, textAlign : "left"}}>Education</p>
              {
                  DATAEducation.map((data) => {
                    return (
                      <SidePost 
                        key={data._id}
                        title={data.title}
                        date={data.date}
                        news={data.news}
                        name={data.name}
                        id = {data._id}
                        category = {data.category}
                      />
                    )
                  })
                }
              <hr style={{ backgroundColor : "#29251f", height : "3px"}} color="#29251f"/>
              <p style={{fontFamily : "'Lora', serif", fontSize : 22,lineHeight: 0.9, textAlign : "left"}}>Weather</p>
              {
                  DATAWeather.map((data) => {
                    return (
                      <SidePost 
                        key={data._id}
                        title={data.title}
                        date={data.date}
                        news={data.news}
                        name={data.name}
                        id = {data._id}
                        category = {data.category}
                      />
                    )
                  })
                }
            </div>
            </td>
          </tr>
          </tbody>
      </table>
    </div>
    </div>
  )
}
