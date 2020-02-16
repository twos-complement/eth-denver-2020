import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Dialogue from '../../components/ui/Dialogue';
import { Loader } from '../../components/ui'
import {
  Typography,
  Paper,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const FeedContainer = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  display: grid;
  grid-template-columns: ${dp(350)} auto;
  grid-column-gap: ${dp(15)};
  height: 100%;
`}`;

const ThreadTopics = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  padding: ${dp(12)};
  background-color: ${theme.colors.primary700};
`}`;

const topics = [
  {
    title: 'State of Colorado',
    severity: 'Critical',
  },
  {
    title: 'Small Business Association',
    severity: 'Non-Critical',
  },
  {
    title: 'Secretary of State',
    severity: 'Non-Critical',
  },
]

const TopicHeader = styled(Typography)`${({ isSelected, theme: {dp, ...theme}, ...props }) => css`
  color: ${isSelected ? theme.colors.primary900 : theme.colors.primary100};
`}`;

const TopicPaper = styled(Paper)`${({ isSelected, theme: {dp, ...theme}, ...props }) => css`
  && {
    background-color: ${isSelected ? theme.colors.neutral050 : theme.colors.primary700};
    box-shadow: none;
    border-radius: ${dp(8)};
  }
`}`;

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTopic: 'State of Colorado',
      activeTopic: null,
      openTopics: {},
      threadData: [],
      topicTitle: '',
      threadACError: '',
      isLoading: false,
    };


    this.handleViewTopic = (async (topic) => {
      const { openTopics } = this.state;
      const { notificationsSpace, myAddress } = props;

      console.log(notificationsSpace, topic);

      // clean topic state
      this.setState({
        topicTitle: topic,
        threadData: [],
      });

      // if topic fetched before, use again
      if (openTopics[topic]) {
        this.setState({ activeTopic: openTopics[topic] }, () => {
          this.updateThreadPosts();
        });
        return
      }

      console.log(topic);

      const thread = await notificationsSpace.joinThread(topic, { firstModerator: myAddress, members: true });

      openTopics[topic] = thread;

      this.setState({ activeTopic: openTopics[topic] });

      thread.onUpdate(() => this.updateThreadPosts());

      await this.updateThreadPosts();
      this.setState({isLoading: false});

    }).bind(this);    
  }

  componentDidMount() {
    console.log(this.props.notificationsSpace )
    if (this.props.notificationsSpace && this.props.notificationsSpace.isOpen && !this.state.activeTopic && !this.state.isLoading) {
      this.handleViewTopic("alerts");
      this.setState({isLoading: true});
    }
  }

  updateThreadPosts = async () => {
    const { activeTopic } = this.state;
    this.updateThreadError();

    let threadData = [];
    const posts = await activeTopic.getPosts();
    posts.map(post => threadData.push(post))
    this.setState({ threadData });
  }

  updateThreadError = (e = '') => {
    console.log('error', e);
    this.setState({ threadACError: e });
  }



  render() {
    const {
      topicTitle,
      threadData,
      openTopics,
      activeTopic,
      threadACError,
      selectedTopic,
      isLoading
    } = this.state;

    const {
      myProfile,
      myAddress,
      myDid,
    } = this.props;

    if (!activeTopic || isLoading)
      return <Loader>Loading thread...</Loader>

    return (
      <FeedContainer>     
        <ThreadTopics>
          {topics.map(topic => (
            <TopicPaper isSelected={selectedTopic === topic.title} key={topic.title}>
              <TopicHeader isSelected={selectedTopic === topic.title} variant="h6">{topic.title}</TopicHeader>
              <Typography variant="body2">{topic.severity}</Typography>
            </TopicPaper>
          ))}
        </ThreadTopics>

        <Dialogue
          updateThreadError={this.updateThreadError}
          threadData={threadData}
          activeTopic={activeTopic}
          myAddress={myAddress}
          myDid={myDid}
        />

      </FeedContainer>
    );
  }
}
export default Notifications;
