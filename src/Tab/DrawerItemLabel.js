import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
	heightPercentageToDP,
	widthPercentageToDP,
} from "react-native-responsive-screen";



export default function DrawerItemLabel ( props ) {
	return (
		<View style={[ styless.mainView, props.lineView ]}>
			<View style={[ {
				height: heightPercentageToDP( 3.5 ),
				width: heightPercentageToDP( 3.5 )
			}, props.imageView ]}>
				<Image
					style={[ { height: '100%', width: '100%' }, props.image ]}
					source={props.drawerIcon}
				/>
			</View>

			<View style={{ flex: 1 }}>
				<Text style={styless.drawerLabelText}>{props.label}</Text>
			</View>

			<Image
				resizeMode="contain"
				style={{ height: heightPercentageToDP( 1.5 ), width: heightPercentageToDP( 1.5 ), left: widthPercentageToDP( 5 ) }}
				source={require( "../image/chevron-right.png" )}
			/>
		</View>
	);
}
const styless = StyleSheet.create( {
	mainView: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderTopColor: "#D4D6DB",
		marginTop: -5,
	},
	drawerLabelText: {
		fontStyle: 'normal',
		fontSize: heightPercentageToDP( 1.5 ),
		fontWeight: '400',
		color: '#212025',
		marginLeft: widthPercentageToDP( 4 )
	},
} );
