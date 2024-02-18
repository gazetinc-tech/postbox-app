import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { moderateScale } from '../../utils/overAllNormalization';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

export default function ProfileCard ( { onPress, data } ) {
	const RenderItem = ( { title, desc } ) => {
		return (
			<View style={styles.detailViewCandidate}>
				<Text style={styles.experienceTextCandidate}>{title}</Text>
				<Text style={styles.yearTextCandidate}>{desc}</Text>
			</View>
		)
	}

	return (
		<TouchableOpacity activeOpacity={0.5} style={styles.flatlistView2} onPress={onPress}>
			<FastImage
				source={{ uri: data?.avatar }}
				style={styles.profileImageCandidate}
				resizeMode={FastImage.resizeMode.stretch}
				defaultSource={require( '../../image/PostboxLogo.png' )}
			/>
			<View
				style={{
					flex: 1,
					marginHorizontal: wp( 3 ),
				}}>
				<Text numberOfLines={1} style={styles.nameTextCandidate}>{data?.name}</Text>
				<Text numberOfLines={3} ellipsizeMode='tail' style={styles.availableTextCandidate}>{data?.bio}</Text>

				<RenderItem title={'village'} desc={data?.village} />
				<RenderItem title={'mandal'} desc={data?.mandal} />
				<RenderItem title={'city'} desc={data?.city} />
				<RenderItem title={'state'} desc={data?.state} />
				<RenderItem title={'country'} desc={data?.country} />
			</View>
		</TouchableOpacity>
	);
}


const styles = StyleSheet.create( {
	img: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	flatlistView2: {
		flex: 1,
		marginVertical: moderateScale( 7 ),
		marginHorizontal: moderateScale( 6 ),
		alignItems: 'center',
		borderRadius: moderateScale( 3 ),
		flexDirection: 'row',
		paddingVertical: hp( 1 ),
		// 
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.5,
		shadowRadius: 4.65,
		elevation: 2,
	},
	profileImageCandidate: {
		marginLeft: hp( 1 ),
		height: hp( 14 ),
		// flex: 1,
		width: wp( 30 ),
	},
	nameTextCandidate: {
		color: '#000000',
		fontSize: hp( 2 ),
		fontWeight: '700',
	},
	detailViewCandidate: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: moderateScale( 2 ),
		flexWrap: 'wrap'
	},
	availableTextCandidate: {
		fontSize: hp( 1.2 ),
		color: '#D8981C',
		marginBottom: moderateScale( 10 ),
	},
	experienceTextCandidate: {
		//   fontFamily: Font.PoppinsRegular,
		fontSize: hp( 1.3 ),
		fontWeight: '300',
		color: '#444444',
	},
	yearTextCandidate: {
		//   fontFamily: Font.PoppinsRegular,
		fontSize: hp( 1.3 ),
		fontWeight: '700',
		color: '#000000',
	}
} );
