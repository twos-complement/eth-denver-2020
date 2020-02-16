import React, { useState } from 'react'
import Box from '3box'

import { BoxContext } from '../../components/context'

export const BoxProvider = props => {
  const [box, setBox] = useState()
  const [profile, setProfile] = useState()

  function loadBox(auth) {
    Box.getProfile(auth.account).then(profile => setProfile(profile))

    Box.openBox(auth.account, auth.fm.getProvider()).then(box => {
      setBox(box)
    })
  }

  return (
    <BoxContext.Provider
      value={{
        box,
        loadBox,
        profile,
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
        if (!context.box) {
          console.log(props.auth.fm)
          // Box not loaded, begin loading, using fm from auth provider:
          context.loadBox(props.auth)
          return <p>Loading Box...</p>
        }

        // Box loaded, render:
        return <Component {...props} box={context} />
      }}
    </BoxContext.Consumer>
  )
}

export default withBox
