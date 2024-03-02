import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale } from '../utils/overAllNormalization';
import Header from '../comp/Header';
import ProfileCard from '../Screens/home/ProfileCard';


export default function WorkLocation ( { navigation } ) {
	const isFocused = useIsFocused();
	const BaseUrl = 'https://shopninja.in/anurag/postbox/api/user';
	const { profile, token } = useSelector( state => state?.userReducer );


	const [ userToken, setUserToken ] = useState( null );
	const [ loading, setLoading ] = useState( true );
	const [ allPost, setAllPost ] = useState( [] );
	const [ location, setLocation ] = useState( '' )


	const getToken = async () => {
		await AsyncStorage.getItem( 'userToken' ).then( value => {
			if ( value !== null ) {
				setUserToken( value );
			}
		} );
	};

	useEffect( () => {
		getToken();
	}, [ isFocused ] )


	useEffect( () => {
		// fetchData( 'a' );
		console.log( 'userLocation:::::::::::::::::::', profile );
		if ( profile ) {
			var location = profile?.city 
			setLocation( location )
			fetchData( location );
		}
	}, [ userToken ] );

	const fetchData = async ( location ) => {
		setLoading( true );
		const apiUrl = BaseUrl + `/search-users?term=${ location }`;

		fetch( apiUrl, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${ userToken }`,
			},
		} )
			.then( ( response ) => {
				if ( response.status === 200 ) {
					return response.json();
				} else {
					return response.json();
				}
			} )
			.then( ( json ) => {
				if ( json?.status === 200 ) {
					setLoading( false );
					var allPostx = json?.users;
					// Create an object to store unique data based on email
					const uniqueData = {};
					// Iterate through each user data
					allPostx.forEach( user => {
						const email = user.email;
						// Check if the email is not already in the object
						if ( !uniqueData[ email ] ) {
							uniqueData[ email ] = user;
						}
					} );
					// Convert the object values to an array to get the unique data array
					const uniqueDataArray = Object.values( uniqueData );
					console.log( uniqueDataArray, ':::::uniqueDataArray' );
					setAllPost( uniqueDataArray );
				}
			} )
			.catch( ( error ) => {
				console.log( '=== ERROR followers ===', error );
			} );
	};



	return (
		<View style={{
			flex: 1,
		}}>
			<Header
				navigation={navigation}
				label={'Work Location'}
			/>

			{/* feeds zone */}
			<View
				style={{
					flex: 1,
					backgroundColor: '#fff',
				}}>
				{loading ? (
					<View
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<ActivityIndicator size={'large'} color={'#000000'} />
					</View>
				) : (
					<>
						{allPost.length > 0 ? (
							<FlatList
								contentContainerStyle={{ paddingBottom: moderateScale( 200 ) }}
								style={{ flex: 1 }}
								data={allPost}
								renderItem={( { item, index } ) => {
									return (
										<View
											key={index}
											style={{}}>
											<ProfileCard
												data={item}
												onPress={() => navigation.navigate( 'OtherProfile', { item: item } )}
											/>
										</View>
									);
								}}
							/>
						) : (
							<>
								<View
									style={{
										flex: 1,
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<Text
										style={{
											fontSize: moderateScale( 15 ),
											color: '#687684',
											fontFamily: 'AvenirMedium',
										}}>
										{`No people found in the City Name ${ location }`}
									</Text>
								</View>
							</>
						)}
					</>
				)}
			</View>
		</View>
	);
}
