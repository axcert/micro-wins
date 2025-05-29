// ... 
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  // ...
  const isPremium = useSelector((state) => state.user.isPremium);

  return (
    <View style={styles.container}>
      {/* ... */}
      {isPremium && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumBadgeText}>PREMIUM</Text>  
        </View>
      )}
      {/* ... */}
    </View>
  );  
};

// ...

const styles = StyleSheet.create({
  // ...
  premiumBadge: {
    backgroundColor: '#ffd700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  premiumBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;