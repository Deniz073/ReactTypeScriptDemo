import { useState } from 'react';
import NavLink from './NavLink';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';

export default function Navbar() {
  const [showNavSecond, setShowNavSecond] = useState<boolean>(false);
  const [url, setUrl] = useState(window.location.pathname);


  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>React demo</MDBNavbarBrand>
        <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavSecond(!showNavSecond)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavSecond}>
          <MDBNavbarNav>
            <NavLink href='/' setUrl={setUrl}>
              <MDBNavbarLink active={url === "/"}>
                Home
              </MDBNavbarLink>
            </NavLink>
            <NavLink href='/news' setUrl={setUrl}>
              <MDBNavbarLink active={url === "/news"}>
                Nieuwsberichten
              </MDBNavbarLink>
            </NavLink>
            <NavLink href='/categories' setUrl={setUrl}>
              <MDBNavbarLink active={url === "/categories"}>
                Categorieen
              </MDBNavbarLink>
            </NavLink>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}