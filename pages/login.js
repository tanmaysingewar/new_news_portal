import Head from 'next/head'
import React,{useState} from 'react'
import { loginUser,authincate, isAuthincated,createUser } from '../helper/auth'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Script from 'next/script'

const login = () => {
    const [data, setData] = useState("")
    const router = useRouter();
    const [error, setError] = useState('')

    console.log(data)
    
    const handleChang = (name) => event =>{
    setData({...data, [name]: event.target.value})
    }

    function handleSubmit_login(e) {
      // e.preventDefault()
    console.log(data)
    loginUser({data})
    .then( (res) =>  {
      console.log(res);
      if(res.user){
        authincate({token : res.token, user : res.user});
        return router.push({
          pathname: '/',
        });
      }
      if (!res.success) {
        setError(res.error)
        return;
      }
      
    })
  }

  function handleSubmit_createUser(e) {
    console.log(data)
    createUser({data})
    .then(res => {
      console.log(res);
    
      if(res.success){
        return router.push({
          pathname: '/login',
      });
      }
    })
  }

  


  return(
    <>
    <Head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign in or Sign up Form</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Lora:ital,wght@1,500&family=Pacifico&family=Zilla+Slab:wght@300&display=swap" rel="stylesheet"/>
    </Head>
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" id="myForm" >
            <h2 className="title">Sign In</h2>
            <p style={{fontFamily : "'Lora', serif", fontSize : 12,lineHeight: 0.9, textAlign : "center", color : "red"}}>{error}</p>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input 
                type="text" 
                placeholder="Username" 
                required 
                onChange={handleChang('email')}
                />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input 
                type="password" 
                placeholder="Password" 
                required 
                onChange={handleChang('password')}
                />
            </div>
            <input type="submit" value="Login" className="btn solid" onClick={() => handleSubmit_login()} />
          </form>
          <form className="sign-up-form">
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input 
                type="text" 
                placeholder="First Name" 
                required 
                onChange={handleChang('firstName')}
                value={data.title}
                />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input 
                type="text" 
                placeholder="Last Name" 
                required 
                onChange={handleChang('lastName')}
                value={data.title}
                />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input 
                type="email" 
                placeholder="Email" 
                required 
                onChange={handleChang('email')}
                value={data.title}
                />
            </div>
            <div className="input-field">
              <i className="fa fa-map-marker"></i>
              <input 
                type="text" 
                placeholder="Address" 
                required 
                onChange={handleChang('address')}
                value={data.title}
                />
            </div>
            <div className="input-field">
              <i className="fa fa-map-marker"></i>
              <input 
                type="text" 
                placeholder="Phone" 
                required 
                onChange={handleChang('phone')}
                value={data.title}
                />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input 
                type="password" 
                placeholder="Password" 
                required 
                onChange={handleChang('password')}/>
            </div>
            <input type="submit" className="btn" value="Sign up" onClick={() => handleSubmit_createUser()} />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content" style={{marginTop : -100}}>
              <table>
                <tbody>
                  <tr>
                    <td>
                    <Image
                        src={require('../assets/images/boat-logo-removebg-preview.png')}
                        alt="Picture of the author"
                        width={80}
                        height={80}
                        style={{backgroundColor : "white", borderRadius : "50%"}}
                      />
                      <p style={{fontFamily : "'Pacifico', cursive", fontSize : 52, lineHeight : 0, marginTop : 30}}>NewsBoat</p>
                      <p style={{fontFamily : "'Pacifico', cursive", fontSize : 16,lineHeight: 0, textAlign : "center",marginTop : -40}}>{`modern news in old style`}</p>
                      <p style={{fontFamily : "'Pacifico', cursive", fontSize : 12,lineHeight: 0, textAlign : "center"}}>{`Since Today`}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            <p >Don't have an account?</p>
            <button className="btn transparent" id="sign-up-btn">
              Sign Up
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content"  style={{marginTop : -100}}>
            <div className="logo"><a className="navbar-brand" href="#">
            <Image
                        src={require('../assets/images/boat-logo-removebg-preview.png')}
                        alt="Picture of the author"
                        width={80}
                        height={80}
                        style={{backgroundColor : "white", borderRadius : "50%"}}
                      />
              <p style={{fontFamily : "'Pacifico', cursive", fontSize : 52, lineHeight : 0, marginTop : 40}}>NewsBoat</p>
                  <p style={{fontFamily : "'Pacifico', cursive", fontSize : 16,lineHeight: 0, textAlign : "center",marginTop : -40}}>{`modern news in old style`}</p>
                  <p style={{fontFamily : "'Pacifico', cursive", fontSize : 12,lineHeight: 0, textAlign : "center"}}>{`Since Today`}</p>
                </a></div>
            <p style={{width : 300}}>Want to sign In?</p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
        <Script id="show-banner" strategy="lazyOnload">
      {`const sign_in_btn_qq = document.querySelector("#sign-in-btn");
        const sign_up_btn_qq = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");

        sign_up_btn_qq.addEventListener("click", () => {
          container.classList.add("sign-up-mode");
        });

        var form = document.getElementById("myForm");
        function handleForm(event) { event.preventDefault(); } 
        form.addEventListener('submit', handleForm);

        sign_in_btn_qq.addEventListener("click", () => {
          container.classList.remove("sign-up-mode");
        });`}
    </Script>

  
  </>
  )
}

export default login