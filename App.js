import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const getJokes = async setter => {
	fetch('https://official-joke-api.appspot.com/random_joke')
		.then(res => res.json())
		.then(json => setter(json))
		.catch(err => console.error(err));
};

export default function App() {
	const [joke, setJoke] = useState({});

	const { setup, punchline } = joke;

	useEffect(() => {
		let isMounted = true;
		if (isMounted) getJokes(setJoke);
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
