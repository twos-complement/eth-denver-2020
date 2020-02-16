import styled, { css } from 'styled-components';
import React, { Component } from 'react';
import withBox from '../components/hoc/withBox'
import withAuth from '../components/hoc/withAuth'
import withNotifications from '../components/hoc/withNotifications'
import { Loader } from '../components/ui'
import {
  Typography,
} from '@material-ui/core';
import Notifications from '../components/views/Notifications';
import NavLayout from '../components/layouts/NavLayout'

const NotificationsHeader = styled(Typography)`${({ theme: {dp, ...theme}, ...props }) => css`
  color: ${theme.colors.neutral050};
  background-color: ${theme.colors.primary500};

  && {
    padding: ${dp(64)} 0 ${dp(30)} ${dp(30)};
  }
`}`;

const Page = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  height: 100%;
`}`;

const NotificationsPage = ({ 
  notifications,
  auth,
  box,
  isLoading,
 }) => {
  const { notificationsSpace } = notifications;
  const { account, logout } = auth;
  const { profile } = box;

  if (isLoading)
    return <Loader>Loading topics...</Loader>

  return (
    <NavLayout logout={logout} account={account}>
      <Page>
        <NotificationsHeader variant="h4">Messages</NotificationsHeader>

        <Notifications
          notificationsSpace={notificationsSpace}
          myProfile={profile}
          myAddress={account}
          myDid={notifications.did}
        />
      </Page>
    </NavLayout>
  );
}

export default withAuth(withBox(withNotifications(NotificationsPage)))
