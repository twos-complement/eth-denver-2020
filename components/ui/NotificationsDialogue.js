import React, { useState } from 'react'
import {
  Typography,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Notification } from '../../components/ui';

const Buttons = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${dp(15)};
  padding: ${dp(32)} ${dp(16)};
`}`;

const NotificationsDialogueContainer = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  padding: ${dp(12)};
`}`;


const NotificationsDialogue = (
{
  myDid,
  threadData,
  activeTopic,
  myAddress,
}) => {
  const [message, setMessage] = useState('');

  return (
    <NotificationsDialogueContainer>
      {!!threadData.length && threadData.map(post => (
        <Notification
          post={post}
          did={myDid}
          key={post.postId}
          myAddress={myAddress}
        />
      ))}
    </NotificationsDialogueContainer>
  );
}

export default NotificationsDialogue;