import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from '../component/Style';
import Vocabulary from '../Data/Data';
import GestureFlipView from 'react-native-gesture-flip-card';
import Sound from 'react-native-sound';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faVolumeHigh} from '@fortawesome/free-solid-svg-icons';
import Tts from 'react-native-tts';

Sound.setCategory('Playback');

const DetailVocab = ({route}) => {
  const detail = route.params;
  const listSound = route.params.sound;

  const [currentWord, setCurrentWord] = useState(detail.detail);
  const [currentIndex, setCurrentIndex] = useState(
    detail.vocabGroup.indexOf(currentWord),
  );
  const [sound, setSound] = useState(listSound[detail.detail.id - 1]);

  const getWord = type => {
    if (type === 'next' && currentIndex < detail.vocabGroup.length - 1) {
      setSound(detail.sound[currentWord.id]);
      setCurrentWord(detail.vocabGroup[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    } else if (type === 'pre' && currentIndex > 0) {
      setCurrentWord(detail.vocabGroup[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
      setSound(detail.sound[currentWord.id - 2]);
    }
  };

  const renderFront = () => {
    return (
      <View style={styles.frontStyle}>
        <Text style={{fontSize: 30, color: '#000000', fontWeight: 'bold'}}>
          {currentWord.title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Text style={{fontSize: 18, color: '#000000', fontWeight: 'bold'}}>
            {currentWord.phonetic}
          </Text>
          <TouchableOpacity
            style={styles.iconVolume}
            onPress={() => {
              sound.play((success, error) => {});
            }}>
            <FontAwesomeIcon
              icon={faVolumeHigh}
              style={{color: '#ffffff'}}
              size={18}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={{fontSize: 20, color: '#000000', textAlign: 'center'}}>
            {' '}
            {currentWord.eMean}
          </Text>
        </View>
        <View>
          <Image
            source={currentWord.img}
            style={{width: 220, height: 220, marginTop: 20}}
          />
        </View>
      </View>
    );
  };

  const renderBack = () => {
    return (
      <View style={styles.backStyle}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 30, color: '#000000', fontWeight: 'bold'}}>
            {currentWord.title}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: '#000000',
              fontWeight: 'bold',
              fontStyle: 'italic',
              marginLeft: 8,
            }}>
            ({currentWord.partOfSpeech})
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Text style={{fontSize: 18, color: '#000000', fontWeight: 'bold'}}>
            {currentWord.phonetic}
          </Text>
          <TouchableOpacity
            style={styles.iconVolume}
            onPress={() => {
              sound.play((success, error) => {});
            }}>
            <FontAwesomeIcon
              icon={faVolumeHigh}
              style={{color: '#ffffff'}}
              size={18}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{fontSize: 25, color: '#000000'}}>
            {currentWord.mean}
          </Text>
        </View>

        <View style={{marginTop: 20}}>
          {currentWord.examples.map((item, index) => (
            <View style={{padding: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{fontSize: 18, color: '#7400BB', fontWeight: 'bold'}}>
                  {index + 1}. {item.exam}
                </Text>
                <TouchableOpacity
                  style={styles.iconVolume}
                  onPress={() => {
                    Tts.speak(item.exam);
                  }}>
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    style={{color: '#ffffff'}}
                    size={18}
                  />
                </TouchableOpacity>
              </View>

              <Text
                style={{fontSize: 18, color: '#F0843E', fontWeight: 'bold'}}>
                {item.trans}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };
  return (
    <ImageBackground
      source={require('../component/images/book2.jpeg')}
      resizeMode="cover"
      style={styles.image}>
      <View
        style={{
          flex: 1,
          // justifyContent: "center",
          alignItems: 'center',
          paddingTop: 35,
          textAlign: 'center',
        }}>
        <GestureFlipView width={300} height={500}>
          {renderFront()}
          {renderBack()}
        </GestureFlipView>

        <View style={styles.choosen}>
          {currentIndex === 0 ? (
            ''
          ) : (
            <View style={styles.button}>
              <TouchableOpacity onPress={() => getWord('pre')}>
                <Text style={styles.status}>Back</Text>
                <Image
                  source={require('../component/images/back1.png')}
                  style={styles.icon_choose}
                />
              </TouchableOpacity>
            </View>
          )}

          {currentIndex === detail.vocabGroup.length - 1 ? (
            ''
          ) : (
            <View style={styles.button}>
              <TouchableOpacity onPress={() => getWord('next')}>
                <Text style={styles.status}>Next</Text>
                <Image
                  source={require('../component/images/next.png')}
                  style={styles.icon_choose}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default DetailVocab;
