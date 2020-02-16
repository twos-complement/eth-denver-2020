import React, { useState } from 'react'
import {
  Button,
  Typography,
  Paper,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import { timeSince, elipsisText } from '../../util/helpers';
import { renderTextAsParagraphs } from '../../util/typography';
import dynamic from 'next/dynamic'
const ProfileHover = dynamic(() => import('profile-hover'), { ssr: false })

const NotificationPaper = styled(Paper)`${({ theme: {dp, ...theme}, ...props }) => css`
  && {
    max-width: ${dp(640)};
    margin: auto;
  }
`}`;

const NotificationProfile = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  > * {
    float: none;
  }
`}`;


const Notification = (
{
  myAddress,
  post,
  did,
}) => {
  const {
    author,
    message,
    postId,
    timestamp,
  } = post;

  const [expanded, setExpanded] = useState(false);

  const expandedMessage = expanded ? message : elipsisText(message, 300);

  return (
    <NotificationPaper onClick={() => setExpanded(!expanded)}>
      <NotificationProfile>
        {!!myAddress &&
          <ProfileHover address={myAddress} />
        }
      </NotificationProfile>

      <Typography variant="h6">{renderTextAsParagraphs(expandedMessage)}</Typography> <Typography variant="caption">{timeSince(timestamp * 1000)}</Typography>
    </NotificationPaper>
  );
}

export default Notification;