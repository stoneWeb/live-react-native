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
import tools from '../../utils/tools';
import Pili from 'react-native-pili';
const { height, width } = Dimensions.get('window');
const {
    Player,
    Streaming,
    StreamingConst
} = Pili;

const styles = StyleSheet.create({
  container: {
    height,
    width
  }
});

class LivePlayScreen extends React.Component<any, any> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
      
    }

    render() {
        const { streamkey } = this.props.navigation.state.params;
        const { rtmp } = tools.generatePlayUri(streamkey);
        
        return <View style={styles.container}>
                <Player
                    source={{
                          uri: rtmp,
                          //controller: true, // Android only
                          timeout: 10 * 1000,
                          live: true,
                          hardCodec: false,
                        }}
                    started={true}
                    style={{
                          height: height,
                          width: width,
                          flex: 1
                        }}
                    aspectRatio={2}
                    />
              </View>;
    }
}

export default LivePlayScreen;