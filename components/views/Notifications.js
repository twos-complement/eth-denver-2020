import React, { Component } from 'react';

import Dialogue from '../../components/ui/Dialogue';
import { Loader } from '../../components/ui'

import TextField from '@material-ui/core/TextField';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <div>
        <Dialogue
          updateThreadError={this.updateThreadError}
          threadData={threadData}
          activeTopic={activeTopic}
          myAddress={myAddress}
          myDid={myDid}
        />

      </div>
    );
  }
}
export default Notifications;
