import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';

// auth screens
import SignIn from '../Screens/SignIn';
import AddPhoneNumber from '../Screens/AddPhoneNumber';
import LocationPermission from '../Screens/LocationPermission';
import CameraPermission from '../Screens/CameraPermission';
import SmsPermission from '../Screens/SmsPermission';
import MediaPermission from '../Screens/MediaPermission';
import PermissionContact from '../Screens/PermissionContact';
import PermissionNotifications from '../Screens/PermissionNotifications';
import CompleteProfile from '../Screens/CompleteProfile';
import ForgotPassword from '../Screens/ForgotPassword';
import LoggedIn from './LoggedIn';
import {useSelector} from 'react-redux';



const Stack = createNativeStackNavigator();

const LoginStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="SignIn" component={SignIn} />
			<Stack.Screen name="OTPScreen" component={AddPhoneNumber} />
			<Stack.Screen name="LocationPermission" component={LocationPermission} />
			<Stack.Screen name="CameraPermission" component={CameraPermission} />
			<Stack.Screen name="SmsPermission" component={SmsPermission} />
			<Stack.Screen name="MediaPermission" component={MediaPermission} />
			<Stack.Screen name="PermissionContact" component={PermissionContact} />
			<Stack.Screen name="PermissionNotifications" component={PermissionNotifications} />
			<Stack.Screen name="CompleteProfile" component={CompleteProfile} />
			<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
		</Stack.Navigator>
	)
}

export default function Authentication() {

	const [initRoute, setInitRoute] = useState('');
	const {isLogin, boarding} = useSelector(state => state?.userReducer);

	const sessionInfo = async () => {
		console.log('isLogin:::::::::::::::', isLogin)
		if(!isLogin) {
			setInitRoute("LoginStack");
		} else {
			setInitRoute("LoggedIn");
		}
	};

	useEffect(() => {
		sessionInfo();
	}, [initRoute]);


	return (
		<>
			<Stack.Navigator initialRouteName={initRoute}>
				{initRoute == 'LoginStack' ? (
					<Stack.Screen
						name="LoginStack"
						component={LoginStack}
						options={{headerShown: false}}
					/>
				) : (
					<Stack.Screen
						name="LoggedIn"
						component={LoggedIn}
						options={{headerShown: false}}
					/>
				)}
			</Stack.Navigator>
		</>
	);
}
