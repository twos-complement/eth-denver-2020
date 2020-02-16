import React, { useState } from 'react'
import {
  Button,
  Typography,
  Paper,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import DoneIcon from '@material-ui/icons/Done';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const ReadReceiptMessage = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  align-items: center;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${dp(10)};

  && {
    margin: auto;
  }
`}`;

const ReadReceiptContainer = styled(Paper)`${({ isRead, theme: {dp, ...theme}, ...props }) => css`
  && {
    background-color: ${isRead ? theme.colors.primary500 : theme.colors.primary100};
    width: auto;
    margin: auto 0 auto auto;
    display: inline-block;    
    padding: ${dp(10)} ${dp(12)};
  }
`}`;

const ReadReceipt = (
{
  read,
}) => {
  const [isRead, setIsRead] = useState(false);

  const isDisplayingAsRead = read || isRead;

  return (
    <ReadReceiptContainer isRead={isRead} onClick={e => { setIsRead(!isRead); e.stopPropagation(); }}>
      <ReadReceiptMessage variant="h6">
        {isRead ? <DoneIcon /> : <CheckBoxOutlineBlankIcon />}
        <span>{isRead ? `Acknowledged` : `Acknowledge`}</span>
      </ReadReceiptMessage>
    </ReadReceiptContainer>
  );
}

export default ReadReceipt;