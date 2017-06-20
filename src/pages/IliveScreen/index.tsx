import * as React from 'react';
import { 
    Text, 
    Platform, 
    ScrollView, 
    StyleSheet
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Ilive extends React.Component<any, any> {
    static navigationOptions = {
      tabBarIcon: ({ tintColor, focused }: any) => (
        <Ionicons
          name={focused ? 'ios-videocam' : 'ios-videocam-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    };
    render () {
      const { navigation } = this.props;
      return <ScrollView style={styles.container}>
              <Text>直播</Text>
            </ScrollView>;
    }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  }
});