import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function HeaderWithSearch({navigation, title}) {
	return (
		<View
			style={{
				justifyContent: 'space-between',
				padding: 15,
				flexDirection: 'row',
				alignItems: 'center',
			}}>
			<TouchableOpacity
				onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
				<FastImage
					source={require('../image/Menu.png')}
					style={{height: 40, width: 40}}
					resizeMode={FastImage.resizeMode.stretch}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}>
				<Text
					style={{
						fontSize: 20,
						fontWeight: '400',
						fontFamily: 'Actor-Regular',
						color: '#fff',
					}}>
					{title}
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				//@ts-ignore
				onPress={() => navigation.navigate('SearchScreen')}
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<FastImage
					source={require('../image/search.png')}
					resizeMode={FastImage.resizeMode.stretch}
					style={{height: 45, width: 45}}
				/>
			</TouchableOpacity>
		</View>
	);
}


// flex: 1,
// backgroundColor: '#fff',
// width: '100%',
// borderTopLeftRadius: moderateScale(40),
// borderTopRightRadius: moderateScale(40),
// padding: heightPercentageToDP(2),
// marginTop: heightPercentageToDP(1)