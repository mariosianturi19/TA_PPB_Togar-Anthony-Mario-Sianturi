import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  RefreshControl
} from 'react-native';
import { getNBATeams } from '../service/TeamsService';

const TeamsScreen = ({ navigation }) => {
  const [nbaTeams, setNBATeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getNBATeams();
      setNBATeams(response.response || []);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data tim NBA');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Players', { teamId: item.id, season: '2023' })}
    >
      <Image source={{ uri: item.logo }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.city}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={nbaTeams}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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
  location: { fontSize: 14, color: '#666' },
});

export default TeamsScreen;
