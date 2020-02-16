import styled, { css, keyframes } from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  align-items: center;
  background-image: url('/bg-photo.png');
  background-repeat: no-repeat;
  background-size: cover;
`

const FullPagePhoto = ({ children }) => <Wrapper>{children}</Wrapper>

export default FullPagePhoto
