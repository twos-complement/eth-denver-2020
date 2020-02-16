import React, { useState } from 'react'
import {
  Button,
  Typography,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Input, Notification } from '../../components/ui';

const FormSection = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  padding-bottom: ${dp(30)};

  > :first-child {
    padding-bottom: ${dp(10)};
  }
`}`;

const FormHeader = styled(Typography)`${({ theme: {dp, ...theme}, ...props }) => css`
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

const Dialogue = (
{
  myDid,
  threadData,
  activeTopic,
  updateThreadError
}) => {
  const [message, setMessage] = useState('');

  const postThread = async () => {
    try {
      await activeTopic.post(message);
    }
    catch (error) {
      updateThreadError(error);
    }
  }

  const searchEnter = async (event) => {
    if (event.keyCode === 13 && activeTopic) {
      await this.postThread();
    }
  }

  return (
    <div>
      {!!threadData.length && threadData.map(post => (
        <Notification
          post={post}
          did={myDid}
          key={post.postId}
        />
      ))}

      <FormSection>
        <FormHeader variant="h5">Broadcast Alert</FormHeader>
        <Input
          id="notification-message"
          label="Notification Message"
          value={message}
          setter={setMessage}
          validations={[
            `required`,
          ]}
          kind="textarea"
        />
      </FormSection>

      <Buttons>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={postThread}
        >Send</Button>
      </Buttons>
    </div>
  );
}

export default Dialogue;