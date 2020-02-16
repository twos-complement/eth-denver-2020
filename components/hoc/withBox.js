import React, { useState } from 'react'
import Box from '3box'

import { BoxContext } from '../../components/context'

export const BoxProvider = props => {
  const [box, setBox] = useState()
  const [space, setSpace] = useState()
  const [profile, setProfile] = useState()
  const [isLoading, setIsLoading] = useState(false)

  async function loadBox(auth) {
    setIsLoading(true)
    const profile = await Box.getProfile(auth.account)
    setProfile(profile)
    const box = await Box.openBox(auth.account, auth.fm.getProvider())
    setBox(box)
    const space = await box.openSpace('rock-a-bye-babies')
    setSpace(space)
    setIsLoading(false)
  }

  return (
    <BoxContext.Provider
      value={{
        box,
        space,
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
        }

        if (!context.box || !context.space) {
          return <p>Loading 3Box Box and Space...</p>
        }

        // Box loaded, render:
        return <Component {...props} box={context} />
      }}
    </BoxContext.Consumer>
  )
}

export default withBox
