import * as React from 'react';
import {
    View,
    Text,
    Alert,
    Platform,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import Pili from 'react-native-pili';
const { height, width } = Dimensions.get('window');
const {
    Player,
    Streaming,
    StreamingConst
} = Pili;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

export default class StreamView extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            muted: false,
            started: true,
            text: '...',
            focus: true,
            zoom: 1,
        };
    }

    componentWillMount() {
      const { actions, broadcastLiveState } = this.props;
      if (broadcastLiveState.streamUri) {
        // actions.fetchCreateRtmp();
      }
    }

    _zoom(type: string) {
        let { zoom } = this.state;
        zoom = zoom + (type === 'zoomIn' ? 1 : -1);
        zoom = zoom > 3 ? 3 : zoom;
        zoom = zoom < 1 ? 1 : zoom;
        this.setState({
            zoom
        });
    }

    render() {
        const { actions, broadcastLiveState } = this.props;
        const { title, streamUri, setting } = broadcastLiveState;
        console.log(streamUri);
        
        return (
            <View style={styles.container}>
                <Streaming
                    rtmpURL={streamUri}
                    style={{
                        height,
                        width
                    }}
                    zoom={this.state.zoom}
                    focus={this.state.focus}
                    profile={{
                        video: {
                            fps: 30,
                            bps: 1000 * 1024,
                            maxFrameInterval: 48
                        },
                        audio: {
                            rate: 44100,
                            bitrate: 96 * 1024
                        },
                        encodingSize: StreamingConst.encodingSize._480
                    }}
                    started={this.state.started}
                    onReady={() => { console.log('onReady'); }} //onReady event
                    onConnecting={() => { console.log('onConnecting'); }} //onConnecting event
                    onStreaming={() => { console.log('onStreaming'); }} //onStreaming event
                    onShutdown={() => { console.log('onShutdown'); }} //onShutdown event
                    onIOError={() => { console.log('onIOError'); }} //onIOError event
                    onDisconnected={() => { console.log('onDisconnected'); }} //onDisconnected event
                />
                <View style={{position: 'absolute', left: 50, top: 50, width: 200, height: 200}}>
                        <Text>state: {this.state.text}</Text>
                    <TouchableOpacity onPress={this._zoom.bind(this, 'zoomIn')}>
                        <Text style={{height: 30, width: 100}}>Zoom+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._zoom.bind(this, 'zoomOut')}>
                        <Text style={{height: 30, width: 100}}>Zoom-</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}