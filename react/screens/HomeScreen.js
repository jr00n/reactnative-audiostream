import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import TrackPlayer, { usePlaybackState } from "react-native-track-player";

import Player from "../components/Player";

export default function HomeScreen() {
  const playbackState = usePlaybackState();

  useEffect(() => {
    setup();
    togglePlayback();
  }, []);

  async function setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  }

  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: "audiostream",
        url: "https://streaming.radio.co/s5c5da6a36/listen",
        title: "Live Audio Stream",
        artist: "radio.co",
        duration: 800,
      });
      await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        In this example the pause button is working, but with the live radio
        stream, this should not be avaible on live streams.
      </Text>
      <Player style={styles.player} onTogglePlayback={togglePlayback} />
      <Text style={styles.state}>{getStateName(playbackState)}</Text>
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: "My AudioStream Example",
};

function getStateName(state) {
  switch (state) {
    case TrackPlayer.STATE_NONE:
      return "None";
    case TrackPlayer.STATE_PLAYING:
      return "Playing";
    case TrackPlayer.STATE_PAUSED:
      return "Paused";
    case TrackPlayer.STATE_STOPPED:
      return "Stopped";
    case TrackPlayer.STATE_BUFFERING:
      return "Buffering";
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  description: {
    width: "80%",
    marginTop: 20,
    textAlign: "center",
  },
  player: {
    marginTop: 40,
  },
  state: {
    marginTop: 20,
  },
});
