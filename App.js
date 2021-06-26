import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';

const getJokes = async setter => {
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

const boxes = new Array(150).fill(null);

const CheckerboardSquare = styled.View`
	height: 20px;
	width: 20px;
	background-color: ${({ idx }) => (idx % 2 === 0 ? 'grey' : 'lightgrey')};
`;

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
			<View style={styles.board}>
				{boxes.map((_, idx) => (
					<CheckerboardSquare key={idx} idx={idx} />
				))}
			</View>
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
	board: {
		flexWrap: 'wrap',
		width: 150,
		height: 150,
	},
});
