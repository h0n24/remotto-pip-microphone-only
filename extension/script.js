function toggleMicrophone() {
  // get the current state of the microphone
  const currentState = APP.conference.isLocalAudioMuted();

  // toggle the state of the microphone in the Remotto
  APP.conference.toggleAudioMuted(!currentState);

  // toggle the state inside Picture-in-Picture window
  navigator.mediaSession.setMicrophoneActive(currentState);
}

function getRemottoMicrophoneState() {
  // get state of the microphone in the Remotto
  const currentState = APP.conference.isLocalAudioMuted();

  // set the initial state of the microphone
  // has to be opposite due to the isLocalAudioMuted() function in Remotto
  navigator.mediaSession.setMicrophoneActive(!currentState);
}

function createPictureInPicture() {
  // check if the browser supports the Picture-in-Picture API
  if ("mediaSession" in navigator) {
    getRemottoMicrophoneState();

    // Add a button to the picture-in-picture mode via MediaSession's setActionHandler() method
    navigator.mediaSession.setActionHandler("togglemicrophone", () => {
      toggleMicrophone();
    });

    // interval prevents the bug where user clicks on mute inside Remotto,
    // but the PIP is still on -> now it propagates the state of the microphone
    setInterval(() => {
      getRemottoMicrophoneState();
    }, 2000);
  }
}

createPictureInPicture();
