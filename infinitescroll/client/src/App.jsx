import { useState,useEffect } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios"
function App() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setpage] = useState(1)
  const pageSize = 10
  useEffect(()=>{
    fetchData()
  },[])
  const fetchData = async (page)=>{
    try{
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts',{
        params:{
          _page:page, _limit:pageSize
        }
      });
      setItems((prevItems)=>[...prevItems, ...res.data])
      if(res.data.length <pageSize){
        setHasMore(false)
      }
    }catch(error){
      console.log(error)
    
    }
  }
  const fetchMoredata = () =>{
    const nextPage = page +  1
    setpage(nextPage);
    fetchData(nextPage)
  }
  return (  
    <InfiniteScroll
    dataLength={items.length}
    next={fetchMoredata}
    hasMore={hasMore}
    loader={<h4 style={{ textAlign: 'center', margin: '20px 0' }}>Loading...</h4>}
    endMessage={<p style={{ textAlign: 'center', margin: '20px 0' }}>No more items</p>}
  >
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {items &&
          items.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
              <h1 style={{ color: 'black', margin: '0 0 10px' }}>userId:- {item.userId}</h1>
              <p style={{ color: 'black', margin: '0 0 10px' }}>title:- {item.title}</p>
              <p style={{ color: 'black', margin: '0' }}>body:- {item.body}</p>
            </div>
          ))}
      </div>
    </div>
  </InfiniteScroll>
  )
}

export default App
