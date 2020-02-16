import React, { Component } from 'react';
import withBox from '../components/hoc/withBox'
import withAuth from '../components/hoc/withAuth'
import { TopicManagerABI } from '../util/constants';

// import Chat from './ui/views/Chat';

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatSpace: {},
      myDid: null,
      topicList: [],
      topicManager: {},
      isLoading: false,
    };
  }

  componetDidUpdate() {
    if (!this.state.myDid)
      handleLogin()
  }

  handleLogin = async () => { 
    this.setState({isLoading: true})

    const { auth: { account, web3 }, box: { box, profile } } = this.props;

    // fetch initial topics
    this.getChatContractAndTopics(web3);

    const chatSpace = await box.openSpace('3chat')
    const myDid = chatSpace.DID;

    // set all to state and continue
    this.setState({ chatSpace, myDid, profile, isLoading: false });
  }

  // add topic to ui list
  addToTopicList = (topic) => {
    const { topicList } = this.state;
    const updatedTopicList = topicList.slice();
    updatedTopicList.push(topic);
    this.setState({ topicList: updatedTopicList });
  }


  getChatContractAndTopics = (web3) => {
    const topicManager = web3.eth  // eslint-disable-line
      .contract(TopicManagerABI).at('0x0DE48af0d52f16B15d8Db6dAf015917AAf09F481');

    // get chat topics
    const getTopics = (i, err, topic) => {
      if (err) return
      if (topic) this.addToTopicList(topic)
      topicManager.topics(i, getTopics.bind(getTopics, ++i));
      this.setState({ topicManager });
    }

    getTopics(0);
  }

  render() {
    const {
      chatSpace,
      topicManager,
      topicList,
      myDid,
      isLoading,
    } = this.state;
    const { auth: { account, web3 }, box: { box, profile } } = this.props;

    return (
      <div>
        Notifications {myDid} {JSON.stringify(profile)}
      </div>
    );
  }
}

export default withAuth(withBox(Notifications))