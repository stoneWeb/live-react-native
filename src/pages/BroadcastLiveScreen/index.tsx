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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import broadcastLiveActions from '../../actions/broadcastLive';
import { TabNavigator } from 'react-navigation';
import StreamView from './streamView';

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    paddingHorizontal: 20
  },
  inputBox: {
      height: 25
  }
});

class BroadcastLiveScreen extends React.Component<any, any> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);

        // Initial state
        this.state = {
            text: '',
        };
    }

    componentWillMount() {
      const { actions, broadcastLiveState } = this.props;
      if (broadcastLiveState.streamUri) {
        // actions.fetchCreateRtmp();
      }
    }

    _startBroadcast() {
        const { actions, broadcastLiveState } = this.props;
        if (broadcastLiveState.streamUri) {
            return;
        }

        let { text } = this.state;
        let title = text.trim();
        if (!title) {
            Alert.alert(
                '系统提示',
                '请完善标题',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed!')},
                ]
            );
        } else {
            actions.fetchCreateRtmp({
                streamkey: 'first',
                title
            });
        }
    }

    _renderSetup() {
        return <View style={styles.container}>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={(text: string) => this.setState({text})}
                        placeholder={'输入直播标题！'}
                        value={this.state.text}
                    />
                    <TouchableOpacity onPress={() => this._startBroadcast()}>
                        <Text>开始直播</Text>
                    </TouchableOpacity>
               </View>;
    }

    render() {
        const { broadcastLiveState } = this.props;
        const { title, streamUri, setting } = broadcastLiveState;
        if (!streamUri) {
            return this._renderSetup();
        } else {
            console.log('开始直播！');
            return <StreamView {...this.props} />;
        }
    }
}

const mapStateToProps = (state: any) => ({
    broadcastLiveState: state.broadcastLive,
});

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(broadcastLiveActions, dispatch)
});

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
    return {...ownProps, ...stateProps, ...dispatchProps};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(BroadcastLiveScreen);