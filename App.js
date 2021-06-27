import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const getJoke = async (state, setter) => {
	try {
		const res = await fetch(
			'https://official-joke-api.appspot.com/random_joke'
		);
		const json = await res.json();
		setter({ ...state, ...json });
	} catch (err) {
		console.error(err);
	}
};

const flag = (state, setter) =>
	setter({ ...state, shouldLoad: !state.shouldLoad });

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'scroll',
	},
	primaryBtn: {
		paddingVertical: 20,
		paddingHorizontal: 80,
		backgroundColor: 'cornflowerblue',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
		borderRadius: 10,
	},
	btnText: {
		color: 'white',
		fontSize: 22,
		fontWeight: 'bold',
	},
	jokeContainer: {
		paddingHorizontal: 20,
		paddingVertical: 80,
		fontSize: 32,
		lineHeight: 1.6,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function App() {
	const [state, setState] = useState({
		setup: '',
		punchline: '',
		shouldLoad: false,
	});

	const { setup, punchline, shouldLoad } = state;
	const { container, primaryBtn, btnText, jokeContainer } = styles;

	const updateJoke = () => flag(state, setState);

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			getJoke(state, setState);
		}

		return () => {
			isMounted = false;
		};
	}, [shouldLoad]);

	return (
		<View style={container}>
			<View style={jokeContainer}>
				<Text>{setup}</Text>
				<Text>{punchline}</Text>
			</View>
			<Pressable onPress={updateJoke} style={primaryBtn}>
				<Text style={btnText}>GET A JOKE</Text>
			</Pressable>
		</View>
	);
}
