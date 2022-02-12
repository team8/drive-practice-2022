import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer"
import WheelPicker from "react-native-wheely";
import config from "../config";

import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, addDoc, collection } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAynIjdW6UERmm6ebLOpQz4ZOrYflSRA0g",
    authDomain: "driveteam-2022.firebaseapp.com",
    projectId: "driveteam-2022",
    storageBucket: "driveteam-2022.appspot.com",
    messagingSenderId: "593110152431",
    appId: "1:593110152431:web:83cc32c4a3112e47cc571a",
    measurementId: "G-PN663YKCJE"
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

export default function Collect() {
    const [upper, setUpper] = useState(0);
    const [lower, setLower] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0)

    const submit = async () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy;
        await addDoc(collection(firestore, today), {
            upper: upper,
            lower: lower,
          });
    }

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => upper > 0 && setUpper(upper - 1)} style={styles.minusButton}>
                        <Text style={styles.text}>-</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.text}>{upper}</Text>
                        <Text>Upper</Text>
                    </View>
                    <TouchableOpacity onPress={() => setUpper(upper + 1)} style={styles.plusButton}>
                        <Text style={styles.text}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => lower > 0 && setLower(lower - 1)} style={styles.minusButton}>
                        <Text style={styles.text}>-</Text>
                    </TouchableOpacity>
                        <View>
                            <Text style={styles.text}>{lower}</Text>
                            <Text>Lower</Text>
                        </View>
                    <TouchableOpacity onPress={() => setLower(lower + 1)} style={styles.plusButton}>
                        <Text style={styles.text}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => submit()} style={styles.submitButton}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>   
            <View style={styles.column}>
                <CountdownCircleTimer
                    isPlaying
                    duration={7}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                >
                    {({ remainingTime }) => <Text>{remainingTime}</Text>}
                </CountdownCircleTimer>

                <View style = {styles.picker}>
                    <View style = {styles.timer}>
                        <WheelPicker
                            options={[1,2,3,4]}
                            selected={minutes}
                            itemStyle={{}}
                            itemTextStyle={{}}
                            onChange={(num) => setMinutes(num)}
                        />
                        <Text>Minutes</Text>
                    </View>
                    <View style = {styles.timer}>
                        <WheelPicker
                            options={[1,2,3,4]}
                            selected={minutes}
                            itemStyle={{}}
                            itemTextStyle={{}}
                            onChange={(num) => setSeconds(num)}
                        />
                        <Text>Seconds</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity></TouchableOpacity>
                </View>
            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    column: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        height: "30%"
    },
    minusButton: {
        backgroundColor: "#eb4034",
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginRight: 10
    },
    plusButton: {
        backgroundColor: "#34eb4c",
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginLeft: 10
    },
    submitButton: {
        backgroundColor: "#34abeb",
        width: 100,
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 60
    },
    picker: {
        display: "flex",
        flexDirection: "row",
    },
    timer: {
        display: "flex",
        flexDirection: "column",
        margin:5,
    }
})