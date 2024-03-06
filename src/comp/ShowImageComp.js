import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
// import {} from 'react-native';
import {moderateScale} from '../utils/overAllNormalization';
import {Skeleton} from 'native-base';
import FastImage from 'react-native-fast-image';
import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';

export default function ShowImageComp({postData, onPress, skeletonLoader}) {
	const [imgHeight, setImgHeight] = useState(0);
	const [imgWidth, setImgWidth] = useState(0);


	useEffect(() => {
		if(postData) {
			const imageUrl = postData?.image;
			Image.getSize(
				imageUrl,
				(width, height) => {
					// console.log(`Image dimensions - Width: ${width}, Height: ${height}`);
					setImgHeight(height);
					setImgWidth(width)
				},
				(error) => {
					console.error(`Error getting image size: ${error.message}`);
				}
			);
		}
	}, [postData?.image]);

	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				height: imgWidth >= imgHeight ? heightPercentageToDP(30) : heightPercentageToDP(60),
				// height: imgHeight,
				// height: '100%',
				// maxHeight: heightPercentageToDP(60),
				width: widthPercentageToDP(90),
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<Skeleton
				isLoaded={skeletonLoader}
				style={{
					height: imgWidth >= imgHeight ? heightPercentageToDP(30) : heightPercentageToDP(60),
					// height: imgHeight,
					// maxHeight: heightPercentageToDP(60),
					// width: imgWidth >= imgHeight ? widthPercentageToDP(90) : widthPercentageToDP(80),
					// width: '100%',
					// height: '100%',
					width: widthPercentageToDP(90),
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Image
					source={{uri: postData?.image}}
					style={{
						height: imgWidth >= imgHeight ? heightPercentageToDP(30) : heightPercentageToDP(60),
						// height:imgHeight,
						// maxHeight: heightPercentageToDP(60),
						// maxHeight: heightPercentageToDP(60),
						// height: '100%',
						width: widthPercentageToDP(90),
					}}
					resizeMode='cover'
				/>
			</Skeleton>
		</TouchableOpacity>
	);
}
