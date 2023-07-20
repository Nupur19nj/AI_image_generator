import React from 'react'
import { useState, useEffect } from 'react'
import{Loader, Card, FormField, Navbar} from '../components'
import '../Styles.css'

const RenderCards=({data,title})=>{
if(data?.length>0){ return data.map((post)=><Card key={post._id} {...post}/>)}
return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
        {title}
    </h2>
)
}
const Home = () => {
    const[loading, setLoading] = useState(false);
    const[allPosts, setAllPosts] = useState(null);
    const[searchText, setSearchText] = useState("");
    const[searchResults, setSearchedResults] = useState(null);
    const[searchTimeout, setSearchTimeout]=useState(null);
    
    const fetchPosts = async()=>{
      setLoading(true);
      try{
       const response = await fetch('http://localhost:8080/api/v1/post',{
        method:'GET',
        headers:{
        'Content-Type': 'application/json',
        },
       });
    
       if(response.ok){
        const result = await response.json();
        setAllPosts(result.data.reverse());
       }
      }
      catch(error){
        alert('Error fetching posts', error);
      }
      finally{
        setLoading(false);
      }
    };

   useEffect(()=>{
fetchPosts();
   },[]); 


   const handleSearchChange=(e)=>{
    setSearchText(e.target.value);
 setSearchTimeout(
    setTimeout(()=>{
          const searchResults= allPosts.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase()));
    
          setSearchedResults(searchResults);
        },500)
        );
   }

  return (
    <div className='max-w-7xl mx-auto'>
      {/* <div className='hero'>
        <img src={backgroundImage} alt="bg" width='4000px'/>
        <div className='container'>
          <h1>Generate Images by AI</h1>
        </div> 
        </div>*/}

        <div>
          <h1 className='font-extrabold text-[#f05b5bf8] text-[90px] text-center'>ImagineIT</h1>
          <p className= 'mt-22 text-[#cb7676] text-[20px] max-w[500px] text-center'>Convert Your text into image and download them for free or search from the galary</p>
        </div>
       <div className='div1'>
        <h1 className='font-extrabold text-[#faf6f6] text-[30px] text-center'>
             Gallery
        </h1>
      </div>

      <div className='mt-16'>
            <FormField
            labelName="Search Posts"
            type="text"
            name ="text"
            placeholder="Search Posts"
          value={searchText}
          handleChange={handleSearchChange}
            />
      </div>

      <div className='mt-10'>
           {loading ?(
         <div className='flex justify-center items-center'>
            <Loader />
         </div>
           ):(
            <>
            {searchText &&(
                <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                    Showing results for <span className='text-[#222328]'>{searchText}</span>
                </h2>
            )}

            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                {searchText?(
                          <RenderCards 
                          data={searchResults}
                          title="No search results found"
                           />
                ):(
                    <RenderCards 
                    data={allPosts}
                    title="No posts found"
                    />
                )}
            </div>
            </>
           )
           }
      </div>
    </div>
  )
}

export default Home