import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, TouchableWithoutFeedback } from 'react-native';
import { Button, CardSection, Header } from './common';
import { Actions } from 'react-native-router-flux';
import Languages from '../Languages/Languages.json';

class FirstLanding extends Component {
    state = { languages: null }
    async componentWillMount() {
        this.setState({ languages: await AsyncStorage.getItem('Language') });
    }
    render() {
        if (this.state.languages !== null) {
            return (
                <View>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['081']}</Text>
                </View>
                <View style={{ flex: 1 }} />
            </Header>
            <View style={{ marginLeft: 80, marginRight: 80, marginTop: 15, flexWrap: 'wrap' }}>
                <View style={{ marginLeft: 30, marginRight: 30 }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light', marginBottom: 50, marginTop: 50 }}>
                        {Languages[this.state.languages]['078']}
                    </Text>
                </View>
                <CardSection>
                    <Button onPress={() => console.log('Tutorial Rquest')}>
                        {Languages[this.state.languages]['079']}
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => Actions.Settings()}>
                        {Languages[this.state.languages]['080']}
                    </Button>
                </CardSection>
            </View>
            </View>
        );
    }
        if (this.state.languages === null) {
            return (
                <View />
            );
        }
    }
}

export { FirstLanding };
