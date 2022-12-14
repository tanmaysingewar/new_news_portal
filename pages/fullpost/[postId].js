import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { deletPost, isAuthincated, postComment } from '../../helper/auth'
import { useRouter } from 'next/router'
import { GetAllPost, getPost } from '../../helper/fetchData';
import { API } from '../../backend';
import Image from 'next/image';
import Head from 'next/head';


function fullPage({post}) { 

  const [isSameUser, setisSameUser] = useState(false);

  useEffect(() => {
    const {user} = isAuthincated();
    if (`${user.firstName} ${user.lastName}` == postData.name) {
      setisSameUser(true);
    }
  }, []);
  
  const postData = post.post;

  const deleteIconURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABNklEQVRoge2YsW7CUAxFDyyoS/kaWCrWDv2qjvxU+RIY2tKh3WCpIlGFIUJiQHn2wzZQfKRMeYnvjf3iOJAkiSWvQFs45hdTV0Ai3tzEoOdcaxXEiJNah9EqrEkDSZJcP1PkDcr6mJTESd5CnxKXThRj93Xi4zW/wOhsOToa4IHCF4EkAy3wZaFIyRrB54y0kV2ijEQxpQY+zhBSiyjm3WTg5g1kCVVgGnNMfBd+tDQAsAkUv5GK0gw0kWUk3nMaA5Eb2cVAZAbEse7KQJaQR6ybz4BkoDkwohtsNNfU0NINMo1ksSYDDfBTo0jJN0LxoP8zF1FGqhhaAxEbWRXjGg1kBvqI2AOuBlbK9TUsPW8+oHtCXnPAO/59hmdg5yD+D3jxFn9gBiyArYHwLfAGPEWJT5L/xB4ed94eZOvvUQAAAABJRU5ErkJggg==";


  const {user} = isAuthincated()

  const router = useRouter()
    const [x, setx] = useState('')
    const [data, setData] = useState('')

    const [allComment, setallComment] = useState(postData.comments);

    console.log(postData)

    const handleChang = (name) => event =>{
    setData({...data, [name]: event.target.value})
    }

    const onCommentSubmit = (e) => {
        postComment({comment : data.comment, name : user.firstName, id: postData._id}) 
        .then(res => {
            console.log(res);
            if(res.success){
                setallComment([...allComment, {comment : data.comment, name : user.firstName}])
                setData({...data, comment : ''})
            }
        })
    }

    const onDelete = () => {
        if(window.confirm('Are you sure you want to delete this post?')){
          deletPost(postData._id)
            .then(res => {
                console.log(res);
                if(res.status){
                    return router.push('/')
                }
            })
        }
    }

  return (
    <div style={{margin : "auto"}}>
       <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Lora:ital,wght@1,500&family=Pacifico&family=Zilla+Slab:wght@300&display=swap" rel="stylesheet"/>
      </Head>
        <div style={{maxWidth : "60vw", margin : "auto"}}> 
          <div style={{float : "right"}}>

          {/*  */}

          <div style={{margin : 10}}>
              <p style={{fontFamily : "'Lora', serif", fontSize : 32,lineHeight: 0.9, textAlign : "left"}} >{postData.title}</p>
              <p style={{fontFamily : "'Pacifico', cursive", fontSize : 12,lineHeight: 0.9, textAlign : "left",marginTop : -5, paddingTop : 0}}>{`by ${postData.name}`}</p>
              <p style={{fontFamily : "'Lora', serif", fontSize : 16,lineHeight: 0.9, textAlign : "left",marginTop : -5, paddingTop : 0}}>{`${postData.catagory}`}</p>
              <p style={{fontFamily : "'Lora', serif", fontSize : 14,lineHeight: 0, textAlign : "left", marginTop : 10, paddingBottom : 5}}>{postData.date} {isSameUser ? <img src={deleteIconURL} style={{width : 20, height : 20, borderRadius : 50, marginRight : 10, marginTop : -10}} onClick={() => onDelete()}/> : <span> </span>}</p>
             {/* <img className={styles.postImages} src={postData.image} height={400} width={800}  /> */}
             <p style={{textAlign : "justify", fontFamily : "'Lora', serif"}}>{postData.news}</p>
             <hr style={{ backgroundColor : "#29251f", height : "3px"}} color="#29251f"/>
          </div>

        {/*  */}

            
          </div>    
          <div style={{margin : 10}}>
          
            <p style={{fontSize : 18, fontWeight : 500,fontFamily : "'Lora', serif"}}>Add Comments</p>
            <div style={{marginTop : 20}}>
                <input 
                    style={{backgroundColor : "#f5f5f5", borderRadius : 5, border : "none", padding : 10, fontSize : 14, fontFamily : "'Lora', serif",
                        border : "none",
                        outline : "none",
                        color : "#29251f",
                        width : "55%",
                        padding : "10px",
                        marginBottom : "10px",
                        borderRadius : "5px",
                        float : "left"
                        }}
                    placeholder={"Title of the news"} 
                    onChange={handleChang('comment')}
                    value={data.comment}
                />    
                <button style={{padding : 10, backgroundColor : "black",border : "none",borderRadius : 5,cursor : "pointer", marginLeft : 20}} onClick={() => onCommentSubmit()}><span style={{color : "white"}}>Send</span></button>
            </div>
            <div style={{marginTop : 50}}>
              <div>
                <p style={{fontFamily : "'Lora', serif"}}>Comments ~</p>
              </div>
                {
                  allComment.map((comment, index) => (
                    <div key={index} style={{marginTop : 10}}>
                     <div>
                        <p style={{fontWeight : 600, fontFamily : "'Lora', serif"}}>{`@${comment.name}`}</p>
                        <p style={{fontWeight : 200, fontSize : 14, lineHeight : 0.2,  fontFamily : "'Lora', serif"}}>{comment.comment}</p>
                      </div>
                    </div>
                  ))
                }
            </div>
        </div>
        </div>  
       

    </div>
  )


}

export default fullPage

export async function getStaticPaths(){
  const res = await fetch(`${API}/post/all`)
  const data = await res.json()

  const paths = data.post.map(post => {
      return {params :{
          postId : `${post._id}`
      }}
  })
  return {
      paths,
      fallback : false
  }
}


export async function getStaticProps(context){
  const {params} = context;
  const res = await fetch(`${API}/post?p_id=${params.postId}`)
  const data = await res.json()

  return{
      props :{
          post : data,
      }
  }
}