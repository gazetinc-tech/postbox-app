import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../comp/Header';

export default function Account ({ navigation } ) {
	return (
		<View style={{ flex: 1, backgroundColor: '#E6EEFA' }}>
			<Header
				navigation={navigation}
				label={'My Account'}
			/>
			<View style={{ flex: 1 }}>

			</View>
		</View>
	);
}
