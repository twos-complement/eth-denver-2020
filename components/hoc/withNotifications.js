import React, { useState } from 'react'

import { NotificationsContext } from '../../components/context'
import { Loader } from '../../components/ui'

export const NotificationsProvider = props => {
  const [notificationsSpace, setNotificationsSpace] = useState()
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false)

  function loadNotifications({box}) {
    setIsLoadingNotifications(true);

    box.openSpace('rockabye-babies')
      .then(notificationsSpace => {
        setNotificationsSpace(notificationsSpace)
  
        setIsLoadingNotifications(false);
      })
  }

  return (
    <NotificationsContext.Provider
      value={{
        notificationsSpace,
        loadNotifications,
        isLoadingNotifications,
      }}
    >
      {props.children}
    </NotificationsContext.Provider>
  )
}

const withNotifications = Component => {
  return props => (
    <NotificationsContext.Consumer>
      {context => {
        if (!context.notificationsSpace && !context.isLoadingNotifications) {
          // Notifications not loaded, begin loading, using fm from auth provider:
          context.loadNotifications(props.box)
          return <Loader>Loading Notifications...</Loader>
        }
        else if (context.isLoadingNotifications) {
          return <Loader>Loading Notifications......</Loader>
        }

        console.log(props);
        // Notifications loaded, render:
        return <Component {...props} notifications={context} />
      }}
    </NotificationsContext.Consumer>
  )
}

export default withNotifications
