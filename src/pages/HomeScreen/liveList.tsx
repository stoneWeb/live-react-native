import * as React from 'react';
import { 
    Text,
    View,
    Image,
    Platform, 
    ListView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {
    LIVEPLAY,
} from '../../constants/Navigation';
import {
    IListItem,
} from './home';

import Ionicons from 'react-native-vector-icons/Ionicons';
import tools from '../../utils/tools';
const { height, width } = Dimensions.get('window');

class LiveList extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        
    }

    componentWillReceiveProps(nextProps: any) {
      const { homeState, actions } = nextProps;
      console.log(nextProps);
      
    }

    _renderRowData(item: IListItem) {
        const { navigation } = this.props;
        const { snapshot } = tools.generatePlayUri(item.key);
        return  <TouchableOpacity onPress={() => navigation.dispatch({ type: LIVEPLAY, params: { streamkey: item.key }})}>
                    <View style={styles.liveItem}>
                        <Image
                            style={styles.snapshot}
                            resizeMode={'cover'}
                            source={{uri: snapshot}}
                        />
                        <Text>直播间：{ item.key }</Text>
                    </View>
                </TouchableOpacity>;
    }

    render() {
      const { homeState } = this.props;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      return <ListView
                enableEmptySections={true}
                contentContainerStyle={styles.list}
                dataSource={ds.cloneWithRows(homeState.list)}
                renderRow={(rowData) => this._renderRowData(rowData)}
                />;
    }
}
const itemWidth = (width - 30) / 2;
const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    liveItem: {
        width: itemWidth,
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
        paddingHorizontal: 5,
        paddingVertical: 15
    },
    snapshot: {
        width: itemWidth - 10,
        height: 100
    }
});

export default LiveList;