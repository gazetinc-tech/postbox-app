import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export default function LoaderFs() {
	return (
		<View
			style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<ActivityIndicator size={'large'} color={'#000000'} />
		</View>
	);
}
