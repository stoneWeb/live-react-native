import * as React from 'react';
import { 
    Text, 
    Platform, 
    ScrollView, 
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    BROADCASTLIVE,
} from '../../constants/Navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class My extends React.Component<any, any> {
  static navigationOptions = {
      tabBarLabel: 'My',
      tabBarIcon: ({ tintColor, focused }: any) => (
        <Ionicons
          name={focused ? 'ios-contact' : 'ios-contact-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    };
    render () {
      const { navigation } = this.props;
      console.log(navigation);
      return <ScrollView style={styles.container}>
              <TouchableOpacity onPress={() => navigation.dispatch({ type: BROADCASTLIVE })}>
                <Text>我要直播</Text>
              </TouchableOpacity>
            </ScrollView>;
    }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  }
});