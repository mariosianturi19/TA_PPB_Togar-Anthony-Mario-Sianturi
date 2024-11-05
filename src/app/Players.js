import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  Alert
} from 'react-native';
import { getNBATeamsPlayers } from '../service/PlayersService';

const PlayersScreen = ({ route }) => {
  const { teamId, season } = route.params;
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await getNBATeamsPlayers(teamId, season);
      setPlayers(response.response || []);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data pemain NBA');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPlayers().finally(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.firstname} {item.lastname}</Text>
        <Text style={styles.position}>{item.position}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={players}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { flexDirection: 'row', padding: 8, margin: 4, backgroundColor: '#fff', borderRadius: 8 },
  image: { width: 50, height: 50, borderRadius: 25 },
  cardContent: { paddingLeft: 8, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold' },
  position: { fontSize: 14, color: '#666' },
});

export default PlayersScreen;
