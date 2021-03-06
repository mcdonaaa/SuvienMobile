import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, Dimensions, TouchableWithoutFeedback, ScrollView, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection } from './common';
import Languages from '../Languages/Languages.json';
import YouTube from 'react-native-youtube';
import Orientation from 'react-native-orientation';
import MusicPlayerController from 'react-native-musicplayercontroller';
import Video from 'react-native-video';

class Media extends Component {
    state = { 
        uri: null, 
        caption: null, 
        tag: null, 
        height: null, 
        width: null, 
        scheight: null, 
        scwidth: null, 
        isFavourite: null, 
        imagerend: null, 
        pictures: null, 
        media: null, 
        title: null,
        videos: null, 
        mediaType: null,
        imageuri: null,
        isReady: null,
        status: null,
        quality: null,
        error: null,
        currentTime: null,
        duration: null,
        chosen: null,
        audios: null,
        album: null,
        artist: null,
        languages: null
    }
    async componentWillMount() {
        //Note. The orientation issue only persists on android, not ioss
        const chosen = this.props.obj;
        this.setState({ languages: await AsyncStorage.getItem('Language') }); 
        console.log(chosen);
        if (chosen.mediaType === 'Photo') {
        this.setState({ 
            pictures: JSON.parse(await AsyncStorage.getItem('Pictures')),
            media: JSON.parse(await AsyncStorage.getItem('Media')),
            uri: chosen.uri, 
            caption: chosen.caption, 
            tag: chosen.tag,
            height: chosen.height,
            width: chosen.width,
            isFavourite: chosen.isFavourite,
            title: chosen.title,
            mediaType: chosen.mediaType
        });
        if (chosen.isFavourite === false) {
            this.setState({ imagerend: require('../Images/favouritenot.png') });
        }
        if (chosen.isFavourite === true) {
            this.setState({ imagerend: require('../Images/favourite.png') });
        }
    }
        if (chosen.mediaType === 'Youtube') {
        this.setState({ videos: JSON.parse(await AsyncStorage.getItem('Videos')), media: JSON.parse(await AsyncStorage.getItem('Media')) });
        if (chosen.isFavourite === false) {
            this.setState({ imagerend: require('../Images/favouritenot.png') });
        }
        if (chosen.isFavourite === true) {
            this.setState({ imagerend: require('../Images/favourite.png') });
        }
        this.setState({ 
            uri: chosen.uri, 
            imageuri: chosen.imageuri,
            caption: chosen.caption, 
            tag: chosen.tag,
            isFavourite: chosen.isFavourite,
            title: chosen.title,
            mediaType: chosen.mediaType,
            chosen
        });
    }
        if (chosen.mediaType === 'Music') {
            this.setState({ audios: JSON.parse(await AsyncStorage.getItem('Audio')), media: JSON.parse(await AsyncStorage.getItem('Media')) });
            if (chosen.isFavourite === false) {
                this.setState({ imagerend: require('../Images/favouritenot.png') });
            }
            if (chosen.isFavourite === true) {
                this.setState({ imagerend: require('../Images/favourite.png') });
            }
            this.setState({
                album: chosen.album,
                artist: chosen.artist,
                caption: chosen.caption, 
                tag: chosen.tag,
                isFavourite: chosen.isFavourite,
                title: chosen.title,
                mediaType: chosen.mediaType,
                chosen
        });
    }
    if (chosen.mediaType === 'MusicAnd') {
            this.setState({ audios: JSON.parse(await AsyncStorage.getItem('Audio')), media: JSON.parse(await AsyncStorage.getItem('Media')) });
            if (chosen.isFavourite === false) {
                this.setState({ imagerend: require('../Images/favouritenot.png') });
            }
            if (chosen.isFavourite === true) {
                this.setState({ imagerend: require('../Images/favourite.png') });
            }
            this.setState({
                uri: chosen.uri,
                album: chosen.album,
                artist: chosen.artist,
                caption: chosen.caption, 
                tag: chosen.tag,
                isFavourite: chosen.isFavourite,
                title: chosen.title,
                mediaType: chosen.mediaType,
                chosen
        });
    }
    if (chosen.mediaType === 'Video') {
        this.setState({ 
            uri: chosen.uri, 
            caption: chosen.caption, 
            tag: chosen.tag,
            isFavourite: chosen.isFavourite,
            title: chosen.title,
            mediaType: chosen.mediaType
        });
        if (chosen.isFavourite === false) {
            this.setState({ imagerend: require('../Images/favouritenot.png') });
        }
        if (chosen.isFavourite === true) {
            this.setState({ imagerend: require('../Images/favourite.png') });
        }
    }
    }

