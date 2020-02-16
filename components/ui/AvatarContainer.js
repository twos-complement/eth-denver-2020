import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const AvatarHolder = styled.div`${({ size, theme: {dp, ...theme}, ...props }) => css`
  width: 100%;
  display: grid;
  justify-content: end;
  top: ${dp(16)};
  right: ${dp(16)};
  width: ${dp(size)};
  height: ${dp(size)};
  margin-right: ${dp(8)};
  border-radius: 50%;
  box-sizing: content-box;
  border: ${dp(1.5)} solid ${theme.colors.primary050};
  background-color: ${theme.colors.primary100};
  box-shadow: ${dp(0)} ${dp(2)} ${dp(6)} rgba(0, 0, 0, 0.16);
  cursor: pointer;

  && {
    z-index: 5;
  }
`}`;

const AvatarContainer = ({
  size,
  onClick,
  children,
}) => (
  <AvatarHolder
    size={size}
    onClick={onClick}
    >
    {children}
  </AvatarHolder>
);

AvatarContainer.propTypes = {
  // Diameter of avatar container
  size: PropTypes.number,

  // Is avatar visible
  isAvatarVisible: PropTypes.bool,
};

AvatarContainer.defaultProps = {
  size: 56,
  isAvatarVisible: true,
};

export default AvatarContainer;
