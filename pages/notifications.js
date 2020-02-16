import React, { Component } from 'react';
import withBox from '../components/hoc/withBox'
import withAuth from '../components/hoc/withAuth'
import { TopicManagerABI } from '../util/constants';
import { GAS_PRICE } from '../util/web3'

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

    this.handleLogin = (async () => { 
      this.setState({isLoading: true})

      const { auth: { account, web3 }, box: { box, profile } } = props;

      // fetch initial topics
      await this.getChatContractAndTopics(web3, account);

      const chatSpace = await box.openSpace('3chat')
      const myDid = chatSpace.DID;

      // set all to state and continue
      this.setState({ chatSpace, myDid, profile, isLoading: false });
    }).bind(this)
  }

  componentDidMount() {
    if (!this.state.myDid && !this.state.isLoading)
      this.handleLogin()
  }

  // add topic to ui list
  addToTopicList = (topic) => {
    const { topicList } = this.state;
    const updatedTopicList = topicList.slice();
    updatedTopicList.push(topic);
    this.setState({ topicList: updatedTopicList });
  }


  getChatContractAndTopics = async (web3, account) => {
    const topicManager = new web3.eth  // eslint-disable-line
      .Contract(TopicManagerABI, '0x0DE48af0d52f16B15d8Db6dAf015917AAf09F481');

    // get chat topics
    const getTopics = async (i, err, topic) => {
      if (err) return
      if (topic) this.addToTopicList(topic)

      try {
        await topicManager
          .methods
          .topics(i)
          .call({}, getTopics.bind(getTopics, ++i));
      }      
      catch (e) {
        // Invalid index, no more topics
      }

      this.setState({ topicManager });
    }

    await getTopics(0);
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
        Notifications {myDid} {JSON.stringify(profile)} {JSON.stringify(topicList)}
      </div>
    );
  }
}

export default withAuth(withBox(Notifications))