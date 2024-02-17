import React from 'react';
import { View, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ImageComp = ( { source, height, width, mode, style } ) => {
	return (
		<View style={{
			height: height ? hp( height ) : '100%',
			width: width ? width : '100%',
		}}>
			<Image
				source={source}
				resizeMode={mode !== undefined ? mode : 'contain'}
				style={[ { height: '100%', width: '100%', }, style ]}

			>
			</Image>
		</View>
	);
};


export default ImageComp;
