import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const getJoke = async setter => {
	try {
		const res = await fetch(
			'https://official-joke-api.appspot.com/random_joke'
		);
		const json = await res.json();
		setter(json);
	} catch (err) {
		console.error(err);
	}
};

export default function App() {
	const [joke, setJoke] = useState({});

	const { setup, punchline } = joke;

	useEffect(() => {
		let isMounted = true;

		if (isMounted) getJoke(setJoke);

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<View style={styles.container}>
			<Text>{setup}</Text>
			<Text>{punchline}</Text>
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'scroll',
	},
});
