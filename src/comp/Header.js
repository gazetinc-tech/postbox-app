import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import ImageComp from './ImageComp';

export default function Header ( { navigation, label, backBtn } ) {
	return (
		<View
			style={{
				// justifyContent: 'space-between',
				padding: 15,
				flexDirection: 'row',
				alignItems: 'center',
				backgroundColor: '#611EBD'
			}}>

			<TouchableOpacity
				onPress={() => navigation.goBack()}>
				{backBtn === true ?
					<ImageComp
						source={require( '../image/arrow-left.png' )}
						height={3}
						width={heightPercentageToDP( 3 )}
						mode={'contain'}
						style={{ tintColor: '#FFFFFF' }}
					/>
					:
					<TouchableOpacity
						onPress={() => { navigation.openDrawer() }}>
						<FastImage
							source={require( '../image/Menu.png' )}
							style={{ height: 40, width: 40 }}
							resizeMode={FastImage.resizeMode.stretch}
						/>
					</TouchableOpacity>
				}
			</TouchableOpacity>


			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					paddingLeft: widthPercentageToDP( 8 )
				}}>
				<Text
					style={{
						fontSize: 20,
						fontWeight: '400',
						fontFamily: 'Actor-Regular',
						color: '#fff',
					}}>
					{label}
				</Text>
			</View>
		</View >
	);
}
