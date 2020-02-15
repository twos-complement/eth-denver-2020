import React from 'react';
import styled, { css } from 'styled-components';

import { Scrollbar } from '../../components/ui';

const Layout = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
`}`;

const PublicLayout = ({ children, }) => {
  return (
    <Layout>
      <Scrollbar>
        {children}
      </Scrollbar>
    </Layout>
  );
};

export default PublicLayout;