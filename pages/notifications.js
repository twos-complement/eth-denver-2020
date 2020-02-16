import React, { Component } from 'react';
import withBox from '../components/hoc/withBox'
import withAuth from '../components/hoc/withAuth'
import withNotifications from '../components/hoc/withNotifications'
import { Loader } from '../components/ui'

import Notifications from '../components/views/Notifications';

const NotificationsPage = ({ 
  notifications,
  auth,
  box,
  isLoading,
 }) => {
  const { notificationsSpace } = notifications;
  const { account } = auth;
  const { profile } = box;

  if (isLoading)
    return <Loader>Loading topics...</Loader>

  console.log(profile, account);

  return (
    <div>
      <Notifications
        notificationsSpace={notificationsSpace}
        myProfile={profile}
        myAddress={account}
        myDid={notifications.did}
      />
    </div>
  );
}

export default withAuth(withBox(withNotifications(NotificationsPage)))
