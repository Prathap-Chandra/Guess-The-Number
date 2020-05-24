import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState();
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/gi, ''));
    };

    const resetInputHandler = () => {
        setConfirmed(false);
        setEnteredValue('');
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid Number!!!',
                'Please enter a number which is in between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if(confirmed){
        confirmedOutput = 
            <Card style={styles.summaryContainer}>
                <Text>You Selected </Text>
                <View>
                    <NumberContainer>{selectedNumber}</NumberContainer>
                    <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>
                </View>
            </Card>
    }

    return (
        <TouchableWithoutFeedback 
            onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!!!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button 
                                color={Colors.accent} 
                                title="Reset" 
                                onPress={resetInputHandler}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button 
                                color={Colors.primary} 
                                title="Confirm" 
                                onPress={confirmInputHandler} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput }
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    inputContainer: {
        width: 300,
        maxWidth: "80%",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    button: {
        width: 100
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around"
    },
    input: {
        width: 100,
        textAlign: "center"
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;