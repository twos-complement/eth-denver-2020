import styled, { css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`${({ theme: {dp, bp, ...theme}, ...props }) => css`
  html, body {
    height: 100%;
    padding: 0;
    margin: 0;
    position: fixed;
    overflow: hidden;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overscroll-behavior: none;
  }

  // XSM - 320
  ${bp.xsm`
    html {
      font-size: 10.67px;
    }
  `}

  // SMM - 360
  ${bp.smm`
    html {
      font-size: 12px;
    }
  `}

  // MDM - 411
  ${bp.mdm`
    html {
      font-size: 13.7px;
    }
  `}

  // LGM - 480
  ${bp.lgm`
    html {
      font-size: 16px;
    }
  `}

  // SMT - 600
  ${bp.smt`
    html {
      font-size: 12.5px;
    }
  `}

  // MDT - 768
  ${bp.mdt`
    html {
      font-size: 16px;
    }
  `}

  // LGT - 960
  ${bp.lgt`
    html {
      font-size: 20px;
    }
  `}

  // XLD - 2560
  ${bp.xld`
    html {
      font-size: 21.33px;
    }
  `}

  * {
    box-sizing: border-box;
  }
`}`;

export default GlobalStyle;
