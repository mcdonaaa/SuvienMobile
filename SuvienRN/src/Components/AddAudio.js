import React, { Component } from 'react';
import MusicPlayerController from 'react-native-musicplayercontroller';
import { View, AsyncStorage, Image, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { CardSection, Button, Input, Header } from './common';
import { Actions } from 'react-native-router-flux';

class AddAudio extends Component {
    state = { information: null, caption: null, group: null }
//WARNING! Make sure to fix the unique id problem!! you need to add a check for presets
    async onSaveItemPress() {
        const { information, caption, group } = this.state;
        const audios = JSON.parse(await AsyncStorage.getItem('Audio'));
        const objec = JSON.parse(await AsyncStorage.getItem('uniqueID'));
        const mytags = JSON.parse(await AsyncStorage.getItem('Tags'));
        const gen = JSON.parse(await AsyncStorage.getItem('Media'));
        audios.push({
            title: information[0],
            album: information[1],
            artist: information[3],
            caption,
            group,
            isFavourite: false,
            mediaType: 'Music'
        });
        gen.push({
            uniqueID: objec.uniqueID,
            title: information[0],
            album: information[1],
            artist: information[3],
            caption,
            group,
            isFavourite: false,
            mediaType: 'Music'
        });
        const findTags = mytags.find((tag) => tag === this.state.group);
        if (findTags === undefined) {
            mytags.push(this.state.group);
            AsyncStorage.setItem('Tags', JSON.stringify(mytags));
        }
        AsyncStorage.setItem('Media', JSON.stringify(gen));
        AsyncStorage.setItem('Audio', JSON.stringify(audios));
        console.log(await AsyncStorage.getItem('Audio'));
        Actions.Home();
    }

    async createNew() {
        const { information, caption, group } = this.state;
        const audios = JSON.parse(await AsyncStorage.getItem('Audio'));
        const objec = JSON.parse(await AsyncStorage.getItem('uniqueID'));
        const mytags = JSON.parse(await AsyncStorage.getItem('Tags'));
        const gen = JSON.parse(await AsyncStorage.getItem('Media'));
        audios.push({
            title: information[0],
            album: information[1],
            artist: information[3],
            caption,
            group,
            isFavourite: false,
            mediaType: 'Music'
        });
        gen.push({
            uniqueID: objec.uniqueID,
            title: information[0],
            album: information[1],
            artist: information[3],
            caption,
            group,
            isFavourite: false,
            mediaType: 'Music'
        });
        const findTags = mytags.find((tag) => tag === this.state.group);
        if (findTags === undefined) {
            mytags.push(this.state.group);
            AsyncStorage.setItem('Tags', JSON.stringify(mytags));
        }
        AsyncStorage.setItem('Media', JSON.stringify(gen));
        AsyncStorage.setItem('Audio', JSON.stringify(audios));
        console.log(await AsyncStorage.getItem('Audio'));
        this.setState({ information: null, caption: null, group: null });
    }
    
    onAudioSelect() {
        if (this.state.information === null) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={require('../Images/noaudio.png')} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Title</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>None</Text>
                        </View>
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Album</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>None</Text>
                        </View>
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Artist</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>None</Text>
                        </View>
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder="Family vacation to Hawaii"
                        label="Caption"
                        value={this.state.caption}
                        onChangeText={(caption) => this.setState({ caption })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                        placeholder="SummerVacation2017"
                        label="Tag"
                        value={this.state.group}
                        onChangeText={(group) => this.setState({ group })}
                        />
                    </CardSection>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            Save and Return
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={this.createNew.bind(this)}>
                            Save and Create New
                            <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => Actions.Settings()}>
                            Return to Settings
                        </Button>
                    </View>
                </View>
            );
        }
        if (this.state.information !== null) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={require('../Images/musicalbumart.png')} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Title</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{this.state.information[0]}</Text>
                        </View>
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Album</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{this.state.information[1]}</Text>
                        </View>
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Artist</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{this.state.information[3]}</Text>
                        </View>
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder="Family vacation to Hawaii"
                        label="Caption"
                        value={this.state.caption}
                        onChangeText={(caption) => this.setState({ caption })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                        placeholder="SummerVacation2017"
                        label="Tag"
                        value={this.state.group}
                        onChangeText={(group) => this.setState({ group })}
                        />
                    </CardSection>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            Save and Return
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={this.createNew.bind(this)}>
                            Save and Create New
                            <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => Actions.Settings()}>
                            Return to Settings
                        </Button>
                    </View>
                </View>
            );
        }
    }

    async onChooseMusicPress() {
    MusicPlayerController.presentPicker(false, (metadata) => {
        //console.log(metadata[0].uri);
        //this.setState({ audiopath: metadata[0].uri });
        console.log(metadata[0]);
        this.setState({ information: [metadata[0].title, metadata[0].albumTitle, metadata[0].playbackDuration, metadata[0].artist] });
    }, () => {
        console.log('Cancel');
    });
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Add Audio</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                <ScrollView>
                    <CardSection style={{ marginTop: 10 }}>
                        <Button onPress={this.onChooseMusicPress.bind(this)}>
                            Choose from Music Library
                        </Button>
                    </CardSection>
                    {this.onAudioSelect()}
                </ScrollView>
            </View>
        );
    }
}

export { AddAudio };