    componentDidMount() {
        this.setState({ 
            scheight: Dimensions.get('window').height,
            scwidth: Dimensions.get('window').width,
        });
    }

    preloadMusicPlay() {
        const { title, album, artist, uri } = this.state;
        if (this.state.mediaType === 'Music'){
            MusicPlayerController.preloadMusic([title, album, 227.004, artist], (metadata) => {
                    //console.log('I found the music! Its:');
                    //console.log(metadata);
                }, () => {
                    //console.log('I didnt find it :(');
                });
        }
        if (this.state.mediaType === 'MusicAnd') {
            MusicPlayerController.preloadMusic(uri, (metadata) => {
                    //console.log('I found the music! Its:');
                    //console.log(metadata);
                }, () => {
                    //console.log('I didnt find it :(');
                });
        }
                
    }

    /*
    <YouTube
                            apiKey='AIzaSyDCv-gME-M7Zm42sZz8vuQcK-3uNtbTVhU'
                            ref={(component) => {
                            this._youTubePlayer = component;
                            }}
                            videoId="KVZ-P-ZI6W4"           // The YouTube video ID
                            playlist="PLF797E961509B4EB5"   // A playlist's ID, overridden by `videoId`
                            play                   // control playback of video with true/false
                            fullscreen={false}               // control whether the video should play in fullscreen or inline
                            loop                     // control whether the video should loop when ended

                            onReady={(e) => {
                                this.setState({ isReady: true });
                                this._youTubePlayer.seekTo(0);
                            }
                            }
                            onChangeState={e => this.setState({ status: e.state })}
                            onChangeQuality={e => this.setState({ quality: e.quality })}
                            onError={e => this.setState({ error: e.error })}
                            onProgress={e => this.setState({ currentTime: e.currentTime, duration: e.duration })}

                            style={{ alignSelf: 'stretch', height: 400, backgroundColor: 'black' }}
                            />
                            <View style={{ flex: 1, height: null, width: null, backgroundColor: '#e3edf9' }}>
                    <View 
                    style={{
                        backgroundColor: '#d5deea', 
                        height: (newHeight + 100), 
                        flexDirection: 'row', 
                        marginTop: (paddingheight - 50), 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        }}
                    >
                        <View style={{ flexDirection: 'row', height: scheight, backgroundColor: 'transparent', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginBottom: paddingheight, backgroundColor: '#c7d0db' }}>
                                <Image source={{ uri: this.state.uri }} style={{ height: newHeight, width: newWidth }} />
                                <View style={{ height: newHeight, width: 400, backgroundColor: '#e3edf9', marginLeft: 10, marginRight: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', backgroundColor: '#e3edf9', marginTop: 10, marginLeft: 5, marginRight: 10, borderBottomWidth: 1, borderColor: '#ced6e0' }}>
                                            {this.state.title}
                                        </Text>
                                        <TouchableWithoutFeedback onPress={this.onFavouritePress.bind(this)}>
                                            <Image source={imagerend} style={{ height: 40, width: 40 }} />
                                        </TouchableWithoutFeedback>
                                    </View>
                                        <Text style={styles.textBodyStyle}>{this.state.caption}</Text>
                                        <Text style={styles.textBodyStyle}>
                                            <Image source={require('../Images/tag.png')} style={{ height: 30, width: 30 }} />
                                            {this.state.tag}
                                        </Text>
                                    <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                        <Button onPress={this.onHomeReturn.bind(this)} style={{ backgroundColor: '#b7d6ff' }} textsStyle={{ color: 'white' }}>Return to Home</Button>
                                    </CardSection>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
    */
    onHomeReturn() {
        if (this.state.mediaType === 'Photo') {
            const myimages = this.state.pictures;
            const loca = myimages.findIndex((element, index, array) => {
                if (element.imageuri === this.state.uri) {
                    return true;
                }
                else {
                    return false;
                }
            });
            myimages[loca].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Pictures', JSON.stringify(myimages));
            const mymedia = this.state.media;
            const locati = mymedia.findIndex(((element, index, array) => {
                if (element.imageuri === this.state.uri) {
                    return true;
                }
                else {
                    return false;
                }
            }));
            mymedia[locati].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Media', JSON.stringify(mymedia));
        }
        if (this.state.mediaType === 'Video') {
            const myimages = this.state.videos;
            const loca = myimages.findIndex((element, index, array) => {
                if (element.uri === this.state.uri) {
                    return true;
                }
                else {
                    return false;
                }
            });
            myimages[loca].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Videos', JSON.stringify(myimages));
            const mymedia = this.state.media;
            const locati = mymedia.findIndex(((element, index, array) => {
                if (element.uri === this.state.uri) {
                    return true;
                }
                else {
                    return false;
                }
            }));
            mymedia[locati].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Media', JSON.stringify(mymedia));
        }
        if (this.state.mediaType === 'Youtube') {
            console.log('im here!');
            const myvideos = this.state.videos;
            const locat = myvideos.findIndex((element, index, array) => {
                if (element.videouri === this.state.uri) {
                    return true;
                }
                else {
                    return false;
                }
            });
            myvideos[locat].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Videos', JSON.stringify(myvideos));
            const mymedia = this.state.media;
            const locatio = mymedia.findIndex(((element, index, array) => {
                if (element.videouri === this.state.uri) {
                    return true;
                }
                else {
                    return false;
                }
            }));
            mymedia[locatio].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Media', JSON.stringify(mymedia));
        }
        if (this.state.mediaType === 'Music' || this.state.mediaType === 'MusicAnd') {
            const myaudios = this.state.audios;
            const locat = myaudios.findIndex((element, index, array) => {
                if (element.title === this.state.title && element.album === this.state.album && element.artist === this.state.artist) {
                    return true;
                }
                else {
                    return false;
                }
            });
            myaudios[locat].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Audio', JSON.stringify(myaudios));
            const mymedia = this.state.media;
            const locatio = mymedia.findIndex(((element, index, array) => {
                if (element.title === this.state.title && element.album === this.state.album && element.artist === this.state.artist) {
                    return true;
                }
                else {
                    return false;
                }
            }));
            mymedia[locatio].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Media', JSON.stringify(mymedia));
            MusicPlayerController.stopMusic(() => {
                                    //console.log('I stoppin!');
                                // Successfully playing
                                }, () => {
                                    //console.log('I failed Nooooo');
                                // Failed to play
                                });
        }
        this.props.onInvisible(true);
    }

