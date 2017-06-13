import * as React from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { TabNavigator } from 'react-navigation';
import Home from '../HomeScreen/index';
import Live from '../LiveScreen/index';
import My from '../MyScreen/index';
import Follow from '../FollowScreen/index';

import tabs from '../../constants/Tabs';

const TabView = TabNavigator(
    {
        Home: {
            screen: Home,
            path: '',
        },
        Live: {
            screen: Live,
            path: 'Live',
        },
        Follow: {
            screen: Follow,
            path: 'Follow',
        },
        My: {
            screen: My,
            path: 'My',
        },
    },
    {
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff'
        },
    }
);

export default TabView;