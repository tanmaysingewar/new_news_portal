import Head from 'next/head'
import Image from 'next/image'
import React,{useState,useEffect} from 'react'
import { deleteUser, deletPost } from '../helper/auth';
import { setAdvertisement, setMarquee,setHeadNews, GetAllPost, getAllUser } from '../helper/fetchData';
import styles from "../styles/admin.module.css"

function admin() {
    const [data, setData] = useState('');
    const [allUsers, setallUsers] = useState([])
    const [allPost, setallPost] = useState([])

    const [select, setSelect] = useState(0)

    useEffect(() => {
        getAllUser()
        .then(res => {
            console.log(res)
            setallUsers(res.users);
        })
        GetAllPost()
        .then(res => {
            console.log(res)
            setallPost(res.post);
        })
    }, [])
    

    const AllUser = () => {
        return(
            <div>
                <table className={styles.tablestyle}>
                    <thead style={{border : "1px solid black"}} >
                        <tr style={{border : "1px solid black", borderColor : "#fff"}}>
                            <td style={{width : "20vw"}} className={styles.bordertabale}>Name</td>
                            <td style={{width : "20vw"}} className={styles.bordertabale}>Email</td>
                            <td style={{width : "40vw"}} className={styles.bordertabale}>Address</td>
                            <td style={{width : "20vw"}} className={styles.bordertabale}>Phone</td>
                            <td style={{width : "10vw"}} className={styles.bordertabale}>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((data) => {
                                return(
                                    <tr>
                                        <td>
                                            <p>{`${data.firstName} ${data.lastName}`}</p>
                                        </td>
                                        <td>
                                            <p>{data.email}</p>
                                        </td>
                                        <td>
                                            <p>{data.address}</p>
                                        </td>
                                        <td>
                                            <p>{data.phone}</p>
                                        </td>
                                        <td>
                                        <div className={styles.button} style={{backgroundColor : "red"}} onClick={
                                            () => {
                                                deleteUser(data._id)
                                                .then(res => {
                                                        location.reload()
                                                    })
                                            }
                                        } >
                                            <p>Delete</p>
                                        </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                       
                    </tbody>
                </table>
            </div>
        )
    }

    const AllPost = () => {
        return(
            <div>
                <table className={styles.tablestyle}>
                    <thead style={{border : "1px solid black"}} >
                        <tr style={{border : "1px solid black", borderColor : "#fff"}}>
                            <td style={{width : "20vw"}} className={styles.bordertabale}>Title</td>
                            <td style={{width : "20vw"}} className={styles.bordertabale}>Date</td>
                            <td style={{width : "40vw"}} className={styles.bordertabale}>Category</td>
                            <td style={{width : "20vw"}} className={styles.bordertabale}>Name</td>
                            <td style={{width : "10vw"}} className={styles.bordertabale}>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allPost.map((data) => {
                                return(
                                    <tr>
                                        <td>
                                            <p>{data.title}</p>
                                        </td>
                                        <td>
                                            <p>{data.date}</p>
                                        </td>
                                        <td>
                                            <p>{data.catagory}</p>
                                        </td>
                                        <td>
                                            <p>{data.name}</p>
                                        </td>
                                        <td>
                                        <div className={styles.button} style={{backgroundColor : "red"}} onClick={
                                            () => {
                                                deletPost(data._id)
                                                .then(res => {
                                                        location.reload()
                                                    })
                                            }
                                        } >
                                            <p>Delete</p>
                                        </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                       
                    </tbody>
                </table>
            </div>
        )
    }

    const handleChang = (name) => event =>{
        setData({...data, [name]: event.target.value});
      }

    const AddMarquee = () => {
        return(
            <div>
                <p style={{marginTop : 0,color : "#121613",fontFamily : "'Pacifico', cursive", fontSize : 30, textAlign : "center", marginTop : 40}}>{`Add Marquee`}</p>
                <div style={{textAlign : "center"}}>
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
                                    alignItems : "center"
                                }}
                            placeholder={"Write the Marquee here"} 
                            onChange={handleChang('marquee')}
                            value={data.marquee}
                            />
                    </div>
                        <div className={styles.button} onClick={() => handleMarqueeSubmit()}>
                        <p>Add Marquee</p>
                        </div>
                </div>
                 
            </div>
        )
    }

    const AddAdvertisement = () => {
        return(
            <div>
                <p style={{marginTop : 0,color : "#121613",fontFamily : "'Pacifico', cursive", fontSize : 30, textAlign : "center", marginTop : 40}}>{`Add Advertisement`}</p>
                <div style={{textAlign : "center"}}>
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
                                alignItems : "center"
                            }}
                        placeholder={"Write the Marquee here"} 
                        onChange={handleChang('EventTitle')}
                        value={data.title}
                        />
                </div>
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
                                alignItems : "center"
                            }}
                            type={"date"}
                        placeholder={"Write the Marquee here"} 
                        onChange={handleChang('date')}
                        value={data.date}
                        />
                </div>
                <div className={styles.button} onClick={() => handleAdvertisementSubmit()}>
                <p>Add Advertisement</p>
                </div>
        </div>
            </div>
           
        )
    }

    const AddHeadNews = () => {
        return(
            <div>
                <p style={{marginTop : 0,color : "#121613",fontFamily : "'Pacifico', cursive", fontSize : 30, textAlign : "center", marginTop : 40}}>{`Add Head News`}</p>
                <div style={{textAlign : "center"}}>
                <div>
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
                                    alignItems : "center"
                                }}
                            placeholder={"Write the Head News here"} 
                            onChange={handleChang('headNewsTitle')}
                            value={data.headNewsTitle}
                        />
                    </div>
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
                                    alignItems : "center"
                                }}
                            placeholder={"Paste Image URL here"} 
                            onChange={handleChang('headNewsImage')}
                            value={data.headNewsImage}
                            />
                   </div>
                   <div>
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
                    onChange={handleChang('headNews')}
                    value={data.headNews}
                    />
                   </div>
                </div>
                <div className={styles.button} onClick={() => handleHeadNewsSubmit()}>
                <p>Add HeadNews</p>
                </div>
        </div>
            </div>
           
        )
    }

    const renderSection = () => {
        switch (select) {
            case 0:
                return AllPost()
                break;
            case 1:
                return AllUser();
            case 2:
                return AddMarquee();
            case 3 :
                return AddAdvertisement();
            case 4 :
                return AddHeadNews();
            default:
                break;
        }
    }

    const handleMarqueeSubmit = () => {
        console.log(data.marquee)
        const marquee = data.marquee
        setMarquee({title : marquee})
        .then(res => {
            console.log(res)
            setData({...data, ["marquee"]: ""});
        })
    }

    const handleAdvertisementSubmit = () => {
        console.log(data.EventTitle)
        const title = data.EventTitle
        const date = data.date
        setAdvertisement({title : title, date : date})
        .then(res => {
            console.log(res)
            setData({...data, ["title"]: "", ["date"]: ""});
        })
    }

    const handleHeadNewsSubmit = () => {
        console.log(data.headNewsTitle)
        const title = data.headNewsTitle
        const image = data.headNewsImage
        const news = data.headNews
        setHeadNews({title : title, image : image, news : news})
        .then(res => {
            console.log(res)
            setData({...data, ["headNewsTitle"]: "", ["headNewsImage"]: "", ["headNews"]: ""});
        })
    }



  return (
    <div>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Anton&family=Lora:ital,wght@1,500&family=Pacifico&family=Zilla+Slab:wght@300&display=swap" rel="stylesheet"/>
        </Head>
        <div style={{margin : 20}}>
        
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
                      <p style={{fontFamily : "'Pacifico', cursive", fontSize : 52, lineHeight : 0}}>NewsBoat Admin Panel</p>
                      <p style={{fontFamily : "'Pacifico', cursive", fontSize : 16,lineHeight: 0, textAlign : "center"}}>{`modern news in old style`}</p>
                      <p style={{fontFamily : "'Pacifico', cursive", fontSize : 12,lineHeight: 0, textAlign : "center"}}>{`Since Today`}</p>
                      </td>
                      </tr>
                  </tbody>
                </table>

                <div style={{display : "flex", flexDirection : "row", marginTop : 50}}>
                    <div className={styles.button} style={select == 0 ? {backgroundColor : "#000", color :"#fff"}: {color : "#000", backgroundColor : "#fff"}} onClick={() => setSelect(0)}>
                        <p>All Post</p>
                    </div>
                    <div className={styles.button} style={select == 1 ? {backgroundColor : "#000", color :"#fff"}: {color : "#000", backgroundColor : "#fff"}} onClick={() => setSelect(1)}>
                        <p>All User</p>
                    </div>
                    <div className={styles.button} style={select == 2 ? {backgroundColor : "#000", color :"#fff"}: {color : "#000", backgroundColor : "#fff"}} onClick={() => setSelect(2)}>
                        <p>Add Marquee</p>
                    </div>
                    <div className={styles.button} style={select == 3 ? {backgroundColor : "#000", color :"#fff"}: {color : "#000", backgroundColor : "#fff"}} onClick={() => setSelect(3)}>
                        <p>Add Advertisement</p>
                    </div>
                    <div className={styles.button} style={select == 4 ? {backgroundColor : "#000", color :"#fff"}: {color : "#000", backgroundColor : "#fff"}} onClick={() => setSelect(4)}>
                        <p>Add Head News</p>
                    </div>
                </div>
                {renderSection()}
        </div>
    </div>
  )
}

export default admin