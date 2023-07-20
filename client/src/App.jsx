import React from 'react'
import { BrowserRouter,Link} from 'react-router-dom'
import RouterWrapper from './RouterWrapper';
const App = () => {
  return (
 <BrowserRouter>
  <header className='w-full flex items-center bg-[#000] justify-between sm:px-8 px-4 py-4 border-b'>
<Link to="/">
<h1 className='text-xl font-extrabold font-inter text-white'>ImagineIT</h1>
</Link>
<div className="flex space-x-4">
<Link to="/" className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Gallery</Link>
<Link to="/create-post" className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Create</Link>
</div>
</header>
 <RouterWrapper />
 </BrowserRouter>
  );
};

export default App