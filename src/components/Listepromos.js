import * as React from 'react';
import { Text, View, StyleSheet, FlatList,TouchableOpacity, ActivityIndicator, Image, StatusBar, SafeAreaView } from 'react-native';
import { PureComponent } from 'react';

export default class Listepromos extends PureComponent {
  
  state = {
      data: [],
      loading: true
  }
  async componentDidMount() {
    try {
      const api = await fetch('http://mspr-epsi.tomco.tech/promos');
      const dataJson = await api.json();
      this.setState({data: dataJson, loading: false});

    } catch(err) {
      console.log("Erreur lors de la recherche des informations :", err);
    }
  }
  renderItem(data) {
      return <TouchableOpacity>
                  <View  style={styles.listItemContainer}>
                      <Text style={styles.itemHeader}>{data.item.LIBELLE}</Text>
                      <Text style={styles.itemLabelle}>Code : {data.item.DATA} d'un montant de {data.item.MONTANT}€</Text>
                  </View>
              </TouchableOpacity>
  }
  render() {
    const { data, loading } = this.state;
    if(!loading) {
        return (
          <SafeAreaView style={styles.container}>
            <FlatList 
              data={data}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id} 
            />
          </SafeAreaView>
        );
    } else {
        return <ActivityIndicator />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  listItemContainer: {
      borderWidth: 1,
      borderColor: "#ff0000",
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      margin: 10,
  },
  itemHeader: {  
      color: 'black',
      fontSize: 24,
  },
  itemLabelle:{
    fontSize: 14,
  }
})
