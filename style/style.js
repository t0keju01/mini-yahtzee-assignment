import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  totalPoints: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 25,
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  pointsRow: {
    marginTop: 10,
  },
  flex: {
    flexDirection: "row",
    justifyContent: 'center',
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "skyblue",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color:"#FFF",
    fontSize: 20
  },
  grid: {
    alignItems: 'center',
  },
  skill: {
    marginTop: 35,
    fontSize: 25,
  },
  value: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  skills: {
    alignItems: 'center',
  },
});