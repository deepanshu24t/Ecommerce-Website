import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'; 

function Header() {
  const {carts} = useSelector(state=>state.allCart)
  return (
    <>
     <Navbar style={{backgroundColor:"black" ,color:"white",height:"60px"}}>
        <Container>
        <Link to ="/"><h3 className='text-light'>Ecommerce</h3></Link>
          <div id='ex4'>
          <Link to ="/cartDetails"><span className='p1 fa-stack fa-2x has-badge' data-count={carts.length}><i class="fas fa-shopping-cart"></i></span></Link>  
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Header