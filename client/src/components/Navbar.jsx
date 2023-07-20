import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import styled from 'styled-components'
export default function Navbar(){
const links =[
    {name: "Home", links:"/"},
    {name: "Create", links:"/create-post"},
    {name: "Gallery", links:"/Gallery"},
];

const [showSearch, setShowSearch] =useState(false);
const [inputHover, setinputHover] =useState(false);

return <Container>
<nav > 
<div className="left flex a-center">
 <div className="brand flex a-center j-center">
    <h1>MyAI</h1>
 </div>

 <ul className="links flex">
     {
        links.map((name,link)=>{
            return(
                <li key={name}>
                    <Link to={link}>{name}</Link></li>
            )
        })
     }
 </ul>
 </div>
</nav>
</Container>
}
const Container = styled.div``;