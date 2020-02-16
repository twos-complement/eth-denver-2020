import React, { Component } from 'react';
import withBox from '../components/hoc/withBox'
import withAuth from '../components/hoc/withAuth'
import withNotifications from '../components/hoc/withNotifications'
import { Loader } from '../components/ui'

import Feed from '../components/views/Feed';

const FeedPage = ({ 
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
      <Feed
        notificationsSpace={notificationsSpace}
        myProfile={profile}
        myAddress={account}
        myDid={notifications.did}
      />
    </div>
  );
}

export default withAuth(withBox(withNotifications(FeedPage)))
