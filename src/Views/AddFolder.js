import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  FlatList,
  cate,
} from 'react-native';
import {set} from 'react-native-reanimated';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'check.db',
  // location: 'Library',
  createFromLocation: '~kt.db',
});
console.log(db);

const AddFolder = () => {
  const [category, setCategory] = useState([]);
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM g7_voc where unit = 1',

        [],
        (sqlTxn, res) => {
          console.log('categories retrieved successfully');
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);

              results.push({
                id: item.id,
                title: item.voc_eng,
                mean: item.voc_meaning,
              });
            }

            setCategories(results);
          }
          // else (
          //     setCategories([])
          // )
        },
        error => {
          console.log('error on getting categories ' + error.message);
        },
      );
    });
  };

  const renderCategory = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderColor: '#ddd',
        }}>
        <Text style={{marginRight: 9}}>{item.id}</Text>
        <Text>{item.title} </Text>
        <Text>{item.mean} </Text>
      </View>
    );
  };

  // useEffect(() => {
  //   getCategories();
  // }, []);

  return (
    <View>
      <StatusBar backgroundColor="#222" />

      {/* <TextInput
                placeholder="Enter question"
                value={question}
                onChangeText={(text) => setQuestion(text)}
                style={{ marginHorizontal: 8 }}
            /> */}

      <Button title="Submit" onPress={() => getCategories()} />

      <FlatList
        data={categories}
        renderItem={renderCategory}
        key={item => item.id}
      />
    </View>
  );
};

export default AddFolder;
