import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    Text,
    Platform, 
    ScrollView, 
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    IHomeState,
    IPropsInterface
} from './home';
import homeActions from '../../actions/home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LiveList from './liveList';

class Home extends React.Component<any, any> {
    static navigationOptions = {
      title: '直播',
      tabBarLabel: 'Home',
      labelStyle: {
        paddingBottom: 3
      },
      tabBarIcon: ({ tintColor, focused }: any) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    };

    componentWillMount() {
      const { actions } = this.props;
      console.log('----------- home Props ----------');
      actions.fetchLiveList();
      /*actions.fetchLiveList({
        liveonly: true
      });*/
    }

    componentWillReceiveProps(nextProps: any) {
      const { homeState, actions } = nextProps;
      console.log(nextProps);
      
    }

    render() {
      const { navigation, homeState } = this.props;
      return <ScrollView style={styles.container}>
              {
                homeState.list.length ?
                <LiveList {...this.props}/>
                : <Text>暂无直播</Text>
              }
            </ScrollView>;
    }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

const mapStateToProps = (state: any) => ({
    homeState: state.home,
});

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(homeActions, dispatch)
});

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
    return {...ownProps, ...stateProps, ...dispatchProps};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Home);