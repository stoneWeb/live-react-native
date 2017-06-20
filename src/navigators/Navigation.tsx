import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import {
    TABVIEW,
    LIVEPLAY,
    BROADCASTLIVE,
} from '../constants/Navigation';

import TabScreen from '../pages/TabScreen/index';
import LivePlayScreen from '../pages/LivePlayScreen/index';
import BroadcastLiveScreen from '../pages/BroadcastLiveScreen/index';

interface IArgs {
    dispatch: any;
    nav: any;
}

export const AppNavigator = StackNavigator({
    [TABVIEW]: { screen: TabScreen },
    [LIVEPLAY]: { screen: LivePlayScreen },
    [BROADCASTLIVE]: { screen: BroadcastLiveScreen }
});

const AppWithNavigationState = ({ dispatch, nav }: IArgs) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = (state: any) => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);