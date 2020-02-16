import React, { useState } from 'react'
import {
  Typography,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Notification } from '../../components/ui';

const NotificationsHeader = styled(Typography)`${({ theme: {dp, ...theme}, ...props }) => css`
  color: ${theme.colors.neutral800};

  && {
    padding-bottom: ${dp(16)};
  }
`}`;

const Buttons = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${dp(15)};
`}`;

const NotificationsDialogue = (
{
  myDid,
  threadData,
  activeTopic,
}) => {
  const [message, setMessage] = useState('');

  return (
    <div>
      <NotificationsHeader variant="h5">Messages</NotificationsHeader>
      {!!threadData.length && threadData.map(post => (
        <Notification
          post={post}
          did={myDid}
          key={post.postId}
        />
      ))}
    </div>
  );
}

export default NotificationsDialogue;