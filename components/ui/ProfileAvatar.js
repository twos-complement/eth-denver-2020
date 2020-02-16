import styled, { css } from 'styled-components';
import React, { useState, useEffect } from 'react'
import makeBlockie from 'ethereum-blockies-base64';
import Box from '3box';
import resolve from 'did-resolver';
import { AvatarContainer, Avatar } from '../../components/ui';
import {
  Typography,
} from '@material-ui/core';


const AvatarSection = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
`}`;


const ProfileAvatar = (
{
  did,
  isTile,
  isUseHovers,
  isModerator,
  isOwner,
}) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileName, setProfileName] = useState('');
  const [blockie, setBlockie] = useState('');
  const [ethAddr, setEthAddr] = useState('');

  useEffect(() => {
    let ethAddr;
    let profilePicture;
    let profileName;

    console.log("Loading");

    resolve(did).then(doc => {
      Box.getProfile(did).then(profile => {
        profileName = profile.name;
        profilePicture = profile.image;
        ethAddr = doc.publicKey[2].ethereumAddress;

        const blockie = makeBlockie(ethAddr);

        setProfilePicture(profilePicture)
        setEthAddr(ethAddr)
        setProfileName(profileName)
        setBlockie(blockie)
      })
    })
  })

  const image = !!profilePicture ? `https://ipfs.infura.io/ipfs/${profilePicture[0].contentUrl['/']}` : blockie;

  return (
    <AvatarSection>
      <AvatarContainer onClick={() => { window.location.href = `https://3box.io/${ethAddr}`}}>
        <Avatar url={image} />
      </AvatarContainer>

      <Typography variant="subtitle2">{profileName}</Typography>
    </AvatarSection>
  );
}

export default ProfileAvatar;