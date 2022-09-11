import React, {useEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import Vocabulary from '../Data/Data';
import styles from '../component/Style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faVolumeHigh} from '@fortawesome/free-solid-svg-icons';
// import TrackPlayer from 'react-native-track-player';
import Sound from 'react-native-sound';
import Tts from 'react-native-tts';

Sound.setCategory('Playback');
// let sound = [];

// const getSound = item => {
//     sound.push(
//         new Sound(item, error => {
//             if (error) {
//                 console.log('failed to load the sound', error);
//                 return;
//             }

//             //   when loaded successfully
//         }),
//     );
// };

const Item = ({item, onPress, onPlaySound}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={[styles.iconVolume, {marginRight: 100}]}>
      <TouchableOpacity onPress={onPlaySound}>
        <FontAwesomeIcon
          icon={faVolumeHigh}
          style={{color: '#ffffff'}}
          size={18}
        />
      </TouchableOpacity>
    </View>
    <View style={{justifyContent: 'center', alignContent: 'center'}}>
      <Text style={styles.group}>{item.title}</Text>
      <Text style={{fontSize: 15, color: '#000'}}>{item.phonetic}</Text>
    </View>
  </TouchableOpacity>
);
const ListWord = ({route, navigation}) => {
  const vocabList = route.params.group;
  const sound = route.params.sound;
  let listVocab = [];

  // useEffect(() => {
  //     Vocabulary.map(item => getSound(item.url));

  //     sound.map((item, index) => sound[index].setVolume(1));
  // }, []);

  const playPause = item => {
    Tts.speak('Hello, world!');
  };

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate('DetailWord', {
            vocabGroup: listVocab,
            detail: item,
            sound: sound,
          });
        }}
        onPlaySound={() => {
          Tts.speak(item.title);
        }}
      />
    );
  };

  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Practice');
          }}>
          <Image
            source={require('../component/images/practive.png')}
            style={styles.icon_practive}
          />
        </TouchableOpacity>
      </View>
      <View>
        {Vocabulary.map(item =>
          item.group === vocabList
            ? (listVocab.push(item),
              (
                <FlatList
                  data={[item]}
                  renderItem={renderItem}
                  keyExtractor={vocab => vocab.id}
                />
              ))
            : '',
        )}
      </View>
    </View>
  );
};

export default ListWord;
