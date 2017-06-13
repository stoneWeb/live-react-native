import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    Text,
    Button, 
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
    }

    componentWillReceiveProps(nextProps: any) {
      const { homeState, actions } = nextProps;
      console.log(nextProps);
      
    }

    render() {
      const { navigation } = this.props;
      return <ScrollView style={styles.container}>
              <Button
                onPress={() => navigation.navigate('Home')}
                title='Go to home tab'
              />
              <Button
                onPress={() => navigation.navigate('Live')}
                title='Go to live tab'
              />
              <Button onPress={() => navigation.goBack(null)} title='Go back' />
            </ScrollView>;
    }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

const mapStateToProps = (state: any) => ({
    homeState: state.home,
});

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(homeActions, dispatch)
});

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Home);