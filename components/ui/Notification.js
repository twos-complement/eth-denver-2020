import React, { useState } from 'react'
import {
  Button,
  Typography,
  Paper,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import { timeSince, elipsisText } from '../../util/helpers';
import dynamic from 'next/dynamic'
import { renderTextAsParagraphs } from '../../util/typography';
import ReadReceipt from '../../components/ui/ReadReceipt';

const ProfileAvatar = dynamic(() => import('./ProfileAvatar'), { ssr: false });

const NotificationPaper = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  && {
    margin: auto;
  }
`}`;

const NotificationProfile = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  > * {
    float: none;
  }
`}`;

const NotificationMessage = styled(Typography)`${({ theme: {dp, ...theme}, ...props }) => css`
  padding-left: ${dp(68)};
`}`;

const ReadReceiptContainer = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  display: grid;
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
        {!!author &&
          <ProfileAvatar did={author} />
        }
      </NotificationProfile>

      <NotificationMessage variant="body1">{renderTextAsParagraphs(expandedMessage)}</NotificationMessage>

      <NotificationMessage variant="caption">{timeSince(timestamp * 1000)}</NotificationMessage>


      <ReadReceiptContainer>
        <ReadReceipt />
      </ReadReceiptContainer>
    </NotificationPaper>
  );
}

export default Notification;