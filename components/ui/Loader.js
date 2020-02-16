import styled, { css, keyframes } from 'styled-components'
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
`

const Wrapper = styled.div`
  padding: 40px 80px;
  max-width: 640px;
  max-height: 444px;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 10px rgba(0, 0, 0, 0.12),
    0px 4px 5px rgba(0, 0, 0, 0.14);
  border-radius: 16px;
`

const LoaderContainer = styled.div`
  ${({ theme: { bp, dp, ...theme }, ...props }) => css`
    position: relative;
    margin: ${dp(10)} auto;
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
  `}
`

const LoadingText = styled(Typography)`
  ${({ theme: { bp, dp, ...theme }, ...props }) => css`
    font-size: ${dp(10)};
    text-align: center;
  `}
`

const LoadingSubText = styled(Typography)`
  ${({ theme: { bp, dp, ...theme }, ...props }) => css`
    text-align: center;
  `}
`

const Loader = ({ children, subText, hideWrapper = false }) => {
  function render() {
    return (
      <>
        <LoadingText variant="h4">{children}</LoadingText>

        <LoaderContainer>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LoaderContainer>

        {subText && <LoadingSubText>{subText}</LoadingSubText>}
      </>
    )
  }
  if (hideWrapper) return render()
  return <Wrapper>{render()}</Wrapper>
}

export default Loader
