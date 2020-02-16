import React, { useState } from 'react'
import {
  Button,
  Typography,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import { timeSince } from '../../util/helpers';
import dynamic from 'next/dynamic'

const ProfileHover = dynamic(() => import('profile-hover'), { ssr: false })


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

  return (
    <div>
      {!!myAddress &&
        <ProfileHover address={myAddress} />
      }

      {message} <span>{timeSince(timestamp * 1000)}</span>
    </div>
  );
}

export default Notification;