import React, { useState } from 'react'
import {
  Button,
  Typography,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import { timeSince } from '../../util/helpers';

const Notification = (
{
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
      {message} <span>{timeSince(timestamp * 1000)}</span>
    </div>
  );
}

export default Notification;