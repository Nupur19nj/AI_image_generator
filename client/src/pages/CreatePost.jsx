import React,{ useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import {getRandomPromp} from '../utils'
import { FormField,Loader } from '../components/index'
const CreatePost = () => {
    const navigate = useNavigate();
const [form, setForm ]=useState({
    name: '',
    prompt:'',
    photo: "",
})

const[generating, setGenerating] = useState(false);
const[loading, setLoading]=useState(false);

const generteImage=async()=>{
  if(form.prompt){
    try{
       setGenerating(true);
       const response = await fetch('http://localhost:8080/api/v1/ai',{
        method:'POST',
         headers:{
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({prompt: form.prompt})
       });
   
       const data = await response.json();
          setForm({...form, photo:`data:image/jpeg;base64,${data.photo}`});
    
    }catch(error){
           alert(error);
    }
    finally{
        setGenerating(false)
    }
  }else{
 alert("Please enter a prompt")
  }
}


const handleSubmit= async(e)=>{
  e.preventDefault();
  if(form.prompt && form.photo){
    setLoading(true);
    try{
    const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(form),
    })

    await response.json();
    navigate('/');
    }catch(error){
         alert(error);
    }
    finally{
        setLoading(false);
    }
  }
  else{
    alert('Please enter prompt to generate image')
  }
}


const handleChange=(e)=>{
      setForm({...form, [e.target.name]: e.target.value})
}
const handleSurpriseMe=()=>{
    const randomPrompt = getRandomPromp(form.prompt)
    setForm({...form, prompt:randomPrompt})
}

  return (
   <section className='max-w-7xl mx-auto text-center'>
    <div>
        <h1 className='font-extrabold text-[#ffffff] text-[40px]'>
           Create
        </h1>
        <p className='mt-22 text-[#fff] text-[20px] max-w[500px]'>
            Create stunning images by AI and share them in galary
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-5'>
                <FormField
                labelName="Your name"
                type = "text"
                name ="name"
                placeholder= "Your name here"
                value ={form.name}
                handleChange ={handleChange}
                />
                <FormField
                labelName="Prompt"
                type = "text"
                name ="prompt"
                placeholder= "A plush toy robot sitting against a yellow wall"
                value ={form.prompt}
                handleChange ={handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
                />

                <div className='relative bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3
                h-64 flex justify-center items-center'>
                    {form.photo?(
                        <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain ' />
                    ):(
                        <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40'/>
                    )}

                    {generating &&(
                        <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5) rounded-lg]'>
                            <Loader/>
                        </div>
                    )}
                </div>
            </div>

<div className='mt-5 flex gap-5'>
 <button
 type='button'
 onClick={generteImage}
 className='text-white bg-[#b48518] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
 >
{generating? 'Generating...': 'Generate'}
 </button>
</div>

<div className='mt-10 '>
    <p className='mt-2 text-[#ffffff] text-[20px]'>
        Share Your post in the galary 👇</p>
 <button
 type='submit'
 className='text-white bg-[#db541a] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
 >
{loading? 'Sharing...': "Share"}
 </button>
</div>
      </form>
   </section>
  )
}

export default CreatePost


