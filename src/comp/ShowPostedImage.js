import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import ImageSize from 'react-native-image-size';

const ShowPostedImage = ({imageUrl, caption}) => {
	const [imageSize, setImageSize] = useState({width: 0, height: 0});

	useEffect(() => {
		const getImageSize = async () => {
			try {
				const size = await ImageSize.getSize(imageUrl);
				setImageSize(size);
			} catch(error) {
				console.error('Error getting image size:', error);
			}
		};

		getImageSize();
	}, [imageUrl]);

	return (
		<View style={styles.container}>
			<Image source={{uri: imageUrl}} style={{width: '100%', height: imageSize.height}} />
			<Text style={styles.caption}>{caption}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	caption: {
		margin: 8,
		fontSize: 16,
	},
});

export default ShowPostedImage;
