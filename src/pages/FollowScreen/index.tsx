import * as React from 'react';
import { 
    Button, 
    Platform, 
    ScrollView, 
    StyleSheet
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Follow extends React.Component<any, any> {
  static navigationOptions = {
      tabBarLabel: 'Follow',
      tabBarIcon: ({ tintColor, focused }: any) => (
        <Ionicons
          name={focused ? 'ios-aperture' : 'ios-aperture-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    };
    render () {
      const { navigation } = this.props;
      return <ScrollView style={styles.container}>
              <Button onPress={() => navigation.goBack(null)} title='Go back' />
            </ScrollView>;
    }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});