import React, { useState } from 'react'
import Box from '3box'

import { BoxContext } from '../../components/context'
import { Loader } from '../../components/ui'

export const BoxProvider = props => {
  const [box, setBox] = useState()
  const [profile, setProfile] = useState()
  const [isLoading, setIsLoading] = useState(false)

  function loadBox(auth) {
    setIsLoading(true);
    Box.getProfile(auth.account).then(profile => setProfile(profile))

    Box.openBox(auth.account, auth.fm.getProvider()).then(box => {
      setBox(box)

      setIsLoading(false);
    })
  }

  return (
    <BoxContext.Provider
      value={{
        box,
        loadBox,
        profile,
        isLoading,
      }}
    >
      {props.children}
    </BoxContext.Provider>
  )
}

const withBox = Component => {
  return props => (
    <BoxContext.Consumer>
      {context => {
        if (!context.box && !context.isLoading) {
          // Box not loaded, begin loading, using fm from auth provider:
          context.loadBox(props.auth)
          return <Loader>Loading Box...</Loader>
        }
        else if (context.isLoading) {
          return <Loader>Loading Box......</Loader>
        }
        // Box loaded, render:
        return <Component {...props} box={context} />
      }}
    </BoxContext.Consumer>
  )
}

export default withBox
