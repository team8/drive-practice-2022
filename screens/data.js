import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getFirestore, setDoc, doc, addDoc, collection, getDoc, getCollection, getDocs } from "firebase/firestore";
import { set } from "react-native-reanimated";

const firestore = getFirestore();


export default function Data() {
    const [data, setData] = useState([]);
    useEffect(async () => {
        var d = []
        for (var i = 2; i < 5; i++) {
            for (var j = 1; j < 32; j++) {
                const docRef = collection(firestore, `0${i}-${j}-2022`);
                const querySnapshot = await getDocs(docRef);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    var obj = doc.data();
                    obj.date = `0${i}-${j}-2022`;
                    d.push(obj)
                  });
            }
        };
        setData(d)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.col}>
                <Text style={{marginBottom: 2 }}>date</Text>
                {data.map((game, i) => (
                    <View style={ i % 2 == 0 && {backgroundColor: "#DBDBDB", width: "400%", justifyContent: "center", alignItems: "center", padding: 2}}>
                        <Text>{game.date}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.col}>
                <Text style={{marginBottom: 2 }}>upper</Text>
                {data.map((game, i) => (
                    <View style={ i % 2 == 0 && {backgroundColor: "#DBDBDB", width: "400%", justifyContent: "center", alignItems: "center", padding: 2}}>
                        <Text>{game.upper}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.col}>
                <Text style={{marginBottom: 2 }}>lower</Text>
                {data.map((game, i) => (
                    <View style={ i % 2 == 0 && {backgroundColor: "#DBDBDB", width: "400%", justifyContent: "center", alignItems: "center", padding: 2}}>
                        <Text>{game.lower}</Text>
                    </View>
                ))}
            </View>
            {/* <View style={styles.row}>
                <Text>Date</Text>
                <Text>Upper</Text>
                <Text>Lower</Text>
            </View>
            {data.map((game, i) => (
                <View key={i} style={styles.row}>
                    <Text>{game.date}</Text>
                    <Text>{game.upper}</Text>
                    <Text>{game.lower}</Text>
                </View>
            ))
            } */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    col: {
        justifyContent: "center",
        alignItems: "center"
    }
})