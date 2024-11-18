import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';

const YourComponent = () => {
    const [team1Score, setTeam1Score] = useState(0);
    const [team2Score, setTeam2Score] = useState(0);

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            databaseURL: "YOUR_DATABASE_URL",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID",
            measurementId: "YOUR_MEASUREMENT_ID"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        const dbRef = firebase.database().ref('/Dm1_Dm2_set1');

        dbRef.once('value')
            .then((snapshot) => {
                const data = snapshot.val();
                setTeam1Score(data.team1Score);
                setTeam2Score(data.team2Score);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.topBoard}>
                <View style={styles.scoreBoard}>
                    <Text style={styles.team}>Team 1</Text>
                    <Text style={styles.score}>{team1Score}</Text>
                </View>
                <View style={styles.scoreBoard}>
                    <Text style={styles.team}>Team 2</Text>
                    <Text style={styles.score}>{team2Score}</Text>
                </View>
            </View>
            <View style={styles.underTop}>
                <Text style={styles.pause}>PAUSED</Text>
                <Text style={styles.pause}>PAUSED</Text>
            </View>
            <View style={styles.middle}>
                <Text style={styles.set}>0</Text>
                <Text style={styles.countSet}>1</Text>
                <Text style={styles.set}>0</Text>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.timer}>TIMER</Text>
                <Text style={styles.time}>###</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBoard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    scoreBoard: {
        alignItems: 'center',
    },
    team: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    score: {
        fontSize: 24,
    },
    underTop: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    pause: {
        fontSize: 16,
    },
    middle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    set: {
        fontSize: 24,
    },
    countSet: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bottom: {
        alignItems: 'center',
    },
    timer: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 24,
    },
});

export default YourComponent;
