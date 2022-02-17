import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, TextInput, KeyboardAvoidingView } from "react-native";

import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, addDoc, collection, } from "firebase/firestore";
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import NotesInput from "../components/TextInput";

const firebaseConfig = {
  apiKey: "AIzaSyAynIjdW6UERmm6ebLOpQz4ZOrYflSRA0g",
  authDomain: "driveteam-2022.firebaseapp.com",
  projectId: "driveteam-2022",
  storageBucket: "driveteam-2022.appspot.com",
  messagingSenderId: "593110152431",
  appId: "1:593110152431:web:83cc32c4a3112e47cc571a",
  measurementId: "G-PN663YKCJE",
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

export default function Collect() {
  const [upper, setUpper] = useState(0);
  const [lower, setLower] = useState(0);
  const [time, setTime] = useState(0);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [text, onChangeText] = useState("");

  const submit = async () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var minutes = parseFloat(time[0]) + parseFloat(time.slice(-2) / 60)
    var upperPerMinute = upper / minutes;
    var lowerPerMinute = lower / minutes;
    today = mm + "-" + dd + "-" + yyyy;
    await addDoc(collection(firestore, today), {
      upper: upper,
      lower: lower,
      time: time,
      upperPerMinute: upperPerMinute,
      lowerPerMinute: lowerPerMinute,
      text: text ? text : "--"
    });
    setUpper(0);
    setLower(0);
    setIsStopwatchStart(false);
    setResetStopwatch(true);
    setTime("");
    onChangeText("");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.column}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => upper > 0 && setUpper(upper - 1)} style={styles.minusButton} >
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>{upper}</Text>
            <Text>Upper</Text>
          </View>
          <TouchableOpacity onPress={() => setUpper(upper + 1)} style={styles.plusButton} >
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => lower > 0 && setLower(lower - 1)} style={styles.minusButton} >
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>{lower}</Text>
            <Text>Lower</Text>
          </View>
          <TouchableOpacity onPress={() => setLower(lower + 1)} style={styles.plusButton} >
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, placeholderTextColor: 'gray', width: 100, marginRight: 5 }} value={time} onChangeText={text => setTime(text)} />
          <TouchableOpacity onPress={() => submit()} style={styles.submitButton} >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.column}>
        <View style={styles.sectionStyle}>
          <Stopwatch
            laps
            msecs
            start={isStopwatchStart}
            //To start
            reset={resetStopwatch}
            //To reset
            options={options}
          //options for the styling
          />
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(!isStopwatchStart);
              setResetStopwatch(false);
            }}>
            <Text style={styles.buttonText}>
              {!isStopwatchStart ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(false);
              setResetStopwatch(true);
            }}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.sectionStyle}>
          <View style={styles.input}>
            <NotesInput
              multiline
              numberOfLines={4}
              value={text}
              onChangeText={text => onChangeText(text)}
              placeholder="Notes (optional)"
              style={{ padding: 10 }}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};

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
    height: "30%",
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    height: "30%",
    marginTop: 50,
    justifyContent: "center",
    width: "100%",
  },
  minusButton: {
    backgroundColor: "#eb4034",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 10,
  },
  plusButton: {
    backgroundColor: "#34eb4c",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#34abeb",
    width: 100,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    marginTop: 100,
  },
  text: {
    fontSize: 60,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 0.5,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
  input: {
    flex: 1,
    width: 250,
    marginBottom: 75,
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
  },
});
