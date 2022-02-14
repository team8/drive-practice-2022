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
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={{ marginBottom: 2 }}>Date</Text>
                    {data.map((game, i) => (
                        <View style={i % 2 == 0 && styles.data}>
                            <Text>{game.date}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.col}>
                    <Text style={{ marginBottom: 2 }}>Upper</Text>
                    {data.map((game, i) => (
                        <View style={i % 2 == 0 && styles.data}>
                            <Text>{game.upper}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.col}>
                    <Text style={{ marginBottom: 2 }}>Lower</Text>
                    {data.map((game, i) => (
                        <View style={i % 2 == 0 && styles.data}>
                            <Text>{game.lower}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.col}>
                    <Text style={{ marginBottom: 2 }}>Upper per minute</Text>
                    {data.map((game, i) => (
                        <View style={i % 2 == 0 && styles.data}>
                            <Text>{game.upperPerMinute.toFixed(2)}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.col}>
                    <Text style={{ marginBottom: 2 }}>Lower per minute</Text>
                    {data.map((game, i) => (
                        <View style={i % 2 == 0 && styles.data}>
                            <Text>{game.lowerPerMinute.toFixed(2)}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.col}>
                    <Text style={{ marginBottom: 2 }}>Time</Text>
                    {data.map((game, i) => (
                        <View style={i % 2 == 0 && styles.data}>
                            <Text>{game.time}</Text>
                        </View>
                        
                    ))}
                </View>
            </View>
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
        alignItems: "center", 
        flex: 0.20
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    data: {
        backgroundColor: "#DBDBDB", 
        width: "100%", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 2,
    }
})