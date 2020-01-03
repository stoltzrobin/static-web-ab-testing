import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.div``

const NavContainer = styled.div`
  background-color: magenta;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`

const NavLink = styled(Link)`
  margin: 15px;
`

export const Navigator = ({ children }) => (
  <Wrapper>
    <NavContainer>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/productPage">Product Page</NavLink>
    </NavContainer>
    {children}
  </Wrapper>
)
