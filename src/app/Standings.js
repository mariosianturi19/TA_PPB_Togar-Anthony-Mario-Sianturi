// src/app/Standings.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  SafeAreaView, 
  RefreshControl, 
  Alert 
} from 'react-native';
import { getNBAStandings } from '../service/StandingService';

const StandingsScreen = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchStandings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNBAStandings();
      setStandings(data);
    } catch (error) {
      setError('Gagal memuat data standings NBA');
      Alert.alert('Error', 'Terjadi kesalahan saat memuat data standings', [{ text: 'OK' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStandings().finally(() => setRefreshing(false));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.teamName}>{item?.team?.name || 'Unknown Team'}</Text>
      <Text>Rank: {item?.conference?.rank || 'N/A'}</Text>
      <Text>Wins: {item?.win?.total || 'N/A'}</Text>
      <Text>Losses: {item?.loss?.total || 'N/A'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>NBA Standings</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={standings}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text>Tidak ada data standings tersedia</Text>}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  listContainer: { padding: 8 },
  card: {
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
  },
  teamName: { fontSize: 16, fontWeight: 'bold' },
});

export default StandingsScreen;
