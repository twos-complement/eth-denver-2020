import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Avatar = styled.div`${({ url, theme: {dp, ...theme}, ...props }) => css`
  background-image: url(${url || `/static/images/avatar-default.png`});
  background-size: cover;
  width: ${dp(56)};
  height: ${dp(56)};
  border-radius: 50%;
`}`;

Avatar.propTypes = {
  // Url to avatar icon
  url: PropTypes.string,
};

Avatar.defaultProps = {
  // Url to avatar icon
  url: null,
};

export default Avatar;