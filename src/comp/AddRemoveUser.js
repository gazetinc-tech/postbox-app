import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';
import {moderateScale} from '../utils/overAllNormalization';
import FastImage from 'react-native-fast-image';


export default function AddRemoveUser({index, item, selectedUserIds, handleRemove, handleAdd, horizontal}) {
	return (
		<View
			key={index}
			style={{
				width: horizontal ? widthPercentageToDP(35) : widthPercentageToDP(92),
				paddingHorizontal: horizontal ? widthPercentageToDP(2) : widthPercentageToDP(0),
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingVertical: moderateScale(10),
				borderBottomWidth: moderateScale(2),
				borderBottomColor: '#E6EEFA',
				backgroundColor: horizontal ? '#454545' : undefined,
				borderRadius: horizontal ? heightPercentageToDP(1.5) : heightPercentageToDP(0)
			}}>
			<View
				style={{flexDirection: 'row', alignItems: 'center'}}>

				{!horizontal &&
					<FastImage
						source={
							item?.avatar
								? {uri: item?.avatar}
								: require('../image/SHiV.png')
						}
						style={{
							height: moderateScale(30),
							width: moderateScale(30),
							borderRadius: moderateScale(50),
							marginRight: moderateScale(10),
						}}
						resizeMode={FastImage.resizeMode.stretch}
					/>
				}

				<View style={{flexDirection: 'column'}}>
					<Text
						numberOfLines={1}
						ellipsizeMode='tail'
						style={{
							width: horizontal ? widthPercentageToDP(25) : '100%',
							fontSize: moderateScale(16),
							color: horizontal ? '#ffffff' : '#000',
							fontFamily: 'AvenirMedium',
						}}>
						{item?.name}
					</Text>
				</View>
			</View>

			{selectedUserIds.includes(item.id) ? (
				<TouchableOpacity
					onPress={() => handleRemove(item)}
					style={{
						width: horizontal ? widthPercentageToDP(4) : null,
						backgroundColor: '#FF0000', // Red color for remove button
						paddingVertical: horizontal === true ? widthPercentageToDP(0.4) : moderateScale(5),
						paddingHorizontal: horizontal === true ? widthPercentageToDP(0) : moderateScale(10),
						borderRadius: horizontal === true ? widthPercentageToDP(2) : moderateScale(10),
						marginLeft: horizontal === true ? widthPercentageToDP(2) : widthPercentageToDP(0),
						// backgroundColor:'red'
					}}>
					<Text style={{
						color: 'white',
						textAlign: 'center',
					}}>{horizontal ? 'X' : 'Remove'}</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					onPress={() => handleAdd(item)}
					style={{
						backgroundColor: '#611EBD',
						paddingVertical: moderateScale(5),
						paddingHorizontal: moderateScale(10),
						borderRadius: moderateScale(10),
					}}>
					<Text>Add</Text>
				</TouchableOpacity>
			)
			}

		</View >
	);
}
