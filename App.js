import { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  //입력창의 상태를 관리하는 변수를 React 에서 사용하는 useState 훅을 활용하여 선언
  const [todoGoals, setTodoGoals] = useState([]);

  //추가 버튼을 누르면 할 일 목록을 추가하는 함수
  const addGoalHandler = (enteredGoalText) => {
    console.log(enteredGoalText);

    //useState Setter 메서드의 스냡샷 방식
    //콜백 함수의 매개값은 해당 상태 변수의 최신 값이 전달됨
    setTodoGoals((currentTodoGoals) => [
      //setTodoGoals([...todoGoals, enteredGoalText]) //요약 @@@
      ...currentTodoGoals,
      { text: enteredGoalText, id: Math.random().toString() }, //구분 해주기
    ]);

    endAddGoalHandler();
  };

  const deleteGoalHandler = (id) => {
    setTodoGoals((currentTodoGoals) => {
      //스냅샷방식 @@@
      return currentTodoGoals.filter((goal) => goal.id !== id);
    });
  };

  //할 일 추가 모달 띄어주는 함수
  const startAddGoalhandler = () => {
    //@@@ ()
    setModalIsVisible(true);
  };

  const endAddGoalHandler = () => {
    setModalIsVisible(false);
  };

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button
          title='할 일 추가하기'
          color='#5e0acc'
          onPress={startAddGoalhandler}
        />
        {/* modalIsVisible && 를 직접 구현할 필요 없음 @@@ */}
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          {/* 
          ScrollView는 전체화면 렌더링이 될 때 안의 항목들을 전부 렌더링 함.
          이로 인해 성능 상의 저하가 나타날 수 있습니다.
          (보이지 않는 영역까지 렌더링을 진행하기 때문에 목록이 많다면 로딩이 길어짐.
 
            FlatList는 보이는 영역만 일단 렌더링을 진행하고, 나머지 항목들은
            스크롤 움직이 발생하면 그 때 그 때 렌덩링을 진행함.
            )
        */}
          {/* <ScrollView> 대체 */}
          <FlatList
            data={todoGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          ></FlatList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 4,
  },
});
