import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  //입력창의 상태를 관리하는 변수를 React 에서 사용하는 useState 훅을 활용하여 선언
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [todoGoals, setTodoGoals] = useState([]);

  //사용자가 내용을 입력할 때 해당 입력값을 가져오는 함수
  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  //추가 버튼을 누르면 할 일 목록을 추가하는 함수
  const addGoalHandler = () => {
    console.log(enteredGoalText);

    //useState Setter 메서드의 스냡샷 방식
    //콜백 함수의 매개값은 해당 상태 변수의 최신 값이 전달됨
    setTodoGoals((currentTodoGoals) => [
      //setTodoGoals([...todoGoals, enteredGoalText]) //요약
      ...currentTodoGoals,
      { text: enteredGoalText, key: Math.random().toString() }, //구분 해주기
    ]); //@@@
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='할 일을 입력하세요!'
          onChangeText={goalInputHandler}
        />
        <Button title='할 일 추가하기' onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        {todoGoals.map((goal) => (
          <View key={goal.key} style={styles.goalItem}>
            {/* view에 직접 적용 불가 */}
            <Text style={styles.goalText}>{goal.text}</Text>
          </View>
        ))}
        <Text>할 일 목록들...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row', //기본값 column
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 4,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
    color: 'white',
  },
  goalText: {
    color: 'white',
  },
});
