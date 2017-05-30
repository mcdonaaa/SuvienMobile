import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { CardSection, Input, Button } from './common';
import RadioForm from 'react-native-simple-radio-button';

class Settings extends Component {
    state = { name: '', stage: null };
    async componentWillMount() {
        if (await AsyncStorage.getItem('name') !== null) {
            this.setState({ 
                name: await AsyncStorage.getItem('name'), 
                stage: await AsyncStorage.getItem('stage') 
            });
        }
    }
    async onButtonPress() {
        try {
            await AsyncStorage.setItem('name', this.state.name);
            await AsyncStorage.setItem('stage', this.state.stage);
            } catch (error) {
            console.log(error);
        }
}
    renderRadioButton() {
        if (this.state.stage !== null) {
            return (
            <CardSection>
                <Text style={styles.radioTextStyle}>Stage</Text>
                <RadioForm
                        radio_props={radioProps}
                        initial={parseInt(this.state.stage)}
                        style={{ flex: 6 }}
                        buttonColor={'#4A86E8'}
                        onPress={(stage) => this.setState({ stage: stage.toString() })} 
                />
            </CardSection>
            );
        }
        if (this.state.stage === null) {
            //Spinner may be added here
            return (
                <Text>I'm Waiting!</Text>
            );
        }
    }
    render() {
        return (
            <View style={{ marginTop: 60 }}>
                <Text style={{ fontSize: 30, alignSelf: 'center' }}>Edit Information</Text>
                <CardSection>
                    <Input
                    placeholder="Lance McClain"
                    label="Name"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                    />
                </CardSection>

                {this.renderRadioButton()}

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save and Continue
                    </Button>
                </CardSection>
            </View>
        );
    }
}

const radioProps = [
  { label: 'Early', value: 0 },
  { label: 'Late', value: 1 }
];

const styles = {
    radioTextStyle: {
        fontSize: 20,
        marginLeft: 100,
        flex: 1,
        alignSelf: 'center'
    }
};
export default Settings;