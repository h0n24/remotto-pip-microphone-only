function toggleMicrophone() {
  // get the current state of the microphone
  const currentState = APP.conference.isLocalAudioMuted();

  // toggle the state of the microphone in the remotto
  APP.conference.toggleAudioMuted(!currentState);

  // toggle the state inside Picture-in-Picture window
  navigator.mediaSession.setMicrophoneActive(currentState);
}

function createPictureInPicture() {
  // Add a button to the picture-in-picture mode via MediaSession's setActionHandler() method
  if ("mediaSession" in navigator) {
    const currentState = APP.conference.isLocalAudioMuted();

    // set the initial state of the microphone
    // has to be opposite due to the isLocalAudioMuted() function
    navigator.mediaSession.setMicrophoneActive(!currentState);

    console.log("navigator.mediaSession", navigator.mediaSession);

    navigator.mediaSession.setActionHandler("togglemicrophone", () => {
      toggleMicrophone();
    });
  }
}

createPictureInPicture();
