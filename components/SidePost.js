import React,{useState, useEffect} from 'react'
import { deletPost, isAuthincated } from '../helper/auth'
import { useRouter } from 'next/router'
import Link from 'next/link';

function SidePost({title , date, name, news, id,catagory}) {
  const [isSameUser, setisSameUser] = useState(false);

  const [News, setNews] = useState("");

  var newsSplits = news.split(" ");

  const halfNews = newsSplits.slice(0, 60);

  const halfJoinNews = halfNews.join(" ");

  const router = useRouter();

  const deleteIconURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABNklEQVRoge2YsW7CUAxFDyyoS/kaWCrWDv2qjvxU+RIY2tKh3WCpIlGFIUJiQHn2wzZQfKRMeYnvjf3iOJAkiSWvQFs45hdTV0Ai3tzEoOdcaxXEiJNah9EqrEkDSZJcP1PkDcr6mJTESd5CnxKXThRj93Xi4zW/wOhsOToa4IHCF4EkAy3wZaFIyRrB54y0kV2ijEQxpQY+zhBSiyjm3WTg5g1kCVVgGnNMfBd+tDQAsAkUv5GK0gw0kWUk3nMaA5Eb2cVAZAbEse7KQJaQR6ybz4BkoDkwohtsNNfU0NINMo1ksSYDDfBTo0jJN0LxoP8zF1FGqhhaAxEbWRXjGg1kBvqI2AOuBlbK9TUsPW8+oHtCXnPAO/59hmdg5yD+D3jxFn9gBiyArYHwLfAGPEWJT5L/xB4ed94eZOvvUQAAAABJRU5ErkJggg==";

  useEffect(() => {
    const {user} = isAuthincated();
    if (`${user.firstName} ${user.lastName}` == name) {
      setisSameUser(true);
    }
  }, [])

  const deletePost = () => {
    if(window.confirm('Are you sure you want to delete this post?')){
      deletPost(id)
        .then(res => {
            console.log(res);
            if(res.status){
                return location.reload();
            }
        })
    }
  }

  const OnClickMore = () => {
    return  router.push({
      pathname: `/fullpost/${id}`,
    });
  }
  
  return (
    <div style={{padding : 0}}>
         <p style={{fontFamily : "'Lora', serif", fontSize : 28,lineHeight: 1, textAlign : "left"}}>{title}</p>
         <p style={{fontFamily : "'Lora', serif", fontSize : 12,lineHeight: 0, textAlign : "left", marginTop : -10, paddingBottom : 5}}>{date} {isSameUser ? <img src={deleteIconURL} style={{marginBottom : -5, cursor :"pointer"}} height={20} onClick={() => deletePost()}/> : <span> </span>}</p> 
              <p style={{fontFamily : "'Pacifico', cursive", fontSize : 12,lineHeight: 0.9, textAlign : "left",marginTop : -5, paddingTop : 0}}>{`by ${name}`}</p>
              <p style={{fontFamily : "'Lora', serif", fontSize : 12,lineHeight: 0.9, textAlign : "left",marginTop : -5, paddingTop : 0}}>{`${catagory}`}</p>
              <p style={{textAlign : "justify", fontFamily : "'Lora', serif"}}>{halfJoinNews} 
               <span style={{fontFamily : "'Pacifico', cursive", cursor : "pointer"}} onClick={() => OnClickMore()}> more ....</span></p>
    </div>
  )
}

export default SidePost