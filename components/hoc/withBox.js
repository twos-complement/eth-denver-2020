import React, { useState } from 'react'
import Box from '3box'

import { BoxContext } from '../../components/context'
import { Loader } from '../../components/ui'

export const BoxProvider = props => {
  const [box, setBox] = useState()
  const [space, setSpace] = useState()
  const [profile, setProfile] = useState()
  const [isLoadingBox, setIsLoadingBox] = useState(false)

  async function loadBox(auth) {
    setIsLoadingBox(true)
    const profile = await Box.getProfile(auth.account)
    setProfile(profile)
    const box = await Box.openBox(auth.account, auth.fm.getProvider())
    setBox(box)
    const space = await box.openSpace(process.env.SPACE_NAME)
    setSpace(space)
    setIsLoadingBox(false)
  }

  return (
    <BoxContext.Provider
      value={{
        box,
        space,
        loadBox,
        profile,
        isLoadingBox,
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
        if (!context.box && !context.isLoadingBox) {
          // Box not loaded, begin loading, using fm from auth provider:
          context.loadBox(props.auth)
        }

        if (!context.box || !context.space) {
          return <Loader>Loading 3Box Box and Space...</Loader>
        }

        // Box loaded, render:
        return <Component {...props} box={context} />
      }}
    </BoxContext.Consumer>
  )
}

export default withBox
