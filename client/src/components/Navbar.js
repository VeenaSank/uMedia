import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'
const NavBar = ()=>{
    const  searchModal = useRef(null)
    const menuOpen = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
     useEffect(()=>{
         M.Modal.init(searchModal.current)
         M.Sidenav.init(menuOpen.current,{ edge : "right"})
     },[])
     const renderList = ()=>{
       if(state){
           return [
            <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
            <li key="2"><Link to={state?"/":"/signin"} >Home</Link> </li>,
            <li key="3"><Link to="/profile">My Profile</Link></li>,
            <li key="4"><Link to="/create">New Post</Link></li>,
            <li key="5"><Link to="/myfollowingpost">Following Feeds</Link></li>,
            <li  key="6">
             <button className="btn #0288d1 blue darken-2"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
            >
                Logout
            </button>
            </li>
         
            ]
       }
        
       else{
         return [
          <li  key="7"><Link to="/signin">Signin</Link></li>,
          <li  key="8"><Link to="/signup">Signup</Link></li>
         
         ]
       }
     }

     const renderListMobile = ()=>{
      if(state){
          return <div className="modal-content" onClick ={() =>{M.Sidenav.getInstance(menuOpen.current).close()}}>
           <li key="1"><i  data-target="modal1" className="small material-icons modal-trigger" style={{color:"black", marginLeft:"32px", marginTop:"32px"}}>search</i></li>
           <li key="2"><Link to={state?"/":"/signin"} >Home</Link> </li>
           <li key="3"><Link to="/profile">My Profile</Link></li>
           <li key="4"><Link to="/create">New Post</Link></li>
           <li key="5"><Link to="/myfollowingpost"> Following Feeds</Link></li>
           <li  key="6">
            <button className="btn #0288d1 blue darken-2" style={{marginLeft:"32px"}}
           onClick={()=>{
             localStorage.clear()
             dispatch({type:"CLEAR"})
             history.push('/signin')
           }}
           >
               Logout
           </button>
           </li>
           </div>
           
      }
       
      else{
        return <div className="modal-content"  onClick={()=>{M.Sidenav.getInstance(menuOpen.current).close()}} >
         <li  key="7"><Link to="/signin">Signin</Link></li>
         <li  key="8"><Link to="/signup">Signup</Link></li>
         </div>
        
      }
    }
          
     const fetchUsers = (query)=>{
        setSearch(query)
        fetch('/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
          setUserDetails(results.user)
        })
     }
    return(
      <React.Fragment>
        <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/signin"} className="brand-logo left " style={{marginLeft:"32px"}}>uMedia</Link>
          <i   data-target="mobile-demo" className="sidenav-trigger right"  style={{ color :"black"}}><i className="material-icons  hide-on-med-and-up ">menu</i></i>
          <ul  className="right hide-on-med-and-down" style ={{marginRight:"32px"}}>
          {renderList()}
          </ul> 
       </div>

        <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item" style={{color:"blue"}}>{item.name}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
        </nav>



        <ul class="sidenav right" id="mobile-demo" ref={menuOpen}>
         
        {renderListMobile()}
    </ul>

      

      

      </React.Fragment>
    )
}


export default NavBar