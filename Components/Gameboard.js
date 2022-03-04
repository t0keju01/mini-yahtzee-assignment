import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../style/style';


let board = [];

const NBR_OF_DICE = 5;
const NBR_OF_THROWS = 3;
const NBR_OF_DICE_FACES = 6;

export default function Gameboard() {
    
  const [nbrOfThrowsLeft, setNumberOfThrowsLeft] = useState(NBR_OF_THROWS);

  const [total, setTotal] = useState(0);

  const [pointsAway, setPointsAway] = useState(63);

  const [status, setStatus] = useState('Throw dices.');
  
  const [selectedDices, setSelectedDices] = 
    useState(new Array(NBR_OF_DICE).fill(false));

  const [selectedSpots, setSelectedSpots] = 
    useState(new Array(NBR_OF_DICE_FACES).fill(false));

  const [dotSums, setDotSums] = 
    useState(new Array(NBR_OF_DICE_FACES).fill(0));

  const SpotCountButtons = [];
    for (let i = 0; i < 6; i++ ) {
      SpotCountButtons.push(
        <View style={styles.gameboard}
          key={i}>
          <Text style={{marginTop: 5}}>{dotSums[i]}</Text>
            <Pressable style={styles.item} onPress={() => selectSpot(i)}>
                <MaterialCommunityIcons name={'numeric-' + (i+1) + '-circle'} size={50} color={getSpotColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        </View>
      )
  }

  const DicesRow = [];
    for (let i = 0; i < NBR_OF_DICE; i++) {
      DicesRow.push(
            <Pressable key={'row' + i} onPress={() => selectDice(i)}>
                <MaterialCommunityIcons name={board[i]} key={'row' + i} size={60} color={getDiceColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
      );
  }


  function newGame() {
    
        setTotal(0);

        setPointsAway(63);
        
        setDotSums(new Array(NBR_OF_DICE_FACES).fill(0));

        setSelectedSpots(new Array(NBR_OF_DICE_FACES).fill(false));
  }


  function gameOver() {
    return selectedSpots.every(x => x);
  }

  function showPointsAway(sum) {
    let awayFromBonus = pointsAway;
    if (!isNaN(awayFromBonus)) {
      let newPointsAway = awayFromBonus-sum;
      if (newPointsAway <= 0) {
        newPointsAway = 'You got the bonus!';
      }
      setPointsAway(newPointsAway);
    }
  }


  function showChosenPoints(i,sum) {
    let chosenPoints = [...dotSums];
    for (let j=0; j < 6; j++) {
      if (chosenPoints[i]===j) {
        chosenPoints[i] = sum;
      }
    }
    setDotSums(chosenPoints);
    showPointsAway(sum);
  }


  function addition(i) {
    let sum = 0;
    let spotCount = 'dice-' + (i+1)
    let sumTotal = total;
    for (let j = 0; j < board.length; j++) {
      if (spotCount === board[j]) {
        sum += (i+1);
      }
    }
    showChosenPoints(i, sum);

    setNumberOfThrowsLeft(NBR_OF_THROWS);

    setSelectedDices(new Array(NBR_OF_DICE).fill(false))

    setTotal(sumTotal+sum);
  }


  function getSpotColor(i) {
    return selectedSpots[i] ? 'black' : 'steelblue';
  }


  function selectSpot(i) {
    let spots = [...selectedSpots];
    if (!spots[i]) {
      if (nbrOfThrowsLeft === 0 ) {
        spots[i] = !selectedSpots[i]
        setSelectedSpots(spots);
        addition(i);

        if (spots.every(x => x)) {
          setStatus('Game has ended. All points selected.')
        } else {
          setStatus('Throw dices.')
        }
      } else {
        setStatus('Throw 3 times before setting points.')
      }
    } else if (!spots.every(x => x) && nbrOfThrowsLeft===0){
        setStatus('You already selected points for ' + (i+1));
    }
  }


  function getDiceColor(i) {
    return selectedDices[i] ? "black" : "steelblue";
  }


  function selectDice(i) {
    if (nbrOfThrowsLeft >= 0 && nbrOfThrowsLeft < 3 && !gameOver()) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    } else {
        setStatus('You have to throw dices first.');
    }
  }


  function throwDices() {
    if (gameOver()) {
      newGame();
    }
    if (nbrOfThrowsLeft-1 === 0) {
        setStatus('Select your points.')
    } else if (nbrOfThrowsLeft <= 3) {
        setStatus('Select and throw dices again.')
    }
    if (nbrOfThrowsLeft > 0) {
      for (let i = 0; i < NBR_OF_DICE; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          board[i] = 'dice-' + randomNumber;
        }
      }
        setNumberOfThrowsLeft(nbrOfThrowsLeft-1);
    } else {
        setStatus('Select your points before next throw')
    }
  }


  return (
    <View style={styles.gameboard}>
      <View style={styles.flex}>{DicesRow}</View>
      <Text style={styles.gameinfo}>
        {!gameOver() 
          ? 'Throws left: ' + nbrOfThrowsLeft 
          : 'Throws left: 0'
        }
      </Text>

      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button}
        onPress={() => throwDices()}>
        <Text style={styles.buttonText}>
          {!gameOver()
            ? 'Throw dices'
            : `New game`
          }
        </Text>
      </Pressable>

      <Text style={styles.total}>Total: {total}</Text>
      <Text>
        {!isNaN(pointsAway) 
          ? 'You are ' + pointsAway + ' points away from bonus.'
          : pointsAway
        }
      </Text>
      <View style={styles.flex}>{SpotCountButtons}</View>
    </View>
  )
}