    onFavouritePress() {
        if (this.state.isFavourite === false) {
            this.setState({ isFavourite: true, imagerend: require('../Images/favourite.png')});
        }
        if (this.state.isFavourite === true) {
            this.setState({ isFavourite: false, imagerend: require('../Images/favouritenot.png')});
        }
    }

    render() {
        if (this.state.mediaType === null || this.state.languages === null) {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Loading</Text>
                </View>  
            );
        }
        if (this.state.mediaType === 'Photo') {
            const { height, width, scheight, scwidth, uri, caption, tag, isFavourite, imagerend } = this.state;
            if (scheight === null || width === null || uri === null || caption === null || tag === null || height === null || scwidth === null || isFavourite === null || imagerend === null){
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Loading</Text>
                </View>  
            );
        }
            if (scheight !== null && width !== null && imagerend !== null) {
                if (height <= width) {
                    const heightRatio = parseFloat(scheight - 300) / parseFloat(height);
                let newHeight = scheight - 300;
                let newWidth = width * heightRatio;
                /*
                if (newWidth > (scwidth - 400)) {
                    const widthRatio = parseFloat((scwidth - 400)) / parseFloat(newWidth);
                    newWidth = scwidth - 400;
                    newHeight *= widthRatio;
                }
                const paddingheight = (scheight - newHeight) / 2;
                */

                return (
                    <View style={{ flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                    style={{ height: newHeight, backgroundColor: 'black', width: newWidth }}
                    source={{ uri: this.state.uri, height: newHeight, width: newWidth }}
                    />
                    <View style={{ height: 250, backgroundColor: '#e3edf9', width: newWidth }}>
                                <ScrollView>
                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', backgroundColor: '#e3edf9', marginTop: 10, marginLeft: 5, marginRight: 10, borderBottomWidth: 1, borderColor: '#ced6e0' }}>
                                            {this.state.title}
                                        </Text>
                                        <TouchableWithoutFeedback onPress={this.onFavouritePress.bind(this)}>
                                            <Image source={imagerend} style={{ height: 40, width: 40 }} />
                                        </TouchableWithoutFeedback>
                                    </View>
                                        <Text style={styles.textBodyStyle}>{this.state.caption}</Text>
                                        <Text style={styles.textBodyStyle}>
                                            <Image source={require('../Images/tag.png')} style={{ height: 30, width: 30 }} />
                                            {this.state.tag}
                                        </Text>
                                    <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                        <Button onPress={this.onHomeReturn.bind(this)} style={{ backgroundColor: '#b7d6ff' }} textsStyle={{ color: 'white' }}>{Languages[this.state.languages]['020']}</Button>
                                    </CardSection>
                                    </View>
                                </ScrollView>
                            </View>
                    </View>
            );
                }
                if (height > width) {
                    const heightRatio = parseFloat(scheight - 50) / parseFloat(height);
                let newHeight = scheight - 50;
                let newWidth = width * heightRatio;
                /*
                if (newWidth > (scwidth - 400)) {
                    const widthRatio = parseFloat((scwidth - 400)) / parseFloat(newWidth);
                    newWidth = scwidth - 400;
                    newHeight *= widthRatio;
                }
                const paddingheight = (scheight - newHeight) / 2;
                */

                return (
                    <View style={{ flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Image
                    style={{ height: newHeight, backgroundColor: 'black', width: newWidth }}
                    source={{ uri: this.state.uri, height: newHeight, width: newWidth }}
                    />
                    <View style={{ height: newHeight, backgroundColor: '#e3edf9', width: 400 }}>
                                <ScrollView>
                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', backgroundColor: '#e3edf9', marginTop: 10, marginLeft: 5, marginRight: 10, borderBottomWidth: 1, borderColor: '#ced6e0' }}>
                                            {this.state.title}
                                        </Text>
                                        <TouchableWithoutFeedback onPress={this.onFavouritePress.bind(this)}>
                                            <Image source={imagerend} style={{ height: 40, width: 40 }} />
                                        </TouchableWithoutFeedback>
                                    </View>
                                        <Text style={styles.textBodyStyle}>{this.state.caption}</Text>
                                        <Text style={styles.textBodyStyle}>
                                            <Image source={require('../Images/tag.png')} style={{ height: 30, width: 30 }} />
                                            {this.state.tag}
                                        </Text>
                                    <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                        <Button onPress={this.onHomeReturn.bind(this)} style={{ backgroundColor: '#b7d6ff' }} textsStyle={{ color: 'white' }}>{Languages[this.state.languages]['020']}</Button>
                                    </CardSection>
                                    </View>
                                </ScrollView>
                            </View>
                    </View>
            );
                }
        }
    }
        if (this.state.mediaType === 'Youtube') {
            const { uri, caption, tag, isFavourite, imageuri, imagerend } = this.state;
            if (uri === null || caption === null || tag === null || isFavourite === null || imageuri === null || imagerend === null) {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Loading</Text>
                </View>  
            );
        }
            if (uri !== null && imageuri !== null) {
            return (
                <View style={{ height: (this.state.scheight - 100), alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                    <WebView
                    style={{ height: 200, backgroundColor: 'black', width: 800 }}
                    source={{ uri: `https://www.youtube.com/embed/${uri}?&autoplay=1` }}
                    />
                    <View style={{ height: 250, backgroundColor: '#e3edf9', width: 800 }}>
                                <ScrollView>
                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', backgroundColor: '#e3edf9', marginTop: 10, marginLeft: 5, marginRight: 10, borderBottomWidth: 1, borderColor: '#ced6e0' }}>
                                            {this.state.title}
                                        </Text>
                                        <TouchableWithoutFeedback onPress={this.onFavouritePress.bind(this)}>
                                            <Image source={imagerend} style={{ height: 40, width: 40 }} />
                                        </TouchableWithoutFeedback>
                                    </View>
                                        <Text style={styles.textBodyStyle}>{this.state.caption}</Text>
                                        <Text style={styles.textBodyStyle}>
                                            <Image source={require('../Images/tag.png')} style={{ height: 30, width: 30 }} />
                                            {this.state.tag}
                                        </Text>
                                    <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                        <Button onPress={this.onHomeReturn.bind(this)} style={{ backgroundColor: '#b7d6ff' }} textsStyle={{ color: 'white' }}>{Languages[this.state.languages]['020']}</Button>
                                    </CardSection>
                                    </View>
                                </ScrollView>
                            </View>
                    </View>
            );
        }
        //Note: this is configured only for ios at the moment       
        }
            if (this.state.mediaType === 'Music' || this.state.mediaType === 'MusicAnd') {
                //console.log('Im in the first if!');
                if (this.state.album !== null && this.state.title !== null && this.state.artist !== null){
                    MusicPlayerController.isPlaying(() => {
                    }, () => {
                        this.preloadMusicPlay();
                    });
                    return (
                    <View style={{ height: 500, backgroundColor: '#e3edf9', flexDirection: 'row', width: 800 }}>
                        <View style={{ marginTop: 20 }}>
                            <Image source={require('../Images/musicalbumart.png')} style={{ height: 300, width: 300, marginLeft: 50, marginRight: 30 }} />
                            <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                            <Button 
                            onPress={() => {
                                //this.preloadMusicPlay();
                                MusicPlayerController.playMusic(() => {
                                    //console.log('I playin!');
                                // Successfully playing
                                }, () => {
                                    //console.log('I failed Nooooo');
                                // Failed to play
                                });
                                }}
                            >
                                {Languages[this.state.languages]['018']}
                            </Button>
                            </CardSection>
                            <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                            <Button 
                            onPress={() => {
                                MusicPlayerController.pauseMusic(() => {
                                    //console.log('I stoppin!');
                                // Successfully playing
                                }, () => {
                                    //console.log('I failed Nooooo');
                                // Failed to play
                                });
                                }}
                            >
                                {Languages[this.state.languages]['019']}
                            </Button>
                            </CardSection>
                        </View>
                        <View>
                            <View style={{ height: scheight, width: 400, backgroundColor: '#e3edf9', marginLeft: 5, marginRight: 10, justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', backgroundColor: '#e3edf9', marginTop: 10, marginLeft: 5, marginRight: 10, borderBottomWidth: 1, borderColor: '#ced6e0' }}>
                                        {this.state.title}
                                    </Text>
                                    <TouchableWithoutFeedback onPress={this.onFavouritePress.bind(this)}>
                                        <Image source={this.state.imagerend} style={{ height: 40, width: 40 }} />
                                    </TouchableWithoutFeedback>
                                    </View>
                                        <Text style={styles.textBodyStyle}>{this.state.artist} - {this.state.album}</Text>
                                        <Text style={styles.textBodyStyle}>{this.state.caption}</Text>
                                        <Text style={styles.textBodyStyle}>
                                            <Image source={require('../Images/tag.png')} style={{ height: 30, width: 30 }} />
                                            {this.state.tag}
                                        </Text>
                                    <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0, width: 400 }}>
                                        <Button onPress={this.onHomeReturn.bind(this)} style={{ backgroundColor: '#b7d6ff' }} textsStyle={{ color: 'white' }}>{Languages[this.state.languages]['020']}</Button>
                                    </CardSection>
                                </View>
                            </View>
                            </View>
                );
            } 
            if (this.state.album === null || this.state.title === null || this.state.artist === null) {
                    return (
                        <Text> Loading </Text>
                    );
                }
            }
            if (this.state.mediaType === 'Video'){
                if (this.state.uri !== null && this.state.caption !== null && this.state.tag !== null && this.state.title !== null) {
                return (
                <View>
                        <View style={{ flexDirection: 'column', height: 800, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                <Video 
                                source={{ uri: this.state.uri }}   // Can be a URL or a local file.
                                ref={(ref) => {
                                    this.player = ref;
                                }}                                      // Store reference
                                rate={1.0}                              // 0 is paused, 1 is normal.
                                volume={1.0}                            // 0 is muted, 1 is normal.
                                muted={false}                           // Mutes the audio entirely.
                                paused={false}                          // Pauses playback entirely.
                                resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                                repeat                         // Repeat forever.
                                playInBackground={false}                // Audio continues to play when app entering background.
                                playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                                ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                                progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                                style={{ height: 450, width: 800 }} 
                                />
                                <View style={{ height: 250, width: 800, backgroundColor: '#e3edf9', marginLeft: 10, marginRight: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', backgroundColor: '#e3edf9', marginTop: 10, marginLeft: 5, marginRight: 10, borderBottomWidth: 1, borderColor: '#ced6e0' }}>
                                            {this.state.title}
                                        </Text>
                                        <TouchableWithoutFeedback onPress={this.onFavouritePress.bind(this)}>
                                            <Image source={this.state.imagerend} style={{ height: 40, width: 40 }} />
                                        </TouchableWithoutFeedback>
                                    </View>
                                        <Text style={styles.textBodyStyle}>{this.state.caption}</Text>
                                        <Text style={styles.textBodyStyle}>
                                            <Image source={require('../Images/tag.png')} style={{ height: 30, width: 30 }} />
                                            {this.state.tag}
                                        </Text>
                                    <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                        <Button onPress={this.onHomeReturn.bind(this)} style={{ backgroundColor: '#b7d6ff' }} textsStyle={{ color: 'white' }}>{Languages[this.state.languages]['020']}</Button>
                                    </CardSection>
                                </View>
                            </View>
                </View>
            );
                }
            } else {
                return (
                    <View />
                );
            }
        }
        }
    
    let newHeight;
    let paddingheight;
    let scheight;
    let newWidth;
    const styles = {
        textHeaderStyle: {
            fontSize: 25, 
            fontFamily: 'Roboto-Thin', 
            marginTop: 10, 
            backgroundColor: '#e3edf9', 
            marginLeft: 5, 
            marginRight: 10,
            width: null
            //borderTopLeftRadius: 10, 
            //borderTopRightRadius: 10
        },
        textBodyStyle: {
            fontSize: 25, 
            fontFamily: 'Roboto-Thin',  
            backgroundColor: '#e3edf9', //#edf5ff
            marginLeft: 5, 
            width: null,
            marginTop: 5,
            marginBottom: 5
        },
        imageContainerStyle: {
            backgroundColor: 'black', 
            height: (newHeight + 100), 
            flexDirection: 'row', 
            marginTop: (paddingheight - 50), 
            alignItems: 'center', 
            justifyContent: 'center' 
        },
        imageInnerContainerStyle: {
            flexDirection: 'row', 
            height: scheight, 
            backgroundColor: 'transparent', 
            justifyContent: 'center'
        },
        imageInnerStyle: { 
            flexDirection: 'row', 
            alignSelf: 'flex-end', 
            marginBottom: paddingheight, 
            backgroundColor: 'transparent' 
        },
        imageStyle: { 
            height: newHeight, 
            width: newWidth 
        },
        favouriteImageStyle: {
            height: 60, 
            width: 60
        },
        textSideStyle: {
            height: newHeight, 
            width: 400, 
            backgroundColor: '#a4c0e5'
        },
        buttonSectionStyle: {
            backgroundColor: 'transparent', 
            marginLeft: 0, 
            borderBottomWidth: 0
        },
        imageLoadingStyle: {
            alignItems: 'center', 
            justifyContent: 'center'
        }
    };

export { Media };
