import styled, { css, keyframes } from 'styled-components';
import { Typography } from '@material-ui/core'

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`${({ theme: { bp, dp, ...theme }, ...props }) => css`
  position: relative;
  margin: ${dp(75)} auto;
  width: ${dp(150)};
  height: ${dp(150)};
  display: block;
  overflow: hidden;
  div {
    height: 100%;
  }

  border-top-color: ${theme.colors.primary600};
  border-left-color: ${theme.colors.primary300};
  border-right-color: ${theme.colors.primary300};    

  border-radius: 50%;
  padding: ${dp(8)};
  border: ${dp(2)} solid transparent;
  animation: ${rotate} linear 3.5s infinite;   

  div {
    border-radius: 50%;
    padding: ${dp(8)};
    border: ${dp(2)} solid transparent;
    animation: ${rotate} linear 3.5s infinite;  

    border-top-color: ${theme.colors.primary600};
    border-left-color: ${theme.colors.primary300};
    border-right-color: ${theme.colors.primary300};    
  }
`}`;

const LoadingText = styled(Typography)`${({ theme: { bp, dp, ...theme }, ...props }) => css`
  text-align: center;
`}`;

const Loader = ({children}) => (
  <div>
    <LoaderContainer>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoaderContainer>

    <LoadingText variant="h4">
      {children}
    </LoadingText>
  </div>
)

export default Loader

